import { type User } from '@/payload-types';
import type { PayloadRequest } from 'payload';

export const isRoles =
  (roles: User['role'][]) =>
  ({ req: { user } }: { req: PayloadRequest }): boolean => {
    return !!user && roles.includes(user.role);
  };
