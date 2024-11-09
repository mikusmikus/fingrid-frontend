'use client';

import { Input } from './components/input';

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-primary bg-accent-red">
        Fin grid home
        <Input value="test" />
      </h1>
    </div>
  );
}
