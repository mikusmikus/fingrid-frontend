'use client';

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { Button } from '@/components/button/button';
import TextInput from '@/components/input';
import { useUser } from '@/providers/user-provider';

type FormData = {
  email: string;
  password: string;
};

// Fake user/admin data for validation
const fakeUsers = [
  { email: 'user@example.com', password: 'user', role: 'user', id: 1 },
  { email: 'admin@example.com', password: 'admin', role: 'admin', id: 2 },
];

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: 'user@example.com',
      password: 'user',
    },
  });

  const { user } = useUser();

  if (user) {
    router.push('/', undefined, { shallow: false });
  }

  const onSubmit = async (data: { email: string; password: string }) => {
    // Validate credentials against fake user data
    const user = fakeUsers.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (!user) {
      toast.error('Invalid credentials');
      return;
    }

    if (user) {
      // Save email and role to local storage
      localStorage.setItem(
        'fingridAccount',
        JSON.stringify({ email: user.email, role: user.role, id: user.id })
      );
      console.log('Login successful:', user);

      router.push('/', undefined, { shallow: false });
      // TODO: Redirect to the appropriate page based on role
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100">
      <div className="bg-white shadow-lg w-full max-w-md rounded-4 p-8">
        <h1 className="text-2xl mb-8 text-center font-bold">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="text-sm mb-2 block font-medium text-neutral-900"
            >
              Email
            </label>
            <TextInput
              id="email"
              {...register('email', { required: 'Email is required' })}
              type="email"
              placeholder="Enter your email"
              size="md"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm mb-2 block font-medium text-neutral-900"
            >
              Password
            </label>
            <TextInput
              id="password"
              {...register('password', { required: 'Password is required' })}
              type="password"
              placeholder="Enter your password"
              size="md"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>

          <Button type="submit" className="w-full" variant="primary-dark">
            Log in
          </Button>
        </form>

        <p className="text-sm mt-4 text-center text-neutral-700">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:text-blue-800">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
