import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import validation from "../components/SignupValidation";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/index.css";
import swal from "sweetalert";
import LandingNavbar from "../components/LandingNavbar";
import Footer from "../components/Footer";

const initialData = {
  userName: "",
  email: "",
  role: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [registerData, setRegisterData] = useState(initialData);
  const [errors, setErrors] = useState(initialData);
  const [responseErrors, setResponseErrors] = useState([]);

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

  const onRegisterClick = (ev) => {
    ev.preventDefault();

    const [errors] = validation(registerData);
    setErrors(errors);
    registerData.role = parseInt(registerData.role);

    if (Object.keys(errors).length === 0) {
      axios
        .post(`${process.env.REACT_APP_API}requestaccess`, registerData)
        .then((response) => {
          swal({
            title: "Success!",
            text: response.data,
            icon: "success",
            button: "OK",
          });
          navigate("/");
        })
        .catch((error) => {
          if (error.response.status === 400) {
            setResponseErrors(
              <div className="alert alert-danger" role="alert">
                {error.response.data}
              </div>
            );
          } else {
            //alert("server side error.");
            swal({
              title: "Error!",
              text: "server side error.",
              icon: "error",
              button: "OK",
            });
          }
        });
    }
  };

  const onInputChange = (ev) => {
    const name = ev.target.name;
    const value = ev.target.value;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  return (
    <>
    <LandingNavbar></LandingNavbar>
    <div className="container">
      <div className="d-flex justify-content-center">
        <img
          alt="star"
          src="/star.png"
          width="70"
          height="70"
          className=" mb-1 d-flex justify-content-center"
        />{" "}
      </div>
      <h1 className="mt-1 d-flex justify-content-center">Star App</h1>

      <div className="app-wrapper mt-3 pb-5 pt-1">
        <div className="form-wrapper">
          <h2 className=" mt-0 d-flex justify-content-center">Sign up</h2>
          <form>
            {/* <h3>New User</h3> */}
            {responseErrors}

            <div className="form-group mb-3">
              <label className="mb-1">Name</label>
              <input
                type="text"
                className="form-control "
                placeholder="Enter Name"
                name="userName"
                value={registerData.userName}
                onChange={onInputChange}
              />
              {errors.userName && (
                <div className="text-danger">{errors.userName}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="mb-1">Email ID</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email ID"
                name="email"
                value={registerData.email}
                onChange={onInputChange}
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="mb-1">Role</label>

              <select
                className="form-select form-select"
                name="role"
                value={registerData.role}
                onChange={onInputChange}
              >
                <option value="">Choose Role</option>
                <option value={Number(1)}>Admin</option>
                <option value={Number(2)}>Developer</option>
                <option value={Number(3)}>Lead</option>
              </select>
              {errors.role && <div className="text-danger">{errors.role}</div>}
            </div>

            <div className="form-group mb-3">
              <label className="mb-1">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                name="password"
                value={registerData.password}
                onChange={onInputChange}
              />
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="mb-1">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={registerData.confirmPassword}
                onChange={onInputChange}
              />
              {errors.confirmPassword && (
                <div className="text-danger">{errors.confirmPassword}</div>
              )}
            </div>
            <button
              type="submit"
              onClick={onRegisterClick}
              className="btn btn-primary btn-block w-100"
            >
              Request
            </button>
            <p className="forgot-password text-right">
              Already registered <Link to="/">Log In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default Register;
