export * from './polymorphic-ref';

export const allowedCommentStatusTypes = [
  'development proposal',
  'in review',
  'clarification needed',
] as const;

const disallowedCommentStatusTypes = [
  'resolution',
  'in development',
  'ready for release',
  'in production',
  'rejected',
] as const;

type AllowedCommentStatusType = (typeof allowedCommentStatusTypes)[number];
type DisallowedCommentStatusType =
  (typeof disallowedCommentStatusTypes)[number];

export const commentTypes = [
  'CLARIFICATION',
  'RESOLUTION_DESCRIPTION',
  'CLIENT_FEEDBACK',
  'PROPOSAL_ARGUMENT',
  'COMMENT',
  'IMPACT_OF_PROPOSAL',
  'RECOMENDATION_CC_DWG',
  'NEXT_STEPS',
] as const;

export type CommentType = (typeof commentTypes)[number];
export type Idea = {
  id: number;
  comments: Array<Comment>;
  category: string;
  status: AllowedCommentStatusType | DisallowedCommentStatusType;
  subject: string;
  description: string;
  releaseNumber: string;
  estimate: string;
  updatedOn: string;
  productImprovement: number;
  priority: number;
  inCommisioning: boolean;
  functionalArea: string;
  authorId: number;
  createdOn: string;
};

export type Comment = {
  text: string;
  timestamp: string;
  type: CommentType;
  author: string;
};

export type Notification = {
  id: number;
  status: 'New' | 'Read';
  type: 'string';
  ideaId: 0;
  ideaSubject: 'string';
};
