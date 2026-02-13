import { LoginForm } from './LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F3F5]">
      <div className="flex flex-col gap-6 rounded-xl border border-secondary w-full max-w-md bg-white">
        <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 space-y-1">
          <h4 className="text-2xl">Вход в систему</h4>
          <p className="text-gray">
            Введите ваши данные для входа в приложение
          </p>
        </div>
        <div className="px-6 pb-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
