import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { Container, Spinner, Accordion } from "react-bootstrap";
import Navigation from "../../components/Navigation";
import UserProfileForm from "./UserProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";

const userLocalInfo = JSON.parse(localStorage.getItem("user"));
const initialPasswordData = {
  id: 0,
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [passwordData, setPasswordData] = useState(initialPasswordData);

  const onUpdateClick = (ev) => {
    ev.preventDefault();
    fetch(`${process.env.REACT_APP_API}Employees/` + userData.id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${userLocalInfo.token}`,
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          swal("Updated!", "Data is updated successfully!", "success");
          userLocalInfo.userName = userData.userName;
          userLocalInfo.email = userData.email;
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(userLocalInfo));
          window.location.reload();
        },
        (error) => {
          swal("Error!", "Error in update!", "error");
        }
      );
  };

  const onChangePasswordClick = (ev) => {
    ev.preventDefault();
    passwordData.id = userData.id;
    console.log(passwordData);
    fetch(`${process.env.REACT_APP_API}Employees/ChangePassword`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${userLocalInfo.token}`,
      },
      body: JSON.stringify(passwordData),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          swal("Updated!", "Password updated successfully!", "success");
        },
        (error) => {
          // console.log(error);
          swal("Error!", "Error in update!", "error");
        }
      );
  };

  const onInputChange = (ev) => {
    var name = ev.target.name;
    var value = ev.target.value;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const onPasswordInputChange = (ev) => {
    console.log(passwordData);
    var name = ev.target.name;
    var value = ev.target.value;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}employees/${userLocalInfo.id}`, {
      method: "GET",
      headers: { authorization: `Bearer ${userLocalInfo.token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      });
  }, []);

  return (
    <>
      <Navigation />
      {userData === null ? (
        <Container className="d-flex justify-content-center">
          <Spinner animation="border" variant="secondary" />
        </Container>
      ) : (
        <div className="pb-5">
          <Container>
            <Accordion defaultActiveKey={['0']} >
              <Accordion.Item eventKey="0">
                <Accordion.Header><label>Change User Details</label></Accordion.Header>
                <Accordion.Body>
                  <UserProfileForm
                    userData={userData}
                    onInputChange={onInputChange}
                    onUpdateClick={onUpdateClick}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <label>Change Password</label>
                </Accordion.Header>
                <Accordion.Body>
                  <ChangePasswordForm
                    passwordData={passwordData}
                    onPasswordInputChange={onPasswordInputChange}
                    onChangePasswordClick={onChangePasswordClick}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Container>
        </div>
      )}
    </>
  );
};

export default UserProfile;
