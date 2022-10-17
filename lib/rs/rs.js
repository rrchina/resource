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
        }, slideTo: function (val) {
            //设置slider手柄位置
            var $s = this;

            if (val == null && val == undefined) {
                val = $s.data('value');
            }
            val = parseFloat(val);
            var $h = $s.find('.handle');
            var hw = $h.outerWidth();
            var min = parseInt($s.attr('min'));
            var max = parseInt($s.attr('max'));
            if (isNaN(min)) {
                min = 0;
            }
            if (isNaN(max)) {
                max = min + 100;
            }
            var maxX = $s.width() - hw;
            if (isNaN(val)) {
                val = min;
            }
            if (val < min) {
                val = min;
            }
            if (val > max) {
                val = max;
            }
            var x = maxX*(val-min)/(max - min)
            if (x < 0) {
                x = 0;
            }
            if (x > maxX) {
                x = maxX;
            }
            $h.css({ left: x });
            $s.data('value', val);
            return $s;
        }, cascade: function (option) {
            this.each(function (i, e) {
                if ($(e).data('csc') && $(e).data('csc').destroy) {
                    $(e).data('csc').destroy();
                    $(e).off('click');
                }
                if (typeof (option) == 'object') {
                    option.el = e;
                    var csc = new Cascade(option);
                    $(e).data('csc', csc);
                    $(e).on('click', function () {
                        csc.show();
                    });
                } else {
                    if (option === 'destroy') {
                        //if ($(e).data('csc') && $(e).data('csc').destroy) {
                        //    $(e).data('csc').destroy();
                        //}
                        //$(e).off('click');
                    }
                }
            });
            return this;
        }, progress: function (rate) {
            if (rate > 1) {
                rate = 1;
            }
            var p = rate * 100 + '%';
            this.find('.handle').css('width', p);
            this.data("value", rate);
            return this;
        }
    });
    function Cascade(option) {
        var that = this;
        this.id = getGuid();
        //labels决定级数，如labels为['省','市','区县']，data数据至少需3级
        this.settings = $.extend({ title: '请选择', data: [], labels: ['省份','城市','区县'],tip:'请先选择上一级' ,onselect:null,cancel:null,textJoin:' ',zIndex:80000000,maxWidth:767}, option);
        this.target = option.el;
        var $b = $('<div class="bbox-mask cascade"><div class="bbox-container" style="max-width:' + (typeof(this.settings.maxWidth)=='number'?this.settings.maxWidth+'px':this.settings.maxWidth) + '"><div class="bbox"><div class="bbox-header"></div><div class="bbox-body"></div><div class="bbox-footer"><a class="bbox-btn csc-cancel">取消</a><a class="bbox-btn csc-confirm">确定</a></div></div></div></div>');
        $b.css({ 'z-index': this.settings.zIndex, 'display': 'none' }).prop('id', 'bbox-' + this.id);
        this.bbox = $b;
        if (!this.settings.title) {
            $b.find('.bbox-header').remove();
        } else {
            $b.find('.bbox-header').html(this.settings.title);
        }
        var $body = $b.find('.bbox-body');
        var $menubox = $('<div style="border-bottom:1px solid #8487fa"><ul class="scroll-menu"></ul></div>');
        var $sm = $menubox.find('.scroll-menu');
        var $itembox = $('<div class="itembox"></div>');
        this.settings.labels.forEach(function (e, i) {
            $sm.append('<li>' + that.settings.labels[i] + '</li>');
            $itembox.append('<div style="height:40vh;overflow-y:auto;margin-top:10px;display:none" class="list-box"><div class="list noborder"><div class="t">'+that.settings.tip+'</div></div></div>');
        });
        //添加一级选项
        var firstList = $itembox.find('.list').eq(0);
        firstList.empty();
        for (var i = 0; i < this.settings.data.length; i++) {
            var dataitem = this.settings.data[i];
            firstList.append('<div class="list-item" data-level="0" data-id="'+dataitem.id+'" data-text="'+dataitem.text+'">'+dataitem.text+'</div>')
        }

        $body.append($menubox);
        $body.append($itembox);
        $sm.on('menu.change', function (e) {
            $itembox.find('.list-box').eq(e.detail.newIdx).show().siblings().hide();
        });
        $b.find('.csc-cancel').on('click', function () {
            if (that.settings.cancel && typeof (that.settings.cancel) == 'function') {
                that.settings.cancel.call(that);
            }
            that.hide();
        });
        $b.find('.csc-confirm').on('click', function () {
            var ids = [];
            var texts = [];
            var lis = $menubox.find('li');
            for (var i = 0; i < lis.length; i++) {
                var $l = lis.eq(i);
                var dtid = $l.data("id");
                var dttext=$l.data("text");
                if (dtid != undefined && dtid != null) {
                    ids.push(dtid);
                    texts.push(dttext);
                } else {
                    break;
                }
            }
            if (ids.length >= that.settings.labels.length) {
                var txt = texts.join(that.settings.textJoin).trim();
                that.hide();
                if ($(that.target).is('input')) {
                    $(that.target).val(txt);
                    $(that.target).trigger('change');
                }
                if (that.settings.onselect && typeof (that.settings.onselect) == 'function') {
                    that.settings.onselect.call(that, { values: ids, text: txt });
                }
            }
        });
        $itembox.on('click', '.list-item', function () {
            if (!$(this).is('.actived')) {
                $(this).addClass('actived').siblings().removeClass('actived');
            }
            var level = $(this).data('level');
            var nextLevel = level+1;
            var id = $(this).data("id");
            var text = $(this).data("text");
            var $currentMenu = $sm.find('li').eq(level);
            $currentMenu.html(text).data({ id: id, text: text });//当前label的文本设选显示值
            if (level < that.settings.labels.length - 1) {
                var clickedDataItem = that.findClickedDataItem(level, id);
                if (clickedDataItem && clickedDataItem.children) {
                    //当前label所有下级的文本初始化,并清空所有下级的选项
                    $currentMenu.nextAll().each(function (idx, ele) {
                        $sm.find('li').eq(nextLevel + idx).html(that.settings.labels[nextLevel + idx]).data({ id: null, text: null });
                        $itembox.find(".list").eq(nextLevel + idx).html('<div class="t">'+that.settings.tip+'</div>');
                    });
                    //为下级列表添加item
                    var $nextList = $itembox.find(".list").eq(nextLevel);
                    $nextList.empty();
                    for (var i = 0; i < clickedDataItem.children.length; i++) {
                        var dataitem = clickedDataItem.children[i];
                        $nextList.append('<div class="list-item" data-level="' + nextLevel + '" data-id="' + dataitem.id + '" data-text="' + dataitem.text + '">' + dataitem.text + '</div>')
                    }
                    //激活下一级
                    $sm.find('li').eq(nextLevel).trigger('click')
                }
            } else {
                //点击的是最后一级，滚动到最后一级内容完整显示（内容超出时）
                $sm.animate({ scrollLeft: 2000}, 200);
            }
        });
        this.findClickedDataItem = function (clickedLevel, clickedId) {
            var currentData = that.settings.data;
            var currentItem = null;
            for (var i = 0; i <= clickedLevel; i++) {
                var currentId = $sm.find('li').eq(i).data('id');
                if (currentData && currentData.length > 0) {
                    var foundedItems = currentData.filter(function (e) {
                        return e.id == currentId;
                    });
                    if (foundedItems.length > 0) {
                        currentItem = foundedItems[0];
                        currentData = currentItem.children;
                    } else {
                        currentItem = null;
                        break;
                    }
                } else {
                    break;
                }
            }

            return currentItem;
        };
        this.show = function () {
            this.bbox.find('.bbox').addClass('ani-slideup');
            this.bbox.show();
        };
        this.destroy = function () {
            $(this.target).off('click');
            this.bbox.remove();
        };
        this.hide = function () {
            this.bbox.find('.bbox').removeClass('ani-slideup');
            this.bbox.hide();
        };
        $('body').append($b);
        $menubox.find('.scroll-menu li').eq(0).trigger('click');
        bboxIdx++;
    }
    var bboxIdx = 50000000;
    $.bbox = function (option) {
        function BBox(op) {
            var that = this;
            this.settings = { title: "", content: "hello",success:null, buttons: { "确定": { action: null } } ,maxWidth:767};
            this.idx = bboxIdx;
            $.extend(this.settings, option);
            this.create= function() {
                var $b = $('<div class="bbox-mask"><div class="bbox-container" style="max-width:' + (typeof (this.settings.maxWidth) == 'number' ? this.settings.maxWidth + 'px' : this.settings.maxWidth) + '"><div class="bbox"><div class="bbox-header"></div><div class="bbox-body"></div><div class="bbox-footer"></div></div></div></div>');
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
                            var returns = action.call(that,that);
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
                    this.settings.success.call(this,this);
                }
            }

            this.close = function () {
                if (this.settings.close && typeof (this.settings.close) == 'function') {
                    this.settings.close.call(this,this);
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
    var canToggleNavVisible = true;
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
    $.event.special.mousewheel = {
        setup: function (_, ns, handle) {
            this.addEventListener("mousewheel", handle, {
                passive: false,
            });
        }
    };
    currentScroll = $(window).scrollTop();
    function toggleSideBox() {
        canToggleNavVisible = false;
        $('body').toggleClass('sidebox-open');
        if ($('body').is('.sidebox-open')) {
            enableScroll(false);
        } else {
            enableScroll(true);
            setTimeout(function () { canToggleNavVisible = true; }, 500);//关闭一段时间后才可触发窗口滚动导致的nav是否可见（enableScroll导致的窗口滚动事件）
        }
    }
    $('.nav-toggle').click(function () {
        toggleSideBox();
    });
    $('.body-mask').click(function () {
        toggleSideBox();
    });
    $('.side-box>ul>li>a').click(function () {
        var $t = $(this).parent();
        var $next=$(this).next();
        var nextIsUl = $next.is('ul');
        if ($t.hasClass('open')) {
            $t.removeClass('open');
            if (nextIsUl) {
                $next.slideUp(200);
            }
        } else {
            if (nextIsUl) {
                $t.addClass('open').siblings().removeClass('open');
                $next.slideDown();
                $t.siblings().find('ul').slideUp(200);
            } else {
                toggleSideBox();
            }
        }
    });
    $('.side-box>ul ul>li>a').click(function () {
        toggleSideBox();
    });
    $('.progress').each(function (i, el) {
        var val = $(el).data('value');
        if (val) {
            $(el).progress(val);
        }
    });
    //初始化solider手柄位置
    $('.slider').each(function (i, e) {
        $(e).slideTo($(e).data('value'));
    });
    $('input[type=checkbox],input[type=radio]').each(function (i, e) {
        var label = $(e).parent();
        if (label.is(".checkbox")) {
            if (e.checked) {
                if (!label.hasClass('checked')) {
                    label.addClass('checked');
                }
            } else {
                label.removeClass('checked');
            }

            if (e.disabled) {
                if (!label.hasClass('disabled')) {
                    label.addClass('disabled');
                }
            }
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
        if (canToggleNavVisible) {
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
        if (!$(e.target).is('.dropdown') && !$(e.target).is('.dropdown>a') && !$(e.target).closest('a').is('.dropdown>a')) {
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
    .on('click', '.scroll-menu li', function (e) {
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

            var scrollLeft = $t.offsetP().left + $s.scrollLeft();//把选中菜单滚动到靠左边时的scrollLeft
            $s.animate({scrollLeft: scrollLeft + $t.outerWidth() / 2 - $s.width()/2}, 200);//选中菜单移到中间
        }
    })
    .on('click', '.switch:not(.disabled)', function () {
        var $t = $(this);
        $t.toggleClass('actived');
        var evt = $.Event("change", { detail: { value: $t.hasClass('actived') } });
        $t.trigger(evt);
    })
    .on('change', 'input[type=checkbox]', function () {
        var label = $(this).parent();
        if (label.is(".checkbox")) {
            if (this.checked) {
                if (!label.hasClass('checked')) {
                    label.addClass('checked');
                }
            } else {
                label.removeClass('checked');
            }
        }
    })
    .on('change', 'input[type=radio]', function () {
        var label = $(this).parent();
        if (label.is(".checkbox")) {
            if (this.checked) {
                if (!label.hasClass('checked')) {
                    label.addClass('checked');
                }
            } else {
                label.removeClass('checked');
            }
        }
        var name = $(this).prop('name');
        $('[name=' + name + ']').not($(this)).parent().filter('.checkbox').removeClass('checked');
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
        var offsetX = $currentSM.offset().left;
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
                $currentSM.addClass('prevent-event');
            }
            smPrexX = currentX;
        }
    }
    function smEventUp(e) {
        $currentSM = null;
        $currentSMLis = null;
        smMouseIsDown = false;
        $('.scroll-menu').removeClass('prevent-event');
    }

    $(document).on('click', '.accordion dt', function () {
        var $t = $(this);
        var $accrd = $t.closest('.accordion');
        var multiple = $accrd.is('.multiple');
        var $dd = $t.next();
        if ($t.is('.open')) {
            $t.removeClass('open');
            $dd.slideUp(200);
        } else {
            var $dd = $t.next();
            if ($dd.is('dd')) {
                $t.addClass('open');
                $dd.slideDown(200);
                if (!multiple) {
                    $t.siblings().filter('dt').removeClass('open');
                    $dd.siblings().filter('dd').slideUp(200);
                }
            }
        }
    }).on('click', '.slider:not(.disabled)', function (e) {
        //非点击手柄时才移动
        if ($(e.target).is('.slider')) {
            var $s = $(this);
            sliderSlided(e, $s);
        }
    })
    .on('touchstart', ".slider:not('.disabled') .handle", sliderEventDown)
    .on('mousedown', ".slider:not('.disabled') .handle", sliderEventDown)
    .on('touchmove', ".slider:not('.disabled') .handle", sliderEventMove)
    .on('mousemove',sliderEventMove)
    .on('touchend',".slider:not('.disabled') .handle",sliderEventUp)
    .on('mouseup',sliderEventUp);
    var sliderMouseIsDown = false;
    var $currentSlider;
    function sliderEventDown(e) {
        e.stopPropagation();
        $currentSlider = $(this).closest('.slider');
        sliderMouseIsDown = true;
    }
    function sliderEventMove(e) {
        if (sliderMouseIsDown) {
            e.preventDefault();
            if (e&&e.originalEvent) {
                e = e.originalEvent;
            }
            if (e && e.changedTouches) {
                e = e.changedTouches[e.changedTouches.length - 1];
            }
            sliderSlided(e, $currentSlider);
        }
    }
    function sliderEventUp(e) {
        e.stopPropagation();
        $currentSlider = null;
        sliderMouseIsDown = false;
    };
    function sliderSlided(e, $s) {
        var $h = $s.find('.handle');
        var hw = $h.outerWidth();
        var x = e.pageX - $s.offset().left-hw/2;
        if (x < 0) {
            x = 0;
        }
        var maxX = $s.outerWidth() - hw;
        if (x > maxX) {
            x = maxX;
        }
        var step=parseFloat($s.attr('step'));
        var min = parseInt($s.attr('min'));
        var max = parseInt($s.attr('max'));
        if (isNaN(step)) {
            step = 1;
        }
        if (isNaN(min)) {
            min = 0;
        }
        if (isNaN(max)) {
            max = min + 100;
        }
        var val = min + (max - min) * x / maxX;//根据x计算得到的值
        val = parseInt(val / step) * step;//根据step重新计算值
        val = parseInt(val * 100) / 100;//解决精度问题
        if (val < min) {
            val = min;
        }
        if (val > max) {
            val = max;
        }
        $s.slideTo(val);
        $s.data('value', val);
        $s.trigger($.Event("change", { detail: { value: val } }));
    }
    //cascade
    $(document).on('touchstart', ".cascade .list-box", cascadeEventDown)
    .on('mousedown', ".cascade .list-box", cascadeEventDown)
    .on('touchmove', ".cascade .list-box", cascadeEventMove)
    .on('mousemove',cascadeEventMove)
    .on('touchend',".cascade .list-box",cascadeEventUp)
    .on('mouseup',cascadeEventUp)
    .on('mousewheel','.cascade .list-box',cascadeEventWheel)
    .on('mousewheel', '.cascade', function (e) {
        e.preventDefault();
    }).on('touchmove', '.cascade', function (e) {
        e.preventDefault();
    });
    var $currentCsc;
    var cscMouseIsDown = false, cscPreY, cscStartY;
    function cascadeEventDown(e) {
        $currentCsc = $(this);
        if (e&&e.originalEvent) {
            e = e.originalEvent;
        }
        if (e && e.changedTouches) {
            e = e.changedTouches[e.changedTouches.length - 1];
        }
        var offsetY = $currentCsc.offset().top;
        cscPreY = e.pageY - offsetY;
        cscStartY = cscPreY;
        cscMouseIsDown = true;
    }
    function cascadeEventMove(e) {
        if (cscMouseIsDown) {
            e.preventDefault();
            if (e&&e.originalEvent) {
                e = e.originalEvent;
            }
            if (e && e.changedTouches) {
                e = e.changedTouches[e.changedTouches.length - 1];
            }
            var currentY = e.pageY - $currentCsc.offset().top;
            $currentCsc[0].scrollTop += (cscPreY - currentY)*1.5;
            //move>10时，阻止li的点击事件，防止松开鼠标时触发click
            if (Math.abs(currentY - cscStartY) >= 10 && !$currentCsc.hasClass('prevent-event')) {
                $currentCsc.addClass('prevent-event');
            }
            cscPreY = currentY;
        }
    }
    function cascadeEventUp(e) {
        $currentCsc = null;
        cscMouseIsDown = false;
        $('.cascade .list-box').removeClass('prevent-event');
    }
    function cascadeEventWheel(e) {
        e.preventDefault();
        if (e&&e.originalEvent) {
            e = e.originalEvent;
        }
        if (e.deltaY > 0) {
            $(this)[0].scrollTop += 42;
        } else {
            $(this)[0].scrollTop -= 42;
        }
    }
    $(window).on('resize', function () {
        //resize时设置slider手柄位置
        $('.slider').each(function (i, e) {
            $(e).slideTo($(e).data('value'));
        });
        if ($('body').is('.sidebox-open') && $(window).width() > 767) {
            toggleSideBox();
        }
    })
});