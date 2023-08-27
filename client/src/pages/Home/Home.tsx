import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputForm from "../../components/InputForm";
import Todos from "../../components/Todos";
import { getUserDetails, logout } from "../../redux/reducers/authSlice";
import { getTodos, clearTodos } from "../../redux/reducers/todoSlice";
import { RootState } from "../../redux/store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();
  const [open, setOpen] = useState(false);
  const { userInfo, loading, userToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getUserDetails());
    dispatch(getTodos());

    // eslint-disable-next-line
  }, []);


  const Header = () => {
    return (
      <>
        <div className="user flex w-full px-4 max-w-7xl relative">
          <div className="flex items-center justify-end lg:justify-center ml-auto w-4/5 lg:w-auto text-white">
            {userInfo ? (
              <div
                onClick={() => setOpen(!open)}
                className="user flex items-center"
              >
                <svg
                  className="px-1 scale-150 lg:scale-100"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 15.375C14.2782 15.375 16.125 13.5282 16.125 11.25C16.125 8.97183 14.2782 7.125 12 7.125C9.72183 7.125 7.875 8.97183 7.875 11.25C7.875 13.5282 9.72183 15.375 12 15.375Z"
                    fill="white"
                  />
                  <path
                    d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1864 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.745 9.41566 20.7162 6.93859 18.8888 5.11118C17.0614 3.28378 14.5843 2.25496 12 2.25ZM18.1688 17.475C17.5616 16.6041 16.7793 15.8697 15.8719 15.3187C14.83 16.3169 13.4429 16.8741 12 16.8741C10.5571 16.8741 9.17002 16.3169 8.12813 15.3187C7.22069 15.8697 6.43836 16.6041 5.83125 17.475C4.77542 16.286 4.08568 14.8173 3.84503 13.2455C3.60438 11.6737 3.82309 10.0659 4.47483 8.61549C5.12657 7.16509 6.18357 5.93394 7.51863 5.07021C8.85369 4.20647 10.4099 3.74695 12 3.74695C13.5901 3.74695 15.1463 4.20647 16.4814 5.07021C17.8164 5.93394 18.8734 7.16509 19.5252 8.61549C20.1769 10.0659 20.3956 11.6737 20.155 13.2455C19.9143 14.8173 19.2246 16.286 18.1688 17.475Z"
                    fill="white"
                  />
                </svg>
                <p className="username px-1 text-xs font-semibold">
                  {userInfo.firstname}
                </p>
                <svg
                  className="px-1"
                  width="20"
                  height="6"
                  viewBox="0 0 12 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.979943 0.313134C1.15745 0.135623 1.43523 0.119485 1.63097 0.264722L1.68705 0.313134L6.00016 4.62602L10.3133 0.313134C10.4908 0.135623 10.7686 0.119485 10.9643 0.264722L11.0204 0.313134C11.1979 0.490645 11.214 0.76842 11.0688 0.964161L11.0204 1.02024L6.35372 5.68691C6.17621 5.86442 5.89843 5.88056 5.70269 5.73532L5.64661 5.68691L0.979943 1.02024C0.784681 0.824978 0.784681 0.508396 0.979943 0.313134Z"
                    fill="white"
                  />
                </svg>
              </div>
            ) : (
              <>
                {loading ? (
                  <p className="text-sm">Loading...</p>
                ) : (
                  <Link
                    to="/login"
                    className="w-auto flex text-sm items-center justify-center border-b border-white text-white hover:border-none transtion-all font-semibold"
                  >
                    Sign in
                  </Link>
                )}
              </>
            )}
          </div>
          {open && userInfo && (
            <div
              onClick={() => {
                dispatch(logout());
                dispatch(clearTodos());
                setOpen(false);
              }}
              className="bg-white cursor-pointer rounded-md p-4 shadow-lg flex items-center w-fit absolute right-4 lg:right-0 top-10  z-10"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.875 5.375L13.5 8L10.875 10.625"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.5 8H13.5"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.5 13.5H3C2.86739 13.5 2.74021 13.4473 2.64645 13.3536C2.55268 13.2598 2.5 13.1326 2.5 13V3C2.5 2.86739 2.55268 2.74021 2.64645 2.64645C2.74021 2.55268 2.86739 2.5 3 2.5H6.5"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="ml-4">Logout</span>
            </div>
          )}
        </div>

        <h1 className="text-2xl lg:text-5xl font-bold text-white py-8 mx-auto text-center">
          StraitPay Todo List
        </h1>
      </>
    );
  };

  return (
    <div className="bg-primary min-h-screen py-12 px-4 ">
      <Header />
      <InputForm />
      <Todos />
    </div>
  );
};

export default Home;
