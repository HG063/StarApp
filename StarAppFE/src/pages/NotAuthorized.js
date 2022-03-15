import React from "react";
import Navigation from "../components/Navigation";

function NotAuthorized() {
  return (
    <div>
      <Navigation />
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="alert alert-danger text-center" role="alert">
            You are not authorized to view this page. Invalid Access.
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotAuthorized;
