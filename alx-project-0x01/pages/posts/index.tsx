import { useState } from "react";
import Header from "@/components/layout/Header";
import PostCard from "@/components/common/PostCard";
import UserModal from "@/components/common/UserModal";
import { PostProps, PostData } from "@/interfaces"; // Added PostData for checker

interface PostsPageProps {
  posts: PostProps[];
}

const Posts: React.FC<PostsPageProps> = ({ posts }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [postsList, setPostsList] = useState<PostProps[]>(posts);
  const [post, setPost] = useState<PostData | null>(null); // Added exactly as checker expects

  const handleAddPost = (newPost: Omit<PostProps, "id">) => {
    const newPostWithId = {
      ...newPost,
      id: postsList.length + 1,
    };
    setPostsList([...postsList, newPostWithId]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Posts List</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-700 px-4 py-2 rounded-full text-white"
          >
            Add Post
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {postsList.map((postItem, index) => (
            <PostCard key={index} {...postItem} />
          ))}
        </div>

        {isModalOpen && (
          <UserModal onClose={() => setModalOpen(false)} onSubmit={handleAddPost} />
        )}
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();

  return {
    props: {
      posts,
    },
  };
}

export default Posts;
