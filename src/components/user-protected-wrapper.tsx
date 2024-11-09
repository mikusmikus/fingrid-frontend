import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useUser } from '@/providers/user-provider';

export const UserProtectedWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useUser();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    setIsLoading(false);
  }, [user]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
};
