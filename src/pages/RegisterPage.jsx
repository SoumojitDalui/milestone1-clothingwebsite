import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddUser } from "../redux/reducers/authSlice";

export const RegisterPage = () => {
  const dispatch = useDispatch();

  const initialValues = {
    firstName: "",
    email: "",
    mobile: "",
    password: "",
  };

  const onSubmit = (values) => {
    dispatch(AddUser(values));
    alert("User Created!");
  };

  const validationSchema = () =>
    Yup.object({
      firstName: Yup.string().required("First name is required"),
      email: Yup.string()
        .required("Email is required")
        .email("Email is not valid"),
      mobile: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be 6 characters long"),
    });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div className="container max-w-screen-md mx-auto my-10">
      <div className="card shadow-2xl bg-base-100 rounded-none">
        <h2 className="card-title text-5xl mt-7 ml-7">Register</h2>
        <form
          onSubmit={formik.handleSubmit}
          className="card-body grid grid-cols-1 gap-4"
        >
          <div className="form-control">
            <label className="label" htmlFor="firstName">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.firstName && formik.errors.firstName
                  ? "input input-error"
                  : "input input-bordered"
              }
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <small className="ml-1 text-sm text-red-500">
                {formik.errors.firstName}
              </small>
            ) : null}
          </div>

          <div className="form-control">
            <label className="label" htmlFor="email">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.email && formik.errors.email
                  ? "input input-error"
                  : "input input-bordered"
              }
            />
            {formik.touched.email && formik.errors.email ? (
              <small className="ml-1 text-sm text-red-500">
                {formik.errors.email}
              </small>
            ) : null}
          </div>

          <div className="form-control">
            <label className="label" htmlFor="mobile">
              <span className="label-text">Mobile</span>
            </label>
            <input
              type="text"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.mobile && formik.errors.mobile
                  ? "input input-error"
                  : "input input-bordered"
              }
            />
            {formik.touched.mobile && formik.errors.mobile ? (
              <small className="ml-1 text-sm text-red-500">
                {formik.errors.mobile}
              </small>
            ) : null}
          </div>

          <div className="form-control">
            <label className="label" htmlFor="password">
              <span className="label-text">Password</span>
            </label>
            <input
              type="text"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.password && formik.errors.password
                  ? "input input-error"
                  : "input input-bordered"
              }
            />
            {formik.touched.password && formik.errors.password ? (
              <small className="ml-1 text-sm text-red-500">
                {formik.errors.password}
              </small>
            ) : null}
          </div>

          <input
            type="submit"
            value="Register"
            className="btn btn-primary btn-block"
            disabled={!formik.isValid}
          />
        </form>
      </div>
      <p className="text-center mt-2">
        Already registered{" "}
        <Link to="/login" className="underline">
          Click Here
        </Link>
      </p>
    </div>
  );
};
