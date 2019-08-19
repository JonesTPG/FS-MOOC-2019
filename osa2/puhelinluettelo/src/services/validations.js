const validatePerson = (name, number) => {
  if (name == null || name === "") {
    return false;
  } else if (number == null || number === "") {
    return false;
  } else {
    return true;
  }
};

export default { validatePerson };
