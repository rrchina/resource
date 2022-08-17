!(function ($) {
    $.fn.extend({
        //$this中不能放多个child
        marquee: function (op) {
            var $this = this;
            var paused = false;
            var scrollInterval;
            var settings = $.extend({ speed: 30, interval: 3000, height: $this.height() }, op);
            if ($this.children().eq(0).outerHeight() <= settings.height) {
                return;
            }

            $this.append($this.html());
            $this.on('mouseenter', function () {
                paused = true;
            });
            $this.on('mouseleave', function () {
                paused = false;
            });

            var scrollbox = $this[0];
            scrollbox.scrollTop = 0
            var start = function () {
                scrollInterval = setInterval(scrolling, settings.speed);
                if (!paused) {
                    scrollbox.scrollTop += 1
                }
            };
            var scrolling = function () {
                if (scrollbox.scrollTop % settings.height != 0) {
                    scrollbox.scrollTop += 1;
                    if (scrollbox.scrollTop >= scrollbox.scrollHeight / 2) {
                        scrollbox.scrollTop = 0
                    }
                }
                else {
                    clearInterval(scrollInterval);
                    setTimeout(start, settings.interval)
                }
            };
            setTimeout(start, settings.interval);

            return $this;
        }, offsetP: function () {
            var offset = this.offset();
            var parentOffset = this.parent().offset();
            return { left: offset.left - parentOffset.left, top: offset.top - parentOffset.top };
        }
    });
    var bboxIdx = 50;
    $.bbox = function (option) {
        function BBox(op) {
            var that = this;
            this.settings = { title: "", content: "hello", buttons: { "确定": { action: null } } };
            this.idx = bboxIdx;
            $.extend(this.settings, option);
            this.create= function() {
                var $b = $('<div class="bbox-mask"><div class="bbox-container"><div class="bbox"><div class="bbox-header"></div><div class="bbox-body"></div><div class="bbox-footer"></div></div></div></div>');
                $b.css('z-index', bboxIdx).prop('id', 'bbox-' + this.idx);
                if (!this.settings.title) {
                    $b.find('.bbox-header').remove();
                } else {
                    $b.find('.bbox-header').html(this.settings.title);
                }
                $b.find('.bbox-body').html(this.settings.content);
                var $footer = $b.find('.bbox-footer');
                for (var b in this.settings.buttons) {
                    var btn = $('<a class="bbox-btn">' + b + '</a>');
                    if (this.settings.buttons[b].style) {
                        btn[0].style = this.settings.buttons[b].style;
                    }
                    btn[0].action=this.settings.buttons[b].action;
                    btn.on('click', function () {
                        var action = this.action;
                        if (action && typeof (action) == 'function') {
                            var returns = action.call(that);
                            if (returns !== false) {
                                that.close();
                            }
                        } else {
                            that.close();
                        }
                    })
                    $footer.append(btn);
                }
                bboxIdx++;
                $('body').append($b);
                this.el = $b[0];
                $b.find('.bbox').addClass('ani-slideup');
                if (this.settings.success && typeof (this.settings.success) == 'function') {
                    this.settings.success.call(this);
                }
            }

            this.close = function () {
                if (this.settings.close && typeof (this.settings.close) == 'function') {
                    this.settings.close.call(this);
                }
                $('#bbox-' + this.idx).remove();
            }
        }

        var bbox = new BBox(option);
        bbox.create();
        return bbox;
    };
})(jQuery);

var isNavShowing = false, navAnimating = false, currentScroll;
$(function () {
    $.event.special.touchstart = {
        setup: function (_, ns, handle) {
            this.addEventListener("touchstart", handle, {
                passive: false,
            });
        }
    };
    $.event.special.touchmove = {
        setup: function (_, ns, handle) {
            this.addEventListener("touchmove", handle, {
                passive: false,
            });
        }
    };
    currentScroll = $(window).scrollTop();
    $('.nav-toggle').click(function () {
        $('body').toggleClass('sidebox-open');
        if ($('body').is('.sidebox-open')) {
            enableScroll(false);
        } else {
            enableScroll(true);
        }
    });
    $('.container-mask').click(function () {
        $('body').removeClass('sidebox-open');
        enableScroll(true);
    });
    $('.side-box li').click(function () {
        var $t = $(this);
        if ($t.hasClass('open')) {
            $t.removeClass('open');
        } else {
            $t.addClass('open').siblings().removeClass('open');
        }
    });

    function showNav(show) {
        //非动画状态或相反时
        if (!navAnimating || (navAnimating && isNavShowing != show)) {
            var $nav = $('.navbar:not(.static)');
            navAnimating = true;
            isNavShowing = show;
            if (show) {
                $nav.removeClass('hide');
            } else {
                $nav.addClass('hide');
            }
            setTimeout(function () {
                navAnimating = false;
            }, 500);
        }
    }
    function checkScrollIn() {
        $('.scroll-trigger').each(function (i, e) {
            var $t = $(e);
            var threshold = $t.data('threshold');
            if (threshold == undefined) {
                threshold = 0;
            }
            var thisTop = $t.offset().top;
            var thisFromBottom = thisTop - window.innerHeight - (document.documentElement.scrollTop || document.body.scrollTop);
            if (thisFromBottom <= threshold) {
                if (!$t.hasClass('shown')) {
                    $t.addClass('shown');
                    $t.trigger($.Event("scroll.in"));
                }
            } else {
                if ($t.hasClass('shown')) {
                    $t.removeClass('shown');
                    $t.trigger($.Event("scroll.out"));
                }
            }
        })
    }
    $(window).on('scroll', function () {
        var sc = $(window).scrollTop();
        if (sc >= 100) {
            $('.navbar:not(.static)').addClass('transparent');
            if (sc > currentScroll) {
                showNav(false);
            } else {
                showNav(true);
            }
        } else {
            $('.navbar').removeClass('transparent');
            showNav(true);
        }
        currentScroll = sc;
        checkScrollIn();
    });
    $(document).on('click', '.tab-header', function (e) {
        var $t = $(this);
        var $tab = $t.closest('.tab');
        var newIdx = $t.index();
        var $c = $tab.find('.tab-content').eq(newIdx);
        var oldIdx = $tab.find('.tab-header.actived').index();

        var evt = $.Event("tab.click", { detail: { newIdx: newIdx, oldIdx: oldIdx, data: $t.data() } });
        $tab.trigger(evt);

        if (newIdx != oldIdx) {
            if (!$t.hasClass('actived')) {
                $t.addClass('actived');
            }
            if (!$c.hasClass('actived')) {
                $c.addClass('actived');
            }
            $t.siblings().removeClass('actived');
            $c.siblings().removeClass('actived');
            evt = $.Event("tab.change", { detail: { newIdx: newIdx, oldIdx: oldIdx, data: $t.data() } });
            $tab.trigger(evt);
        }
    })
    .on('click', '.dropdown:not(.hover)', function (e) {
        var $t = $(this);
        if (!$t.hasClass('open')) {
            if ($t.hasClass('ani')) {
                $t.children('.menu').addClass('ani-bounceinT');
            }
            $t.addClass('open');
        } else {
            $t.removeClass('open');
        }
    }).on('mouseenter', '.dropdown.hover', function (e) {
        var $t = $(this);
        if (!$t.hasClass('open')) {
            if ($t.hasClass('ani')) {
                $t.children('.menu').addClass('ani-bounceinT');
            }
            $t.addClass('open');
        }
    }).on('mouseleave', '.dropdown', function () {
        $(this).removeClass('open').removeClass('ani-bounceinT');
    }).on('click', function (e) {
        if (!$(e.target).is('.dropdown') && !$(e.target).is('.dropdown>a') && !$(e.target).is('.dropdown>a i')) {
            $('.dropdown').removeClass('open').removeClass('ani-bounceinT');
        }
    }).on('keydown', function (e) {
        if (e.keyCode == 27 || e.key == "Escape") {
            $('.dropdown').removeClass('open').removeClass('ani-bounceinT');
        }
    })
    .on('click', '.number:not(.disabled) .minus', function () {
        var $this = $(this);
        var $input = $this.closest('.number').find('input');
        var currentVal = $input.val().trim();
        if (!currentVal) {
            currentVal = 0;
        }
        var _temp = parseFloat(currentVal);
        if (isNaN(_temp)) {
            _temp = 0;
        }
        var step = $input.attr('step');
        if (!step) {
            step = 1;
        } else {
            step = parseFloat(step);
        }
        var indexOfPoint = (step + "").indexOf(".");
        var keep = indexOfPoint==-1?0:(step + "").substring(indexOfPoint+1).length;
        _temp -= step;
        $input.val(parseFloat(_temp.toFixed(keep)));
        $input.trigger('change');
    })
    .on('click', '.number:not(.disabled) .plus', function () {
        var $this = $(this);
        var $input = $this.closest('.number').find('input');
        var currentVal = $input.val().trim();
        if (!currentVal) {
            currentVal = 0;
        }
        var _temp = parseFloat(currentVal);
        if (isNaN(_temp)) {
            _temp = 0;
        }
        var step = $input.attr('step');
        if (!step) {
            step = 1;
        } else {
            step = parseFloat(step);
        }
        var indexOfPoint = (step + "").indexOf(".");
        var keep = indexOfPoint==-1?0:(step + "").substring(indexOfPoint+1).length;
        _temp += step;
        $input.val(parseFloat(_temp.toFixed(keep)));
        $input.trigger('change');
    }).on('click', '.alert .close', function () {
        var $a = $(this).closest('.alert');
        $a.slideUp(200, function () {
            $a.remove();
        })
    })
    .on('click', '.scroll-menu li', function () {
        var $t = $(this);
        var $s = $t.closest('.scroll-menu');
        var $ul = $t.parent();
        var newIdx = $t.index();
        var oldIdx = $ul.find('li.actived').index();

        var evt = $.Event("menu.click", { detail: { newIdx: newIdx, oldIdx: oldIdx, data: $t.data() } });
        $s.trigger(evt);
        if (newIdx != oldIdx) {
            if (!$t.hasClass('actived')) {
                $t.addClass('actived');
            }
            $t.siblings().removeClass('actived');
            evt = $.Event("menu.change", { detail: { newIdx: newIdx, oldIdx: oldIdx, data: $t.data() } });
            $s.trigger(evt);

            var offsetLeft = $t.offsetP().left;
            $s.animate({ scrollLeft: offsetLeft + $t.outerWidth() / 2 - $s.width()/2}, 200);//选中菜单移到中间
        }
    })
    .on('click', '.switch:not(.disabled)', function () {
        var $t = $(this);
        $t.toggleClass('actived');
        var evt = $.Event("change", { detail: { on: $t.hasClass('actived') } });
        $t.trigger(evt);
    })
    .on('touchstart', ".scroll-menu", smEventDown)
    .on('mousedown', ".scroll-menu", smEventDown)
    .on('touchmove', ".scroll-menu", smEventMove)
    .on('mousemove',smEventMove)
    .on('touchend','.scroll-menu',smEventUp)
    .on('mouseup',smEventUp);
    var smMouseIsDown = false, smPrexX, smStartX;
    var $currentSM,$currentSMLis;
    function smEventDown(e) {
        $currentSM = $(this);
        $currentSMLis = $currentSM.find('li');
        if (e&&e.originalEvent) {
            e = e.originalEvent;
        }
        if (e && e.changedTouches) {
            e = e.changedTouches[e.changedTouches.length - 1];
        }
        var offsetX = $currentSM.offset().left, offsetY = $currentSM.offset().top;
        smPrexX = e.pageX - offsetX;
        smStartX = smPrexX;
        smMouseIsDown = true;
    }
    function smEventMove(e) {
        if (smMouseIsDown) {
            e.preventDefault();
            if (e&&e.originalEvent) {
                e = e.originalEvent;
            }
            if (e && e.changedTouches) {
                e = e.changedTouches[e.changedTouches.length - 1];
            }
            var currentX = e.pageX - $currentSM.offset().left;
            $currentSM[0].scrollLeft += smPrexX - currentX;
            //move>10时，阻止li的点击事件，防止松开鼠标时触发click
            if (Math.abs(currentX - smStartX) >= 10 && !$currentSMLis.hasClass('prevent-event')) {
                $currentSMLis.addClass('prevent-event');
            }
            smPrexX = currentX;
        }
    }
    function smEventUp(e) {
        $currentSM = null;
        $currentSMLis = null;
        smMouseIsDown = false;
        $('.scroll-menu').find('li').removeClass('prevent-event');
    }
});