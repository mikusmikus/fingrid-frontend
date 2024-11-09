import AddComment from '@/components/add-comment';
import CommentTimeline from '@/components/comment-timeline';
import { Container } from '@/components/container';
import IdeaComments from '@/components/idea-comments';
import IdeaOverview from '@/components/idea-overview';
import { LoadingSpinner } from '@/components/loading-spinner';
import { WithInViewAnimation } from '@/components/motion/with-in-view-animate';
import { Typography } from '@/components/typography/typography';
import { useSingleIdea } from '@/data/actions';
import { useUser } from '@/providers/user-provider';
import { Idea } from '@/types';

// Example of fake idea data
const fakeIdea = {
  id: '123',
  title: 'Sample Idea Title',
  description: 'This is a description of the sample idea.',
  category: 'Sample Category',
  status: 'in development',
  subject: 'Sample Subject',
  releaseNumber: '1.0',
  estimate: '3 months',
  productImprovement: 20,
  priority: 3,
  inCommisioning: true,
  functionalArea: 'Software Development',
  createdOn: '2024-01-01T00:00:00.000Z',
  comments: [
    {
      text: 'This is the first comment providing clarification on the idea.',
      timestamp: '2024-11-09T14:04:37.111Z',
      type: 'CLARIFICATION',
      author: 'John Doe',
    },
    {
      text: 'This is the first comment providing clarification on the idea.',
      timestamp: '2024-11-09T14:04:37.111Z',
      type: 'CLARIFICATION',
      author: 'John Doe',
    },
    {
      text: 'This is the first comment providing clarification on the idea.',
      timestamp: '2024-11-09T14:04:37.111Z',
      type: 'CLARIFICATION',
      author: 'John Doe',
    },
    {
      text: 'This comment describes the resolution of the issue.',
      timestamp: '2024-11-10T10:00:00.000Z',
      type: 'RESOLUTION_DESCRIPTION',
      author: 'Jane Doe',
    },
    {
      text: 'Client feedback indicates satisfaction with the proposal.',
      timestamp: '2024-11-11T12:30:00.000Z',
      type: 'CLIENT_FEEDBACK',
      author: 'Jane Doe',
    },
    {
      text: 'This is a strong argument in favor of the proposal.',
      timestamp: '2024-11-12T15:45:00.000Z',
      type: 'PROPOSAL_ARGUMENT',
      author: 'John Doe',
    },
    {
      text: 'This comment outlines the next steps to take.',
      timestamp: '2024-11-13T09:00:00.000Z',
      type: 'NEXT_STEPS',
      author: 'John Doe',
    },
    {
      text: 'This comment highlights the impact of the proposal.',
      timestamp: '2024-11-14T11:15:00.000Z',
      type: 'IMPACT_OF_PROPOSAL',
      author: 'John Doe',
    },
    {
      text: 'Recommendation for CC DWG based on the latest review.',
      timestamp: '2024-11-15T13:30:00.000Z',
      type: 'RECOMENDATION_CC_DWG',
      author: 'Jane Doe',
    },
  ],
} as unknown as Idea;

export default function TicketPage({ id }: { id: number }) {
  const { data: idea, isLoading } = useSingleIdea(id);

  const { user } = useUser();

  if (isLoading || !idea) {
    return (
      <div className="flex size-full h-dvh items-center justify-center rounded-4 bg-neutral-100">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <WithInViewAnimation>
      <Container className="space-y-10 py-6">
        <div className="flex items-center justify-between">
          <Typography variant="h3" className="mb-4" as="h1">
            {idea.category} - {idea.subject}
          </Typography>
        </div>
        <IdeaOverview idea={idea} />

        {user && (
          <div className="shrink-0">
            <AddComment idea={idea} />
          </div>
        )}

        <hr className="my-8 w-full border-t border-neutral-500" />
        <IdeaComments idea={idea} />
        <hr className="my-8 w-full border-t border-neutral-500" />
        <CommentTimeline idea={idea} />
      </Container>
    </WithInViewAnimation>
  );
}

// Add getServerSideProps to fetch the ticket data
export async function getServerSideProps(context: any) {
  const { params } = context;
  const ideaId = params.id;

  // const idea = await getIdea(ideaId);

  // Fetch the single ticket data here (replace with your fetching logic)

  return {
    props: {
      id: ideaId,
    },
  };
}
