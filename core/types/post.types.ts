import { Post } from '@prisma/client';
import { SimpleUser } from './user.types';

export interface PostType extends Post {
  user: SimpleUser;
  likedBy: { id: string }[];
  replies: { id: string }[];
}

export interface ComplexPostType extends PostType {
  replies: PostType[];
  replyTo: PostType[];
}
