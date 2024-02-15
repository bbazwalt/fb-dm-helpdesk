import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signup } from "../store/user/action";

const Signup = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(1, "Name must be at least 1 character")
        .max(255, "Name must be at most 255 characters"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .max(255, "Password must not exceed 255 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
          "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
    }),
    onSubmit: (values) => {
      dispatch(signup(values, navigate));
    },
  });

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-[rgb(30,77,145)]">
      <div className="card bg-gray-100 shadow-md rounded-3xl text-[rgb(45,45,45)] w-full max-w-[29rem] px-14 pt-14 pb-8">
        <h2 className="text-xl font-semibold text-center mb-8">
          Create Account
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-1 text-md font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="block w-full px-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:border-black ring-1 ring-[rgb(210,210,210)]"
              placeholder="Your name"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 mt-1 text-sm">
                {formik.errors.name}
              </div>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-1 text-md font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="block w-full px-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:border-black ring-1 ring-[rgb(210,210,210)]"
              placeholder="Your email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 mt-1 text-sm">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-md mb-1 font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="block w-full px-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:border-black ring-1 ring-[rgb(210,210,210)]"
              placeholder="Your password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 mt-1 text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="rememberMe"
              className="w-4 h-4 cursor-pointer text-[rgb(30,77,145)] mr-2 font-medium rounded border-4 border-[rgb(210,210,210)]"
              {...formik.getFieldProps("rememberMe")}
            />
            <label
              htmlFor="rememberMe"
              className="cursor-pointer text-md text-gray-700"
            >
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="w-full inline-flex font-medium justify-center items-center px-4 py-3 rounded bg-[rgb(30,77,145)] text-white  hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(30,77,145)]"
          >
            Sign Up
          </button>

          <p className="text-center mt-6 text-sm font-medium ">
            Already have an account?
            <Link to="/login">
              <span className="text-[rgb(30,77,145)] ml-1 font-medium">
                Login
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
