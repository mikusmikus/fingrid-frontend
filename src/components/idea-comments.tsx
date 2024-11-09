import { Comment, CommentType, Idea } from '@/types';

import { Accordion } from './accordion';
import CommentCard from './comment-card';

export const getTitleFromType = (type: CommentType) => {
  switch (type) {
    case 'CLARIFICATION':
      return 'Clarification';
    case 'RESOLUTION_DESCRIPTION':
      return 'Resolution Description';
    case 'CLIENT_FEEDBACK':
      return 'Client Feedback';
    case 'PROPOSAL_ARGUMENT':
      return 'Proposal Argument';
    case 'COMMENT':
      return 'Comment';
    case 'IMPACT_OF_PROPOSAL':
      return 'Impact of Proposal';
    case 'RECOMENDATION_CC_DWG':
      return 'Recommendation CC DWG';
    case 'NEXT_STEPS':
      return 'Next Steps';

    default:
      return type;
  }
};

export default function IdeaComments({ idea }: { idea: Idea }) {
  if (!idea.comments) return null;

  // Group comments by their types
  const groupedComments = idea.comments.reduce(
    (acc, comment) => {
      const type = comment.type; // Assuming 'type' is a property of Comment
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(comment);
      return acc;
    },
    {} as Record<CommentType, Comment[]>
  );

  console.log('groupedComments', groupedComments);

  return (
    <>
      <div className="grid gap-4">
        {Object.entries(groupedComments).map(([type, comments]) => (
          <Accordion
            key={type}
            title={`${getTitleFromType(type as CommentType)} (${comments.length})`}
            variant="light"
            className="rounded border"
          >
            <ul className="space-y-4">
              {comments.map((comment, index) => (
                <li key={index}>
                  <CommentCard comment={comment} />
                </li>
              ))}
            </ul>
          </Accordion>
        ))}
      </div>
    </>
  );
}
