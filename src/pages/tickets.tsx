import { type NextPage } from "next";
import Head from "next/head";

const TicketsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tickets</title>
        <meta name="description" content="Purchase your tickets" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Tickets
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            {/* Ticket content will go here */}
            <div className="flex flex-col items-center gap-4 rounded-xl bg-background/80 p-4 hover:bg-background/90">
              <h3 className="text-2xl font-bold">Coming Soon</h3>
              <p className="text-center">
                Ticket purchasing will be available shortly.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TicketsPage; 