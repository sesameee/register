<template>
  <div id="app-register">
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
          class="numbox-input mobile"
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
          class="numbox-input authCode"
          name="sms_code"
          placeholder="请输入验证码"
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
      <div class="input-row" v-if="channal">
        <input
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
