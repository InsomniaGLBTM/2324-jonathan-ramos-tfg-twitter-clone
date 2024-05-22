import { ComplexPostType, PostType } from '@/core/types/post.types';
import { Session } from 'next-auth';
import Post from './Post';

type Props = {
  session: Session;
  posts: PostType[] | ComplexPostType[];
  notFound?: string;
};

export default function Posts({ session, posts, notFound = '' }: Props) {
  if (posts.length === 0) {
    return (
      <div className="w-full text-center mt-10">
        <p className="font-semibold"> {notFound}</p>
      </div>
    );
  }

  return posts.map((post) => {
    return <Post key={post.id} post={post} session={session} />;
  });
}
