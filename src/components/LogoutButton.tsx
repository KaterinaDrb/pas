'use client';
import { Button } from '@payloadcms/ui';

export const LogoutButton = () => {
  return (
    <Button el="link" to="/admin/logout">
      Выход
    </Button>
  );
};
