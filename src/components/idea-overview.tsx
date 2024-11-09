import clsx from 'clsx';
import { useState } from 'react';

import {
  SvgBackspace,
  SvgCalendar,
  SvgNotificationOn,
} from '@/components/icons';
import { useUser } from '@/providers/user-provider';
import { Idea } from '@/types';

import Button from './button/button';
import { EditForm } from './edit-form';
import { Modal } from './modal';
import { Typography } from './typography/typography';

function EditIdeaModal({ idea }: { idea: Idea }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal
        size="large"
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        header="Add Comment"
      >
        <EditForm idea={idea} closeModal={() => setIsOpen(false)} />
      </Modal>
      <Button onClick={() => setIsOpen(true)}>Edit</Button>
    </>
  );
}

export default function IdeaOverview({ idea }: { idea: Idea }) {
  const getStatusColor = (status: Idea['status']) => {
    const colors =
      {
        'in production': 'bg-green-100 text-green-800',
        'ready for release': 'bg-blue-100 text-blue-800',
        'in development': 'bg-yellow-100 text-yellow-800',
        'development proposal': 'bg-purple-100 text-purple-800',
        'in review': 'bg-orange-100 text-orange-800',
        'clarification needed': 'bg-red-100 text-red-800',
        resolution: 'bg-gray-100 text-gray-800',
        rejected: 'bg-red-100 text-red-800',
      }[status] || 'bg-gray-100 text-gray-800';

    return colors;
  };

  const { user } = useUser();

  return (
    <div className="rounded-lg p-6 shadow-300">
      {/* Header Section */}
      <div className="mb-6 flex items-center justify-between border-l-4 border-primary-500 pl-4">
        <Typography variant="p-reg-base">{idea.description}</Typography>
        {user?.role === 'admin' && <EditIdeaModal idea={idea} />}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Status and Category */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <span
              className={clsx('rounded-full px-4 py-2 text-p-reg-md ', {
                'bg-red text-red-800': idea.status === 'rejected',
                'bg-success-icon text-green-800':
                  idea.status === 'in production',
                'bg-secondary-500 text-blue-800':
                  idea.status === 'ready for release',
                'bg-[yellow] text-yellow-800': idea.status === 'in development',
                'bg-purple-100 text-purple-800':
                  idea.status === 'development proposal',
                'bg-orange-100 text-orange-800': idea.status === 'in review',
                'bg-gray-100 text-gray-800':
                  idea.status === 'clarification needed',
              })}
            >
              {idea.status}
            </span>
            <span className="text-sm dary-300 flex items-center gap-1 rounded-full border px-3 py-1 font-medium">
              Ico
              {idea.category}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <SvgCalendar className="size-4" />
            <span className="text-p-reg-sm">
              Created on: {new Date(idea.createdOn).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <SvgNotificationOn className="size-5 text-success-icon" />
            <span className="text-p-reg-sm">
              Priority Level: <strong>{idea.priority}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <SvgBackspace className="size-5" />
            <span className="text-p-reg-sm">
              Product Improvement Score:{' '}
              <strong>{idea.productImprovement}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="mt-6 border-t border-secondary-200 pt-6">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <li className="border-l border-neutral-700 py-1 pl-4 pr-2">
            <Typography variant="p-reg-sm" className="font-medium">
              Release Number
            </Typography>
            <p className="mt-1">{idea.releaseNumber}</p>
          </li>
          <li className="border-l border-neutral-700 py-1 pl-4 pr-2">
            <Typography variant="p-reg-sm" className="font-medium">
              Estimate
            </Typography>
            <p className="mt-1">{idea.estimate}</p>
          </li>
          <li className="border-l border-neutral-700 py-1 pl-4 pr-2">
            <Typography variant="p-reg-sm" className="font-medium">
              Functional Area
            </Typography>
            <p className="mt-1">{idea.functionalArea}</p>
          </li>
          <li className="border-l border-neutral-700 py-1 pl-4 pr-2">
            <Typography variant="p-reg-sm" className="font-medium">
              In Commissioning
            </Typography>
            <span
              className={clsx(
                'mt-1 inline-block rounded-full px-2 py-1 text-p-reg-sm font-medium',
                idea.inCommisioning
                  ? 'bg-success-icon text-neutral-900'
                  : 'bg-secondary-400/5 text-secondary-500'
              )}
            >
              {idea.inCommisioning ? 'Yes' : 'No'}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
