import { useEffect, useState } from "react";
import BlogService from "../../services/PostService";
import { Blog } from "../../services/types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import PostCard from "../../components/PostCard";
import PostService from "../../services/PostService";
import ServerFailure from "../Failures/ServerFailure";
import NoDataFound from "../../components/NoDataFound";

const BlogList = ({ length }: { length?: number }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setisLoading] = useState(true);
  const { currentUser, token } = useSelector(
    (state: RootState) => state.user.user
  );

  useEffect(() => {
    let isMounted = true;
    const getBlogs = async () => {
      setisLoading(true);
      const { response, onClean } = await BlogService.getAllPosts();
      response
        .then((res) => {
          setisLoading(false);
          if (isMounted) setBlogs(res.data);
        })
        .catch((err) => {
          setisLoading(false);
          if (isMounted) setError(err.message);
        });
      return onClean;
    };
    getBlogs();
    return () => {
      isMounted = false;
    };
  }, []);

  const onDeletePost = async (id: string) => {
    const { response, onClean } = await PostService.deletePost(id, token!);
    console.log("deleting", response);
    response
      .then(() => setBlogs(blogs.filter((blog) => blog.id !== id)))
      .catch((err) => setError(err.response));
    return onClean;
  };

  if (error === "Request failed with status code 500") {
    return (
      <div>
        <h1 className="text-center text-5xl text-gray-600 font-semibold">
          Blogs
        </h1>
        <ServerFailure />
      </div>
    );
  }

  const visibleBlogs = length ? blogs.slice(0, length) : blogs;
  return (
    <div className="min-h-screen justify-self-center w-full ">
      <h1 className="text-center text-5xl text-gray-600 font-semibold">
        Blogs
      </h1>
      <div className="flex justify-center items-center mt-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 p-3">
            {Array.from({ length: length || 4 }).map((_, index) => (
              <div key={index} className="p-4 border rounded-md shadow">
                <Skeleton height={250} width={250} className="mb-4" />
                <div className="flex flex-row w-full">
                  <Skeleton circle width={20} height={20} />
                  <Skeleton height={40} width="50%" className="mb-2 " />
                </div>
                <Skeleton height={36} width="75%" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 2-cols:grid-cols-2 3-cols:grid-cols-3  gap-6 place-self-center">
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

export default BlogList;
