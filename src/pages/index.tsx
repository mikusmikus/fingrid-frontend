import Anchor from '@/components/anchor/anchor';
import { Container } from '@/components/container';
import { IdeaCard } from '@/components/idea-card';
import { Typography } from '@/components/typography/typography';
import { getIdeas } from '@/data/actions';
import { Idea } from '@/types';

// export const fakeIdeas = [
//   {
//     id: '1',
//     title: 'Sample Idea Title',
//     description: 'This is a description of the sample idea.',
//     category: 'Sample Category',
//     status: 'in development',
//     subject: 'Sample Subject',
//     releaseNumber: '1.0',
//     estimate: '3 months',
//     productImprovement: 20,
//     priority: 3,
//     inCommisioning: true,
//     functionalArea: 'Software Development',
//     createdOn: '2024-01-01T00:00:00.000Z',
//     comments: [],
//   },
//   {
//     id: '2',
//     title: 'Sample Idea Title',
//     description: 'This is a description of the sample idea.',
//     category: 'Sample Category',
//     status: 'in development',
//     subject: 'Sample Subject',
//     releaseNumber: '1.0',
//     estimate: '3 months',
//     productImprovement: 20,
//     priority: 3,
//     inCommisioning: true,
//     functionalArea: 'Software Development',
//     createdOn: '2024-01-01T00:00:00.000Z',
//     comments: [],
//   },
//   {
//     id: '3',
//     title: 'Sample Idea Title',
//     description: 'This is a description of the sample idea.',
//     category: 'Sample Category',
//     status: 'in development',
//     subject: 'Sample Subject',
//     releaseNumber: '1.0',
//     estimate: '3 months',
//     productImprovement: 20,
//     priority: 3,
//     inCommisioning: true,
//     functionalArea: 'Software Development',
//     createdOn: '2024-01-01T00:00:00.000Z',
//     comments: [],
//   },
// ];

export default function Home({ ideas }: { ideas: Idea[] }) {
  return (
    <Container>
      <div className="my-10">
        <div className="mb-4 flex items-center justify-between">
          <Typography variant="h3" as="h1" className="mb-4">
            Latest Ideas
          </Typography>
          <Anchor
            variant="primary-dark"
            size="md"
            href="/ideas"
            iconRight="arrow-right"
          >
            View all ideas
          </Anchor>
        </div>
        <ul className="grid grid-cols-1 gap-4">
          {ideas.slice(0, 3).map((idea) => (
            <li>
              <IdeaCard key={idea.id} idea={idea} />
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}

export async function getServerSideProps() {
  const ideas = await getIdeas();

  // const releases = await getReleases();

  return {
    props: {
      ideas,
    },
  };
}
