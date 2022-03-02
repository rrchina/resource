/*-----------H-ui前端框架-------------
* H-ui.min.js v3.2.1
/*
Includes：
jQuery.IEMobileHack.js
jQuery.cookie.js v1.4.1
jQuery.form.js v3.51.0
jQuery.lazyload.js v1.9.3
jQuery.responsive-nav.js v1.0.39
jQuery.placeholder.js
jQuery.emailsuggest.js v1.0
jQuery.format.js
jQuery.togglePassword.js
jQuery.iCheck.js
jQuery.raty.js v2.4.5
jQuery.onePageNav.js
jQuery.stickUp.js
jQuery.ColorPicker.js

jQuery.HuiaddFavorite.js
jQuery.Huisethome.js
jQuery.Huisidenav.js
jQuery.Huihover.js v2.0
jQuery.Huifocusblur.js V2.0
jQuery.Huiselect.js
jQuery.Huitab.js v2.0.1
jQuery.Huifold.js v2.0
jQuery.Huitags.js v2.0
jQuery.Huitagsmixed.js
jQuery.Huitextarealength.js v2.0
jQuery.Huipreview.js v2.1
jQuery.Huimodalalert.js
jQuery.Huialert.js
jQuery.Huitotop.js v2.0
jQuery.Huimarquee.js
jQuery.Huispinner.js v2.0
jQuery.Huiloading.js v1.0
jQuery.HuicheckAll.js v1.0

Bootstrap.modal.js v3.3.0
Bootstrap.dropdown.js v3.3.0
Bootstrap.transition.js v3.3.0
Bootstrap.tooltip.js v3.3.0
Bootstrap.popover.js v3.3.0
Bootstrap.alert.js v3.3.0
Bootstrap.slider.js v1.0.1
Bootstrap.datetimepicker.js
Bootstrap.Switch v1.3

*/
/* =======================================================================
 * jQuery.IEMobileHack.js判断浏览器
 * ======================================================================== */
!function(){
	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
		var msViewportStyle = document.createElement("style");
		msViewportStyle.appendChild(
			document.createTextNode(
				"@-ms-viewport{width:auto!important}"
			)
		);
		document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
	}
} ();

/* =======================================================================
 * jQuery.stopDefault.js 阻止默认浏览器动作
 * ======================================================================== */
function stopDefault(e) {
	if (e && e.preventDefault) e.preventDefault();
	//IE中阻止函数器默认动作的方式
	else window.event.returnValue = false;
	return false;
}

/* =======================================================================
 * jQuery.cookie.js v1.4.1
 * https://github.com/carhartl/jQuery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 * ======================================================================== */
!(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD (Register as an anonymous module)
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}
(function($){
	var pluses = /\+/g;
	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}
	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}
	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}
	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}
	function read(s, converter) {
		var value = config.raw ? s: parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}
	var config = $.cookie = function(key, value, options) {
		// Write
		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({},
			config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires,
				t = options.expires = new Date();
				t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
			}

			return (document.cookie = [encode(key), '=', stringifyCookieValue(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
			options.path ? '; path=' + options.path: '', options.domain ? '; domain=' + options.domain: '', options.secure ? '; secure': ''].join(''));
		}
		// Read
		var result = key ? undefined: {},
		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		cookies = document.cookie ? document.cookie.split('; ') : [],
		i = 0,
		l = cookies.length;
		for (; i < l; i++) {
			var parts = cookies[i].split('='),
			name = decode(parts.shift()),
			cookie = parts.join('=');
			if (key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}
			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}
		return result;
	};
	config.defaults = {};
	$.removeCookie = function(key, options) {
		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({},
		options, {
			expires: -1
		}));
		return ! $.cookie(key);
	};
}));

 /* =======================================================================
 * jQuery.ColorPicker.js 颜色控件
 * ========================================================================*/
(function($) {
	'use strict';
	var name = 'Hui.colorPicker'; // modal name
	var TEAMPLATE = '<div class="colorpicker"><button type="button" class="btn dropdown-toggle" data-toggle="dropdown"><span class="cp-title"></span><i class="ic"></i></button><ul class="dropdown-menu clearfix"></ul></div>';
	var LANG = {
		zh_cn: {
			errorTip: "不是有效的颜色值"
		},
		zh_tw: {
			errorTip: "不是有效的顏色值"
		},
		en: {
			errorTip: "Not a valid color value"
		}
	};

	// The ColorPicker modal class
	var ColorPicker = function(element, options) {
		this.name = name;
		this.$ = $(element);

		this.getOptions(options);
		this.init();
	};

	// default options
	ColorPicker.DEFAULTS = {
		colors: ['#00BCD4', '#388E3C', '#3280fc', '#3F51B5', '#9C27B0', '#795548', '#F57C00', '#F44336', '#E91E63'],
		pullMenuRight: true,
		wrapper: 'btn-wrapper',
		tileSize: 30,
		lineCount: 5,
		optional: true,
		tooltip: 'top',
		icon: 'caret-down',
		// btnTip: 'Tool tip in button'
	};

	ColorPicker.prototype.init = function() {
		var options = this.options,
		that = this;

		this.$picker = $(TEAMPLATE).addClass(options.wrapper);
		this.$picker.find('.cp-title').toggle(options.title !== undefined).text(options.title);
		this.$menu = this.$picker.find('.dropdown-menu').toggleClass('pull-right', options.pullMenuRight);
		this.$btn = this.$picker.find('.btn.dropdown-toggle');
		this.$btn.find('.ic').addClass('icon-' + options.icon);
		if (options.btnTip) {
			this.$picker.attr('data-toggle', 'tooltip').tooltip({
				title: options.btnTip,
				placement: options.tooltip,
				container: 'body'
			});
		}
		this.$.attr('data-provide', null).after(this.$picker);

		// init colors
		this.colors = {};
		$.each(this.options.colors,
		function(idx, rawColor) {
			if ($.zui.Color.isColor(rawColor)) {
				var color = new $.zui.Color(rawColor);
				that.colors[color.toCssStr()] = color;
			}
		});

		this.updateColors();
		var that = this;
		this.$picker.on('click', '.cp-tile',
		function() {
			that.setValue($(this).data('color'));
		});
		var $input = this.$;
		var setInputColor = function() {
			var val = $input.val();
			var isColor = $.zui.Color.isColor(val);
			$input.parent().toggleClass('has-error', !isColor && !(options.optional && val === ''));
			if (isColor) {
				that.setValue(val, true);
			} else {
				if (options.optional && val === '') {
					$input.tooltip('hide');
				} else if (!$input.is(':focus')) {
					$input.tooltip('show', options.errorTip);
				}
			}
		}
		if ($input.is('input:not([type=hidden])')) {
			if (options.tooltip) {
				$input.attr('data-toggle', 'tooltip').tooltip({
					trigger: 'manual',
					placement: options.tooltip,
					tipClass: 'tooltip-danger',
					container: 'body'
				});
			}
			$input.on('keyup paste input change', setInputColor);
		} else {
			$input.appendTo(this.$picker);
		}
		setInputColor();
	};

	ColorPicker.prototype.addColor = function(color) {
		var hex = color.toCssStr(),
		options = this.options;

		if (!this.colors[hex]) {
			this.colors[hex] = color;
		}

		var $a = $('<a href="###" class="cp-tile"></a>', {
			titile: color
		}).data('color', color).css({
			'color': color.contrast().toCssStr(),
			'background': hex,
			'border-color': color.luma() > 0.43 ? '#ccc': 'transparent'
		}).attr('data-color', hex);
		this.$menu.append($('<li/>').css({
			width: options.tileSize,
			height: options.tileSize
		}).append($a));
		if (options.optional) {
			this.$menu.find('.cp-tile.empty').parent().detach().appendTo(this.$menu);
		}
	};

	ColorPicker.prototype.updateColors = function(colors) {
		var $picker = this.$picker,
		$menu = this.$menu.empty(),
		options = this.options,
		colors = colors || this.colors,
		that = this;
		var bestLineCount = 0;
		$.each(colors,
		function(idx, color) {
			that.addColor(color);
			bestLineCount++;
		});
		if (options.optional) {
			var $li = $('<li><a class="cp-tile empty" href="###"></a></li>').css({
				width: options.tileSize,
				height: options.tileSize
			});
			this.$menu.append($li);
			bestLineCount++;
		}
		$menu.css('width', Math.min(bestLineCount, options.lineCount) * options.tileSize + 6);
	};

	ColorPicker.prototype.setValue = function(color, notSetInput) {
		var options = this.options;
		this.$menu.find('.cp-tile.active').removeClass('active');
		var hex = '';
		if (color) {
			var c = new $.zui.Color(color);
			hex = c.toCssStr().toLowerCase();
			this.$btn.css({
				background: hex,
				color: c.contrast().toCssStr(),
				borderColor: c.luma() > 0.43 ? '#ccc': hex
			});
			if (!this.colors[hex]) {
				this.addColor(c);
			}
			if (!notSetInput && this.$.val().toLowerCase() !== hex) {
				this.$.val(hex).trigger('change');
			}
			this.$menu.find('.cp-tile[data-color=' + hex + ']').addClass('active');
			this.$.tooltip('hide');
			this.$.trigger('colorchange', c);
		} else {
			this.$btn.attr('style', null);
			if (!notSetInput && this.$.val() !== '') {
				this.$.val(hex).trigger('change');
			}
			if (options.optional) {
				this.$.tooltip('hide');
			}
			this.$menu.find('.cp-tile.empty').addClass('active');
			this.$.trigger('colorchange', null);
		}

		if (options.updateBorder) {
			$(options.updateBorder).css('border-color', hex);
		}
		if (options.updateBackground) {
			$(options.updateBackground).css('background-color', hex);
		}
		if (options.updateColor) {
			$(options.updateText).css('color', hex);
		}
		if (options.updateText) {
			$(options.updateText).text(hex);
		}
	};

	// Get and init options
	ColorPicker.prototype.getOptions = function(options) {
		var thisOptions = $.extend({},
		ColorPicker.DEFAULTS, this.$.data(), options);
		if (typeof thisOptions.colors === 'string') thisOptions.colors = thisOptions.colors.split(',');
		var lang = (thisOptions.lang || $.zui.clientLang()).toLowerCase();
		if (!thisOptions.errorTip) {
			thisOptions.errorTip = LANG[lang].errorTip;
		}
		if (!$.fn.tooltip) thisOptions.btnTip = false;
		this.options = thisOptions;
	};

	// Extense jquery element
	$.fn.colorPicker = function(option) {
		return this.each(function() {
			var $this = $(this);
			var data = $this.data(name);
			var options = typeof option == 'object' && option;

			if (!data) $this.data(name, (data = new ColorPicker(this, options)));

			if (typeof option == 'string') data[option]();
		});
	};

	$.fn.colorPicker.Constructor = ColorPicker;

	// Auto call colorPicker after document load complete
	$(function() {
		$('[data-provide="colorpicker"]').colorPicker();
	});
}(jQuery));

/* =======================================================================
 * jquery.HuiaddFavorite.js 添加收藏
 * <a title="收藏本站" href="javascript:;" onClick="addFavoritepage('H-ui前端框架','http://www.h-ui.net/');">收藏本站</a>
 * function shoucang(name,site){
	$.addFavorite({
		name:name,
		site:site,
	});
 * ========================================================================*/
function HuiaddFavorite(obj) {
	obj.site = obj.site || window.location.href;
	obj.name = obj.name || document.title;
	try {
		window.external.addFavorite(obj.site, obj.name);
	} catch(e) {
		try {
			window.sidebar.addPanel(name, site, "");
		} catch(e) {
      $("body").Huimodalalert({
        content: '加入收藏失败，请使用Ctrl+D进行添加',
        speed: 2000,
      });
		}
	}
}

/* ========================================================================
 * jQuery.Huisethome.js 设为首页
 * ======================================================================== */
function Huisethome(obj){
	try{
		obj.style.behavior="url(#default#homepage)";
		obj.setHomePage(webSite);
	}
	catch(e){
		if(window.netscape){
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
				}
			catch(e){
        $("body").Huimodalalert({
          content: "此操作被浏览器拒绝！\n请在浏览器地址栏输入\"about:config\"并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。",
          speed: 2000,
        });
			}
			var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
			prefs.setCharPref('browser.startup.homepage',url);
		}
	}
}

/* =======================================================================
 * jQuery.Huisidenav.js 左侧菜单-隐藏显示
 * ======================================================================== */
function displaynavbar(obj){
	if($(obj).hasClass("open")){
		$(obj).removeClass("open");
		$("body").removeClass("big-page");
	} else {
		$(obj).addClass("open");
		$("body").addClass("big-page");
	}
}

/* =======================================================================
 * jQuery.Huihover.js v2.0 Huihover
 * http://www.h-ui.net/
 * Created & Modified by guojunhui
 * Date modified 2017.05.05
 *
 * Copyright 2017 北京颖杰联创科技有限公司 All rights reserved.
 * Licensed under MIT license.
 * http://opensource.org/licenses/MIT
 * ========================================================================*/
!function($) {
	$.fn.Huihover = function(options){
		var defaults = {
			className:"hover",
		}
		var options = $.extend(defaults, options);
		this.each(function(){
			var that = $(this);
			that.hover(function() {
				that.addClass(options.className);
			},
			function() {
				that.removeClass(options.className);
			});
		});
	}
} (window.jQuery);

/* =======================================================================
 * jQuery.Huifocusblur.js v2.0 得到失去焦点
 * http://www.h-ui.net/
 * Created & Modified by guojunhui
 * Date modified 2017.05.09
 *
 * Copyright 2017 北京颖杰联创科技有限公司 All rights reserved.
 * Licensed under MIT license.
 * http://opensource.org/licenses/MIT
 * ========================================================================*/
!function($) {
	$.fn.Huifocusblur = function(options){
		var defaults = {
			className:"focus",
		}
		var options = $.extend(defaults, options);
		this.each(function(){
			var that = $(this);
			that.focus(function() {
				that.addClass(options.className).removeClass("inputError");
			});
			that.blur(function() {
				that.removeClass(options.className);
			});
		});
	}
} (window.jQuery);

/* =======================================================================
 * jQuery.Huiselect.js 选择
 * ========================================================================*/
!function($) {
	$.Huiselect = function(divselectid, inputselectid) {
		var inputselect = $(inputselectid);
		$(divselectid + " cite").click(function() {
			var ul = $(divselectid + " ul");
			ul.slideToggle();
		});
		$(divselectid + " ul li a").click(function() {
			var txt = $(this).text();
			$(divselectid + " cite").html(txt);
			var value = $(this).attr("selectid");
			inputselect.val(value);
			$(divselectid + " ul").hide();
		});
		$(document).click(function() {
			$(divselectid + " ul").hide();
		});
	};
} (window.jQuery);

/* =======================================================================
 * jQuery.Huitab.js v2.0.1 选项卡
 * http://www.h-ui.net/
 * Created & Modified by guojunhui
 * Date modified 2017.10.10
 *
 * Copyright 2017 北京颖杰联创科技有限公司 All rights reserved.
 * Licensed under MIT license.
 * http://opensource.org/licenses/MIT
 * ========================================================================*/
!function($) {
	$.fn.Huitab = function(options, callback){
		var defaults = {
			tabBar:'.tabBar span',
			tabCon:".tabCon",
			className:"current",
			tabEvent:"click",
			index:0
		}
		var options = $.extend(defaults, options);
		this.each(function(){
			var that = $(this);
			that.find(options.tabBar).removeClass(options.className);
			that.find(options.tabBar).eq(options.index).addClass(options.className);
			that.find(options.tabCon).hide();
			that.find(options.tabCon).eq(options.index).show();

            that.find(options.tabBar).on(options.tabEvent, function () {
                var oldIndex = that.find('.tabBar .' + options.className).index();
				that.find(options.tabBar).removeClass(options.className);
				$(this).addClass(options.className);
				var index = that.find(options.tabBar).index(this);
				that.find(options.tabCon).hide();
				that.find(options.tabCon).eq(index).show();
				if (callback) {
					callback(oldIndex,index);
				}
			});
		});
	}
} (window.jQuery);

/* =======================================================================
 * jQuery.Huifold.js v2.1 折叠
 * http://www.h-ui.net/
 * Created & Modified by guojunhui
 * Date modified 2012.10.12
 * Copyright 2017-2020 郭俊辉 All rights reserved.
 * Licensed under MIT license.
 * http://opensource.org/licenses/MIT
 * ========================================================================*/
!function($) {
	$.fn.Huifold = function(options){
		var defaults = {
			item: '.item',
			titCell:'.Huifold-header',
			mainCell:'.Huifold-body',
			type:1,//1	只打开一个，可以全部关闭;2	必须有一个打开;3	可打开多个
			trigger:'click',
			className:"selected",
			speed:'normal',
			openKeys: []
		}
		var options = $.extend(defaults, options);
		this.each(function() {
			var that = $(this);
			if(options.openKeys && options.openKeys.length > 0) {
				for(var i=0;i<options.openKeys.length; i++) {
					
					var $item = that.find(options.item).eq(options.openKeys[i]);
					$item.find(options.titCell).addClass(options.className);
					$item.find(options.mainCell).show();
					if ($item.find(options.titCell).find("b")) {
						$item.find(options.titCell).find("b").html("-");
					}
				}
			}

			that.find(options.titCell).on(options.trigger,function(){
				if ($(this).next().is(":visible")) {
					if (options.type == 2) {
						return false;
					} else {
						$(this).next().slideUp(options.speed).end().removeClass(options.className);
						if ($(this).find("b")) {
							$(this).find("b").html("+");
						}
					}
				}else {
					if (options.type == 3) {
						$(this).next().slideDown(options.speed).end().addClass(options.className);
						if ($(this).find("b")) {
							$(this).find("b").html("-");
						}
					} else {
						that.find(options.mainCell).slideUp(options.speed);
						that.find(options.titCell).removeClass(options.className);
						if (that.find(options.titCell).find("b")) {
							that.find(options.titCell).find("b").html("+");
						}
						$(this).next().slideDown(options.speed).end().addClass(options.className);
						if ($(this).find("b")) {
							$(this).find("b").html("-");
						}
					}
				}
			});
			
		});
	}
} (window.jQuery);

/* =======================================================================
 * jQuery.Huitags.js v2.0 标签
 * http://www.h-ui.net/
 * Created & Modified by guojunhui
 * Date modified 2017.05.10
 *
 * Copyright 2017 北京颖杰联创科技有限公司 All rights reserved.
 * Licensed under MIT license.
 * http://opensource.org/licenses/MIT
 * ========================================================================*/
!function($) {
	$.fn.Huitags = function(options) {
		var defaults = {
			value:'Hui前端框架,H-ui,辉哥',
			maxlength : 20,
			number : 5,
			tagsDefault : ["Html","CSS","JS"],
		}
		var options = $.extend(defaults, options);
		var keyCodes = {
			Enter : 13,
			Enter2 : 108,
			Spacebar:32
		}
		this.each(function(){
			var that = $(this);
			var str =
			'<div class="Huitags-wraper">'+
				'<div class="Huitags-editor cl"></div>'+
				'<div class="Huitags-input-wraper">'+
					'<input type="text" class="input-text Huitags-input" maxlength="'+options.maxlength+'" value="">'+
				'</div>'+
				'<div class="Huitags-list">'+
					'<div class="Huitags-notag" style="display:none">暂无常用标签</div>'+
					'<div class="Huitags-has"></div>'+
				'</div>'+
				'<input type="hidden" class="Huitags-val" name="" value="'+options.value+'">'+
			'</div>';
			that.append(str);
			var wraper = that.find(".Huitags-wraper");
			var editor = that.find(".Huitags-editor");
			var input =that.find(".Huitags-input");
			var list = that.find(".Huitags-list");
			var has = that.find(".Huitags-has");
			var val = that.find(".Huitags-val");



			if(options.tagsDefault){
				var tagsDefaultLength = (options.tagsDefault).length;
				for(var i = 0;i< tagsDefaultLength; i++){
					has.append('<span>'+options.tagsDefault[i]+'</span>');
				}
				has.find("span").on('click',function(){
					var taghasV = $(this).text();
					taghasV=taghasV.replace(/(^\s*)|(\s*$)/g,"");
					editor.append('<span class="Huitags-token">'+taghasV+'</span>');
					gettagval(this);
					$(this).remove();
				});
			}

			function gettagval(obj) {
				var str = "";
				var token = that.find(".Huitags-token");
				if (token.length < 1) {
					input.val("");
					return false;
				}
				for (var i = 0; i < token.length; i++) {
					str += token.eq(i).text() + ",";
				}
				str = unique(str, 1);
				str=str.join();
				val.val(str);
			}
			/*将字符串逗号分割成数组并去重*/
			function unique(o, type){
				//去掉前后空格
				o=o.replace(/(^\s*)|(\s*$)/g,"");
				if(type == 1) {
					//把所有的空格和中文逗号替换成英文逗号
					o=o.replace(/(\s)|(，)/g, ",");
				} else {
					//把所有的中文逗号替换成英文逗号
					o=o.replace(/(，)/g, ",");
				}
				//去掉前后英文逗号
				o=o.replace(/^,|,$/g, "");
				//去重连续的英文逗号
				o=o.replace(/,+/g,',');
				o=o.split(",");
				var n = [o[0]]; //结果数组
				for(var i = 1; i < o.length; i++){
					if (o.indexOf(o[i]) == i) {
						if(o[i] == "")
							continue;
						n.push(o[i]);
					}
				}
				return n;
			}

			input.on("keydown",function(e){
				var evt = e || window.event;
				if (evt.keyCode == keyCodes.Enter || evt.keyCode == keyCodes.Enter2 || evt.keyCode == keyCodes.Spacebar) {
					var v = input.val().replace(/\s+/g, "");
					var reg = /^,|,$/gi;
					v = v.replace(reg, "");
					v = $.trim(v);
					if (v != '') {
						input.change();
					}else{
						return false;
					}
				}
			});

			input.on("change",function(){
				var v1 = input.val();
				var v2 = val.val();
				var v = v2+','+v1;
				if(v!=''){
					var str='<i class="Huitags-icon Hui-iconfont">&#xe64b;</i>';
					var result = unique(v, 1);
					if(result.length>0){
						for(var j=0;j<result.length;j++){
							str+='<span class="Huitags-token">'+result[j]+'</span>';
						}
						val.val(result);
						editor.html(str);
						input.val("").blur();
					}
				}
			});

			$(document).on("click",".Huitags-token",function(){
				$(this).remove();
				var str ="";
				if(that.find(".Huitags-token").length<1){
					val.val("");
					return false;
				}else{
					for(var i = 0;i< that.find(".Huitags-token").length;i++){
						str += that.find(".Huitags-token").eq(i).text() + ",";
					}
					str = str.substring(0,str.length-1);
					val.val(str);
				}
			});
			input.change();
		});
	}
} (window.jQuery);

/* =======================================================================
 * jQuery.Huitagsmixed.js 标签混排效果
 * ========================================================================*/
!function($) {
	$.Huitagsmixed = function(obj) {
		$(obj).each(function() {
			var x = 9;
			var y = 0;
			var rand = parseInt(Math.random() * (x - y + 1) + y);
			$(this).addClass("tags" + rand);
		});
	}
} (window.jQuery);

/* =======================================================================
 * jQuery.Huitextarealength.js v2.0 字数限制
 * http://www.h-ui.net/
 * Created & Modified by guojunhui
 * Date modified 2017.05.12
 *
 * Copyright 2017 北京颖杰联创科技有限公司 All rights reserved.
 * Licensed under MIT license.
 * http://opensource.org/licenses/MIT
 * ========================================================================*/
!function($) {
	$.fn.Huitextarealength = function(options){
		var defaults = {
			minlength:0,
			maxlength:140,
			errorClass:"error",
			exceed:true,
		}
		var options = $.extend(defaults, options);
		this.each(function(){
			var that = $(this);
			var v = that.val();
			var l = v.length;
			var str = '<p class="textarea-numberbar"><em class="textarea-length">'+l+'</em>/'+options.maxlength+'</p>';
			that.parent().append(str);

			that.on("keyup",function(){
				v = that.val();
				l = v.length;
				if (l > options.maxlength) {
					if(options.exceed){
						that.addClass(options.errorClass);
					}else{
						v = v.substring(0, options.maxlength);
						that.val(v);
						that.removeClass(options.errorClass);
					}
				}
				else if(l<options.minlength){
					that.addClass(options.errorClass);
				}else{
					that.removeClass(options.errorClass);
				}
				that.parent().find(".textarea-length").text(v.length);
			});

		});
	}
} (window.jQuery);

/* =======================================================================
 * jQuery.Huipreview.js v2.1 图片预览
 * http://www.h-ui.net/
 * Created & Modified by guojunhui
 * Date modified 2017.11.13
 *
 * Copyright 2017 北京颖杰联创科技有限公司 All rights reserved.
 * Licensed under MIT license.
 * http://opensource.org/licenses/MIT
 * ========================================================================*/
!function ($) {
	$.fn.Huipreview = function (options) {
		var defaults = {
			className: "active",
			bigImgWidth: 300,
		};
		var options = $.extend(defaults, options);
		this.each(function () {
			var that = $(this);
			var timer;
			that.hover(
				function () {
					clearTimeout(timer);
					timer = setTimeout(function () {
						$("#preview-wraper").remove();
						var smallImg = that.find("img").attr("src");
						var bigImg = that.attr('data-src');
						var bigImgW = that.attr('data-width');
						var bigImgH = that.attr('data-height');
						var winW = $(window).width();
						var winW5 = winW / 2;
						var imgT = that.parent().offset().top;
						var imgL = that.parent().offset().left;
						var imgW = that.parent().width();
						var imgH = that.parent().height();
						var ww = (imgL + imgW / 2);
						var tooltipLeft = "auto", tooltipRight = "auto";
						if (ww < winW5) {
							tooltipLeft = (imgW + imgL) + "px";
						} else {
							tooltipRight = (winW - imgL) + "px";
						}

						that.addClass(options.className);
						if (bigImg == '') {
							return false;
						} else {
							var tooltip_keleyi_com =
								'<div id="preview-wraper" style="position: absolute;z-index:999;width:' + options.bigImgWidth + 'px;height:auto;top:' + imgT + 'px;right:' + tooltipRight + ';left:' + tooltipLeft + '">' +
								'<img src="' + smallImg + '" width="' + options.bigImgWidth + '">' +
								'</div>';
							$("body").append(tooltip_keleyi_com);
							/*图片预加载*/
							var image = new Image();
							image.src = bigImg;
							/*创建一个Image对象*/
							image.onload = function () {
								$('#preview-wraper').find("img").attr("src", bigImg).css("width", options.bigImgWidth);
							};
						}
					}, 500);
				},
				function () {
					clearTimeout(timer);
					that.removeClass(options.className);
					$("#preview-wraper").remove();
				}
			);
		});
	}
}(window.jQuery);

/* =======================================================================
 * jQuery.Huimodalalert.js alert
 * ========================================================================*/
!function ($) {
  $.fn.Huimodalalert = function (options, callback) {
    var defaults = {
      btn: ['确定'],
      content:'弹窗内容',
      speed: "0",
      area: ['400', 'auto'],
    };
    var options = $.extend(defaults, options);
    this.each(function () {
      var that = $(this);
      var w= 0,h=0,t=0,l=0;
      if (options.area[0]=='auto'){
        w ='400px';
        l = -(400 / 2) + 'px';
      }else{
        w = options.area[0] + 'px';
        l = -(options.area[0] / 2) + 'px';
      }
      if (options.area[1] == 'auto') {
        h = 'auto';
      } else {
        h = options.area[1] + 'px';
      }
      var htmlstr =
      '<div id="Huimodalalert" class="modal modal-alert radius" style="width:' + w + ';height:' + h + ';margin-left:' + l +'">' +
        '<div class="modal-alert-info">' + options.content + '</div>' +
        '<div class="modal-footer">'+
          '<button class="btn btn-primary radius">' + options.btn[0]+'</button>'+
        '</div>' +
      '</div>'+
      '<div id="Huimodalmask" class="Huimodalmask"></div>';

      if ($("#Huimodalalert").length > 0) {
        $("#Huimodalalert,#Huimodalmask").remove();
      }
      if (options.speed==0){
        $(document.body).addClass("modal-open").append(htmlstr);
        $("#Huimodalalert").fadeIn();
      }else{
        $(document.body).addClass("modal-open").append(htmlstr);
        $("#Huimodalalert").find(".modal-footer").remove();
        $("#Huimodalalert").fadeIn();
        setTimeout(function(){
          $("#Huimodalalert").fadeOut("normal",function () {
            huimodalhide();
          });
        }, options.speed);
      }

      var button = that.find(".modal-footer .btn");
      button.on("click",function(){
        $("#Huimodalalert").fadeOut("normal", function () {
          huimodalhide();
        });
      });

      function huimodalhide(){
        $("#Huimodalalert,#Huimodalmask").remove();
        $(document.body).removeClass("modal-open");
        if (callback) {
          callback();
        }
      }
    });
  }
}(window.jQuery);

/* =======================================================================
 * jQuery.Huialert.js alert
 * ========================================================================*/
!function($) {
	$.Huialert = function() {
		$('.Huialert i').Huihover();
		$(document).on("click",".Huialert i",function() {
			var Huialert = $(this).parents(".Huialert");
			Huialert.fadeOut("normal",function() {
				Huialert.remove();
			});
		});
	}
	$.Huialert();
} (window.jQuery);

/* =======================================================================
 * jQuery.Huitotop.js v2.0 返回顶部
 * http://www.h-ui.net/
 * Created & Modified by guojunhui
 * Date modified 2017.05.05
 *
 * Copyright 2017 北京颖杰联创科技有限公司 All rights reserved.
 * Licensed under MIT license.
 * http://opensource.org/licenses/MIT
 * ========================================================================*/
!function($) {
	//bottom 距离底部高度
	$.Huitotop = function(bottom){
		if(!bottom){
			bottom = 60;
		}
		var str ='<a href="javascript:void(0)" class="tools-right toTop Hui-iconfont" title="返回顶部" alt="返回顶部" style="display:none;bottom:'+bottom+'px">&#xe684;</a>';
		$(str).appendTo($('body')).click(function() {
			$("html, body").animate({
				scrollTop: 0
			},
			120);
		});
		var backToTopFun = function(){
			var st = $(document).scrollTop();
			var winh = $(window).height();
			if(st> 0){
				$(".toTop").show();
			}else{
				$(".toTop").hide();
			}
			/*IE6下的定位*/
			if (!window.XMLHttpRequest) {
				$(".toTop").css("top", st + winh - 166);
			}

		}
		$(window).on("scroll",backToTopFun);
	}
} (window.jQuery);

/* =======================================================================
 * jQuery.Huimarquee.js 滚动
 * ========================================================================*/
!function($) {
	$.Huimarquee = function(height, speed, delay) {
		var scrollT;
		var pause = false;
		var ScrollBox = document.getElementById("marquee");
		if (document.getElementById("holder").offsetHeight <= height) return;
		var _tmp = ScrollBox.innerHTML.replace('holder', 'holder2');
		ScrollBox.innerHTML += _tmp;
		ScrollBox.onmouseover = function() {
			pause = true;
		}
		ScrollBox.onmouseout = function() {
			pause = false;
		}
		ScrollBox.scrollTop = 0;
		var start = function() {
			scrollT = setInterval(scrolling, speed);
			if (!pause) ScrollBox.scrollTop += 2;
		}
		var scrolling = function() {
			if (ScrollBox.scrollTop % height != 0) {
				ScrollBox.scrollTop += 2;
				if (ScrollBox.scrollTop >= ScrollBox.scrollHeight / 2) ScrollBox.scrollTop = 0;
			} else {
				clearInterval(scrollT);
				setTimeout(start, delay);
			}
		}
		setTimeout(start, delay);
	}
} (window.jQuery);

$(function() {
	/*上传*/
	$(document).on("change", ".input-file",function() {
		var uploadVal = $(this).val();
		$(this).parent().find(".upload-url").val(uploadVal).focus().blur();
	});
});

/* ========================================================================
 * Bootstrap.button.js v3.3.0
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
!function($) {
	'use strict';
	// BUTTON PUBLIC CLASS DEFINITION
	// ==============================
	var Button = function(element, options) {
		this.$element = $(element);
		this.options = $.extend({},Button.DEFAULTS, options);
		this.isLoading = false;
	}
	Button.VERSION = '3.3.0'

	Button.DEFAULTS = {
		loadingText: 'loading...'
	}

	Button.prototype.setState = function(state) {
		var d = 'disabled'
		var $el = this.$element
		var val = $el.is('input') ? 'val': 'html'
		var data = $el.data();
		state = state + 'Text';
		if (data.resetText == null) $el.data('resetText', $el[val]());
		// push to event loop to allow forms to submit
		setTimeout($.proxy(function() {
			$el[val](data[state] == null ? this.options[state] : data[state]);
			if (state == 'loadingText') {
				this.isLoading = true;
				$el.addClass(d).attr(d, d);
			} else if (this.isLoading) {
				this.isLoading = false;
				$el.removeClass(d).removeAttr(d);
			}
		},
		this), 0)
	}

	Button.prototype.toggle = function() {
		var changed = true;
		var $parent = this.$element.closest('[data-toggle="buttons"]');

		if ($parent.length) {
			var $input = this.$element.find('input');
			if ($input.prop('type') == 'radio') {
				if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
				else $parent.find('.active').removeClass('active')
			}
			if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
		} else {
			this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
		}

		if (changed) this.$element.toggleClass('active')
	}

	// BUTTON PLUGIN DEFINITION
	// ========================
	function Plugin(option) {
		return this.each(function() {
			var $this = $(this);
			var data = $this.data('bs.button');
			var options = typeof option == 'object' && option;
			if (!data) $this.data('bs.button', (data = new Button(this, options)))

			if (option == 'toggle') data.toggle()
			else if (option) data.setState(option)
		})
	}

	var old = $.fn.button;

	$.fn.button = Plugin;
	$.fn.button.Constructor = Button;
	// BUTTON NO CONFLICT
	// ==================
	$.fn.button.noConflict = function() {
		$.fn.button = old;
		return this;
	}

	// BUTTON DATA-API
	// ===============
	$(document).on('click.bs.button.data-api', '[data-toggle^="button"]',
	function(e) {
		var $btn = $(e.target);
		if (!$btn.hasClass('btn'));
		$btn = $btn.closest('.btn');
		Plugin.call($btn, 'toggle');
		e.preventDefault();
	}).on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]',
	function(e) {
		$(e.target).closest('.btn').toggleClass('focus', e.type == 'focus');
	})
} (jQuery);

/* =======================================================================
 * jQuery.stickUp.js v0.5.7 BETA  by:LiranCohen
 * https://github.com/LiranCohen/stickUp
 * ======================================================================== */
jQuery(function($) {
	$(document).ready(function(){
		var contentButton = [];
		var contentTop = [];
		var content = [];
		var lastScrollTop = 0;
		var scrollDir = '';
		var itemClass = '';
		var itemHover = '';
		var menuSize = null;
		var stickyHeight = 0;
		var stickyMarginB = 0;
		var currentMarginT = 0;
		var topMargin = 0;
		var vartop = 0;
		$(window).scroll(function(event){
   			var st = $(this).scrollTop();
   			if (st > lastScrollTop){
       			scrollDir = 'down';
   			} else {
      			scrollDir = 'up';
   			}
  			lastScrollTop = st;
		});
		$.fn.stickUp = function( options ) {
			// adding a class to users div
			$(this).addClass('stuckMenu');
        	//getting options
        	var objn = 0;
        	if(options != null) {
	        	for(var o in options.parts) {
	        		if (options.parts.hasOwnProperty(o)){
	        			content[objn] = options.parts[objn];
	        			objn++;
	        		}
	        	}
	  			if(objn == 0) {
	  				console.log('error:needs arguments');
	  			}

	  			itemClass = options.itemClass;
	  			itemHover = options.itemHover;
	  			if(options.topMargin != null) {
	  				if(options.topMargin == 'auto') {
	  					topMargin = parseInt($('.stuckMenu').css('margin-top'));
	  				} else {
	  					if(isNaN(options.topMargin) && options.topMargin.search("px") > 0){
	  						topMargin = parseInt(options.topMargin.replace("px",""));
	  					} else if(!isNaN(parseInt(options.topMargin))) {
	  						topMargin = parseInt(options.topMargin);
	  					} else {
	  						console.log("incorrect argument, ignored.");
	  						topMargin = 0;
	  					}
	  				}
	  			} else {
	  				topMargin = 0;
	  			}
	  			menuSize = $('.'+itemClass).size();
  			}
			stickyHeight = parseInt($(this).height());
			stickyMarginB = parseInt($(this).css('margin-bottom'));
			currentMarginT = parseInt($(this).next().closest('div').css('margin-top'));
			vartop = parseInt($(this).offset().top);
			//$(this).find('*').removeClass(itemHover);
		}
		$(document).on('scroll', function() {
			varscroll = parseInt($(document).scrollTop());
			if(menuSize != null){
				for(var i=0;i < menuSize;i++)
				{
					contentTop[i] = $('#'+content[i]+'').offset().top;
					function bottomView(i) {
						contentView = $('#'+content[i]+'').height()*.4;
						testView = contentTop[i] - contentView;
						if(varscroll > testView){
							$('.'+itemClass).removeClass(itemHover);
							$('.'+itemClass+':eq('+i+')').addClass(itemHover);
						} else if(varscroll < 50){
							$('.'+itemClass).removeClass(itemHover);
							$('.'+itemClass+':eq(0)').addClass(itemHover);
						}
					}
					if(scrollDir == 'down' && varscroll > contentTop[i]-50 && varscroll < contentTop[i]+50) {
						$('.'+itemClass).removeClass(itemHover);
						$('.'+itemClass+':eq('+i+')').addClass(itemHover);
					}
					if(scrollDir == 'up') {
						bottomView(i);
					}
				}
			}
			if(vartop < varscroll + topMargin){
				$('.stuckMenu').addClass('isStuck');
				$('.stuckMenu').next().closest('div').css({
					'margin-top': stickyHeight + stickyMarginB + currentMarginT + 'px'
				}, 10);
				$('.stuckMenu').css("position","fixed");
				$('.isStuck').css({
					top: '0px'
				}, 10, function(){

				});
			};

			if(varscroll + topMargin < vartop){
				$('.stuckMenu').removeClass('isStuck');
				$('.stuckMenu').next().closest('div').css({
					'margin-top': currentMarginT + 'px'
				}, 10);
				$('.stuckMenu').css("position","relative");
			};
		});
	});
});

/* =======================================================================
 * Bootstrap.modal.js v3.3.0
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
!function($) {
	'use strict';
	// MODAL CLASS DEFINITION
	// ======================
	var Modal = function(element, options) {
		this.options = options;
		this.$body = $(document.body);
		this.$element = $(element);
		this.$backdrop =
		this.isShown = null;
		this.scrollbarWidth = 0;

		if (this.options.remote) {
			this.$element.find('.modal-content').load(this.options.remote, $.proxy(function() {
				this.$element.trigger('loaded.bs.modal');
			},
			this))
		}
	}

	Modal.VERSION = '3.3.0';
	Modal.TRANSITION_DURATION = 300;
	Modal.BACKDROP_TRANSITION_DURATION = 150;

	Modal.DEFAULTS = {
		backdrop: true,
		keyboard: true,
		show: true,
	}

	Modal.prototype.toggle = function(_relatedTarget) {
		return this.isShown ? this.hide() : this.show(_relatedTarget)
	}

	Modal.prototype.show = function(_relatedTarget) {
		var that = this;
		var e = $.Event('show.bs.modal', {
			relatedTarget: _relatedTarget
		});

		this.$element.trigger(e);
		if (this.isShown || e.isDefaultPrevented()) return;
		this.isShown = true;
		this.checkScrollbar();
		this.$body.addClass('modal-open');
		this.setScrollbar();
		this.escape();
		this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));

		this.backdrop(function() {
			var transition = $.support.transition && that.$element.hasClass('fade');
			if (!that.$element.parent().length) {
				that.$element.appendTo(that.$body); // don't move modals dom position
			}
			that.$element.show().scrollTop(0);
			if (transition) {
				that.$element[0].offsetWidth; // force reflow
			}
			that.$element.addClass('in').attr('aria-hidden', false);

			that.enforceFocus();

			var e = $.Event('shown.bs.modal', {
				relatedTarget: _relatedTarget
			})

			transition ? that.$element.find('.modal-dialog') // wait for modal to slide in
			.one('bsTransitionEnd',
			function() {
				that.$element.trigger('focus').trigger(e)
			}).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger('focus').trigger(e)
		})
	}

	Modal.prototype.hide = function(e) {
		if (e) e.preventDefault();
		e = $.Event('hide.bs.modal');
		this.$element.trigger(e);
		if (!this.isShown || e.isDefaultPrevented()) return;
		this.isShown = false;
		this.escape();
		$(document).off('focusin.bs.modal');
		this.$element.removeClass('in').attr('aria-hidden', true).off('click.dismiss.bs.modal');
		$.support.transition && this.$element.hasClass('fade') ? this.$element.one('bsTransitionEnd', $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal()
	}

	Modal.prototype.enforceFocus = function() {
		$(document).off('focusin.bs.modal') // guard against infinite focus loop
		.on('focusin.bs.modal', $.proxy(function(e) {
			if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
				this.$element.trigger('focus')
			}
		},
		this))
	}

	Modal.prototype.escape = function() {
		if (this.isShown && this.options.keyboard) {
			this.$element.on('keydown.dismiss.bs.modal', $.proxy(function(e) {
				e.which == 27 && this.hide()
			},
			this))
		} else if (!this.isShown) {
			this.$element.off('keydown.dismiss.bs.modal')
		}
	}

	Modal.prototype.hideModal = function() {
		var that = this;
		this.$element.hide();
		this.backdrop(function() {
			that.$body.removeClass('modal-open');
			that.resetScrollbar();
			that.$element.trigger('hidden.bs.modal');
		})
	}

	Modal.prototype.removeBackdrop = function() {
		this.$backdrop && this.$backdrop.remove();
		this.$backdrop = null;
	}

	Modal.prototype.backdrop = function(callback) {
		var that = this
		var animate = this.$element.hasClass('fade') ? 'fade': ''

		if (this.isShown && this.options.backdrop) {
			var doAnimate = $.support.transition && animate

			this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').prependTo(this.$element).on('click.dismiss.bs.modal', $.proxy(function(e) {
				if (e.target !== e.currentTarget) return this.options.backdrop == 'static' ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this)
			},
			this))

			if (doAnimate) this.$backdrop[0].offsetWidth; // force reflow
			this.$backdrop.addClass('in');
			if (!callback) return;
			doAnimate ? this.$backdrop.one('bsTransitionEnd', callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback();
		} else if (!this.isShown && this.$backdrop) {
			this.$backdrop.removeClass('in');
			var callbackRemove = function() {
				that.removeBackdrop();
				callback && callback();
			}
			$.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one('bsTransitionEnd', callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove()

		} else if (callback) {
			callback();
		}
	}

	Modal.prototype.checkScrollbar = function() {
		this.scrollbarWidth = this.measureScrollbar();
	}

	Modal.prototype.setScrollbar = function() {
		var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10);
		if (this.scrollbarWidth) this.$body.css('padding-right', bodyPad + this.scrollbarWidth);
	}

	Modal.prototype.resetScrollbar = function() {
		this.$body.css('padding-right', '')
	}

	Modal.prototype.measureScrollbar = function() { // thx walsh
		if (document.body.clientWidth >= window.innerWidth) return 0
		var scrollDiv = document.createElement('div');
		scrollDiv.className = 'modal-scrollbar-measure';
		this.$body.append(scrollDiv);
		var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
		this.$body[0].removeChild(scrollDiv);
		return scrollbarWidth;
	}

	// MODAL PLUGIN DEFINITION
	// =======================
	function Plugin(option, _relatedTarget) {
		return this.each(function() {
			var $this = $(this);
			var data = $this.data('bs.modal');
			var options = $.extend({},Modal.DEFAULTS, $this.data(), typeof option == 'object' && option);
			if (!data) $this.data('bs.modal', (data = new Modal(this, options)));
			if (typeof option == 'string') data[option](_relatedTarget);
			else if (options.show) data.show(_relatedTarget);
		})
	}

	var old = $.fn.modal;
	$.fn.modal = Plugin;
	$.fn.modal.Constructor = Modal;

	// MODAL NO CONFLICT
	// =================
	$.fn.modal.noConflict = function() {
		$.fn.modal = old;
		return this;
	}

	// MODAL DATA-API
	// ==============
	$(document).on('click.bs.modal.data-api', '[data-toggle="modal"]',
	function(e) {
		var $this = $(this);
		var href = $this.attr('href');
		var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))); // strip for ie7
		var option = $target.data('bs.modal') ? 'toggle': $.extend({remote: !/#/.test(href) && href},$target.data(), $this.data());

		if ($this.is('a')) e.preventDefault();
		$target.one('show.bs.modal',function(showEvent) {
			if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
			$target.one('hidden.bs.modal',function() {
				$this.is(':visible') && $this.trigger('focus');
			});
		});
		Plugin.call($target, option, this);
	});
} (window.jQuery);

/* =======================================================================
 * Bootstrap.dropdown.js v3.3.0
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
!function($) {
	'use strict';
	var backdrop = '.dropdown-backdrop';
	var toggle = '[data-toggle="dropdown"]';
	var Dropdown = function(element) {
		$(element).on('click.bs.dropdown', this.toggle)
	}
	Dropdown.VERSION = '3.3.5';
	function getParent($this) {
		var selector = $this.attr('data-target');
		if (!selector) {
			selector = $this.attr('href');
			selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
		}
		var $parent = selector && $(selector);
		return $parent && $parent.length ? $parent: $this.parent();
	}
	function clearMenus(e) {
		if (e && e.which === 3) return $(backdrop).remove();
		$(toggle).each(function() {
			var $this = $(this);
			var $parent = getParent($this);
			var relatedTarget = {
				relatedTarget: this
			}
			if (!$parent.hasClass('open')) return;
			if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget));
			if (e.isDefaultPrevented()) return;
			$this.attr('aria-expanded', 'false');
			$parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget);
		});
	}
	Dropdown.prototype.toggle = function(e) {
		var $this = $(this);
		if ($this.is('.disabled, :disabled')) return;
		var $parent = getParent($this);
		var isActive = $parent.hasClass('open');
		clearMenus();
		if (!isActive) {
			if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
				// if mobile we use a backdrop because click events don't delegate
				$(document.createElement('div')).addClass('dropdown-backdrop').insertAfter($(this)).on('click', clearMenus);
			}
			var relatedTarget = {
				relatedTarget: this
			}
			$parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget));
			if (e.isDefaultPrevented()) return $this.trigger('focus').attr('aria-expanded', 'true');
			$parent.toggleClass('open').trigger('shown.bs.dropdown', relatedTarget);
		}
		return false;
	}
	Dropdown.prototype.keydown = function(e) {
		if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return;
		var $this = $(this);
		e.preventDefault();
		e.stopPropagation();
		if ($this.is('.disabled, :disabled')) return;
		var $parent = getParent($this);
		var isActive = $parent.hasClass('open');
		if (!isActive && e.which != 27 || isActive && e.which == 27) {
			if (e.which == 27)
			$parent.find(toggle).trigger('focus');
			return;
			$this.trigger('click');
		}
		var desc = ' li:not(.disabled):visible a';
		var $items = $parent.find('.dropdown-menu' + desc);
		if (!$items.length) return;
		var index = $items.index(e.target);
		if (e.which == 38 && index > 0) index-- // up
		if (e.which == 40 && index < $items.length - 1) index++; // down
		if (!~index) index = 0;
		$items.eq(index).trigger('focus');
	}
	function Plugin(option) {
		return this.each(function() {
			var $this = $(this);
			var data = $this.data('bs.dropdown');
			if (!data) {
				$this.data('bs.dropdown', (data = new Dropdown(this)));
			}
			if (typeof option == 'string') {
				data[option].call($this);
			}
		});
	}
	var old = $.fn.dropdown;
	$.fn.dropdown = Plugin;
	$.fn.dropdown.Constructor = Dropdown;
	$.fn.dropdown.noConflict = function() {
		$.fn.dropdown = old;
		return this;
	}
	$(document).on('click.bs.dropdown.data-api', clearMenus).on('click.bs.dropdown.data-api', '.dropdown form',
	function(e) {
		e.stopPropagation()
	}).on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown);
} (window.jQuery);
$(function() {
	/*下拉菜单*/
	$(document).on("mouseenter", ".dropDown",
	function() {
		$(this).addClass("hover");
	});
	$(document).on("mouseleave", ".dropDown",
	function() {
		$(this).removeClass("hover");
	});
	$(document).on("mouseenter", ".dropDown_hover",
	function() {
		$(this).addClass("open");
	});
	$(document).on("mouseleave", ".dropDown_hover",
	function() {
		$(this).removeClass("open");
	});
	$(document).on("click", ".dropDown-menu li a",
	function() {
		$(".dropDown").removeClass('open');
	});
	$(document).on("mouseenter", ".menu > li",
	function() {
		$(this).addClass("open");
	});
	$(document).on("mouseleave", ".menu > li",
	function() {
		$(this).removeClass("open");
	});
});
