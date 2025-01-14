import React, { useRef, useState } from "react";
import Header from "./Header";
import checkValidateData from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleButtonClick = () => {
    // first validate the form

    const message = checkValidateData(
      email?.current?.value,
      password?.current?.value
    );
    setErrorMessage(message);
    if (message) return;
    if (!isSignInForm) {
      // for if you dont have login crendential that time its create oky

      // write logic for sing up form
      createUserWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current?.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://avatars.githubusercontent.com/u/133537646?v=4&size=64",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage(errorCode + "-" + errorMessage);
            });
          console.log("user", user);

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          console.log("errorCode", errorCode + "-" + errorMessage);

          // ..
        });
    } else {
      console.log("else");
      // write logic for sign in form
      signInWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current?.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse");
          console.log("else user ", user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          console.log("else errorCode", errorCode + "-" + errorMessage);
        });
    }

    // Sign / Sign Up
  };

  const toggleSignInForm = (e) => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/154a9550-ce07-4e28-819c-63185dd849f8/web/IN-en-20250106-TRIFECTA-perspective_27b02e7c-f668-4639-9e82-1a5485084b2a_small.jpg"
          alt="background-img"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80  rounded-sm"
      >
        <h1 className="font-bold text-3xl py-4 ">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name "
            className="p-2 my-4 w-full rounded-sm bg-gray-100  text-black"
            // autoComplete="off"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email address "
          className="p-2 my-4 w-full rounded-sm bg-gray-100 text-black"
          // autoComplete="off"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 my-4  w-full rounded-sm bg-gray-100  text-black"
          // autoComplete="new-password"
        />
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-600  w-full rounded-sm"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <button className="py-4 text-link" onClick={toggleSignInForm}>
          {isSignInForm
            ? " New to Netflix? Sign up now."
            : "Already registered ? Sign In Now ..."}
        </button>
      </form>
    </div>
  );
};

export default Login;
