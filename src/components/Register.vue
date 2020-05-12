<template>
  <div id="app-register" class="bg" :style="{ display }">
    <section
      class="tip"
      id="tip"
      :class="{ ['elementToFadeInAndOut']: openTips }"
    >
      {{ tips }}
    </section>
    <section
      class="register-section"
      id="register-section"
      ref="registerSection"
    >
      <img
        :src="getImage('close.png')"
        alt
        class="btn-close"
        @click="closeRegister"
      />
      <div class="form-frame">
        <div class="input-frame">
          <label for="phone" class="icon">
            <img :src="getImage('icon-01.png')" alt class="icon-img" />
          </label>
          <input
            type="number"
            class="input"
            name="mobile"
            placeholder="请输入手机号"
            id="phone"
            v-model.number="formData.mobile"
            @blur="mobileBlurCheck"
            @change="validInput"
            @keyup="validInput"
            max="11"
          />
        </div>
        <div class="code-frame" v-if="isHaveRandCode">
          <div class="input-frame">
            <label for="code" class="icon">
              <img :src="getImage('icon-02.png')" alt class="icon-img" />
            </label>
            <input
              type="number"
              class="input"
              name="code"
              placeholder="请输随机码"
              id="code"
              v-model.number="formData.code"
              max="4"
              @change="validInput"
              @keyup="validInput"
            />
          </div>
          <img :src="captchaUtl" alt="" class="code" @click="getRandomCode" />
        </div>
        <div class="captcha-frame">
          <div class="input-frame">
            <label for="captcha" class="icon">
              <img :src="getImage('icon-02.png')" alt class="icon-img" />
            </label>
            <input
              type="number"
              class="input"
              name="sms_code"
              placeholder="请输入手机验证码"
              id="captcha"
              v-model="formData.sms_code"
              max="6"
              @change="validInput"
              @keyup="validInput"
            />
          </div>
          <img
            :src="getImage('captchaBtn.png')"
            alt="captcha"
            class="captcha-btn"
            :class="{ ['disable-btn']: SMSDisableBtn }"
            @click="getSMSCode"
          />
          <img
            src="@/assets/loading.gif"
            v-show="SMSLoading"
            class="time-loading"
          />
          <div v-show="showClock" class="time-clock">
            {{ formatTime(timeLeft) }}
          </div>
        </div>
        <div class="input-frame">
          <label for="password" class="icon">
            <img :src="getImage('icon-03.png')" alt class="icon-img" />
          </label>
          <input
            type="password"
            class="input"
            name="password"
            placeholder="请输密码"
            id="password"
            v-model="formData.password"
            min="6"
            max="32"
            @change="validInput"
            @keyup="validInput"
          />
        </div>
        <div class="input-frame">
          <label for="password-again" class="icon">
            <img :src="getImage('icon-03.png')" alt class="icon-img" />
          </label>
          <input
            type="password"
            class="input"
            name="repassword"
            placeholder="请输密码"
            id="password-again"
            v-model="formData.repassword"
            min="6"
            max="32"
            @change="validInput"
            @keyup="validInput"
          />
        </div>
      </div>
      <div class="recommend" v-if="channal">推荐ID : {{ channal }}</div>
      <div class="btn-frame">
        <img
          src="@/assets/loading.gif"
          v-show="RegisterDisableBtn"
          class="loading"
        />
        <img
          :src="getImage('quickRegisterBtn.png')"
          alt
          class="btn-register"
          :class="{ ['disable-btn']: RegisterDisableBtn }"
          @click="doRegister()"
        />
      </div>
      <img :src="getImage('loginWordBtn.png')" alt class="btn-login down" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import formDataVO from "./formDataVO";
import { sendEvent } from "./utils";
import { validSMSCode, validRegister } from "./valid";
import { debounce } from "ts-debounce-throttle";
@Component
export default class Register extends Vue {
  private display = "none";
  private captchaUtl = "";

  private timerInterval = 0;
  private TIME_LIMIT = 60;
  private timePassed = 0;
  private timeLeft = this.TIME_LIMIT || null;
  private SMSLoading = false;
  private SMSDisableBtn = false;
  private RegisterDisableBtn = false;

  private channalId = "";

  private showClock = false;

  private isHaveRandCode = false;

  private formData: formDataVO = {
    mobile: "",
    code: "",
    // eslint-disable-next-line @typescript-eslint/camelcase
    sms_code: "",
    password: "",
    repassword: "",
  };

  private registerElArr: HTMLElement[] = [];

  private blurCheck = false;

  getImage(path: string) {
    return require(`../platform/${process.env.PLATFORM}/register/${path}`);
  }

  mounted() {
    window.addEventListener("message", this.getMessage, false);
    const registerClass = document.getElementsByClassName("register");
    for (let index = 0; index < registerClass.length; index++) {
      const element = registerClass.item(index) as HTMLElement;
      this.registerElArr[index] = element;
      this.registerElArr[index].addEventListener("click", this.openRegister);
    }
  }
  destroyed() {
    window.removeEventListener("message", this.getMessage, false);
    this.registerElArr.map((element: HTMLElement) => {
      element.removeEventListener("click", this.openRegister);
    });
    this.registerElArr = [];
  }
  private closeRegister() {
    const elements = document.getElementsByTagName("body");
    this.display = "none";
    if (elements) {
      const element = elements.item(0) as HTMLElement;
      element.style.overflowY = "auto";
    }
  }

  private openRegister() {
    const elements = document.getElementsByTagName("body");
    if (this.display == "none") {
      this.display = "flex";
      if (elements) {
        const element = elements.item(0) as HTMLElement;
        element.style.overflowY = "hidden";
      }
      this.init();
    } else {
      this.display = "none";
      if (elements) {
        const element = elements.item(0) as HTMLElement;
        element.style.overflowY = "auto";
      }
    }
  }

  private init() {
    this.timerInterval = 0;
    this.TIME_LIMIT = 60;
    this.timePassed = 0;
    this.timeLeft = this.TIME_LIMIT || null;
    this.SMSLoading = false;
    this.SMSDisableBtn = false;
    this.RegisterDisableBtn = false;

    this.showClock = false;

    this.formData = {
      mobile: "",
      code: "",
      // eslint-disable-next-line @typescript-eslint/camelcase
      sms_code: "",
      password: "",
      repassword: "",
    };
    sendEvent("net_getRandomCode");
  }

  private setCaptcha(url: string) {
    const timeInMs = Date.now();
    this.captchaUtl = `${url}&time=${timeInMs}`;
  }

  private getSMSCode() {
    if (validSMSCode(this.formData, this.toggleTip, this.isHaveRandCode)) {
      if (!this.showClock && !this.SMSLoading && !this.SMSDisableBtn) {
        sendEvent("net_getverification", {
          mobile: this.formData.mobile,
          code: this.formData.code || 0,
        });
        this.timeLeft = null;
        this.showClock = true;
        this.SMSDisableBtn = true;
        this.SMSLoading = true;
      }
    }
  }
  // Timer
  private startTimer() {
    this.timerInterval = setInterval(() => {
      this.timePassed = this.timePassed += 1;
      this.timeLeft = this.TIME_LIMIT - this.timePassed;
      if (this.timeLeft === 0) {
        this.onTimesUp();
      }
    }, 1000);
  }

  onTimesUp() {
    clearInterval(this.timerInterval);
    this.timePassed = 0;
    this.timeLeft = this.TIME_LIMIT;
    this.showClock = false;
    this.SMSDisableBtn = false;
  }

  formatTime(seconds: string | null) {
    if (seconds == null) {
      return null;
    }
    if (Number(seconds) < 10) {
      seconds = `0${seconds}`;
    }
    return `${seconds}`;
  }
  // Timer End

  private get channal() {
    return this.channalId;
  }

  private set channal(id: string) {
    this.channalId = id;
  }

  private getMessage(e: any) {
    const getData = e.data;
    const getEvent = getData.event;
    //console.log("event", getEvent, "getData", getData);
    const getParameter = getData.parameter;
    switch (getEvent) {
      case "init_data":
        if (getParameter.code) {
          this.channal = getParameter.code;
        }
        if (getParameter.check_rand_code == "1") {
          this.isHaveRandCode = true;
        }
        break;
      case "net_getverification":
        //獲得驗證碼
        this.SMSLoading = false;
        this.processCaptcha(getParameter);

        break;
      case "net_getRandomCode":
        this.setCaptcha(getParameter);
        //獲得隨機數

        break;
      case "net_register":
        //獲得註冊請求反饋
        this.processRegister(getParameter);
        break;

      case "show_tip":
        //獲得註冊請求反饋
        this.toggleTip(getParameter.message);
        this.onTimesUp();
        break;
      default:
        break;
    }
  }

  private processCaptcha(res: any) {
    if (res.status_code != 200) {
      // 失敗
      this.toggleTip(res.message);
      this.onTimesUp();
    } else {
      this.startTimer();
    }
  }

  private processRegister(res: any) {
    this.RegisterDisableBtn = false;
    if (res.status_code != 200) {
      this.toggleTip(res.message);
    } else {
      this.toggleTip("注册成功，前往下载");
      setTimeout(() => {
        this.closeRegister();
        window.parent.postMessage("EVENT_APK_DOWNLOAD", "*");
      }, 2000);
    }
  }

  private tips = "";
  private openTips = false;
  private toggleTip(text: string) {
    this.tips = "";
    this.tips = text;
    this.openTips = true;
    setTimeout(() => {
      this.openTips = false;
    }, 2000);
  }

  private doRegister() {
    if (
      validSMSCode(this.formData, this.toggleTip, this.isHaveRandCode) &&
      validRegister(this.formData, this.toggleTip)
    ) {
      const {
        mobile,
        // eslint-disable-next-line @typescript-eslint/camelcase
        sms_code,
        password,
        repassword,
      } = this.formData;
      sendEvent("net_register", {
        mobile,
        // eslint-disable-next-line @typescript-eslint/camelcase
        sms_code,
        password,
        repassword,
      });
      this.RegisterDisableBtn = true;
    }
  }

  public validInput(event: { target: HTMLInputElement; type: string }) {
    const { name, value, min, max } = event.target;
    if (event.type == "keyup" || event.type == "change") {
      const inputVal = value.substr(0, Number(max));
      switch (name) {
        case "mobile":
          this.formData.mobile = inputVal;
          break;
        case "code":
          this.formData.code = inputVal;
          break;
        case "sms_code":
          this.formData.sms_code = inputVal;
          break;
        case "password":
          this.formData.password = inputVal;
          break;
        case "repassword":
          this.formData.repassword = inputVal;
          break;

        default:
          break;
      }
      this.$forceUpdate();
    }
  }

  private mobileBlurCheck() {
    if (!this.blurCheck) {
      this.blurCheck = true;
    } else {
      this.getRandomCode();
    }
  }
  private getRandomCode = debounce(() => sendEvent("net_getRandomCode"), 500);
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// config 處理 import
</style>
