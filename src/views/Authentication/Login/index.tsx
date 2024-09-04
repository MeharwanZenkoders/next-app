// React Imports
import React, { FC, Fragment, useState } from "react";

// React Query Imports
import { UserLoginMutationHook } from "@/services/react-query-client/auth/user-login";

// Custom Component Imports
import { Button } from "@/components/ui/button";
import { setCookieClientSideFn } from "@/utils/storage.util";
import Router from "next/router";

import { useAppDispatch } from "@/redux/store";
import { loginSuccess } from "@/redux/slices/authentication.slice";

interface ISignInViewProps {}

const SignInView: FC<ISignInViewProps> = () => {
 

  /**
   * @description Handles the login process for the user
   *
   * @returns {void}
   */
  // const handleLogin = async (): Promise<void> => {
  //   mutateAsync({
  //     email: "aliraza@zenkoders.com",
  //     password: "123123",
  //   });
  // };

   const dispatch=useAppDispatch();

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync } = UserLoginMutationHook();


const handleLogin = async(formData : FormData) : Promise<void> => {

  const username  = formData.get('username') as string;
  const password = formData.get('password')  as string;

  setIsLoading(true); 

  try{
  const response = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      
      username: username,
      password: password,
      expiresInMins: 30, // optional, defaults to 60
    })
  });
  // .then(res => res.json())
  // .then(data  => setCookieClientSideFn("authToken",data))
  
  const data = await response.json();

  if (response.ok) {
    setCookieClientSideFn("authToken", data.token);
    dispatch(loginSuccess({user: data, token: data.token}))

    Router.push("/products"); // Redirect to the products page\

  } else {
    setErrorMessage("Invalid username or password.");
  }
} catch (error) {
  setErrorMessage("An error occurred. Please try again.");
} 
finally {
  setIsLoading(false); // Stop loading
}
  
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  console.log("Inside submit ")
 
  const formData = new FormData(e.currentTarget as HTMLFormElement);
 
  handleLogin(formData);

};

  return (

    <Fragment>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit}>

            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}

            <Button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? (
                <span className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Loading...
                </span>
              ) : ("Login")}
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
    
  );
};

export default SignInView;
