import { User } from '@prisma/client';
import { PostType } from './post.types';

export type SimpleUser = {
  image: User['image'];
  username: User['username'];
};

export interface ComplexUser extends User {
  post: PostType[];
  followedBy: { id: string }[];
  following: { id: string }[];
}
