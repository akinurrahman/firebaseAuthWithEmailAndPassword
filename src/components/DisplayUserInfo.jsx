import React, { useEffect, useState } from "react";
import { auth } from "../firebaseAuth";
import { useNavigate } from "react-router-dom";

const DisplayUserInfo = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUserInfo(user);
      } else {
        // User is signed out
        setUserInfo(null);
      }
    });

    // Clean up subscription when component unmounts
    return () => unsubscribe();
  }, []);

  // Function to handle sign out
  const handleLogOut = async () => {
    try {
      await auth.signOut(); // Sign out the user
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <div>
      {userInfo ? (
        // User is signed in, display user data
        <div>
          <h2>Welcome, {userInfo?.displayName}</h2>
          <p>Email: {userInfo?.email}</p>
          {/* Other user data */}
          <button onClick={handleLogOut}>Log Out</button> {/* Log out button */}
        </div>
      ) : (
        // User is not signed in,so displaying login/sign up options
        <div>
          <h2>Please Log in to view your profile</h2>
          <button onClick={() => navigate("/login")}>Log In</button>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      )}
    </div>
  );
};

export default DisplayUserInfo;
