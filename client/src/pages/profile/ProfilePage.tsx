import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { logout } from "../../app/user/userSlice";
import { convertBlobUrlToFile } from "../../lib/utils";
import { uploadImage } from "../../supabase/storage/client";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService";
import Alert from "../../components/Alert";
import { UpdateUserData, UpdateUserSchema } from "../../services/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserFaliure, updateUserStart, updateUserSuccess } from "../../app/user/userSlice";
import { AxiosError } from "axios";

const ProfilePage = () => {
  const { currentUser, token, error, loading } = useSelector(
    (state: RootState) => state.user.user
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const filePickerRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserData>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      username: currentUser?.username,
      email: currentUser?.email,
      profilePicture: currentUser?.profilePicture,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleClickUploadImagesButton = async (): Promise<string | null> => {
    if (!imageFile || !imageUrl) {
      dispatch(updateUserFaliure("Please select an image."));
      return null;
    }

    try {
      const remoteImageFile = await convertBlobUrlToFile(imageUrl);
      const { imageUrl: remoteImageUrl, error } = await uploadImage({
        file: remoteImageFile,
        bucket: "melki-blog-storage",
      });

      if (error) {
        console.error("Image upload failed:", error);
        dispatch(updateUserFaliure(error));
        return null;
      }

      setImageUrl(remoteImageUrl);
      return remoteImageUrl;
    } catch (err) {
      console.error("An unexpected error occurred:", err);
      dispatch(updateUserFaliure("An unexpected error occurred."));
      return null;
    }
  };

  const onSubmit = async (data: UpdateUserData) => {
    dispatch(updateUserStart());
    if (!token) {
      dispatch(updateUserFaliure("User not logged in."));
      return;
    }

    if (!currentUser) {
     dispatch(updateUserFaliure("User not found."));
      navigate("/auth/signin");
      return;
    }

    try {
      const uploadedImageUrl = imageUrl
        ? await handleClickUploadImagesButton()
        : null;

      const updatedUser: UpdateUserData = {
        ...data,
        profilePicture: uploadedImageUrl || currentUser.profilePicture,
      };

      const response = await userService.updateUser(
        currentUser._id,
        updatedUser,
        token
      );

      dispatch(updateUserSuccess((await response.response).data.data))
    } catch (error) {
      const err = error as AxiosError
      if (err.response?.status == 404) {
        dispatch(updateUserFaliure('Invalid url'));
      }
      else {

        dispatch(updateUserFaliure(err.response?.data || "Failed to update profile."));
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      {error && (
        <Alert message={error} onClose={() => dispatch(updateUserFaliure(null))} type="error" />
      )}
       
      <h1 className="my-7 text-center font-semibold text-3xl text-gray-700">
        Profile
      </h1>
      <div className="fixed top-[10vh] right-[2vw] p-4 text-red-700">
        <button
          className="flex items-center gap-2 p-2 text-gray-600 hover:text-red-600"
          onClick={() => {
            dispatch(logout());
            navigate("/auth/signin");
          }}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {/* File Picker */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef as React.LegacyRef<HTMLInputElement>}
          hidden
        />
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current?.click()}
        >
          <img
            src={imageUrl || currentUser?.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-blue-50"
          />
        </div>
        {/* Form Fields */}
        <div className="flex flex-col gap-4 mt-12">
          <div className="w-full">
            <input
              id="username"
              type="text"
              className="w-full h-10 rounded-full border border-gray-400 px-5"
              {...register("username")}
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
          </div>
          <div className="w-full">
            <input
              id="email"
              type="email"
              className="w-full h-10 rounded-full border border-gray-400 px-5"
              {...register("email")}
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="w-full">
            <input
              id="password"
              type="password"
              className="w-full h-10 rounded-full border border-gray-400 px-5"
              {...register("password")}
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center w-full mt-10 mb-32">
          <button
            type="submit"
            disabled={loading}
            className="border border-teal-500 rounded-full hover:text-white hover:bg-teal-500 px-24 py-3"
          >
            {loading ? 'Loading...' : 'Update'}
          </button>
          {/* <button
          disabled={loading}
            className="border border-red-700 rounded-full hover:text-white hover:bg-red-700 px-12 py-2"
            onClick={() => null}
          >
            Delete
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
