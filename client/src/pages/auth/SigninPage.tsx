import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AuthImage from "../../assets/signin.png";
import { Link } from "react-router-dom";
import UserService from "../../services/userService";
import {  signinData, signinSchema, SignInUserResponse } from "../../services/types";
import { useDispatch, useSelector } from "react-redux";
import {
  signinStart,
  signinFaliure,
  signinSuccess,
} from "../../app/user/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Alert from "../../components/Alert";
import { RootState } from "../../app/store";

const SigninPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signinData>({
    resolver: zodResolver(signinSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(
    (state: RootState) => state.user.user
  );
  const [alert, setAlert] = useState(true);

  const showAlert = () => {
    setAlert(!alert);
  };

  const onSubmit = async (data: signinData) => {
    dispatch(signinStart());

    try {
      const { response } = await UserService.signinUser(data);
      console.log(response)
      const userResponseData : SignInUserResponse = (await response).data;
      dispatch(signinSuccess({token: userResponseData?.token, user: userResponseData?.user}));
      navigate('/')
    } catch (err) {
      console.error("signin failed:", err);
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data || "An unknown error occurred during signin";
        dispatch(signinFaliure(errorMessage));
      } else {
        dispatch(signinFaliure("An unexpected error occurred"));
      }
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-cover">
      <div className="flex max-sm-auth:flex-col justify-between bg-white bg-opacity-10 rounded-lg shadow-lg shadow-black max-w-3xl w-[96vw] basis-2/6 ">
        <div className="relative sm-auth:flex-1 sm-auth:h-full start">
          {/* Background image */}

          <div className="sm-auth:absolute max-sm-auth:py-5 top-1/4 left-1/2 transform sm-auth:-translate-x-1/2 sm-auth:-translate-y-1/2 text-white font-semibold text-center w-full px-8">
            <h1 className="text-2xl">Welcome back 👋</h1>
            <p className="mt-2 text-md pb-6">
              We are glad to have you back. Please signin to continue.
            </p>
          </div>

          {/* Overlay image */}
          <img
            src={AuthImage}
            alt="Overlay"
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/4 pt-4 max-sm-auth:hidden"
          />
        </div>
        <div className="py-20 px-11 max-sm-auth:pt-5">
          <div className="mb-4">
            {error !== "" && error !== null && alert && (
              <Alert type={"error"} message={error} onClose={showAlert} />
            )}
          </div>
          <h1 className="text-4xl font-bold mb-8 flex-1 items-center max-sm-auth:place-self-center">
            Sign In
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                email
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className="w-full p-3 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                className="w-full p-3 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full text-blue-500 py-3 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300 border-2 border-blue-500 mb-3"
                disabled={loading}
              >
                {loading === true ? "Loading..." : "Sign In"}
              </button>
            </div>
          </form>
          {/* <OAuth /> */}
          <Link to="/auth/signup" className="text-center mt-16 mr-0">
            You don't have an account?{" "}
            <span className="pl-2 text-blue-600">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
