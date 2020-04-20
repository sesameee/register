<template>
  <div id="app-register">
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
      openre="false"
      :style="{ display }"
    >
      <img
        src="@/assets/close.png"
        alt
        class="btn-close"
        @click="closeRegister"
      />
      <div class="form-frame">
        <div class="input-frame">
          <label for="phone" class="icon">
            <img src="@/assets/icon-01.png" alt class="icon-img" />
          </label>
          <input
            type="text"
            class="input"
            name="phone"
            placeholder="请输入手机号"
            id="phone"
            v-model="formData.mobile"
            @blur="sendEvent('net_getRandomCode')"
          />
        </div>
        <div class="code-frame">
          <div class="input-frame">
            <label for="code" class="icon">
              <img src="@/assets/icon-02.png" alt class="icon-img" />
            </label>
            <input
              type="text"
              class="input"
              name="code"
              placeholder="请输随机码"
              id="code"
              v-model="formData.random"
            />
          </div>
          <img :src="captchaUtl" alt="" class="code" />
        </div>
        <div class="captcha-frame">
          <div class="input-frame">
            <label for="captcha" class="icon">
              <img src="@/assets/icon-02.png" alt class="icon-img" />
            </label>
            <input
              type="text"
              class="input"
              name="captcha"
              placeholder="请输入手机验证码"
              id="captcha"
              v-model="formData.sms_code"
            />
          </div>
          <img
            src="@/assets/captchaBtn.png"
            alt="captcha"
            class="captcha-btn"
            :class="{ ['disable-btn']: SMSDisableBtn }"
            @click="getSMSCode"
          />
          <img
            src="@/assets/loading.gif"
            v-show="SMSDisableBtn"
            class="time-loading"
          />
          <div v-show="showClock" class="time-clock">
            {{ formatTime(timeLeft) }}
          </div>
        </div>
        <div class="input-frame">
          <label for="password" class="icon">
            <img src="@/assets/icon-03.png" alt class="icon-img" />
          </label>
          <input
            type="password"
            class="input"
            name="password"
            placeholder="请输密码"
            id="password"
            v-model="formData.password"
          />
        </div>
        <div class="input-frame">
          <label for="password-again" class="icon">
            <img src="@/assets/icon-03.png" alt class="icon-img" />
          </label>
          <input
            type="password"
            class="input"
            name="password-again"
            placeholder="请输密码"
            id="password-again"
            v-model="formData.repassword"
          />
        </div>
      </div>
      <div class="recommend">推荐ID:3920392893</div>

      <div class="btn-frame">
        <img
          src="@/assets/loading.gif"
          v-show="RegisterDisableBtn"
          class="loading"
        />
        <img
          src="@/assets/quickRegisterBtn.png"
          alt
          class="btn-register"
          :class="{ ['disable-btn']: RegisterDisableBtn }"
          @click="doRegister()"
        />
      </div>
      <img src="@/assets/loginWordBtn.png" alt class="btn-login down" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Register extends Vue {
  private display = "none";
  private captchaUtl = "";

  private timerInterval = 0;
  private TIME_LIMIT = 60;
  private timePassed = 0;
  private timeLeft = this.TIME_LIMIT || null;
  private SMSDisableBtn = false;
  private RegisterDisableBtn = false;

  private showClock = false;

  private formData = {
    mobile: null,
    random: null,
    // eslint-disable-next-line @typescript-eslint/camelcase
    sms_code: null,
    password: null,
    repassword: null,
  };

  private registerElArr: HTMLElement[] = [];

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
  closeRegister() {
    this.display = "none";
  }

  private openRegister() {
    if (this.display == "none") {
      this.display = "flex";
      this.init();
    } else {
      this.display = "none";
    }
  }

  private init() {
    this.timerInterval = 0;
    this.TIME_LIMIT = 60;
    this.timePassed = 0;
    this.timeLeft = this.TIME_LIMIT || null;
    this.SMSDisableBtn = false;
    this.RegisterDisableBtn = false;

    this.showClock = false;

    this.formData = {
      mobile: null,
      random: null,
      // eslint-disable-next-line @typescript-eslint/camelcase
      sms_code: null,
      password: null,
      repassword: null,
    };
    this.sendEvent("net_getRandomCode");
  }

  private sendEvent(event: string, parameter?: any) {
    const data = {
      event,
      parameter,
    };
    window.parent.postMessage(data, "*");
  }

  private setCaptcha(url: string) {
    const timeInMs = Date.now();
    this.captchaUtl = `${url}?time=${timeInMs}`;
  }

  private getSMSCode() {
    if (!this.timePassed || this.SMSDisableBtn) {
      this.sendEvent("net_getverification", {
        mobile: this.formData.mobile,
        random: this.formData.random,
      });
      this.timeLeft = null;
      this.showClock = true;
      this.SMSDisableBtn = true;
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

  private getMessage(e: any) {
    const getData = e.data;
    const getEvent = getData.event;
    const getParameter = getData.parameter;
    switch (getEvent) {
      case "net_getverification":
        //獲得驗證碼
        this.startTimer();
        this.processCaptcha(getParameter);

        break;
      case "net_getRandomCode":
        console.log("net_getRandomCode");
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

  processCaptcha(res: any) {
    this.toggleTip(res.message);
    this.onTimesUp();
  }
  processRegister(res: any) {
    this.toggleTip(res.message);
  }

  private tips = "";
  private openTips = false;
  toggleTip(text: string) {
    this.tips = "";
    this.tips = text;
    this.openTips = true;
    setTimeout(() => {
      this.openTips = false;
    }, 2000);
  }

  private doRegister() {
    this.sendEvent("net_register", this.formData);
    this.RegisterDisableBtn = true;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#app-register {
  display: flex;
  width: 100%;
  justify-content: center;
  .btn-close {
    position: absolute;
    top: -0.5rem;
    right: -0.4rem;
  }
  .register-section {
    position: absolute;
    z-index: 20000;
    background-color: #283447;
    border-radius: 0.2rem;
    top: 6rem;
    border: 0.018rem solid #ae7542;
    display: none;
    flex-direction: column;
    align-items: center;
  }

  .form-frame {
    display: flex;
    flex-direction: column;
    margin: 0.1rem;
    margin-top: 0.3rem;
  }

  ::-webkit-input-placeholder {
    /* Edge */
    color: #9398a3;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #9398a3;
  }

  ::placeholder {
    color: #9398a3;
  }

  .code-frame {
    display: flex;
    align-items: center;
  }

  .captcha-frame {
    display: flex;
    align-items: center;
  }

  .time-clock {
    display: block;
    color: #fff;
    position: absolute;
    right: 1.8rem;
  }
  .captcha-frame > .input-frame {
    width: 49%;
  }
  .code-frame > .input-frame {
    width: 49%;
  }
  .code {
    margin: 0 0.2rem;
    box-sizing: border-box;
    font-size: 0.8rem;
    height: 1rem;
    min-width: 3.7rem;
  }

  .input-frame {
    display: flex;
    align-items: center;
    margin: 0.2rem;
    background-color: #c5c7cb;
    padding: 0.2rem;
    height: 0.7rem;
    border-radius: 0.2rem;
  }

  .input-frame > .input {
    background-color: transparent;
    border: 0;
    font-size: 0.5rem;
    flex: 1;
    -webkit-appearance: none;
    width: 100%;
  }
  .input-frame > .input:focus {
    outline: none;
  }
  .captcha-btn {
    width: 3rem;
    height: 100%;
    padding: 0.2rem;
    box-sizing: border-box;
    flex-grow: 1;
  }
  .disable-btn {
    opacity: 0.3;
  }

  .icon-img {
    width: auto;
    height: 0.7rem;
    padding-right: 0.2rem;
  }

  .btn-register {
    width: 5rem;
    margin: 0.2rem;
    height: auto;
  }

  .btn-login {
    width: 6rem;
    margin: 0.2rem;
    height: auto;
  }
  .recommend {
    background-color: #4d5f84;
    color: #fff;
    font-size: 0.5rem;
    width: 80%;
    padding: 0.1rem;
    border-radius: 0.2rem;
    margin: 0.2rem;
  }

  .tip {
    position: absolute;
    z-index: 20001;
    top: 10rem;
    background-color: #3c3b3b9e;
    width: 9.8rem;
    font-size: 0.6rem;
    padding: 0.2rem 0;
    color: #fff;
    opacity: 0;
    pointer-events: none;
  }

  .elementToFadeInAndOut {
    animation: fade 2s linear;
  }

  @keyframes fade {
    0% {
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
    70% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .btn-frame {
    position: relative;
    .loading {
      position: absolute;
      width: 1rem;
      top: 0.4rem;
      left: 2.2rem;
    }
  }

  .time-loading {
    position: absolute;
    width: 1rem;
    right: 2rem;
  }
}
</style>
