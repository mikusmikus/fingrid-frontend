import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { updateIdeaMutation } from '@/data/actions';
import { Idea } from '@/types';

import Button from './button/button';
import TextInput from './text-input';

type FormData = {
  releaseNumber?: string;
  estimate?: string;
  productImprovement?: number;
  priority?: number;
  inCommisioning?: boolean;
  functionalArea?: string;
  status?: string;
};

export function EditForm({
  idea,
  closeModal,
}: {
  idea: Idea;
  closeModal: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      releaseNumber: idea.releaseNumber,
      estimate: idea.estimate,
      productImprovement: idea.productImprovement,
      priority: idea.priority,
      inCommisioning: idea.inCommisioning,
      functionalArea: idea.functionalArea,
      status: idea.status,
    },
  });

  const { mutateAsync: updateIdea, isLoading } = updateIdeaMutation();

  const onSubmit = async (data: FormData) => {
    try {
      await updateIdea({ ...data, ideaId: idea.id });
      closeModal();
      toast.success('Idea updated');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update idea');
    }
  };

  return (
    <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        {...register('releaseNumber', {
          required: 'Release number is required',
          minLength: {
            value: 3,
            message: 'Title must be at least 3 characters',
          },
        })}
        name="releaseNumber"
        placeholder="release number"
        error={errors.releaseNumber?.message}
      />

      <TextInput
        {...register('estimate', {
          required: 'Estimate is required',
        })}
        name="estimate"
        placeholder="estimate"
        error={errors.estimate?.message}
      />

      <TextInput
        {...register('productImprovement', {
          required: 'Product Improvement is required',
        })}
        name="productImprovement"
        placeholder="product improvement"
        error={errors.productImprovement?.message}
      />

      <TextInput
        {...register('priority', {
          required: 'Priority is required',
        })}
        name="priority"
        placeholder="priority"
        error={errors.priority?.message}
      />

      <div className="flex items-center gap-2">
        <input
          {...register('inCommisioning')}
          type="checkbox"
          id="inCommisioning"
          name="inCommisioning"
          className=""
        />
        <label htmlFor="inCommisioning" className="text-neutral-700">
          In Commissioning
        </label>
      </div>

      <TextInput
        {...register('functionalArea', {
          required: 'Functional Area is required',
        })}
        name="functionalArea"
        placeholder="functional area"
        error={errors.functionalArea?.message}
      />

      <TextInput
        {...register('status', {
          required: 'Status is required',
        })}
        name="status"
        placeholder="status"
        error={errors.status?.message}
      />

      <Button disabled={isLoading} type="submit" variant="success">
        {isLoading ? 'Updating...' : 'Update'}
      </Button>
    </form>
  );
}
