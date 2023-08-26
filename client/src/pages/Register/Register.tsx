import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, removeError } from "../../redux/reducers/authSlice";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../../redux/store";

const Register = () => {
  document.title = "Registration Page";

  const { loading, userInfo, error, errMsg, success } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();

  type FormValues = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const navigate = useNavigate();
  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) {
      navigate("/login");
    }
    // redirect authenticated user to homepage
    if (userInfo) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [navigate, userInfo, success]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(registerUser(data));
  };

  const removeErrMsg = () => {
    dispatch(removeError());
  };

  return (
    <div className="lg:flex-1 relative h-screen bg-primary lg:bg-white">
      <div className="wrapper w-full min-h-screen pb-12 flex items-center justify-center">
        <div className="w-5/6 sm:w-3/4 md:w-3/5 xl:w-full max-w-2xl container py-16 px-6 sm:px-12 lg:px-8 bg-white relative">
          <h1 className="title text-xl sm:text-2xl lg:text-3xl mb-12 font-bold">
            Register
          </h1>
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
            <div className="relative w-full lg:w-[45%]  mb-2 py-3">
              <input
                id="firstname"
                type="text"
                className="peer h-10 w-full border-b-2 border-grayish-blue text-very-dark-blue placeholder-transparent focus:outline-none focus:border-zinc-600"
                placeholder="First Name"
                {...register("firstname", {
                  required: "Please enter your first name",
                })}
              />
              {errors.firstname && (
                <p className="text-sm text-red-500 italic">
                  {errors.firstname.message}
                </p>
              )}
              <label
                htmlFor="firstname"
                className="absolute left-0 -top-3.5 text-dark-grayish-blue text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-grayish-blue peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-dark-grayish-blue peer-focus:text-sm"
              >
                First Name
              </label>
            </div>
            <div className="relative w-full lg:w-[45%] mb-2 py-3">
              <input
                id="lastname"
                // name="lastname"
                type="text"
                className="peer h-10 w-full border-b-2 border-grayish-blue text-very-dark-blue placeholder-transparent focus:outline-none focus:bordr-zinc-600e"
                placeholder="Last Name"
                {...register("lastname", {
                  required: "Please enter your last name",
                })}
              />
              {errors.lastname && (
                <p className="text-sm text-red-500 italic">
                  {errors.lastname.message}
                </p>
              )}
              <label
                htmlFor="lastname"
                className="absolute left-0 -top-3.5 text-dark-grayish-blue text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-grayish-blue peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-dark-grayish-blue peer-focus:text-sm"
              >
                Last Name
              </label>
            </div>
            <div className="relative w-full  mb-2 py-3">
              <input
                id="email"
                // name="email"
                type="email"
                className="peer h-10 w-full border-b-2 border-grayish-blue text-very-dark-blue placeholder-transparent focus:outline-none focus:bordr-zinc-600e"
                placeholder="email"
                {...register("email", {
                  required: "Please include an email",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Please include a valid email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500 italic">
                  {errors.email.message}
                </p>
              )}
              <label
                htmlFor="email"
                className="absolute left-0 -top-3.5 text-dark-grayish-blue text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-grayish-blue peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-dark-grayish-blue peer-focus:text-sm"
              >
                Email
              </label>
            </div>
            <div className="relative w-full lg:w-[45%] mb-6 py-3">
              <input
                id="password"
                // name="password"
                type="password"
                className="peer h-10 w-full border-b-2 border-grayish-blue text-very-dark-blue placeholder-transparent focus:outline-none focus:bordr-zinc-600e"
                placeholder="Password"
                {...register("password", {
                  required: "Please enter your password",
                  minLength: {
                    value: 6,
                    message: "Password shouldn't be less than 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-500 italic">
                  {errors.password.message}
                </p>
              )}
              <label
                htmlFor="password"
                className="absolute left-0 -top-3.5 text-dark-grayish-blue text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-grayish-blue peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-dark-grayish-blue peer-focus:text-sm"
              >
                Password
              </label>
            </div>
            <div className="relative w-full lg:w-[45%] mb-6 py-3">
              <input
                id="confirm-password"
                // name="confirm-password"
                type="password"
                className="peer h-10 w-full border-b-2 border-grayish-blue text-very-dark-blue placeholder-transparent focus:outline-none focus:bordr-zinc-600e"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => {
                    const { password } = getValues();
                    return password === value || "Passwords should match";
                  },
                })}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 italic">
                  {errors.confirmPassword.message}
                </p>
              )}
              <label
                htmlFor="confirm-password"
                className="absolute whitespace-nowrap left-0 -top-3.5 text-dark-grayish-blue text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-grayish-blue peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-dark-grayish-blue peer-focus:text-sm"
              >
                Confirm Password
              </label>
            </div>
            <button
              className={
                "text-white rounded-md bg-stone-600 hover:bg-pink-400 transition-color py-4 px-8 w-full h-12 max-w-lg lg:max-w-none mt-3 mb-2 flex items-center justify-center lg:w-2/5 transition-all duration-300 " +
                (loading ? "cursor-not-allowed" : "cursor-pointer")
              }
              disabled={loading}
            >
              {loading ? (
                <div
                  className="spinner-border animate-spin inline-block w-4 h-4 border rounded-full"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <>Create</>
              )}
            </button>
            <div className="links mt-12 flex flex-wrap w-full">
              <span className="text-dark-grayish-blue lg:mr-4">
                Already have an account?{" "}
              </span>
              <NavLink
                to="/login"
                className="border-b-2 hover:border-b-stone-600 transition-color border-b-stone-400"
              >
                Login
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
