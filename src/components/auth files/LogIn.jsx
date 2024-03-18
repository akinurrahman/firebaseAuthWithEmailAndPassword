import React, { useState } from "react";
import InputField from "../inputFields/InputField";
import { auth } from "../../firebaseAuth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LogIn = () => {
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
      name: "email",
      type: "email",
      autoComplete: "off",
      required: true,
      placeholder: "Enter your email",
      label: "Email",
      errorMessage: "Invalid email",
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      label: "Password",
      autoComplete: "off",
      required: true,
      pattern:
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,16}$",
      errorMessage: "wrong password!",
    },
  ];

  // Function to handle input change
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputVal({ ...inputVal, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let loadingToastId;
    try {
      // Show loading notification
      loadingToastId = toast.loading("Logging in...");

      // Sign in the user with email and password
      await signInWithEmailAndPassword(auth, inputVal.email, inputVal.password);

      // Close loading notification
      toast.dismiss(loadingToastId);

      // Navigate to the desired page after successful login
      navigate("/displaycontent");

      // Display success notification
      toast.success("Logged in successfully");
    } catch (error) {
      // Close loading notification
      toast.dismiss(loadingToastId);

      // Display error notification
      toast.error(error.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {inputFields.map((input) => (
          <InputField {...input} key={input.id} onChange={onChange} />
        ))}
        <button type="submit">Log In</button>
        <div className="navlink">
          <NavLink to="/signup">Don't have account</NavLink>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
