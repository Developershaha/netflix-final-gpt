import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGAUGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { chaneLangauge } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.user);
  const showGPtSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        navigate("/error");
        // An error happened.
      });
  };

  // remove the all the user store
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGptSearch = () => {
    dispatch(toggleGptSearchView());
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo-image" />
      {user && (
        <div className="flex p-2 justify-between">
          {showGPtSearch && (
            <select
              className="p-2 bg-gray-900 text-white rounded-lg"
              onChange={(e) => {
                dispatch(chaneLangauge(e?.target?.value));
              }}
            >
              <option disabled>Select</option>
              {SUPPORTED_LANGAUGES?.map((lang) => (
                <option key={lang?.identifier} value={lang?.identifier}>
                  {lang?.name}
                </option>
              ))}
            </select>
          )}
          {/* <img className="w-16 h-17" src={user?.photoURL} alt="user_icon" /> */}
          <button
            onClick={handleGptSearch}
            className="bg-purple-500 text-white mx-4 my-2 py-2 px-4 rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mt-4"
          >
            {showGPtSearch ? "Back to Home" : "GPT-search"}
          </button>
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mt-4"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
