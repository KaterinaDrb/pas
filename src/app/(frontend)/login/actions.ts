'use server';
import { redirect } from 'next/navigation';
import api from '@/api';
import { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { type User } from '@/payload-types';

export async function loginAction(
  state: { errors: { message: string }[] } | undefined,
  formData: FormData
) {
  try {
    const { data } = await api.post<User & { token: string }>('/users/login', {
      email: formData.get('email'),
      password: formData.get('password'),
    });
    const cookie = await cookies();
    cookie.set('payload-token', data.token);
  } catch (error) {
    if (error instanceof AxiosError) {
      return { errors: error.response?.data.errors as { message: string }[] };
    }
  }

  redirect('/dashboard');
}
