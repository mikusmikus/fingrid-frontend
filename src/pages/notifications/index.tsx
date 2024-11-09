import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button } from '@/components/button/button';
import { Container } from '@/components/container';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Typography } from '@/components/typography/typography';
import { useGetNotifications, useMarkNotificationAsRead } from '@/data/actions';
import { useUser } from '@/providers/user-provider';
import { Notification } from '@/types';

export default function NotificationsPage() {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  const { data: notifications, isLoading } = useGetNotifications(
    user.id,
    !!user
  );

  if (isLoading || !notifications) {
    return (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f3f4f6',
          borderRadius: '4px',
        }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Container variant="narrow">
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>
            <NotificationCard notification={notification} />
          </li>
        ))}
      </ul>
    </Container>
  );
}

const NotificationCard = ({ notification }: { notification: Notification }) => {
  const router = useRouter();
  const {
    mutateAsync: markNotificationAsRead,
    isLoading: isMarkingNotificationAsRead,
  } = useMarkNotificationAsRead();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        margin: '8px 0',
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div>
        <Typography variant="p-reg-base">{notification.ideaSubject}</Typography>
      </div>

      {notification.status == 'New' ? (
        <Button
          onClick={async () => {
            try {
              await markNotificationAsRead(notification.id);
              router.push(`/ideas/${notification.ideaId}`);
            } catch (error) {
              console.error(error);
            }
          }}
          variant="success"
          disabled={isMarkingNotificationAsRead}
        >
          Open
        </Button>
      ) : (
        <Button
          variant="secondary-dark"
          as={Link}
          href={`/ideas/${notification.ideaId}`}
          disabled={isMarkingNotificationAsRead}
        >
          View
        </Button>
      )}
    </div>
  );
};
