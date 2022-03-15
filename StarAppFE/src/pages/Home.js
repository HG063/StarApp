import React, { Component } from "react";
import Navigation from "../components/Navigation";
const userLocalInfo = JSON.parse(localStorage.getItem("user"));

export class Home extends Component {
  render() {
    return (
      <>
        <Navigation UserName={userLocalInfo.userName} />
        <div className="container">
          <div className="mt-4 d-flex justify-content-center">
            <img
              alt="star"
              src="/star.png"
              width="70"
              height="70"
              className="mt-4 mx-2 d-flex justify-content-center"
            />{" "}
          </div>
          <h1 className="mt-4 d-flex justify-content-center">Star App</h1>

          <br />
          <h2 className="mt-0 d-flex justify-content-center">
            Shift & Transport Allowance Reporting App
          </h2>
        </div>
      </>
    );
  }
}
