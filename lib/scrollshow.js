$(function () {
    var showH = 100;
    function checkIsShowing(el) {
        var elTop = $(el).offset().top;
        if ($(window).scrollTop() + $(window).height() - elTop > showH) {
            if (!$(el).hasClass('scrollshown')) {
                $(el).addClass('scrollshown');
            }
        } else if ($(window).scrollTop() + $(window).height() - elTop<=0) {
            if ($(el).hasClass('scrollshown')) {
                $(el).removeClass('scrollshown');
            }
        }
    }
    $(window).scroll(function () {
        $('.scrollshow').each(function (i,el) {
            checkIsShowing(el);
        });
    });
    $('.scrollshow').each(function (i,el) {
        checkIsShowing(el);
    });
})