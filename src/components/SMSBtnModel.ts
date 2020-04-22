import { formatTime } from "./utils";
export default class SMSBtnModel {
  public static getInstance(): SMSBtnModel {
    return SMSBtnModel.instance || (SMSBtnModel.instance = new SMSBtnModel());
  }
  private static instance: SMSBtnModel;

  private timerInterval = 0;
  private TIME_LIMIT = 60;
  private timePassed = 0;

  public timeLeft = this.TIME_LIMIT || null;
  public loading = false;
  public SMSDisableBtn = false;
  public showClock = false;

  public get SMSLoading() {
    return this.loading;
  }
  public set SMSLoading(flag: boolean) {
    this.loading = false;
  }

  public init() {
    this.timerInterval = 0;
    this.TIME_LIMIT = 60;
    this.timePassed = 0;
    this.timeLeft = this.TIME_LIMIT || null;
    this.SMSLoading = false;
    this.SMSDisableBtn = false;
    this.showClock = false;
  }

  public startTimer() {
    this.timerInterval = setInterval(() => {
      this.timePassed = this.timePassed += 1;
      this.timeLeft = this.TIME_LIMIT - this.timePassed;
      if (this.timeLeft === 0) {
        this.onTimesUp();
      }
    }, 1000);
  }

  public onTimesUp() {
    clearInterval(this.timerInterval);
    this.timePassed = 0;
    this.timeLeft = this.TIME_LIMIT;
    this.showClock = false;
    this.SMSDisableBtn = false;
  }

  public isCanClick() {
    return !this.showClock && !this.SMSLoading && !this.SMSDisableBtn;
  }

  public disableClick() {
    this.timeLeft = null;
    this.showClock = true;
    this.SMSDisableBtn = true;
    this.SMSLoading = true;
  }
}
