import { Navigation } from './navigation';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header>
        <Navigation />
      </header>
      <main>{children}</main>
    </div>
  );
}
