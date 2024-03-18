import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseAuth";
import InputField from "../inputFields/InputField";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [inputVal, setInputVal] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const inputFields = [
    {
      id: 1,
      name: "userName",
      type: "text",
      placeholder: "Enter your username",
      label: "Username",
      autoComplete: "off",
      required: true,
      pattern: `^[A-Za-z0-9]{3,8}`,
      errorMessage:
        "Invalid Username. username should be atleast 3 char and max 8 char",
    },
    {
      id: 2,
      name: "email",
      type: "email",
      autoComplete: "off",
      required: true,
      placeholder: "Enter your email",
      label: "Email",
      errorMessage: "Invalid email",
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      label: "Password",
      autoComplete: "off",
      required: true,
      pattern:
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,16}$",
      errorMessage:
        "Password must contain at least 1 uppercase, 1 lowercase, 1 special symbol, and must be 8 to 16 characters",
    },

    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm your password",
      label: "Confirm your password",
      autoComplete: "off",
      required: true,
      pattern: inputVal.password,
      errorMessage: "Password doesn't match",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        inputVal.email,
        inputVal.password
      );
      // Get the user from the userCredential
      const user = userCredential.user;

      // Update user profile with username
      await updateProfile(user, {
        displayName: inputVal.userName,
      });

      navigate("/login");

      // Display success notification
      return toast.success("Account created successfully, LogIn to continue");
    } catch (error) {
      // Display error notification
      return toast.error(error.message);
    }
  };

  // Function to handle input change
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputVal({ ...inputVal, [name]: value });
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {inputFields.map((input) => (
          <InputField {...input} key={input.id} onChange={onChange} />
        ))}
        <button type="submit">Sign Up</button>
        <div className="navlink">
          <NavLink to="/login">Already have an account</NavLink>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
