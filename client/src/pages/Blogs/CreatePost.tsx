import React, { useState, useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { BlogData, BlogPost, blogSchema } from "../../services/types";
import PostService from "../../services/PostService";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Alert from '../../components/Alert'
import { useNavigate } from "react-router-dom";
import { convertBlobUrlToFile } from "../../lib/utils";
import { uploadImage } from "../../supabase/storage/client";

const CreatePost = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [isBrowser, setIsBrowser] = useState(false);
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  const { token } = useSelector((state: RootState) => state.user.user);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BlogData>({ resolver: zodResolver(blogSchema) });


  useEffect(() => {
    setIsBrowser(typeof window !== "undefined"); 
  }, []);

  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImageUploadError("Please select an image.");
      setImageUrl(null);
      return;
    }
    
    setImageUploadError(null);
    setImageUrl(URL.createObjectURL(file));
    setValue("image", file.name);
  };

  
  const handleClickUploadImagesButton = async (): Promise<string | null> => {
    if (!imageUrl) {
      return null;
    }

    try {
      const remoteImageFile = await convertBlobUrlToFile(imageUrl);
      const { imageUrl: remoteImageUrl, error } = await uploadImage({
        file: remoteImageFile,
        bucket: "melki-blog-storage",
      });

      if (error) {
        setError("Failed to upload image.");
        return null;
      }

      setImageUrl(remoteImageUrl);
      return remoteImageUrl;
    } catch (error) {
      const err = error as Error;
      setError(`An error occurred during image upload. Due to ${err.message}`);
      return null;
    }
  };

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true)
    if(!token) {
      setIsLoading(false)
      return setError('You need to be logged in to create a post')
    }
    if(!imageUrl) {
      setIsLoading(false)
      return setError('Please upload an image')
    }
    const uploadedImageUrl = imageUrl
    ? await handleClickUploadImagesButton()
    : null;
    setError('')

  const post: BlogPost = {
    title: data.title,
    content: data.content,
    image: uploadedImageUrl!,
  };
    const { response } = await PostService.createPost(post, token);
    response
      .then(() => {
        navigate('/my-blogs')
        setIsLoading(false)
        setError('')
      })
      .catch((err) => {
        setError(err.response.data)
        if (err.response.status === 500) {
          setError(err.response.statusText);
        }
        setIsLoading(false)
      });
    };
    
    console.log(error)
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <p>{errors.content?.message}</p>
      {error && <Alert message={error} type='error' onClose={() => setError('')}/>}
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-black max-w-3xl w-[90vw]"
      >
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium mb-2">
            Post Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            placeholder="Enter post title"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-lg font-medium mb-2">
            Upload Cover Image
          </label>
          <div className="flex">

          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 px-10 focus:border-dotted"
          />

          </div>
          {imageUploadError && (
            <p className="text-red-500">{imageUploadError}</p>
          )}
          {imageUrl && (
            <img
              src={imageUrl}
              alt="upload"
              className="w-full h-52 object-cover mt-4"
            />
          )}
        </div>

        {/* Content */}
        <div className="mb-4">
          <label htmlFor="content" className="block text-lg font-medium mb-2">
            Post Content
          </label>
          <div className="h-72 mb-24">
            {isBrowser && (
              <ReactQuill
                theme="snow"
                placeholder="Write your content here..."
                onChange={(value: string) => setValue("content", value)}
                className="h-full"
              />
            )}
          </div>
          {errors.content && (
            <p className="text-red-500 mt-2">{errors.content.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            disabled={isLoading}
            type="submit"
          
            className={`w-full font-bold py-3 px-6 rounded-lg transition duration-300 ${ 
              "bg-gradient-to-r from-blue-500 to-teal-500 text-white"
          }`}
          >
            {isLoading ? 'Loading...' : 'Publish'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
