import { type NextPage } from 'next';

import { Container } from '@/components/container';
import { SubmitIdeaForm } from '@/components/forms/submit-idea-form';
import { WithInViewAnimation } from '@/components/motion/with-in-view-animate';
import { Typography } from '@/components/typography/typography';
import { UserProtectedWrapper } from '@/components/user-protected-wrapper';

const CreateTicketPage: NextPage = () => {
  return (
    <UserProtectedWrapper>
      <WithInViewAnimation>
        <Container className="pt-10">
          <Typography as="h1" variant="h3" className="mb-10 text-center">
            Create Ticket
          </Typography>
          <SubmitIdeaForm />
        </Container>
      </WithInViewAnimation>
    </UserProtectedWrapper>
  );
};

export default CreateTicketPage;
