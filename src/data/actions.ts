import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from 'react-query';

import { Idea, Notification } from '@/types';

// const fetch_suggestions_url = 'http://10.87.1.222:8000/ideas/similarity';

const API_URL_EGONS = 'http://10.93.0.60:1337';
const API_URL_VALDIS = 'http://10.93.13.223:8000';

export interface RelevantIdea {
  description: string;
  id: string;
  similarity_score: number;
  status: string;
  subject: string;
  created_at: string;
}

export const useGetRelevantIdeas = (): UseMutationResult<
  { data: RelevantIdea[] },
  unknown,
  { category: string; description: string }
> => {
  return useMutation(
    async (body: { category: string; description: string }) => {
      const response = await fetch(`${API_URL_VALDIS}/ideas/similarity`, {
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

type FormData = {
  category: string;
  description: string;
  subject: string;
  userId: string;
};

export const useSendIdeas = () => {
  return useMutation(async (body: FormData) => {
    const response = await fetch(API_URL_EGONS, {
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

export const getSingleIdea = async (ideaId: number) => {
  const response = await fetch(`${API_URL_EGONS}/ideas/${ideaId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch idea');
  }

  return response.json();
};

export const useSingleIdea = (ideaId: number) => {
  return useQuery<Idea>([`/ideas/${ideaId}`], async () => {
    return getSingleIdea(ideaId);
  });
};

type CommentData = {
  text: string;
  ideaId: number;
  userId: number;
  type: string;
};

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (body: CommentData) => {
      console.log('body', body);

      const response = await fetch(
        `${API_URL_EGONS}/ideas/${body.ideaId}/comment`,
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      return true;
    },
    {
      onSuccess: (_, body) => {
        queryClient.invalidateQueries([`/ideas/${body.ideaId}`]);
      },
    }
  );
};

export const getIdeas = async () => {
  const response = await fetch(`${API_URL_EGONS}/ideas`);

  if (!response.ok) {
    throw new Error('Failed to fetch ideas');
  }

  return response.json() as Promise<Idea[]>;
};

export const useGetIdeas = () => {
  return useQuery(['/ideas'], async () => {
    return getIdeas();
  });
};

export const getIdea = async (ideaId: string) => {
  const response = await fetch(`${API_URL_EGONS}/ideas/${ideaId}`);

  return response.json();
};

// export const getReleases = async () => {
//   const response = await fetch(`${API_URL}/releases`);

//   if (!response.ok) {
//     throw new Error('Failed to fetch releases');
//   }
// };

type UpdateIdeaData = {
  releaseNumber?: string;
  estimate?: string;
  productImprovement?: number;
  priority?: number;
  inCommisioning?: boolean;
  functionalArea?: string;
  status?: string;
  ideaId: number;
};

export const updateIdeaMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (body: UpdateIdeaData) => {
      const { ideaId, ...data } = body;
      const response = await fetch(`${API_URL_EGONS}/ideas/${ideaId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update idea');
      }

      return true;
    },
    {
      onSuccess: (_, body) => {
        queryClient.invalidateQueries([`/ideas/${body.ideaId}`]);
      },
    }
  );
};

export const useGetNotifications = (userId: number, enabled: boolean) => {
  return useQuery(
    ['/notifications'],
    async () => {
      const response = await fetch(
        `${API_URL_EGONS}/users/${userId}/notifications`
      );

      return response.json() as Promise<Notification[]>;
    },
    {
      enabled,
    }
  );
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (notificationId: number) => {
      await fetch(`${API_URL_EGONS}/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return true;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['/notifications']);
      },
    }
  );
};
