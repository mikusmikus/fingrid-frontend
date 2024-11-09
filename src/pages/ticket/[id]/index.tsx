import { useSingleTicket } from '@/data/actions';

export default function TicketPage() {
  const { data } = useSingleTicket('123');
  return <div>TicketPage</div>;
}
