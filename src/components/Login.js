import React, { useRef, useState } from "react";
import Header from "./Header";
import checkValidateData from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND_IMAGE, USER_AVATAR } from "../utils/constants";
import BackGroundImage from "./BackGroundImage";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
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
            photoURL: USER_AVATAR,
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
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage(errorCode + "-" + errorMessage);
            });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);

          // ..
        });
    } else {
      // write logic for sign in form
      signInWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current?.value
      )
        .then((userCredential) => {
          // Signed in
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          console.log("else errorCode", errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <BackGroundImage />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
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
          autoComplete="new-password"
          // autoComplete="off"
        />
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-600  w-full rounded-sm"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <button
          className="py-4 text-link"
          onClick={() => {
            setIsSignInForm(!isSignInForm);
          }}
        >
          {isSignInForm
            ? " New to Netflix? Sign up now."
            : "Already registered ? Sign In Now ..."}
        </button>
      </form>
    </div>
  );
};

export default Login;
