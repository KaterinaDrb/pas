'use client';
import { useActionState } from 'react';
import Button from '@/components/Button';

import { loginAction } from './actions';

export const LoginForm = () => {
  const [state, action, pending] = useActionState(loginAction, undefined);

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="flex items-center gap-2 text-sm leading-none font-medium select-none"
        >
          Email
        </label>
        <input
          type="email"
          className="flex h-9 w-full min-w-0 rounded-md px-3 py-1 text-base outline-none bg-[#F3F3F5] border-4 border-[#F3F3F5] focus:border-gray"
          placeholder="user@example.com"
          required
          defaultValue="manager@gmail.com"
          id="email"
          name="email"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="flex items-center gap-2 text-sm leading-none font-medium select-none"
        >
          Пароль
        </label>
        <input
          type="password"
          className="flex h-9 w-full min-w-0 rounded-md px-3 py-1 text-base outline-none bg-[#F3F3F5] focus:border-4 focus:border-gray"
          required
          defaultValue="admin"
          id="password"
          name="password"
        />
      </div>
      <Button label="Войти" variant="wide" type="submit" disabled={pending} />
      {JSON.stringify(state?.errors)}
    </form>
  );
};
