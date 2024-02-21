export default function UserAvatar({ user }) {
  // Check if user exists and if user.image is not null
  if (!user || !user.image) {
    return null; // or return a placeholder or loading state
  }

  return (
    <div className="avatar">
      <img src={user.image} alt={user.name} />
      <span>
        <h3>{user.name}</h3>
        <p>{user.title}</p>
      </span>
    </div>
  );
}
