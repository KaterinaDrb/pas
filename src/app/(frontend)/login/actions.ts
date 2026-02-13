'use server';
import { redirect } from 'next/navigation';
import api from '@/api';
import { AxiosError } from 'axios';

export async function loginAction(
  state: { errors: { message: string }[] } | undefined,
  formData: FormData
) {
  try {
    await api.post('/users/login', {
      email: formData.get('email'),
      password: formData.get('password'),
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return { errors: error.response?.data.errors as { message: string }[] };
    }
  }

  redirect('/dashboard');
}
