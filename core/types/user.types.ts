import { User } from '@prisma/client';

export type SimpleUser = {
  image: User['image'];
  username: User['username'];
};
