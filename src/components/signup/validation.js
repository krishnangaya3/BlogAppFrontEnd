function validation(formValues) {
  const errors = {};
  const regex =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (!formValues.username) {
    errors.username = "Username cannot be empty";
  }
  if (!formValues.email) {
    errors.email = "Email cannot be empty";
  } else if (!regex.test(formValues.email)) {
    errors.email = "Email is invalid";
  }
  if (!formValues.password) {
    errors.password = "Password cannot be empty";
  }
  if (formValues.password.length < 5) {
    errors.password = "Password is too short";
  }

  return errors;
}

export default validation;
