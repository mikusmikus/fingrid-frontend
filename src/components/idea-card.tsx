import { format } from 'date-fns';
import Link from 'next/link';

import { Idea } from '@/types';

import Anchor from './anchor/anchor';
import { Badge } from './badge';
import { Typography } from './typography/typography';

export const IdeaCard = ({ idea }: { idea: Idea }) => {
  return (
    <div className="relative rounded-lg border border-l-4 border-l-red/30 p-4 shadow-200 transition-all duration-200">
      <div className="mb-2 flex  items-center justify-between">
        <Typography variant="p-bld-base" className="text-p-bld-base">
          {idea.subject}{' '}
          <span className="block text-p-reg-xs text-neutral-700 md:inline">
            Created on {format(new Date(idea.createdOn), 'dd.MM.yyy')}
          </span>
        </Typography>

        <Badge color="green" size="large" className="shrink-0">
          {idea.status}
        </Badge>
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="grow">
          {idea.description && (
            <p className="line-clamp-1 text-p-reg-xs">
              {idea.description}
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
              aspernatur dolorem quod tenetur odio, sed voluptatibus officiis!
              Quo sed laudantium esse, tempora deleniti ad fuga! Animi
              reprehenderit recusandae maiores consequuntur? Modi ipsam dolorum
              rem quas nihil illo exercitationem a eum ex adipisci, laudantium,
              commodi explicabo. Nemo consectetur corporis suscipit
              exercitationem officia dolorum dolore veritatis inventore
              voluptatum! Eius maiores doloremque quam ex voluptate minus
              commodi cumque asperiores distinctio ratione voluptates dolore
              excepturi, aliquid voluptatum corrupti ab fugit nobis velit in
              nostrum facere placeat perferendis? Sapiente, commodi nulla, rerum
              corporis alias aliquid fugiat harum ut magni magnam illo,
              consequuntur asperiores atque minus.
            </p>
          )}
        </div>

        <Anchor
          variant="primary-dark"
          size="sm"
          href={`/ideas/${idea.id}`}
          className="full-link"
          as={Link}
          iconRight="arrow-right"
        >
          View ticket
        </Anchor>
      </div>
    </div>
  );
};
