import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginUser, removeError } from "../../redux/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../../redux/store";

const Login = () => {
  document.title = "Login Page";

  const { loading, userInfo, error, errMsg } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();

  type FormValues = {
    email: string;
    password: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const navigate = useNavigate();
  // redirect authenticated user to profile screen
  useEffect(() => {
    if (userInfo) {
      navigate("/user-profile");
      // eslint-disable-next-line
    }
  }, [navigate, userInfo]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(loginUser(data));
  };

  const removeErrMsg = () => {
    dispatch(removeError());
  };

  return (
    <div className="lg:flex-1 relative h-screen bg-primary lg:bg-white">
      <div className="wrapper w-full min-h-screen pb-12 flex items-center justify-center">
        <div className="w-5/6 sm:w-3/4 md:w-3/5 xl:w-full max-w-2xl container py-16 px-6 sm:px-12 lg:px-8 bg-white relative">
          <h1 className="title text-2xl lg:text-3xl font-bold mb-12">Login</h1>
          <form
            className="flex flex-wrap justify-between w-full"
            onSubmit={handleSubmit(onSubmit)}
            onChange={removeErrMsg}
          >
            {error && (
              <p className=" absolute text-[#f96464] text-sm top-28">
                {errMsg}
              </p>
            )}
            <div className="relative w-full  mb-2 py-3">
              <input
                id="email"
                type="text"
                className="peer h-10 w-full border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-stone-500"
                placeholder="email"
                {...register("email")}
                required
              />
              {errors.email && (
                <p className="text-sm text-red-500 italic">
                  {errors.email.message}
                </p>
              )}
              <label
                htmlFor="email"
                className="absolute left-0 -top-3.5 text-gray-800 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-grayish-blue peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-800 peer-focus:text-sm"
              >
                Email
              </label>
            </div>
            <div className="relative w-full  mb-6 py-3">
              <input
                id="password"
                type="password"
                className="peer h-10 w-full border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-stone-500"
                placeholder="Password"
                {...register("password")}
                required
              />
              {errors.password && (
                <p className="text-sm text-red-500 italic">
                  {errors.password.message}
                </p>
              )}
              <label
                htmlFor="password"
                className="absolute left-0 -top-3.5 text-gray-800 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-grayish-blue peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-800 peer-focus:text-sm"
              >
                Password
              </label>
            </div>
            <button
              type="submit"
              className={
                "text-white rounded-md bg-stone-600 hover:bg-pink-400 transition-color py-4 px-8 w-full h-12 max-w-lg lg:max-w-none mt-3 mb-2 flex items-center justify-center lg:w-2/5 transition-all duration-300 " +
                (loading ? "cursor-not-allowed" : "cursor-pointer")
              }
              disabled={loading}
            >
              {loading ? (
                <div
                  className=" spinner-border animate-spin inline-block w-4 h-4 border rounded-full"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <>Login</>
              )}
            </button>
            <br />
            <br />
            <div className=" mt-12 flex flex-wrap justify-between w-full">
              <p className="">Don't have an account?</p>
              <NavLink
                to="/register"
                className="border-b-2 hover:border-b-stone-600 transition-color border-b-stone-400"
              >
                Create new account
              </NavLink>
            </div>
          </form>
        </div>
      </div>
      Login
    </div>
  );
};

export default Login;
