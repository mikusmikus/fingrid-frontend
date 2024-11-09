import { useState } from 'react';

import Button from '@/components/button/button';
import { Container } from '@/components/container';
import { IdeaCard } from '@/components/idea-card';
import { Typography } from '@/components/typography/typography';
import { useUser } from '@/providers/user-provider';
import { Idea } from '@/types';

import { fakeIdeas } from '..';

export default function IdeasPage({ ideas }: { ideas: Idea[] }) {
  const { user } = useUser();
  const [showMyTickets, setShowMyTickets] = useState(false);

  if (!ideas.length) {
    return (
      <div className="my-10">
        <Typography variant="h3" as="h1" className="mb-4">
          No ideas found
        </Typography>
      </div>
    );
  }

  const filteredIdeas = showMyTickets
    ? ideas.filter((idea) => idea.authorId === user?.id)
    : ideas;

  return (
    <Container className="my-10">
      <div className="mb-4 flex items-center justify-between gap-4">
        <Typography variant="h3" as="h1" className="mb-4">
          Ideas
        </Typography>

        {user && (
          <Button
            variant="secondary-dark"
            onClick={() => setShowMyTickets(!showMyTickets)}
          >
            {showMyTickets ? 'Show all ideas' : 'Show my ideas'}
          </Button>
        )}
      </div>
      {filteredIdeas.length ? (
        <ul className="grid grid-cols-1 gap-4">
          {filteredIdeas.map((idea) => (
            <li>
              <IdeaCard key={idea.id} idea={idea} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="my-10">
          <Typography variant="h3" as="h1" className="mb-4">
            No ideas found
          </Typography>
        </div>
      )}
    </Container>
  );
}

export async function getServerSideProps() {
  // const ideas = await getIdeas();

  // const releases = await getReleases();

  return {
    props: {
      ideas: fakeIdeas,
    },
  };
}
