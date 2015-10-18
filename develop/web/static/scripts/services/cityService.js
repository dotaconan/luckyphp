/**
 * Created by 14080226 on 2015/9/10
 * 获取数据Service
 */
define(["jquery"], function ($) {
    var urlContainer = {
        root: "static/scripts/data/",
        provinceList: "provinceList.js",
        cityList: "cityList.js",
        districtList: "districtList.js"
    };
    return {
        getProvinceList: function (opt) {
            var callback = opt.callback || $.noop;
            var data = opt.data || "";
            var beforeFunction = opt.beforeFunction || $.noop;
            if (beforeFunction && typeof(beforeFunction) == "function") {
                beforeFunction(opt);
            }
            var url = urlContainer.root + urlContainer.provinceList;
            $.ajax({
                url: url,
                type: "get",
                async: true,
                cache: false,
                data: data,
                dataType: "jsonp",
                success: function (data) {
                },
                complete: function (xhr, message) {
                    opt.xhr = xhr;
                    if (xhr.status == 200) {
                        var responseText = xhr.responseText;
                        opt.responseText = responseText;
                        try {
                            opt.jsondata = eval(responseText);
                            opt.errorMessage = "";
                            if (callback && typeof(callback) == "function") {
                                callback(opt);
                            }
                        }
                        catch (e) {
                            opt.jsondata = null;
                            opt.errorMessage = "json数据不正确";
                        }
                    }
                    else {
                        opt.jsondata = null;
                        opt.errorMessage = xhr.statusText;
                    }
                }
            });
        },
        getCityList: function (opt) {
            var callback = opt.callback || $.noop;
            var data = opt.data || "";
            var beforeFunction = opt.beforeFunction || $.noop;
            if (beforeFunction && typeof(beforeFunction) == "function") {
                beforeFunction(opt);
            }
            var url = urlContainer.root + urlContainer.cityList;
            $.ajax({
                url: url,
                type: "get",
                async: true,
                cache: false,
                data: data,
                dataType: "jsonp",
                success: function (data) {
                },
                complete: function (xhr, message) {
                    opt.xhr = xhr;
                    if (xhr.status == 200) {
                        var responseText = xhr.responseText;
                        opt.responseText = responseText;
                        try {
                            opt.jsondata = eval(responseText);
                            opt.errorMessage = "";
                            if (callback && typeof(callback) == "function") {
                                callback(opt);
                            }
                        }
                        catch (e) {
                            opt.jsondata = null;
                            opt.errorMessage = "json数据不正确";
                        }
                    }
                    else {
                        opt.jsondata = null;
                        opt.errorMessage = xhr.statusText;
                    }
                }
            });
        },
        getDistrictList: function (opt) {
            var callback = opt.callback || $.noop;
            var data = opt.data || "";
            var beforeFunction = opt.beforeFunction || $.noop;
            if (beforeFunction && typeof(beforeFunction) == "function") {
                beforeFunction(opt);
            }
            var url = urlContainer.root + urlContainer.districtList;
            $.ajax({
                url: url,
                type: "get",
                async: true,
                cache: false,
                data: data,
                dataType: "jsonp",
                success: function (data) {
                },
                complete: function (xhr, message) {
                    opt.xhr = xhr;
                    if (xhr.status == 200) {
                        var responseText = xhr.responseText;
                        opt.responseText = responseText;
                        try {
                            opt.jsondata = eval(responseText);
                            opt.errorMessage = "";
                            if (callback && typeof(callback) == "function") {
                                callback(opt);
                            }
                        }
                        catch (e) {
                            opt.jsondata = null;
                            opt.errorMessage = "json数据不正确";
                        }
                    }
                    else {
                        opt.jsondata = null;
                        opt.errorMessage = xhr.statusText;
                    }
                }
            });
        }
    }
});
