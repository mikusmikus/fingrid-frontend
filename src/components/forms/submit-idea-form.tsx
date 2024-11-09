import { format } from 'date-fns';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import {
  RelevantIdea,
  useGetRelevantIdeas,
  useSendIdeas,
} from '@/data/actions';
import { useUser } from '@/providers/user-provider';

import { Badge } from '../badge';
import Button from '../button/button';
import { SelectInput } from '../select';
import { TextArea } from '../text-area';
import TextInput from '../text-input';
import { Typography } from '../typography/typography';

const categories = [
  {
    value: 'renewable-energy-integration',
    label: 'Renewable Energy Integration',
  },
  {
    value: 'grid-expansion-requests',
    label: 'Grid Expansion Requests',
  },
  {
    value: 'reliability-improvements',
    label: 'Reliability Improvements',
  },
];

interface IdeaFormData {
  category: string;
  subject: string;
  description: string;
}

export function SubmitIdeaForm() {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    reset,
  } = useForm<IdeaFormData>({
    defaultValues: {
      subject: ' Some subject',
      // description: ' Some description asd asd a',as
      category: 'renewable-energy-integration',
    },
  });

  const [relevantIdeas, setRelevantIdeas] = useState<RelevantIdea[]>([]);

  const { mutateAsync: getIdeas } = useGetRelevantIdeas();
  const { mutateAsync: sendIdeas, isLoading: isSendingIdeas } = useSendIdeas();
  const description = watch('description');

  useEffect(() => {
    if (!description || description.length < 10) {
      return;
    }

    const category = getValues('category');
    const timeoutId = setTimeout(async () => {
      try {
        const { data: relevantIdeas } = await getIdeas({
          description,
          category,
        });
        if (relevantIdeas) {
          setRelevantIdeas(relevantIdeas);
        }
      } catch (error) {
        console.error('Error fetching relevant ideas:', error);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [description]);

  const onSubmit = async (data: IdeaFormData) => {
    if (!user) {
      toast.error('You must be logged in to submit an idea');
      return;
    }

    try {
      await sendIdeas({ ...data, userId: user.id.toString() });

      toast.success('Idea submitted successfully');
      // Reset form
      reset();
      setRelevantIdeas([]);
    } catch (error) {
      toast.error('Error submitting idea');
    }
    // Handle form submission here
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
      {/* Left side - Relevant Ideas */}
      <div className="order-2 min-h-[200px] lg:order-1">
        {relevantIdeas.length > 0 ? (
          <div className="space-y-4 lg:sticky lg:top-24">
            <h3 className="text-lg text-gray-900 font-semibold">
              Similar Ideas Found ({relevantIdeas.length})
            </h3>

            <ul className="space-y-4">
              {relevantIdeas.map((idea, index) => (
                <motion.li
                  className="w-full"
                  key={idea.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    type: 'spring',
                    stiffness: 70,
                    damping: 15,
                  }}
                >
                  <RevelantIdeaCard idea={idea} />
                </motion.li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="rounded-r-lg border-l-4 border-red/40 bg-secondary-400/10">
            <div className="rounded-lg p-6 text-center">
              <p className="">
                Start typing your idea description to see similar suggestions
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Right side - Form */}
      <div className="order-1 lg:order-2">
        <form
          className="mx-auto grid w-full gap-4 lg:max-w-[600px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Typography as="label" variant="p-bld-base" className="mb-2">
              Category
            </Typography>
            <SelectInput
              {...register('category', {
                required: 'Please select a category',
              })}
              name="category"
              options={categories}
              placeholder="Select a category"
              error={errors.category?.message}
            />
          </div>

          <div>
            <Typography as="label" variant="p-bld-base" className="mb-2">
              Subject
            </Typography>
            <TextInput
              {...register('subject', {
                required: 'Subject is required',
                minLength: {
                  value: 3,
                  message: 'Title must be at least 3 characters',
                },
              })}
              name="subject"
              placeholder="Subject"
              error={errors.subject?.message}
            />
          </div>

          <div>
            <Typography as="label" variant="p-bld-base" className="mb-2">
              Description
            </Typography>
            <TextArea
              {...register('description', {
                required: 'Description is required',
                minLength: {
                  value: 10,
                  message: 'Description must be at least 10 characters',
                },
              })}
              rows={5}
              name="description"
              placeholder="Description"
              error={errors.description?.message}
            />
          </div>

          <Button disabled={isSendingIdeas} type="submit" variant="success">
            {isSendingIdeas ? 'Submitting...' : 'Submit Idea'}
          </Button>
        </form>
      </div>
    </div>
  );
}

const RevelantIdeaCard = ({ idea }: { idea: RelevantIdea }) => {
  return (
    <div className="border-gray-200 border-l-red-500/30 bg-white shadow-sm hover:shadow-md relative rounded-lg border border-l-4 p-4 transition-all duration-200">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Badge color="green" size="large" className="mb-2">
            {idea.status}
          </Badge>
          <Typography variant="cap-sm" className="text-info-text">
            {format(new Date(idea.created_at), 'dd.MM.yyy')}
          </Typography>
        </div>
        <div className="flex items-start justify-between">
          <Typography variant="p-bld-md" className="text-secondary-400">
            {idea.subject}
          </Typography>
          <span
            style={{
              backgroundColor: `rgb(${255 - idea.similarity_score * 2.55}, ${idea.similarity_score * 2.55}, 0)`,
              color: idea.similarity_score > 50 ? '#000' : '#fff',
            }}
            className="shrink-0 rounded-full px-3 py-1 text-cap-sm font-medium"
          >
            {Math.round(idea.similarity_score)}% Match
          </span>
        </div>

        {idea.description && (
          <p className="line-clamp-2 text-ellipsis text-p-reg-xs">
            {idea.description}
          </p>
        )}

        <div className="flex items-center justify-end">
          <Button
            variant="primary-light"
            size="sm"
            href={`/ideas/${idea.id}`}
            as={Link}
            iconRight="arrow-right"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};
