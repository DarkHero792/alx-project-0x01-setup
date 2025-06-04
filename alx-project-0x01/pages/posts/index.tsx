import { useState } from "react";
import Header from "@/components/layout/Header";
import UserCard from "@/components/common/UserCard";
import UserModal from "@/components/common/UserModal";
import { UserData, UserProps } from "@/interfaces";

interface UsersPageProps {
  posts: UserProps[];
}

const Users: React.FC<UsersPageProps> = ({ posts }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [usersList, setUsersList] = useState<UserProps[]>(posts);

  const handleAddUser = (newUser: UserData) => {
    const newUserWithId = {
      ...newUser,
      id: usersList.length + 1,
    };
    setUsersList([...usersList, newUserWithId]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
     <main className="p-4">
  <div className="flex justify-between items-center mb-4">
    <h1 className="text-2xl font-semibold">Users List</h1>
    <button
      onClick={() => setModalOpen(true)}
      className="bg-blue-700 px-4 py-2 rounded-full text-white"
    >
      Add User
    </button>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {usersList.map((user, index) => (
      <UserCard key={index} {...user} />
    ))}
  </div>

  {isModalOpen && (
    <UserModal onClose={() => setModalOpen(false)} onSubmit={handleAddUser} />
  )}
</main>


      {isModalOpen && (
        <UserModal onClose={() => setModalOpen(false)} onSubmit={handleAddUser} />
      )}
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const posts = await response.json();

  return {
    props: {
      posts,
    },
  };
}

export default Users;
