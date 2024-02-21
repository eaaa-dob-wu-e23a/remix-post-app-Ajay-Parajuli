import UserAvatar from "./UserAvatar";

export default function PostCard({ post }) {
  // Check if post exists and if post.image is not null
  return (
    <article className="post-card">
      <UserAvatar user={post.user} />
      <img src={post.image} alt={post.caption} />
      <h3>{post.caption}</h3>
      <p>Likes: {post.likes}</p>
    </article>
  );
}
