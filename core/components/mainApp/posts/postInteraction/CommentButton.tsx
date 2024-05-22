'use client';

import { IconSize } from '@/core/constants/iconSize.constants';
import { ROUTES } from '@/core/constants/routes.constants';
import { getMultipleSlugRoute } from '@/core/utils/route.utils';
import { useRouter } from 'next/navigation';
import { FaRegComment } from 'react-icons/fa';

type Props = {
  postId: string;
  userId: string;
  username: string;
  value: number;
};

export default function CommentButton({
  postId,
  userId,
  value,
  username,
}: Props) {
  const slugs = [username, postId];
  const postRoute = getMultipleSlugRoute(ROUTES.mainApp.status, slugs);
  const router = useRouter();
  const onComment = () => {
    router.push(postRoute);
  };
  return (
    <button
      onClick={onComment}
      type="button"
      className="flex items-center rounded-full w-fit text-gray-400 hover:text-sky-500"
    >
      <div className="rounded-full w-fit  hover:text-sky-500 hover:bg-sky-900 p-2">
        <FaRegComment size={IconSize.mainApp.post} />
      </div>
      <span className="text-sm relative right-1">{value}</span>
    </button>
  );
}
