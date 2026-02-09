import type { PayloadRequest } from 'payload';

export const isAdmin = ({
  req: { user },
}: {
  req: PayloadRequest;
}): boolean => {
  return !!user && user.role === 'ADMIN';
};
