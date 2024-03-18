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

    try {
      // Sign in the user with email and password
      await signInWithEmailAndPassword(auth, inputVal.email, inputVal.password);

      navigate("/displaycontent");
      // Display success notification
      return toast.success("loggedIn success");
    } catch (error) {
      // Display error notification
      return toast.error(error.message);
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
