'use client';

import { likePost } from '@/core/actions/post/likePost';
import { IconSize } from '@/core/constants/iconSize.constants';
import { LikePostSchema } from '@/schemas';
import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { z } from 'zod';

type Props = {
  postId: string;
  userId: string;
  value: number;
  isLiked: boolean;
};

export default function LikeButton({ postId, userId, value, isLiked }: Props) {
  const [isLikedState, setIsLikedState] = useState<boolean>(isLiked);
  const [likedValue, setLikedValue] = useState<number>(value);
  const onLike = async (data: z.infer<typeof LikePostSchema>) => {
    await likePost(data).then((response) => {
      response?.success && setIsLikedState((l) => !l);
    });
  };

  useEffect(() => {
    if (isLiked === isLikedState) {
      setLikedValue(value);
    } else {
      setLikedValue((prev) => (isLikedState ? prev + 1 : prev - 1));
    }
  }, [isLikedState]);

  return (
    <button
      onClick={() => {
        onLike({ postId, userId, isLiked: isLikedState });
      }}
      type="button"
      className="flex items-center rounded-full w-fit text-gray-400 hover:text-pink-600"
    >
      <div className="rounded-full w-fit  hover:text-pink-600 hover:bg-pink-600/30  p-2">
        {isLikedState ? (
          <FaHeart size={IconSize.mainApp.post} className="text-pink-600" />
        ) : (
          <FaRegHeart size={IconSize.mainApp.post} />
        )}
      </div>
      <span className="text-sm relative right-1">{likedValue}</span>
    </button>
  );
}
