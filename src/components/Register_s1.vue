<template>
  <div id="app-register" class="bg" :style="{ display }">
    <section
      class="tip"
      id="tip"
      :class="{ ['elementToFadeInAndOut']: openTips }"
    >
      {{ tips }}
    </section>

    <div
      class="register-section reg-form"
      id="register-section"
      ref="registerSection"
    >
      <div class="input-row">
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
          :style="inputStyle"
        />
      </div>
      <div class="input-row">
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
          :style="inputStyle"
        />
        <button
          type="button"
          class="check-btn"
          id="authCodeBtn"
          @click="getRandomCode"
        >
          获取验证码
        </button>
        <span class="check-btn check-btn-wait hide" id="authWait"
          >重新发送</span
        >
      </div>
      <div class="input-row">
        <input
          v-if="channal"
          type="text"
          readonly
          class="numbox-input invite_code"
          placeholder="渠道码"
          id="invite_code"
          :value="channal"
        />
      </div>
      <div class="input-row">
        <button
          type="button"
          class="reg-btn"
          id="registerBtn"
          @click="doRegister()"
        >
          注册
        </button>
      </div>
    </div>
    <!-- <section
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
        <div class="input-frame" :style="frameStyle">
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
            :style="inputStyle"
          />
        </div>
        <div class="code-frame" v-if="isHaveRandCode">
          <div class="input-frame" :style="frameStyle">
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
              :style="inputStyle"
            />
          </div>
          <img :src="captchaUtl" alt="" class="code" @click="getRandomCode" />
        </div>
        <div class="captcha-frame">
          <div class="input-frame" :style="frameStyle">
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
              :style="inputStyle"
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
        <div class="input-frame" :style="frameStyle">
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
            :style="inputStyle"
          />
        </div>
        <div
          class="input-frame"
          :style="frameStyle"
          v-if="isHaveSecondPassword"
        >
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
            :style="inputStyle"
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
    </section> -->
  </div>
</template>

<script lang="ts">
import RegisterLogic from "./RegisterLogic";
import { Component } from "vue-property-decorator";
@Component
export default class Register extends RegisterLogic {}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/* 字体 */
</style>
