import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthImage from "../../assets/signin.png";
import userService from "../../services/userService";
import { UserData, UserSchema } from "../../services/types";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";


const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    resolver: zodResolver(UserSchema),
  });

  
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const showAlert = () => {
    setAlert(!alert);
  };

  const onsubmit = async (data: UserData) => {
    setLoading(true)
    const {response, onClean} = await userService.registerUser(data);
    response.then(() => {
        setError('');
        setLoading(false)
        navigate('/auth/signin');
      })
      .catch((err) => {
        setLoading(false)
        setError(err.response.data)});
   return onClean;
  };



  return (
    <div className="h-screen flex flex-col items-center justify-center bg-cover">
      <div className="flex max-sm-auth:flex-col justify-between bg-white bg-opacity-10 rounded-lg shadow-lg shadow-black max-w-3xl w-[96vw] basis-2/6 ">
        <div className="relative sm-auth:flex-1 h-full start">
          {/* Background image */}
        <div className="sm-auth:absolute max-sm-auth:py-5 top-1/4 left-1/2 transform sm-auth:-translate-x-1/2 sm-auth:-translate-y-1/2 text-white font-semibold text-center w-full px-8">
        <h1 className="text-2xl">Welcome to Our Website!</h1>
            <p className="mt-2 text-md">
              We are glad to have you here. Please sign up to continue.
            </p>
          </div>

          {/* Overlay image */}
          <img
            src={AuthImage}
            alt="Overlay"
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/4 max-sm-auth:hidden"
          />
        </div>
        {/* <img src={Logo} alt="" className="w-10 h-10 flex justify-center my-9 text-center"/> */}
        <div className="py-24 px-11 max-sm-auth:pt-5">
        {error !== ''  && error !== null && alert  && <Alert
          type={'error'}
          message={error}
          onClose={showAlert}
        />}
          <h1 className="text-4xl font-bold mb-8 flex-1 items-center max-sm-auth:place-self-center">
            SignUp
          </h1>

          <form onSubmit={handleSubmit(onsubmit)}>
            {/* Name */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-700"
              >
                Username
              </label>
              <input
                type="username"
                id="username"
                {...register("username")}
                className="w-full p-3 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email
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
                className="w-full text-blue-500 py-3 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300 border-2 border-blue-500 mb-5"
                disabled={loading}
              >
                {loading === true ? "Loading..." : "Sign Up"}
              </button>
            </div>
          </form>
          <Link to="/auth/signin" className="text-center mt-6 mr-0">
            Do you have an account?{" "}
            <span className="pl-2 text-blue-600">Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
