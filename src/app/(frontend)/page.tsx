import React from 'react';
import api from '../../api';
import { redirect } from 'next/navigation';
export default async function HomePage() {
  try {
    await api.get('/users/me');
    redirect('/dashboard');
  } catch {
    redirect('/login');
  }
  return (
    <div>
      <h1>главная</h1>
    </div>
  );
}
