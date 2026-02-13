'use client';
import Button from '../../../Components/Button';

import axios from 'axios';

axios.defaults.baseURL = '/api';

export const LoginForm = () => {
  const handleSubmit = async () => {
    try {
      const data = await axios.post('/user/login', {
        email: 'manager@gmail.com',
        password: '1234',
      });
      console.log(data);
    } catch (error) {}
  };
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm leading-none font-medium select-none">
          Email
        </label>
        <input
          type="email"
          className="flex h-9 w-full min-w-0 rounded-md px-3 py-1 text-base outline-none bg-[#F3F3F5] border-4 border-[#F3F3F5] focus:border-gray"
          placeholder="user@example.com"
          required
          defaultValue=""
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm leading-none font-medium select-none">
          Пароль
        </label>
        <input
          type="password"
          className="flex h-9 w-full min-w-0 rounded-md px-3 py-1 text-base outline-none bg-[#F3F3F5] focus:border-4 focus:border-gray"
          required
          defaultValue=""
        />
      </div>
      <Button label="Войти" variant="wide" onClick={handleSubmit} />
    </form>
  );
};
