const validation = (values) => {
  const errors = {};
  let isValid = false;
  const passwordRegex = new RegExp(
    "^(?=.*[A - Za - z])(?=.*\\d)(?=.*[@$!% *#?&])[A-Za-z\\d@$!%*#?&]{8,}$"
  );

  if (!values.userName) {
    errors.userName = "Name is required.";
    isValid = false;
  }
  if (!values.email) {
    errors.email = "Email is required.";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email is invalid.";
    isValid = false;
  }
  if (!values.role) {
    errors.role = "Role is required.";
    isValid = false;
  }
  if (!values.password) {
    errors.password = "Password is required.";
    isValid = false;
  } else if (!passwordRegex.test(values.password)) {
    errors.password =
      "Password should be more than 8 character and contain spacial symbol and letters.";
    isValid = false;
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm password is required.";
    isValid = false;
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password don't match.";
    isValid = false;
  } else {
    isValid = true;
  }
  return [errors, isValid];
};

export default validation;
