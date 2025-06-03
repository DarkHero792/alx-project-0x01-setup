import Header from "@/components/layout/Header";

const Users = () => {
  return <div className="p-6">This is the Users page</div>;
};

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users")
  const posts = await response.json()

  return {
    props: {
      posts
    }
  }
}


export default Users;
