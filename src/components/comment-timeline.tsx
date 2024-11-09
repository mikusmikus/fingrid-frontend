import { Idea } from '@/types';

import { Accordion } from './accordion';
import CommentCard from './comment-card';

export default function CommentTimeline({ idea }: { idea: Idea }) {
  if (!idea.comments) return null;

  // Group comments by their types

  return (
    <div className="my-4">
      <Accordion title="History">
        <ul className="space-y-2">
          {idea.comments.map((comment, index) => (
            <li key={index}>
              <CommentCard comment={comment} withType />
            </li>
          ))}
        </ul>
      </Accordion>
    </div>
  );
}
