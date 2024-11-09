import { type NextPage } from "next";
import Head from "next/head";

const CreateTicketPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Ticket</title>
        <meta name="description" content="Create a new ticket" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Create Ticket
          </h1>
          <div className="w-full max-w-md">
            {/* Ticket form will go here */}
            <div className="rounded-xl bg-background/80 p-4">
              <p className="text-center">
                Ticket creation form coming soon...
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CreateTicketPage; 