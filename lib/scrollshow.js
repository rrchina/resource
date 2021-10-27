(function ($) {
    $.fn.extend({
        scrollshow: function (options) {
            //height:元素滚动出多高时开始动画
            //triggerOnScrollStop:是否窗口停止滚动时才触发
            //stopTime:停止滚动多长时间触发
            var settings = { height: 0, triggerOnScrollStop: false, stopTime: 200 };
            $.extend(settings, options);
            var that = this;
            function checkIsShowing(el) {
                var elTop = $(el).offset().top;
                if ($(window).scrollTop() + $(window).height() - elTop > settings.height) {
                    if (!$(el).hasClass('scrollshown')) {
                        $(el).addClass('scrollshown');
                    }
                } else if ($(window).scrollTop() + $(window).height() - elTop <= 0) {
                    if ($(el).hasClass('scrollshown')) {
                        $(el).removeClass('scrollshown');
                    }
                }
            }
            function checkEach() {
                that.find('.scrollshow').each(function (i, el) {
                    checkIsShowing(el);
                });
            }
            var scrollshowtimeout;
            $(window).scroll(function () {
                if (settings.triggerOnScrollStop) {
                    clearTimeout(scrollshowtimeout);
                    scrollshowtimeout = setTimeout(checkEach, settings.stopTime);
                } else {
                    checkEach();
                }
            });
            checkEach();
        }
    });
})(jQuery);