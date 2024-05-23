import Post from '@/core/components/mainApp/posts/Post';
import Posts from '@/core/components/mainApp/posts/Posts';
import ReplyHeader from '@/core/components/mainApp/status/ReplyHeader';
import { auth } from '@/core/services/nextAuth/auth.service';
import { getPostById } from '@/core/utils/db/post.utils';

export default async function PostPage({
  params: { postId },
}: {
  params: {
    postId: string;
  };
}) {
  const session = await auth();
  const post = await getPostById(postId);
  const replyPostIds = post.replyTo.map((replyTo) => replyTo.id);
  replyPostIds.push(post.id);

  return (
    <div>
      {post.replyTo.length !== 0 && (
        <Posts session={session!} posts={post.replyTo} />
      )}
      <Post post={post} session={session!} />
      <ReplyHeader session={session!} replyPostIds={replyPostIds} />
      <Posts session={session!} posts={post.replies} />
    </div>
  );
}
