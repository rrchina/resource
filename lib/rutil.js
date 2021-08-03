(function ($) {
    $.fn.extend({
        moveToStart: function () {
            var $this = this;
            var $t = this[0];
            if ($t.setSelectionRange) {
                $t.setSelectionRange(0, 0);
                $t.focus();
            } else if ($t.createTextRange) {
                var range = $t.createTextRange();
                range.move("character", 0);
                range.select();
            } else {
                $t.focus();
            }
            return $this;
        },
        moveToEnd: function () {
            var $this = this;
            try {
                var $t = this[0];
                if ($t.setSelectionRange) {
                    $t.setSelectionRange($(this).val().length, $(this).val().length);
                    $t.focus();
                } else if ($t.createTextRange) {
                    var range = $t.createTextRange();
                    range.move("character", $(this).val().length);
                    range.select();
                } else {
                    $t.focus();
                }
            } catch (e) { }
            return $this;
        },
        loading: function (msg) {
            var $this = this;
            if (!msg) {
                msg = 'loading';
            }
            $this.data("rOrgText", $this.html());
            $this.data("isLoading", 1);
            $this.html(msg);
            return $this;
        },
        isLoading: function () {
            return this.data("isLoading") == 1;
        },
        resetLoading: function () {
            var $this = this;
            $this.html($this.data("rOrgText"));
            $this.data("isLoading",0);
        },
        getJson: function (options) {
            var settings = {
                checkboxValToString: true, removeEmpty: false, selector: 'input:not([type=file]),select,textarea'
            };
            $.extend(settings, options);
            var json = {};
            $.each(this.find(settings.selector), function (i) {
                var el = $(this), key = el.attr('name'), val = $.trim(el.val());
                if (!key) {
                    key = el.attr("id");
                }
                if (key != undefined && key!="" && val !== undefined && val !== null && (!settings.removeEmpty || val != '')) {
                    if (el.is(':checkbox')) {
                        if (!settings.checkboxValToString) {
                            el.prop('checked') && ($.isArray(json[key]) ? json[key].push(val) : json[key] = [val]);
                        } else {
                            el.prop('checked') && (json[key] = json[key] ? json[key] + "," + val : val);
                        }
                    } else if (el.is(':radio')) {
                        el.prop('checked') && (json[key] = val);
                    } else {
                        json[key] = val;
                    }
                }
            });
            return json;
        }, checkInput: function (options) {
            $e = this;
            var settings = { hasTitle: false, invalidClass: "rInvalid" };
            $.extend(settings, options);
            var validateResult = true;
            var $inputs;
            if ($e.is("[vrf]")) {
                $inputs = $e;
            } else {
                $inputs = $e.find("[vrf]");
            }
            $inputs.each(function (i, el) {
                var $el = $(el);
                var vrfd = true;
                var _v = $.trim($el.val());
                var _vl = _v.length;
                var _cl = $el.attr("length");
                var _rq = $el.attr("required");
                var _vr = $el.attr("valueRange");
                var _isNumber = $el.attr("number");
                var _startWith = $el.attr("startWith");
                var _eq = $el.attr("equal");
                var _cr = new RegExp($el.attr("regex"),"i");
                if (vrfd && _rq != undefined && _v == "") {
                    vrfd = false;
                }
                if (_v!=""&&_cl != undefined) {
                    var min = _cl.split(",")[0];
                    var max = _cl.split(",")[1];
                    if (_vl < min || _vl > max) {
                        vrfd = false;
                    }
                }
                if (vrfd && _v != "" && _cr != undefined && !_cr.test(_v)) {
                    vrfd = false;
                }
                if (vrfd && _v != "" && _isNumber != undefined) {
                    if (isNaN(_v)) {
                        vrfd = false;
                    }
                }
                if (vrfd && _v != "" && _vr != undefined) {
                    var min = _vr.split(",")[0];
                    var max = _vr.split(",")[1];
                    if (parseFloat(_v) < parseFloat(min) || parseFloat(_v) > parseFloat(max)) {
                        vrfd = false;
                    }
                }
                if (vrfd && _v != "" && _startWith != undefined) {
                    if (_v.indexOf(_startWith) != 0) {
                        vrfd = false;
                    }
                }
                if (vrfd && _eq != undefined) {
                    if (_v != $.trim($(_eq).val())) {
                        vrfd = false;
                    }
                }
                if (!vrfd) {
                    if (settings.hasTitle) {
                        $el.prev().addClass(settings.invalideClass);
                    }
                    if (validateResult) {
                        validateResult = false;
                    }
                    setTimeout(function () { $el.addClass(settings.invalidClass) }, 10);
                } else {
                    if (settings.hasTitle) {
                        $el.prev().removeClass(settings.invalidClass);
                    }
                    setTimeout(function () { $el.removeClass(settings.invalidClass) }, 10);
                }
            });
            return validateResult;
        }, checkAndPost: function (options, validateOptions) {
            var $t = this;
            var settings = { url: null, dataType: "json", extraData: {}, success: null, error: null, complete: null, invalid: null,before:null, beforeSend: null ,delay:0};
            var validateSettings = { hasTitle: false, invalidClass: "rInvalid" };

            $.extend(settings, options);
            $.extend(validateSettings, validateOptions);
            if (!$t.checkInput(validateSettings)) {
                if (settings.invalid && typeof (settings.invalid) == 'function') {
                    settings.invalid();
                } else {
                    showMsg("填写有误");
                }
            } else {
                var data = $.extend($t.getJson(), settings.extraData);
                if (settings.before && typeof (settings.before) == 'function') {
                    settings.before();
                }
                setTimeout(function () {
                    $.ajax({
                        beforeSend: function (xhr) {
                            if (settings.beforeSend && typeof (settings.beforeSend) == 'function') {
                                settings.beforeSend(xhr);
                            }
                        },
                        url: settings.url, data: data, type: "post", dataType: settings.dataType,
                        success: function (r) {
                            if (settings.success && typeof (settings.success) == 'function') {
                                settings.success(r);
                            }
                        },
                        error: function (r) {
                            if (settings.error && typeof (settings.error) == 'function') {
                                settings.error(r);
                            }
                        }, complete: function () {
                            if (settings.complete && typeof (settings.complete) == 'function') {
                                settings.complete();
                            }
                        }
                    });
                }, settings.delay);
            }
        }, getBackgroundImage: function () {
            var bgImg = this.css("background-image");
            if (bgImg) {
                if (bgImg.indexOf('"') != -1) {
                    bgImg = bgImg.substring(bgImg.indexOf('"') + 1, bgImg.lastIndexOf('"'));
                } else {
                    bgImg = bgImg.substring(bgImg.indexOf('(') + 1, bgImg.indexOf(')'));
                }
            }
            return bgImg;
        }, fixTable: function (options) {
            var $this = this;
            var settings = {
                width: '100%', height: '100%', fixColumnNumber: 1, autoShrinkWidth: false, autoShrinkHeight: false
            };
            $.extend(settings,options);
            $this.each(function (i, e) {
                var $e = $(e);
                var tableID = $e.attr("id");
                if ($("#" + tableID + "_tableLayout").length != 0) {
                    $("#" + tableID + "_tableLayout").before($("#" + tableID));
                    $("#" + tableID + "_tableLayout").empty();
                } else {
                    $("#" + tableID).after('<div id="' + tableID + '_tableLayout" autoShrinkWidth=' + settings.autoShrinkWidth + ' fixColumNumber="' + settings.fixColumnNumber + '" autoShrinkHeight="' + settings.autoShrinkHeight + '" class="ftLayout" style="overflow:hidden;position:relative"></div>');
                }
                var $layoutDiv = $("#" + tableID + "_tableLayout");
                $layoutDiv.css({ width: settings.width, height: settings.height });
                $('<div id="' + tableID + '_tableFix" class="ftFix"></div>'
                    + '<div id="' + tableID + '_tableHead" class="ftHead"></div>'
                    + '<div id="' + tableID + '_tableColumn" class="ftColumn"></div>'
                    + '<div id="' + tableID + '_tableData" class="ftData"></div>').appendTo("#" + tableID + "_tableLayout");
                var $fixDiv = $("#" + tableID + "_tableFix"), $headDiv = $("#" + tableID + "_tableHead"), $columnDiv = $("#" + tableID + "_tableColumn"), $dataDiv = $("#" + tableID + "_tableData");
                var oldtable = $("#" + tableID);
                var tableFixClone = oldtable.clone(true);
                tableFixClone.attr("id", tableID + "_tableFixClone");
                tableFixClone.addClass("ftTableFix");
                $fixDiv.append(tableFixClone);
                var tableHeadClone = oldtable.clone(true);
                tableHeadClone.attr("id", tableID + "_tableHeadClone");
                tableHeadClone.addClass("ftTableHead");
                $headDiv.append(tableHeadClone);
                var tableColumnClone = oldtable.clone(true);
                tableColumnClone.attr("id", tableID + "_tableColumnClone");
                tableColumnClone.addClass("ftTableColumn");
                $columnDiv.append(tableColumnClone);
                $dataDiv.append(oldtable);
                var $dataTable = oldtable;
                $dataTable.addClass("ftTableData");
                $layoutDiv.find("table").each(function () {
                    $(this).css("margin", "0");
                });
                $dataDiv.scroll(function () {
                    $headDiv.scrollLeft($dataDiv.scrollLeft());
                    $columnDiv.scrollTop($dataDiv.scrollTop());
                });
                $dataDiv.css({ "overflow-x": "scroll", "overflow-y": "scroll", "width": "100%", "height": "100%", "position": "absolute", "left": 0, "top": 0 });
                ftSetSize(tableID);
            });
        }, paging: function (totalCount, pageIdx, pageSize, loadDataFunc, op) {
            var $this = this;
            var settings = { pagingCount: 9, showLastPage: true, showJump: true, showTotal: true }
            var id = getGuid(false);
            $.extend(settings, op);
            function getTotalPage() {
                if (totalCount == 0)
                    return 1;
                else {
                    if (totalCount % pageSize == 0) {
                        return totalCount / pageSize;
                    } else {
                        return parseInt(totalCount / pageSize) + 1;
                    }
                }
            }
            var totalPage = getTotalPage();
            function getPagingBtn(pageIdx, enabled) {
                if (enabled) {
                    return '<a class="paging" href="javascript:;" onclick="' + loadDataFunc.replace("{0}", pageIdx) + '">' + pageIdx + '</a>';
                } else {
                    return '<span class="paging current">' + pageIdx + '</span>';
                }
            };
            function getPagings() {
                var html = '<div class="pagings">' + (settings.showTotal ? '<span class="paging_total_count">共' + totalCount + '条</span>' : '');
                if (pageIdx > 1) {
                    html += '<a class="paging" href="javascript:;" onclick="' + loadDataFunc.replace("{0}", pageIdx - 1) + '" style="border-radius:3px 0 0 3px">&lt;</a>'
                } else {
                    html += '<span class="paging current" style="border-radius:3px 0 0 3px">&lt;</span>'
                }
                var leftCount = 3, rightCount = 3;

                if (totalPage <= settings.pagingCount) {//可显示完所有页
                    for (var i = 1; i <= totalPage; i++) {
                        if (pageIdx == i)
                            html += getPagingBtn(i, false);
                        else
                            html += getPagingBtn(i, true);
                    }
                } else {
                    leftCount = settings.pagingCount % 2 == 0 ? parseInt(settings.pagingCount / 2 - 1) : parseInt(settings.pagingCount / 2);
                    rightCount = parseInt(settings.pagingCount / 2);
                    if (pageIdx <= leftCount + 1) {//左连续
                        for (var i = 1; i <= settings.pagingCount - 1; i++) {
                            if (i == pageIdx) {
                                html += getPagingBtn(i, false);
                            } else {
                                html += getPagingBtn(i, true);
                            }
                        }
                        html += '<span class="paging pgdot">...</span>';
                        if (settings.showLastPage) {
                            html += getPagingBtn(totalPage, true);
                        }
                    } else {
                        html += getPagingBtn(1, true);
                        html += '<span class="paging pgdot">...</span>';
                        if (pageIdx >= totalPage - rightCount) {//右连续
                            for (var i = totalPage - (settings.pagingCount - 1) + 1; i <= totalPage; i++) {
                                if (i == pageIdx) {
                                    html += getPagingBtn(i, false);
                                } else {
                                    html += getPagingBtn(i, true);
                                }
                            }
                        } else {//中间连续
                            for (var i = pageIdx - leftCount + 1; i <= pageIdx + rightCount - 1; i++) {
                                if (i == pageIdx)
                                    html += getPagingBtn(i, false);
                                else
                                    html += getPagingBtn(i, true);
                            }
                            html += '<span class="paging pgdot">...</span>';
                            if (settings.showLastPage) {
                                html += getPagingBtn(totalPage, true);
                            }
                        }
                    }
                }
                if (pageIdx < totalPage) {
                    html += '<a class="paging" href="javascript:;" onclick="' + loadDataFunc.replace("{0}", pageIdx + 1) + '" style="border-right:1px solid #ddd;border-radius:0 3px 3px 0">&gt;</a>'
                } else {
                    html += '<span class="paging current" style="border-right:1px solid #ddd;border-radius:0 3px 3px 0;">&gt;</span>'
                }
                if (settings.showJump) {
                    html += '<label class="lb_txtPage lb_txtPage1">转到第</label><input type="text" id="pgt_' + id + '" value="' + pageIdx + '" class="txtPage"/><label class="lb_txtPage lb_txtPage2">页</label><label id="pgb_' + id + '" class="btn_jumpToPage">GO</label>'
                }
                return html + '</div>';
            }
            $this.html(getPagings());

            function getPageTxtVal($t) {
                var _v = $t.val().trim();
                _v = parseInt(_v);
                if (isNaN(_v)) {
                    $t.val(pageIdx);
                    _v = pageIdx
                } else {
                    if (_v < 1) {
                        _v = 1; $t.val(_v);
                    } else if (_v > totalPage) {
                        _v = totalPage; $t.val(_v);
                    }
                }
                return _v;
            }
            
            $('#pgt_' + id).keyup(function (e) {
                if (e.keyCode == 13) {
                    var pg = getPageTxtVal($(this));
                    if (pg != pageIdx) {
                        eval(loadDataFunc.replace("{0}", pg));
                    }
                }
            }).click(function () {
                $(this).select();
            });
            $('#pgb_' + id).click(function () {
                var pg = getPageTxtVal($('#pgt_' + id));
                if (pg != pageIdx) {
                    eval(loadDataFunc.replace("{0}", pg));
                }
            });
        }
    });
    $(document).on('blur', '[vrf]', function () {
        $(this).checkInput();
    }).on('keyup', '[vrf]', function () {
        $(this).checkInput();
    }).on('change', '[vrf]', function () {
        $(this).checkInput();
    }).on('click','[postTo]',function(){
        var $t=$(this);
        var url=$t.attr("postTo");
        var data=$t.attr("postData");
        var scfunc=$t.attr("success");
        var _delay=$t.attr("delay");
        if(!_delay){
            _delay=200;
        }
        if(data && (data.startsWith('{')||data.startsWith('{'))){
            data=JSON.parse(data);
        }
        var _r_errMsg=$t.attr("errorMessage");
        var _r_sucMsg=$t.attr("successMessage");
        if(!_r_errMsg){
            _r_errMsg="提交失败";
        }
        if(!_r_sucMsg){
            _r_sucMsg="提交成功";
        }
        showLoading("处理中");
        setTimeout(function (){
            $.ajax({
                url:url,type:'post',data:data,dataType:'json',
                success:function(r){
                    if(r.errorCode==0){
                        if(scfunc){
                            eval(scfunc);
                        }
                    }else{
                        showMsg(r.errorMessage);
                    }
                },error:function(){
                    showMsg(_r_errMsg);
                },complete:function(){
                    showLoading(false);
                }
            });  
        },_delay);
    });
    $(window).resize(function () {
        $(".ftLayout").each(function () {
            var tableID = $(this).attr("id").replace("_tableLayout", "");
            ftSetSize(tableID);
        });
    });
})(jQuery);

var compressImageTempUrl;
//压缩图片，Promise
function compressImage(imageFile, options) {
    //fixedWidth false:只压缩宽度>maxWidth的图片，true：无论大小，都压缩到maxWidth
    //loading/processing 加载时要调用的方法，处理图片时调用的方法
    var settings = { maxWidth: 800,fixedWidth:false,quality:0.9,loading:null,processing:null};
    $.extend(settings, options);
    return new Promise(function (resolve, reject) {
        //读取图片为objecturl或dataurl (objecturl优先，微信dataurl有时很慢)
        if (imageFile.type.indexOf("image") < 0) {
            reject("不支持的图片格式");
        } else {
            if (settings.loading && typeof (settings.loading) == 'function') {
                settings.loading();
            }
            var imageUrl;
            if (window.URL) {
                imageUrl = window.URL.createObjectURL(imageFile);
                compressImageTempUrl = imageUrl;
                resolve(imageUrl);
            } else {
                var reader = new FileReader();
                reader.onload = function (r) {
                    imageUrl = reader.result;
                    compressImageTempUrl = imageUrl;
                    resolve(imageUrl);
                };
                reader.readAsDataURL(file);
            }
        }
    }).then(function (imageUrl) {
        //加载图片
        return new Promise(function (resolve, reject) {
            var img = new Image();
            img.onload = function () {
                resolve(img);
            };
            img.onerror = function () {
                if (window.URL && compressImageTempUrl) {
                    window.URL.revokeObjectURL(compressImageTempUrl); compressImageTempUrl = null;
                }
                reject("加载图片失败");
            }
            img.src = imageUrl;
        });
    }).then(function (img) {
        //处理图片
        return new Promise(function (resolve, reject) {
            try {
                if (settings.processing && typeof (settings.processing) == 'function') {
                    settings.processing();
                }
                var _canvas = document.createElement('canvas');
                if (img.width > settings.maxWidth || settings.fixedWidth) {
                    _canvas.width = settings.maxWidth;
                    _canvas.height = parseInt(settings.maxWidth * img.height / img.width);
                } else {
                    _canvas.width = img.width;
                    _canvas.height = img.height;
                }
                var _context = _canvas.getContext('2d');
                _context.drawImage(img, 0, 0, _canvas.width, _canvas.height);
                var dataurl = _canvas.toDataURL("image/jpeg", settings.quality);
                if (window.URL && compressImageTempUrl) {
                    window.URL.revokeObjectURL(compressImageTempUrl); compressImageTempUrl = null;
                }
                resolve(dataurl);
            } catch(err) {
                reject("压缩图片失败")
            }
        });
    });
}
//压缩图片，普通方式
function compressImage1(imageFile, options) {
    var settings = { maxWidth: 800, fixedWidth: false, quality: 0.9, loading: null, processing: null, error: null, success: null };
    $.extend(settings, options);
    if (imageFile.type.indexOf("image") < 0) {
        if (settings.error && typeof (settings.error) == 'function') {
            settings.error("不支持的图片格式");
        }
    } else {
        if (settings.loading && typeof (settings.loading) == 'function') {
            settings.loading();
        }
        function doCompress(img) {
            try {
                if (settings.processing && typeof (settings.processing) == 'function') {
                    settings.processing();
                }
                var _canvas = document.createElement('canvas');
                if (img.width > settings.maxWidth || settings.fixedWidth) {
                    _canvas.width = settings.maxWidth;
                    _canvas.height = parseInt(settings.maxWidth * img.height / img.width);
                } else {
                    _canvas.width = img.width;
                    _canvas.height = img.height;
                }
                var _context = _canvas.getContext('2d');
                _context.drawImage(img, 0, 0, _canvas.width, _canvas.height);
                var dataurl = _canvas.toDataURL("image/jpeg", settings.quality);
                if (window.URL && compressImageTempUrl) {
                    window.URL.revokeObjectURL(compressImageTempUrl); compressImageTempUrl = null;
                }
                if (settings.success && typeof (settings.success) == 'function') {
                    settings.success(dataurl);
                }
            } catch(err) {
                if (settings.error && typeof (settings.error) == 'function') {
                    settings.error("压缩图片失败");
                }
            }
        }
        function loadImage(imageUrl) {
            var img = new Image();
            img.onload = function () {
                doCompress(img);
            };
            img.onerror = function () {
                if (window.URL && compressImageTempUrl) {
                    window.URL.revokeObjectURL(compressImageTempUrl); compressImageTempUrl = null;
                }
                if (settings.error && typeof (settings.error) == 'function') {
                    settings.error("加载图片失败");
                }
            }
            img.src = imageUrl;
        }

        var imageUrl;
        if (window.URL) {
            imageUrl = window.URL.createObjectURL(imageFile);
            compressImageTempUrl = imageUrl;
            loadImage(imageUrl);
        } else {
            var reader = new FileReader();
            reader.onload = function (r) {
                imageUrl = reader.result;
                compressImageTempUrl = imageUrl;
                loadImage(imageUrl);
            };
            reader.readAsDataURL(file);
        }
        
    }
}

var _rr_msg_timeout;
var _rr_styles=['default','success','error','danger','info']
function showMsg(msg, opts) {
    $("#_rr_msg").remove();
    clearTimeout(_rr_msg_timeout);
    var settings = { bg: "rgba(255,255,255,0.8)", color: "#000", fontSize: "15px",border:"1px solid #ddd", position: "middle",time:2000 ,zIndex:99900000,style:"default",end:null};
    if (opts) {
        $.extend(settings, opts);
    }
    getRMsgStyle(settings);
    $("body").append('<div id="_rr_msg" style="background:' + settings.bg +';color:' + settings.color + ';font-size:' + settings.fontSize + ';border-radius:3px;position:fixed;z-index:'+settings.zIndex+';display:none;text-align:center;padding:15px 20px;box-shadow:0 0 0.5em #555;">'+msg+'</div>');
    var $p = $("#_rr_msg");
    $p.css({ left: ($(window).width() - $p.outerWidth()) / 2 });
    if (settings.y) {
        $p.css({ top: settings.y });
    } else {
        if (settings.position == "top") {
            $p.css({ top: 10 })
        } else if (settings.position == "bottom") {
            $p.css({ bottom: 10 });
        } else {
            $p.css({ top: ($(window).height() - $p.outerHeight()) / 2 });
        }
    }
    $("#_rr_msg").show();
    _rr_msg_timeout = setTimeout(function () { $("#_rr_msg").remove(); if(typeof(settings.end)=="function"){end();}}, settings.time);
}
function getRMsgStyle(settings){
    if(!_rr_styles.contains(settings.style,true)){
        settings.style="default";
    }
    settings.style=settings.style.toLowerCase();
    if(settings.style=="success"){
        settings.bg="#dff0d8";settings.color="#468847";settings.border="1px solid #d6e9c6";
    }else if(settings.style=="error"){
        settings.bg="#f37b1d";settings.color="#fff";settings.border="1px solid #e56c0c";
    }else if(settings.style=="danger"){
        settings.bg="#f2dede";settings.color="#b94a48";settings.border="1px solid #eed3d7";
    }else if(settings.style=="info"){
        settings.bg="#d9edf7";settings.color="#31708f";settings.border="1px solid #bce8f1";
    }
}
function showLoading(msg, opts) {
    if (msg) {
        $("#_rr_wait_msg").remove();
        var settings = { bg: "rgba(255,255,255,0.8)", color: "#000", fontSize: "15px",border:"1px solid #ddd", position: "middle",time:2000 ,zIndex:99900000,style:"default",end:null};
        if (opts) {
            $.extend(settings, opts);
        }
        getRMsgStyle(settings);
        $("body").append('<div id="_rr_wait_msg" style="background:' + settings.bg + ';color:' + settings.color + ';font-size:' + settings.fontSize + ';border-radius:3px;position:fixed;z-index:' + settings.zIndex + ';text-align:center;padding:15px 20px;box-shadow:0 0 0.5em #555">' + msg + '<span id="_rr_wait_msg_per" style="padding-left:10px;font-size:16px;color:'+settings.color+'"></span></div>');
        var $p = $("#_rr_wait_msg");
        $p.css({ left: ($(window).width() - $p.outerWidth()) / 2 });
        if (settings.position == "top") {
            $p.css({ top: 0 })
        } else if (settings.position == "bottom") {
            $p.css({ bottom: 0 });
        } else {
            $p.css({ top: ($(window).height() - $p.outerHeight()) / 2 });
        }
    } else {
        $("#_rr_wait_msg").remove();
    }
}
function setLoadingPercent(p){
    $('#_rr_wait_msg_per').html(p);
}
function showMask(show, opts) {
    var settings = {opacity:0.3,zIndex:90000000,bg:"#000000"};
    if (show) {
        $("#_rr_mask").remove();
        if (opts) {
            $.extend(settings, opts);
        }
        $("body").append('<div id="_rr_mask" style="position:fixed;left:0;top:0;right:0;bottom:0;opacity:' + settings.opacity + ';background:' + settings.bg + ';z-index:' + settings.zIndex + ';"></div>');
    } else {
        $("#_rr_mask").remove();
    }
}
function getData(filter) {
    var data = {};
    $(filter).each(function (i, e) {
        data[$(e).attr("id")] = $.trim($(e).val());
    });
    return data;
}
function enableScroll(enable) {
    if (!enable) {
        var top = $(document).scrollTop();
        $("html").attr("style", "position:fixed;width:100%;overflow-y:scroll").css("top", 0 - top);
    } else {
        var top = parseInt($("html").css("top"));
        $("html").removeAttr("style");
        $(document).scrollTop(0 - top);
    }
}
function getPureUrl(url) {
    if (url.indexOf("#") != -1) {
        url = url.substr(0, url.indexOf("#"));
    }
    if (url.indexOf("!") != -1) {
        url = url.substr(0, url.indexOf("!"));
    }

    if (url.indexOf("?") != -1) {
        url = url.substr(0, url.indexOf("?"));
    }
    return url;
}
Array.prototype.contains = function (v, ignoreCase) {
    for (var i = 0; i < this.length; i++) {
        if (ignoreCase) {
            if ((this[i] + "").toLowerCase() == (v + "").toLowerCase()) {
                return true;
            }
        } else {
            if (this[i] == v) {
                return true;
            }
        }
    }
    return false;
}
Array.prototype.removeValue = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
            this.splice(i, 1);
        }
    }
}
String.prototype.contains = function (s) {
    return this.indexOf(s) == -1 ? false : true;
}
String.prototype.notContainsAny = function (sarr) {
    for (var i = 0; i < sarr.length; i++) {
        if (this.contains(sarr[i])) {
            return false;
        }
    }
    return true;
}
String.prototype.containsAny = function (sarr) {
    for (var i = 0; i < sarr.length; i++) {
        if (this.contains(sarr[i])) {
            return true;
        }
    }
    return false;
}
String.prototype.containsAll = function (sarr) {
    for (var i = 0; i < sarr.length; i++) {
        if (!this.contains(sarr[i])) {
            return false;
        }
    }
    return true;
}

String.prototype.getExtension=function(){
    if (this.contains(".")) {
        return this.substr(this.lastIndexOf(".")).toLowerCase();
    }else{
        return "";
    }
}

String.prototype.delExtension=function(){
    if(this.contains(".")){
        return this.substring(0,this.lastIndexOf("."));
    }else{
        return this;
    }
}

function qnupload(url,key, token, file, success, error) {
    uploadfile(url, file, { key: key, token: token }, success, error);
}
function uploadFile(url,file,data,success,error,complete,progress) {
    var form = new FormData();
    if(data){
        for (var p in data) {
            form.append(p, data[p]);
        }
    }
    form.append("file", file);
    $.ajax({
        xhr:function(){
            var xmlReq = new XMLHttpRequest();
            if(xmlReq.upload && progress){
                xmlReq.upload.addEventListener('progress',function(e){
                    if(e.lengthComputable){
                        progress(e.loaded,e.total,parseInt(10*e.loaded/e.total)/10);
                    }
                });
                xmlReq.upload.addEventListener('load',function(e){
                    progress(e.loaded,e.total,100);
                });
            }
            return xmlReq;
        },
        url:url, type: "post", data: form, contentType: false, processData: false, dataType: "json",
        success: function (r) {
            if (success) {
                success(r);
            }
        }, error: function () {
            if (error) {
                error();
            }
        },complete:function(){
            if (complete) {
                complete();
            }
        }
    });
}
function rGetParamFromUrl(url, name) {
    if (url.indexOf("?") == -1) { return ""; };
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var qs = url.substring(url.indexOf("?") + 1);
    var r = qs.match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    } else {
        return "";
    }
}
function rGetCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    var a=new RegExp();
    if (arr = document.cookie.match(reg)) {
        return decodeURIComponent(arr[2]);
    } else {
        return '';
    }
}
function rgetcookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return decodeURIComponent(arr[2]);
    } else {
        return '';
    }
}
function rSetCookie(name, value, path, domain, expireSeconds) {
    if (domain.indexOf(":") != -1) {
        domain = domain.substr(0, domain.indexOf(":"));
    }
    document.cookie = name + "=" + value + ";expires=" + rgetExpires(expireSeconds) + ";path=" + path + (domain&&domain!=""?(";domain=" + domain):"");
}
function rgetExpires(expireSeconds) { var now = new Date(); now.setTime(now.getTime() + expireSeconds * 1000); return now; }
function ftSetSize(tableID) {
    var scrollBarWidth = getScrollBarWidth();
    var $layoutDiv, $dataDiv, $fixDiv, $headDiv, $columnDiv, $tableData, $tableFix, $tableHead, $tableColumn;
    var autoShrinkWidth, autoShrinkHeight, fixColumnNumber;

    $layoutDiv = $("#" + tableID + "_tableLayout");
    autoShrinkWidth = parseInt($layoutDiv.attr("autoShrinkWidth"));
    autoShrinkHeight = parseInt($layoutDiv.attr("autoShrinkHeight"));
    fixColumnNumber = parseInt($layoutDiv.attr("fixColumNumber"));
    $dataDiv = $layoutDiv.find(".ftData");
    $fixDiv = $layoutDiv.find(".ftFix");
    $headDiv = $layoutDiv.find(".ftHead");
    $columnDiv = $layoutDiv.find(".ftColumn");
    $tableData = $layoutDiv.find(".ftTableData");
    $tableFix = $layoutDiv.find(".ftTableFix");
    $tableHead = $layoutDiv.find(".ftTableHead");
    $tableColumn = $layoutDiv.find(".ftTableColumn");

    //设置所有table宽度一致
    var dataTableWidth = $tableData.outerWidth();
    $tableFix.width(dataTableWidth);
    $tableHead.width(dataTableWidth);
    $tableColumn.width(dataTableWidth);

    var HeadHeight = $headDiv.find("td:first").outerHeight()+1;//加border bottom
    var ColumnsWidth = 0;
    var ColumnsNumber = 0;
    $("#" + tableID + "_tableColumn tr:first td:lt(" + fixColumnNumber + ")").each(function () {
        ColumnsWidth += $(this).outerWidth(true);
        ColumnsNumber++;
    });
    ColumnsWidth += 1;//加border right
    $fixDiv.css({ "overflow": "hidden", "width": ColumnsWidth, "height": HeadHeight, "position": "absolute", "left": 0, top: 0, "z-index": "2", "background-color": "white" });
    $headDiv.css({ "overflow": "hidden", "width": $layoutDiv.width() - scrollBarWidth, "height": HeadHeight, "position": "absolute", "left": 0, "top": 0, "z-index": "1", "background-color": "white" });
    $columnDiv.css({ "overflow": "hidden", "width": ColumnsWidth, "height": $layoutDiv.height() - scrollBarWidth, "position": "absolute", "left": 0, "top": 0, "z-index": "1", "background-color": "white" });
    if (autoShrinkWidth && $dataDiv.width() > dataTableWidth + scrollBarWidth) {
        $headDiv.css("width", dataTableWidth);
        $dataDiv.css("width", dataTableWidth + scrollBarWidth);
        $layoutDiv.css("width", dataTableWidth + scrollBarWidth);
    }
    var dataTableHeight = $tableData.outerHeight();
    if (autoShrinkHeight && $columnDiv.height() > dataTableHeight) {
        $columnDiv.css("height", dataTableHeight);
        $layoutDiv.css("height", dataTableHeight + scrollBarWidth);
    }
}
function getScrollBarWidth() {
    var $div1 = $('<div style="width:100px;height:1px;overflow-y:scroll;overflow-x:hidden"></div>');
    var $div2 = $('<div style="width:100%;height:1px;background:blue"></div>');
    $div1.append($div2);
    $("body").append($div1);
    var scrollBarWidth = 100 - $div2.width();
    $div1.remove();
    return scrollBarWidth;
}
function getGuid(hyphen) {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return S4()+S4()+(hyphen?'-':'')+S4()+(hyphen?'-':'')+S4()+(hyphen?'-':'')+S4()+(hyphen?'-':'')+S4()+S4()+S4();
}