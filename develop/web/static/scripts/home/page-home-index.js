/**
 * Created by 14080226 on 2015/8/27.
 */
if (require)require.config({
    baseUrl: 'static/scripts',
    paths: {
        jquery: 'lib/plugin/jquery',
        qrcode: 'lib/qrcode/qrcode.min'
    },
    shim: {
        'qrcode': ['jquery']
    }
});
require(['jquery', 'lib/plugin/template.min', 'qrcode', 'services/worksService', 'lib/control/slidePic'], function ($, Template, qrcode, WorksService, imageSlide) {
    if (!window.console) {
        window.console = {
            log: function (msg) {
                //alert(msg);
            }
        }
    }
    var PageHomeIndex = (function () {
        return {
            init: function () {
                this.bindEvent();
                this.initQrcode();
            },
            initQrcode: function () {
                //页面加载完成加载二维�?
                setTimeout(function () {
                    $("#qrcode").html("");
                    if ($("#qrcode").qrcode) {

                        var rendertype = "table";
                        try {
                            var isSupportCanvas = document.createElement("canvas").getContext("2d");
                            rendertype = "canvas";
                        } catch (e) {
                            rendertype = "table";
                        }
                        $("#qrcode").qrcode({
                            "render": rendertype,
                            "width": 116,
                            "height": 116,
                            "color": "#3a3",
                            "text": "http://www.suning.com"
                        });
                    }
                }, 500);
            },
            bindEvent: function () {


            }
        }
    })();
    PageHomeIndex.init();
    return PageHomeIndex;
});