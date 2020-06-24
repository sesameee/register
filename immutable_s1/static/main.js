function main(config, openInstall, kk, data,type=0) {
    var pageObj;
    new OpenInstall(
        {
            appKey: openInstall.appKey,
            apkFileName: openInstall.apkFileName,
            onready: function() {
                pageObj = this;
            },
        },
        data
    );
    if (config.autoDownload !== '0') {
        //自动下载
        downLoad();
    }

    handleiOSDownloadPath();

    $('.down').click(function() {
        downLoad();
    });

    $('.not_down_img').click(function() {
        var url = window.location.href;
        util.copyText(url);
    });

    $('.guid-close').click(function() {
        $('.guid').hide();
    });

    function downLoad() {
        if (redirectPleaseOpenInSafari()) {
            return;
        }
        // 下载链接处理
        var datastr = JSON.stringify(data);
        util.copyText(datastr);
        console.log(config.device);
        if (config.device === 'ios') {
            if (config.IsOpenInstall === '3') {
                console.log('ios openinstall down');
                pageObj.wakeupOrInstall();
            } else if (config.IsOpenInstall === '4') {
                console.log('ios url down');
                location.href = config.iosUrl;
            } else {
                console.log('ios defulturl down');
                location.href = config.iosinstrUrl;
            }
        } else {
            if (config.androidtype === 'openinstall') {
                console.log('android openinstall down');
                pageObj.wakeupOrInstall();
            } else if (config.androidtype === 'copy') {
                console.log('android defulturl down');
                location.href = config.defultApkUrl;
            } else {
                if (config.IsOpenInstall === '0') {
                    console.log('android url down');
                    location.href = config.apkUrl;
                } else {
                    if (type == 1){
                        console.log('android openinstall down');
                        pageObj.wakeupOrInstall();
                    }else{
                        console.log('android url down');
                        location.href = config.apkUrl;
                    }
                }
            }
        }
    }

    function shadowCheck() {
        var shadowType = 0;
        // 微信蒙版
        if (util.isWeiXin()) {
            shadowType = 1;
            var html =
                '<div class="content">\n' +
                '    <img class="share_img" width="100%" src="./static/footpage/2/wx_az.png">\n' +
                '    <img class="share_img" width="100%" src="./static/footpage/2/jt.png">\n' +
                '</div>';
            $('body').css('background-color', '#F6F6F6');

            $('body').html(html);
        }
        return shadowType;
    }

    function handleiOSDownloadPath() {
        if (shadowCheck() !== 0) return;
        config.ua = window.navigator.userAgent.toLowerCase(); // 获取浏览器ua
        config.device = util.getDeviceInfo(); // 获取设备类型
        //添加蒙层
        if (config.device === 'ios' && util.isUcBrowser() === true) {
            not_Down();
        } else if (config.device === 'ios') {
            var enterprise = util.getUrlParm('enterprise');
            if (enterprise == 1) {
                var head = 'http://';
                var protocolStr = document.location.protocol;
                if (protocolStr == 'http:' || protocolStr == 'https:') {
                    head = protocolStr + '//';
                }
                window.history.pushState(
                    {},
                    0,
                    head + window.location.host + '?enterprise=2'
                );
                $('.guid').show();
            }
        }
        function not_Down() {
            $('.not_down_body').show();
            //禁止滚动条
            $(document.body).css({
                'overflow-x': 'hidden',
                'overflow-y': 'hidden',
            });
        }
    }
    /* ios系统使用非safari浏览器的时候需提示在浏览器打开,判断ios的然后非safari浏览器的就进行提示 */
    function redirectPleaseOpenInSafari() {
        const userAgent = navigator.userAgent.toUpperCase();
        const is_window = userAgent.indexOf('WINDOWS') > -1;
        const is_android = userAgent.indexOf('ANDROID') > -1;
        const is_chrome = userAgent.indexOf('CHROME') > -1;
        const is_UCBrowser = userAgent.indexOf('UCBROWSER') > -1;
        const is_qqBrowser = userAgent.indexOf('QQBROWSER') > -1;
        // const is_iphone = userAgent.indexOf('IPHONE') > -1;
        // const is_ipad = userAgent.indexOf('IPAD') > -1;
        // 判断是否为safari浏览器 需要排除 UC QQ CHROME
        const is_safari =
            !is_UCBrowser &&
            !is_chrome &&
            !is_qqBrowser &&
            userAgent.indexOf('SAFARI') > -1;

        // 只能判断是否为safari 否则会失凖
        if (!is_window && !is_android) {
            if (!is_safari /*&& (is_iphone || is_ipad)*/) {
                location.href =
                    '/FloorPage/Redirect/openInSafari?url=' + location.href;

                return true;
            }
        }

        return false;
    }
}


