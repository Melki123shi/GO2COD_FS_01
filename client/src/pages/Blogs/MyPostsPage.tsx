import PostService from "../../services/PostService";
import { Blog } from "../../services/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Skeleton from "react-loading-skeleton";
import PostCard from "../../components/PostCard";
import ServerFailure from "../Failures/ServerFailure";
import NoDataFound from "../../components/NoDataFound";

const MyPosts = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { token, currentUser } = useSelector(
    (state: RootState) => state.user.user
  );

  useEffect(() => {
    const getMyPosts = async () => {
      setIsLoading(true);
      const { response, onClean } = await PostService.getMyPosts(token!);
      response
        .then((res) => {
          setIsLoading(false);
          setBlogs(res.data);
          setError("");
        })
        .catch((err) => {
          setIsLoading(false);
          if (err.response.status === 500) {
            setError(err.response.statusText);
          }
        });
      return onClean;
    };
    getMyPosts();
  }, []);

  if (error === "Internal Server Error") {
    return (
      <div>
        <h1 className="text-5xl text-gray-600 font-semibold text-center mt-8">
          My Blogs
        </h1>
        <ServerFailure />
      </div>
    );
  }

  const onDeletePost = async (id: string) => {
    const { response, onClean } = await PostService.deletePost(id, token!);
    console.log("deleting", response);
    response
      .then(() => setBlogs(blogs.filter((blog) => blog.id !== id)))
      .catch((err) => setError(err.response));
    return onClean;
  };

  const visibleBlogs = length ? blogs.slice(0, length) : blogs;
  return (
    <div className="flex flex-col max-w-7xl min-h-screen mx-auto">
      <h1 className="text-5xl text-gray-600 font-semibold text-center mt-8">
        My Blogs
      </h1>
      <div className="flex-grow w-full px-6 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 2-cols:grid-cols-2 3-cols:grid-cols-3 gap-6">
            {Array.from({ length: length || 4 }).map((_, index) => (
              <div key={index} className="p-4 border rounded-md shadow">
                <Skeleton height={250} width="100%" className="mb-4" />
                <div className="flex w-full">
                  <Skeleton circle width={20} height={20} />
                  <Skeleton height={40} width="50%" className="mb-2" />
                </div>
                <Skeleton height={36} width="75%" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 2-cols:grid-cols-2 3-cols:grid-cols-3 gap-9 place-self-center">
            {visibleBlogs.length > 0 ? (
              visibleBlogs.map((blog) => (
                <PostCard
                  key={blog.id}
                  {...blog}
                  isOwner={currentUser?.username === blog.userName}
                  onDelete={onDeletePost}
                  onEdit={() => null}
                />
              ))
            ) : error ? (
              <p className="text-red-500 font-mono text-center">{error}</p>
            ) : (
              <NoDataFound message="No Blog Found" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPosts;
