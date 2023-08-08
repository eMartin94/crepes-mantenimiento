import { useAuth } from '../context/useAuth';

const ProfilePage = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <h1>ProfilePage</h1>
    </div>
  );
};

export default ProfilePage;
