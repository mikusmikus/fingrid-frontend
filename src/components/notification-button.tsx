import { useGetNotifications } from '@/data/actions';
import { useUser } from '@/providers/user-provider';

import { SvgNotification } from './icons';
import { Typography } from './typography/typography';

export default function NotificationButton() {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  const { data: notifications, isLoading } = useGetNotifications(
    user.id,
    !!user
  );

  if (isLoading || !notifications) {
    return null;
  }

  const unreadNotifications = notifications.filter(
    (notification) => notification.status === 'New'
  );

  if (unreadNotifications.length === 0) {
    return null;
  }

  return (
    <a
      href="/notifications"
      className="relative ml-auto flex size-10 items-center justify-center rounded-full  bg-neutral-100 text-red"
    >
      <SvgNotification className="size-6 animate-jingle-bell-shake" />
      <div className="absolute right-0 top-0 z-10 flex  items-center justify-center  text-neutral-900 ">
        <Typography variant="p-bld-base">
          {unreadNotifications.length}
        </Typography>
      </div>
    </a>
  );
}
