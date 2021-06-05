export const emailValidate = (value: string) => {
  return (
    value &&
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      value
    )
  );
};

export const passwordValidate = (value: string) => {
  return value.length > 6;
};
