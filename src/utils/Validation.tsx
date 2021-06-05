export const validateEmail = (value: string) => {
  return value &&
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      value
    )
    ? true
    : false;
};

export const validatePassword = (value: string) => {
  return value.length > 6;
};
