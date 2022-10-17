require.config({
    urlArgs:'',
    paths: {
        jquery: rcdnconfig.JS.jquery,
        util: rcdnconfig.JS.util,
        rs: rcdnconfig.JS.rs
    }, shim: {
        util: ['jquery'],
        rs:['util']
    }
});
require(['jquery', 'util', 'rs'], function ($) {
    $(function () {
        $('[dispicker]').cascade({
            title: '请选择地区', labels: ['省', '市', '区/县'],
            data: districts, onselect: function (e) {
                console.log(e)
            }, maxWidth: 400
        });
        $(document).on('tab.change', '.tab1', function (e) {
            console.log(e.detail.oldIdx, e.detail.newIdx, e.detail.data)
        })
        $('#mymenu').on('menu.change', function (e) {
            console.log(e.detail.oldIdx, e.detail.newIdx, e.detail.data.id)
        })
        $('#aa').marquee();
        $('#switch1').on('change', function (e) {
            console.log(e.detail.value)
        })
        $(document).on('scroll.in', '.scroll-trigger', function (e) {
            console.log($(this).attr('id') + "进入");
        }).on('scroll.out', '.scroll-trigger', function (e) {
            console.log($(this).attr('id') + "退出");
        }).on('click', '#bbox', function () {
            $.bbox({
                title: "hi", content: "hello<br/>这是底部弹出窗口<br/>maxWidth:最大宽度，默读767", maxWidth: 500,
                buttons: {
                    "不关闭": {
                        action: function () {
                            showMsg("return false点击后不会关闭");
                            return false
                        }
                    }, "自定义样式": {
                        style: "background:blue;color:#fff",
                        action() {
                            var that = this;
                            showMsg('自定义按钮样式；即将关闭(this.close())');
                            setTimeout(function () { that.close() }, 2000);
                            return false
                        }
                    }, "默认最后一个按钮颜色": {
                        action() {
                            showMsg('不return 或 return true 点击后会关闭')
                        }
                    }
                }
            })
        }).on('change', '.slider', function (e) {
            $('#slider-value-1').html(e.detail.value);
        }).on('change', 'input[type=checkbox],input[type=radio]', function () {
            var json = $('#cks').getJson({ checkboxValToString: false });
            $('#ckvals').html(JSON.stringify(json));
        }).on('click', '#btn-progress', function () {
            $('.progress').progress(Math.random());
        });
    });
})