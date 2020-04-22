export const validNumber = (text: any) => {
  if (parseFloat(text).toString() == "NaN") {
    return false;
  } else {
    return true;
  }
};

export const sendEvent = (event: string, parameter?: any) => {
  const data = {
    event,
    parameter,
  };
  window.parent.postMessage(data, "*");
};

export const verify = (funName: string, funParam: any, val: string) => {
  switch (funName) {
    case "notEmpty":
      if (!val) {
        // console.log("notEmpty");
        return false;
      }
      break;

    case "notNumber":
      if (!validNumber(val)) {
        // console.log("notNumber");
        return false;
      }
      break;

    case "lengthEqual":
      if (val.length != Number(funParam)) {
        // console.log("lengthEqual");
        return false;
      }
      break;

    case "equal":
      if (val !== funParam) {
        // console.log("equal");
        return false;
      }
      break;

    case "less":
      if (val.length < Number(funParam)) {
        // console.log("less");
        return false;
      }
      break;

    default:
      break;
  }
  return true;
};

export const formatTime = (seconds: string | null | number) => {
  if (seconds == null) {
    return null;
  }
  if (Number(seconds) < 10) {
    seconds = `0${seconds}`;
  }
  return `${seconds}`;
};
