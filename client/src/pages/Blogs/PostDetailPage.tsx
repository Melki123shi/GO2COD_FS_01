import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PostService from "../../services/PostService";
import { Blog } from "../../services/types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [post, setPost] = useState<Blog | null>(null);

  useEffect(() => {
    const getPost = async (id: string) => {
      setIsLoading(true);
      const { response, onClean } = await PostService.getPost(id);
      response
        .then((res) => {
          setIsLoading(false);
          setPost(res.data);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.message);
        });
      return onClean;
    };
    getPost(id!);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen max-w-7xl m-auto mx-auto">
        <Skeleton height={50} width="60%" className="place-self-center text-4xl mx-24 mt-10 font-serif"/>
        <Skeleton height={300} className="place-self-center mt-10"/>
        <div className="flex flex-row items-center space-x-4 mt-10">
          <Skeleton circle width={40} height={40} />
          <Skeleton height={20} width="10%" />
        </div >
        <Skeleton height={200} width="100%" />
      </div>
    );
  }

  return (
    <>
      {post ? (
        <div className="min-h-screen max-w-7xl m-auto mx-auto ">
          <h1 className="text-center text-4xl mx-24 mt-10 font-serif">
            {" "}
            {post.title}
          </h1>
          <div className="place-self-center mt-10">
            <img src={post.image} alt="picture" className="h-[20vw]" />
          </div>
          <div className="flex flex-col mx-24 mt-9">
            <div className="flex">
              <img
                src={post.userPhoto}
                alt={post.userName}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold text-gray-700 text-1xl">
                  {post.userName}
                </p>
                <p className=" text-gray-500 text-sm">
                  {new Date(post.date).toISOString().split("T")[0]}
                </p>
              </div>
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="text-start self-center mt-20 mx-24 font-serif text-lg"
          ></div>
        </div>
      ) : (
        <p className="position-self-center text-red-500">
          {error ? error : "Something went wrong"}
        </p>
      )}
    </>
  );
};

export default BlogDetailPage;
