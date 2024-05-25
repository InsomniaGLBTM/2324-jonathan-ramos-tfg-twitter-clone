import { ImageRoute } from '@/core/constants/resources.constants';
import { ROUTES } from '@/core/constants/routes.constants';
import { ComplexPostType, PostType } from '@/core/types/post.types';
import { getMultipleSlugRoute, getRoute } from '@/core/utils/route.utils';
import { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import PostInteraction from './postInteraction/PostInteraction';

type Props = {
  post: PostType | ComplexPostType;
  session: Session;
};

const checkLiked = (userdId: string, likedBy: any[]) => {
  const isLiked = likedBy.find((element) => element.id === userdId);
  return !!isLiked;
};

export default function Post({ post, session }: Props) {
  const profileRoute = getRoute(ROUTES.mainApp.profile, post.user.username);
  const isLiked = checkLiked(session.user.id, post.likedBy);
  const slugs = [post.user.username, post.id];
  const postRoute = getMultipleSlugRoute(ROUTES.mainApp.status, slugs);

  return (
    <div className="flex px-4 py-2 border-b-[1px] border-gray-600 hover:backdrop-brightness-150">
      <Link href={profileRoute} className="h-fit">
        <Image
          src={post.user.image || ImageRoute.PROFILE_PICTURE}
          alt="Profile picture"
          width={40}
          height={40}
          className="rounded-full"
        />
      </Link>
      <div className="ml-3 w-full">
        <div className="w-fit">
          <Link href={profileRoute} className="w-fit flex">
            <p className="font-semibold">{post.user.name}</p>
            <p className="text-gray-400 ml-1">@{post.user.username}</p>
          </Link>
        </div>

        <div className="w-full">
          <Link href={postRoute}>
            <p className="whitespace-pre-line">{post.body}</p>
          </Link>
        </div>
        <div className="flex space-x-10"></div>
        <PostInteraction
          isLiked={isLiked}
          session={session}
          postId={post.id}
          comments={post?.repliesCount || post.replies.length}
          likes={post.likedBy.length}
        />
      </div>
    </div>
  );
}
