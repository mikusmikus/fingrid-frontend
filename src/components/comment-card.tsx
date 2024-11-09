import { format } from 'date-fns';
import { motion } from 'framer-motion';

import { Comment } from '@/types';

import { getTitleFromType } from './idea-comments';
import { Typography } from './typography/typography';

export default function CommentCard({
  comment,
  withType = false,
}: {
  comment: Comment;
  withType?: boolean;
}) {
  return (
    <div className="flex  flex-col gap-2 rounded bg-secondary-400/5 px-4 py-2">
      {withType && (
        <div>
          <Typography
            variant="p-bld-xs"
            className="inline  rounded border px-3 py-1"
          >
            {getTitleFromType(comment.type)}
          </Typography>
        </div>
      )}
      <div className="flex items-center justify-between gap-2">
        <Typography variant="p-bld-sm">{comment.author}</Typography>
        <Typography variant="p-bld-xs">
          {format(new Date(comment.timestamp), 'PPP')}
        </Typography>
      </div>
      <div className="flex items-center gap-2">
        <motion.p>{comment.text}</motion.p>
      </div>
    </div>
  );
}
