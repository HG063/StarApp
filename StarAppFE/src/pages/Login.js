import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/index.css";
import validation from "../components/LoginValidation";
import LandingNavbar from "../components/LandingNavbar";
import Footer from "../components/Footer";

const initialData = { email: "", password: "" };

const Login = () => {
  const [logInData, setLogInData] = useState(initialData);
  const [responseErrors, setResponseErrors] = useState([]);
  const [errors, setErrors] = useState({});

  let navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData !== null) {
      if (userData.role === 2) {
        navigate("/Upload");
      } else if (userData.role === 3) {
        navigate("/AllowanceDashboard");
      } else if (userData.role === 1) {
        navigate("/useradmin");
      }
    }
  });

  const onLogInClick = (ev) => {
    ev.preventDefault();

    const [errors] = validation(logInData);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      axios
        .post(`${process.env.REACT_APP_API}login`, logInData)
        .then((response) => {
          if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
            // navigate({});
            if (response.data.role === 1) {
              navigate("/UserAdmin");
            } else if (response.data.role === 3) {
              navigate("/AllowanceDashboard");
            } else if (response.data.role === 2) {
              navigate("/Upload");
            }
          }
        })
        .catch((error) => {
          setResponseErrors(
            <div className="alert alert-danger" role="alert">
              {error.response.data}
            </div>
          );
        });
    }
  };

  const onInputChange = (ev) => {
    const name = ev.target.name;
    const value = ev.target.value;
    setLogInData({
      ...logInData,
      [name]: value,
    });
  };

  return (
    <>
    <LandingNavbar></LandingNavbar>
    <div className="container-fluid d-flex flex-column align-items-center mt-3">
      <div className="d-flex justify-content-center">
        <img
          alt="star"
          src="/star.png"
          width="70"
          height="70"
          className="mt-5 mb-1 d-flex justify-content-center"
        />{" "}
      </div>
      <h1 className="mt-1 d-flex justify-content-center">Star App</h1>
      <div className="app-wrapper pb-5">
        <div className="form-wrapper mt-3">
          <h2 className=" mt-0 d-flex justify-content-center">Sign in</h2>
          <form>
            <div>{responseErrors}</div>
            <div className="form-group mb-3 mt-2">
              <label className="mb-1">Email Id</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter Email Id"
                required
                value={logInData.userName}
                onChange={onInputChange}
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="mb-1">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                name="password"
                required
                value={logInData.password}
                onChange={onInputChange}
              />
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block w-100"
              onClick={onLogInClick}
            >
              Login in
            </button>
            <p className="forgot-password text-right">
              New User? <Link to={"/RequestAccess"}>Request Access</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default Login;
