
var util = {
    // 获取设备类型
    getBrowser: function () {
        var browser = {
            versions: function () {
                var u = navigator.userAgent;
                var app = navigator.appVersion;
                return {
                    //移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') === -1 //是否web应该程序，没有头部与底部
                };
            }(),

            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        };
        return browser;
    },
    // 是否是vivo浏览器
    isVivoBrowser: function () {
        if (navigator.userAgent.indexOf('VivoBrowser') > -1) {
            return true;
        } else {
            return false;
        }
    },
    isUcBrowser: function () {
        if(navigator.userAgent.indexOf('UCBrowser') > -1) {
            return true;
        }else{
            return false;
        }
    },
    // 是否是微信浏览器（qq浏览器）
    isWeiXin: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) !== null || ua.match(/ qq/i) !== null) {
            return true;
        } else {
            return false;
        }
    },
    // 是否是百度App（仅对iOS生效）
    isBaidu: function () {
        var browser = this.getBrowser();
        if (!(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios)) {
            return false;
        }
        // 判断是否为百度App
        if (navigator.userAgent.indexOf('baiduboxapp') > -1) {
            return true;
        } else {
            return false;
        }
    },
    // 是否为ios下chrome和safari之外的浏览器
    isNotSafari: function () {
        if (this.getDeviceInfo() === 'ios') {
            var ua = window.navigator.userAgent;
            var isChrome = ua.indexOf('CriOS') !== -1;
            var isSafari = ua.indexOf("Safari") !== -1 && ua.indexOf("Version") !== -1;
            if (!(isChrome || isSafari)) {
                return true;
            } else {
                return false;
            }
        }
    },
    // ios 下的UC、百度、搜狗弹出复制地址引导
    isShowShadow: function() {
        if (this.getDeviceInfo() === 'ios') {
            var ua = window.navigator.userAgent;
            var isUc = ua.indexOf('UCWEB') !== -1 || ua.indexOf('UCBrowser') !== -1;
            var isBaidu = ua.indexOf('baiduboxapp') !== -1;
            var isSougou = ua.indexOf('Sogou') !== -1;

            return isUc || isBaidu || isSougou;
        }
    },
    // 页面重定向
    redirectUrl: function (url) {
        if (!url || !url.match('//')) return;
        window.location.href = url;
    },
    // 获取url参数
    getUrlParm: function (variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return null;
    },
    // 复制剪切板
    copyText: function (text) {
        var input = document.createElement('input');
        document.body.appendChild(input);
        input.setAttribute('value', text);
        input.select();
        var oldContentEditable = input.contentEditable;
        var oldReadOnly = input.readOnly;
        var range = document.createRange();
        input.contentEditable = true;
        input.readOnly = false;
        range.selectNodeContents(input);
        var s = window.getSelection();
        s.removeAllRanges();
        s.addRange(range);
        input.setSelectionRange(0, 999999); // A big number, to cover anything that could be inside the element.
        input.contentEditable = oldContentEditable;
        input.readOnly = oldReadOnly;
        if (document.execCommand('copy')) {
            document.execCommand('copy');
            console.log(document.execCommand('copy'));
            console.log('复制成功');
        }
        document.body.removeChild(input);
    },
    // 获取设备信息
    getDeviceInfo: function () {
        var browser = this.getBrowser(); // 获取设备类型
        var device = 'other';
        if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
            device = "ios";
        } else if (browser.versions.android) {
            device = "android";
        }
        return device;
    },

}