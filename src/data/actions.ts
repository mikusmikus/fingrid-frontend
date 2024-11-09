import { useMutation, UseMutationResult, useQuery } from 'react-query';

import { Ticket } from '@/types';

// const fetch_suggestions_url = 'http://10.87.1.222:8000/ideas/similarity';

export interface RelevantIdea {
  description: string;
  id: string;
  similarity_score: number;
  status: string;
  subject: string;
  created_at: number;
}
export const useGetRelevantIdeas = (): UseMutationResult<
  { data: RelevantIdea[] },
  unknown,
  { category: string; description: string }
> => {
  return useMutation(
    async (body: { category: string; description: string }) => {
      const response = await fetch('http://10.87.1.222:8000/ideas/similarity', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json', // Ensure the content type is set
        },
      });
      return response.json();
    }
  );
};

const API_URL = 'http://10.87.3.162:1337/ideas';

type FormData = {
  category: string;
  description: string;
  subject: string;
  userId: string;
};

export const useSendIdeas = () => {
  return useMutation(async (body: FormData) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('response123', response);

    if (!response.ok) {
      throw new Error('Failed to submit idea');
    }

    return response;
  });
};

export const useSingleTicket = (orderId: string) => {
  return useQuery<Ticket>(['/order/ticket/${orderId}'], async () => {
    const response = await fetch(`API_URL/${orderId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch gift receipts');
    }
    return response.json();
  });
};
