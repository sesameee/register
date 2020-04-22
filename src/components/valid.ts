import { verify } from "./utils";
import formDataVO from "./formDataVO";
export const validSMSCode = (
  formData: formDataVO,
  toggleTip: Function
): boolean => {
  let validPass = true;
  const checkList = {
    mobile: {
      notEmpty: true,
      notNumber: true,
      lengthEqual: 11,
    },
    code: {
      notEmpty: true,
      notNumber: true,
      lengthEqual: 4,
    },
  };

  Object.keys(checkList).map((key) => {
    switch (key) {
      case "mobile": {
        const config = checkList.mobile;
        const mobileArr = Object.keys(config);
        for (let i = 0; i < mobileArr.length; i++) {
          const valid = verify(
            mobileArr[i],
            checkList.mobile.lengthEqual,
            formData.mobile
          );
          if (!valid) {
            toggleTip("请正确输入手机号");
            validPass = false;
          }
        }
        break;
      }

      case "code": {
        const arr = Object.keys(checkList.code);
        for (let i = 0; i < arr.length; i++) {
          const valid = verify(
            arr[i],
            checkList.code.lengthEqual,
            formData.code
          );
          if (!valid) {
            toggleTip("请正确输入4位随机码");
            validPass = false;
          }
        }
        break;
      }
    }
  });
  return validPass;
};


export const validRegister = (
  formData: formDataVO,
  toggleTip: Function
): boolean => {
  let validPass = true;
  const checkList = {
    sms_code: {
      notEmpty: true,
      notNumber: true,
      less: 6,
    },
    password: {
      notEmpty: true,
      less: 6,
    },
    repassword: {
      equal: formData.password,
    },
  };

  Object.keys(checkList).map((key) => {
    switch (key) {
      case "sms_code": {
        const config = checkList.sms_code;
        const arr = Object.keys(config);
        for (let i = 0; i < arr.length; i++) {
          const valid = verify(
            arr[i],
            checkList.sms_code.less,
            formData.sms_code
          );
          if (!valid) {
            toggleTip("请输入6位有效手机验证码");
            validPass = false;
          }
        }
        break;
      }

      case "password": {
        const arr = Object.keys(checkList.password);
        for (let i = 0; i < arr.length; i++) {
          const valid = verify(
            arr[i],
            checkList.password.less,
            formData.password
          );
          if (!valid) {
            toggleTip("密码至少6个以上的字符");
            validPass = false;
          }
        }
        break;
      }

      case "repassword": {
        const arr = Object.keys(checkList.repassword);
        for (let i = 0; i < arr.length; i++) {
          const valid = verify(
            arr[i],
            checkList.repassword.equal,
            formData.repassword
          );
          if (!valid) {
            toggleTip("您两次输入的密码不一样");
            validPass = false;
          }
        }
        break;
      }
    }
  });
  return validPass;
};
