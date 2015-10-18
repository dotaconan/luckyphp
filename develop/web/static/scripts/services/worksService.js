/**
 * Created by 14080226 on 2015/9/10
 * 获取数据Service
 */
define(["jquery"], function ($) {
	var urlContainer = {
		root: "static/scripts/data/",
		workList: "home-works-list.json",
		newsList: "home-news.json"
	};
	return {
		getWorkList: function (opt) {
			var callback = opt.callback || $.noop;
			var data = opt.data || "";
			var beforeFunction = opt.beforeFunction || $.noop;
			if (beforeFunction && typeof(beforeFunction) == "function") {
				beforeFunction(opt);
			}
			var url = urlContainer.root + urlContainer.workList;
			$.ajax({
				url: url,
				type: "get",
				async: true,
				cache: false,
				data: data,
				dataType: "json",
				success: function (data) {
				},
				complete: function (xhr, message) {
					opt.xhr = xhr;
					if (message == "success") {
						var responseText = xhr.responseText;
						opt.responseText = responseText;
						try {
							opt.jsondata = eval("(" + responseText + ")");
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
					else if (message == "error") {
						opt.jsondata = null;
						opt.errorMessage = xhr.statusText;
					}
				}
			});
		},
		getNewsList: function (opt) {
			var callback = opt.callback || $.noop;
			var data = opt.data || "";
			var beforeFunction = opt.beforeFunction || $.noop;
			if (beforeFunction && typeof(beforeFunction) == "function") {
				beforeFunction(opt);
			}
			var url = urlContainer.root + urlContainer.newsList;
			$.ajax({
				url: url,
				type: "get",
				async: true,
				cache: false,
				data: data,
				dataType: "json",
				success: function (data) {

				},
				complete: function (xhr, message) {
					opt.xhr = xhr;
					if (message == "success") {
						var responseText = xhr.responseText;
						opt.responseText = responseText;
						try {
							opt.jsondata = eval("(" + responseText + ")");
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
					else if (message == "error") {
						opt.jsondata = null;
						opt.errorMessage = xhr.statusText;
					}
				}
			});
		}
	}
});
