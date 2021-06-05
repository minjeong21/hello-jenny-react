export const validateEmail = (value: string) => {
  return value &&
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      value
    )
    ? true
    : false;
};

export const validatePassword = (value: string) => {
  return /(?=.*\d)(?=.*[a-z]).{8,}/.test(value);
};

export const validatePhone = (value: string) => {
  return /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/.test(value);
};
