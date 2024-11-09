import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useAddComment } from '@/data/actions';
import { useUser } from '@/providers/user-provider';
import { CommentType, commentTypes, Idea } from '@/types';

import Button from './button/button';
import SelectInput from './select';
import TextArea from './text-area';

export default function AddComment({ idea }: { idea: Idea }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Add feedback</Button>
    </>
  );
}

type FormData = {
  description: string;
  type: CommentType;
};

export function AddCommentForm({
  idea,
  closeModal,
}: {
  idea: Idea;
  closeModal: () => void;
}) {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      description: '',
    },
  });

  const { mutateAsync: addComment, isLoading } = useAddComment();

  const onSubmit = async (data: FormData) => {
    if (!user) {
      toast.error('You must be logged in to add a comment');
      return;
    }

    const userType = user.role === 'admin' ? data.type : 'CLIENT_FEEDBACK';

    const payload = {
      text: data.description,
      type: userType,
      ideaId: +idea.id,
      userId: +user.id,
    };

    try {
      await addComment(payload);
      toast.success('Comment added successfully');

      closeModal();
      reset();
    } catch (error) {
      console.log('error', error);

      toast.error('Error adding comment');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      {user?.role === 'admin' && (
        <div>
          <SelectInput
            {...register('type', {
              required: 'Please select a type',
            })}
            name="type"
            options={commentTypes.map((type) => ({
              label: type,
              value: type,
            }))}
            placeholder="Select a type"
            error={errors.type?.message}
          />
        </div>
      )}

      <div>
        <TextArea
          {...register('description', {
            required: 'Description is required',
            minLength: {
              value: 10,
              message: 'Description must be at least 10 characters',
            },
          })}
          rows={5}
          name="description"
          placeholder="Description"
          error={errors.description?.message}
        />
      </div>

      <Button disabled={isLoading} type="submit" variant="success">
        {isLoading ? 'Submitting...' : 'Submit Feedback'}
      </Button>
    </form>
  );
}
