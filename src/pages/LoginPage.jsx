import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const LoginPage = () => {
  const navigate = useNavigate();
  const users = useSelector((state) => state.auth.users);

  // initial state
  const initialState = {
    email: "",
    password: "",
  };

  const validationSchema = (values) =>
    Yup.object({
      email: Yup.string()
        .required("email is required")
        .email("email is not valid"),
      password: Yup.string()
        .required("password is required")
        .min(6, "password should be at least 6 characters long"),
    });

  const onSubmit = (values) => {
    let flag = 0
    users.forEach(user => {
      if (user.email === values.email && user.password === values.password) {
        localStorage.setItem("firstname", user.firstName);
        flag = 1
        navigate("/")
      }
    });
    if (flag === 0) {
      alert("Invalid Credentials")
    }
  };

  return (
    <div className="container max-w-screen-md mx-auto my-10">
      <div className="card shadow-2xl bg-base-100 rounded-none">
        <h2 className="card-title text-5xl mt-7 ml-7">Login</h2>
        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnMount
        >
          {(formik) => {
            return (
              <Form className="card-body grid grid-cols-1 gap-4">
                <div className="form-control">
                  <label className="label" htmlFor="email">
                    <span className="label-text">Email</span>
                  </label>
                  <Field
                    type="text"
                    name="email"
                    className={
                      formik.touched.email && formik.errors.email
                        ? "input input-error"
                        : "input input-bordered"
                    }
                  />
                  <ErrorMessage name="email">
                    {(errorMessage) => (
                      <small className="ml-1 text-sm text-red-500">
                        {errorMessage}
                      </small>
                    )}
                  </ErrorMessage>
                </div>

                <div className="form-control">
                  <label className="label" htmlFor="password">
                    <span className="label-text">Password</span>
                  </label>
                  <Field
                    type="text"
                    name="password"
                    className={
                      formik.touched.password && formik.errors.password
                        ? "input input-error"
                        : "input input-bordered"
                    }
                  />
                  <ErrorMessage name="password">
                    {(errorMessage) => (
                      <small className="ml-1 text-sm text-red-500">
                        {errorMessage}
                      </small>
                    )}
                  </ErrorMessage>
                </div>

                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary btn-block"
                />
              </Form>
            );
          }}
        </Formik>
      </div>
      <p className="text-center mt-2">
        New User? <Link to="/register" className="underline">Click Here</Link>
      </p>
    </div>
  );
};
