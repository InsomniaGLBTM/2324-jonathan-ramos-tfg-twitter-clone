import { Session } from 'next-auth';
import CommentButton from './CommentButton';
import LikeButton from './LikeButton';

type Props = {
  postId: string;
  comments?: number;
  likes?: number;
  session: Session;
  isLiked: boolean;
};

export default function PostInteraction({
  comments = 0,
  likes = 0,
  postId,
  session,
  isLiked,
}: Props) {
  return (
    <div className="flex space-x-10">
      <CommentButton
        userId={session?.user.id || ''}
        value={comments}
        postId={postId}
        username={session.user.username}
      />
      <LikeButton
        userId={session?.user.id || ''}
        value={likes}
        isLiked={isLiked}
        postId={postId}
      />
    </div>
  );
}
