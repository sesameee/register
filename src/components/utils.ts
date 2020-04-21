export const validNumber = (text: any) => {
  if (parseFloat(text).toString() == "NaN") {
    return false;
  } else {
    return true;
  }
};
