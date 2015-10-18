/**
 * Created by 14080226 on 2015/5/20.
 */
define(['jquery', 'lib/util/util'], function ($, Util) {
	var root = this;

	/**
	 * 判断浏览器是否支持某一个CSS3属性
	 * @param {String} 属性名称
	 * @return {Boolean} true/false
	 * @version 1.0
	 */
	function supportCss3(style) {
		var prefix = ['webkit', 'Moz', 'ms', 'o'],
			i,
			humpString = [],
			htmlStyle = document.documentElement.style,
			_toHumb = function (string) {
				return string.replace(/-(\w)/g, function ($0, $1) {
					return $1.toUpperCase();
				});
			};

		for (i in prefix)
			humpString.push(_toHumb(prefix[i] + '-' + style));

		humpString.push(_toHumb(style));

		for (i in humpString)
			if (humpString[i] in htmlStyle) return true;

		return false;
	};

	return {
		/**
		 * 判断浏览器是否支持某一个CSS3属性
		 * @param {String} 属性名称
		 * @return {Boolean} true/false
		 * @version 1.0
		 */
		supportCss3: function (style) {
			return supportCss3(style);
		},
		//tab
		Tab: (function () {
			return {
				init: function (opt) {
					this.bindEvent(opt);
				},
				bindEvent: function (opt) {
					var ActionType = {
						click: "click",
						hover: "hover"
					};
					//默认点击的tab
					var actionType = opt.actionType || ActionType.click;
					var callback = opt.callback;

					var root = this;
					var tabClassName = "j-tab";
					var currentClassName = "current";
					var tabContentClassName = "j-tab-content";
					var $tabs = $("." + tabClassName);
					//传参数
					if (opt.$tab && opt.$tab.size() > 0) {
						$tabs = opt.$tab;
					}
					if ($tabs) {
						$tabs.each(function (index, tab) {
							var $tab = $(tab);
							var $lis = $tab.find("ul.j-tab-title li");
							var $tabContents = $tab.find("." + tabContentClassName);

							$lis.bind(actionType, function (e) {
								$this = $(this);
								$lis.removeClass(currentClassName);
								$this.addClass(currentClassName);

								//tab内容显隐
								$tabContents.hide();
								var index = $this.index();
								$tabContents.eq(index).show();

								if (callback && typeof(callback) == "function") {
									opt.current = $this;
									callback(opt);
								}
								return false;
							});
						});
					}
				}
			}
		})(),
		EventHelper: {
			preventDefault: function (e) {
				var e = e || window.event;
				if (e.preventDefault) {
					e.preventDefault();
				}
				else {
					e.returnValue = false;
				}
			},
			preventBubbles: function (e) {
				var e = e || window.event;
				if (e.preventBubbles) {
					e.preventBubbles();
				}
				else {
					e.cancelBubble = true;
				}
			}
		},
		PopQuestionHover: (function () {
			var self = this;
			return {
				init: function (opt) {
					this.bindEvent(opt)
				},
				bindEvent: function (opt) {
					var $src = opt.$src;
					var $target = opt.$target;
					$src.delayHover(function () {
						Util.convertFadeCore($src, $target, 'mouseenter', '', 'fadeInUp', 'fadeOutDown');
					}, function () {
						Util.convertFadeCore($src, $target, '', 'mouseleave', 'fadeInUp', 'fadeOutDown');
					}, 100, 0, $target);
				}
			}
		})(),
		PopQuestion: (function () {
			var self = this;
			return {
				init: function (opt) {
					this.popQuestionEvent(opt);
				},
				popQuestionEvent: function (opt) {
					var delayTime = 100;
					if (opt) {
						delayTime = opt.delayTime;
					}
					var isSupportCss3 = supportCss3("animation-play-state");
					var $popQuestion = $(".j-pop-question-target").siblings(".j-pop-question-text");
					$popQuestion.hide();
					var aniIn = "pullUp";
					var aniOut = "fadeOutDown";
					var textClassName = "j-pop-question-text";
					var targetClassName = "j-pop-question-target";

					var $popQuestionSrcs = $(".j-pop-question-src");
					$popQuestionSrcs.each(function (index, obj) {
						var $popQuestionSrc = $(obj);
						var $popQuestionTarget = $popQuestionSrc.siblings("." + targetClassName).find("." + textClassName);
						//规则：鼠标放上去，
						$popQuestionSrc.mouseenter(function () {
							//Util.convertFadeCore($popQuestionSrc, $popQuestionTarget, 'mouseenter', '', 'fadeInUp', 'fadeOutDown');
							$popQuestionTarget.removeClass("fadeOutDown").removeClass("animated");
							setTimeout(function () {
								if (!$popQuestionTarget.hasClass("animated")) {
									$popQuestionTarget.addClass("animated");
								}
								$popQuestionTarget.show();
								$popQuestionTarget.addClass("fadeInUp");
							}, 10);
							//当前处于hover状态
							$popQuestionSrc.data("hover", "1");
						});
						//鼠标移出时需要监听，是否放置目标节点
						$popQuestionSrc.mouseleave(function () {
							$popQuestionSrc.data("hover", "0");
							setTimeout(function () {
								if ($popQuestionSrc.data("hover") != 1) {
									if (!$popQuestionTarget.hasClass("animated")) {
										$popQuestionTarget.addClass("animated");
									}
									$popQuestionTarget.removeClass("fadeInUp").show();
									$popQuestionTarget.addClass("fadeOutDown");
									setTimeout(function () {
										$popQuestionTarget.hide();
										$popQuestionTarget.removeClass("animated");
									}, 100);
								}
							}, 200);
						});
						//移动到目标状态时设置处于hover状态
						$popQuestionTarget.mouseenter(function () {
							$popQuestionSrc.data("hover", "1");
						});
						$popQuestionTarget.mouseleave(function () {
							$popQuestionSrc.data("hover", "0");
							setTimeout(function () {
								if ($popQuestionSrc.data("hover") != 1) {
									$popQuestionTarget.removeClass("fadeInUp").show().addClass("fadeOutDown").addClass("animated");
									setTimeout(function () {
										$popQuestionTarget.hide();
										$popQuestionTarget.removeClass("animated");
									}, 100);
								}
							}, 100);
						});
						/* $popQuestionSrc.delayHover(function () {
						 Util.convertFadeCore($popQuestionSrc, $popQuestionTarget, 'mouseenter', '', 'fadeInUp', 'fadeOutDown');
						 }, function () {
						 Util.convertFadeCore($popQuestionSrc, $popQuestionTarget, '', 'mouseleave', 'fadeInUp', 'fadeOutDown');
						 }, 100, 0, $popQuestionTarget);*/

						/*
						 $popQuestionSrc.hover(function () {
						 $popQuestionSrcs.siblings("." + targetClassName).find("." + textClassName).hide();
						 var $bd = $popQuestionSrc.siblings("." + targetClassName).find("." + textClassName);
						 setTimeout(function () {
						 //动画显示日选择控件
						 if (!$bd.hasClass("animated")) {
						 $bd.addClass("animated");
						 }
						 $bd.show();
						 $bd.removeClass(aniOut).addClass(aniIn);
						 }, delayTime);

						 }, function () {
						 var $bd = $popQuestionSrc.siblings("." + targetClassName).find("." + textClassName);
						 $bd.removeClass("animated").addClass("animated").addClass("animated");
						 $bd.removeClass(aniIn).addClass(aniOut);
						 if (isSupportCss3 == true) {
						 $bd.bind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
						 if ($bd.hasClass(aniOut)) {
						 $bd.css("display", "none");
						 }
						 });
						 }
						 else {
						 $bd.css("display", "none");
						 }
						 });*/
					});
				}
			}
		})(),
		//input输入框focus和blur基本事件
		InputEventsInit: function () {
			$(".j-input-model").on("click", function (e) {
				$(this).addClass("input-focus");
			});
			$(".j-input-model").on("blur", function (e) {
				$(this).removeClass("input-focus");
			});
		},
		Request: {
			GetQueryString: function (name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if (r != null)return unescape(r[2]);
				return null;
			}
		},
		ServerUtil: {
			MsgType: {
				success: "success",
				error: "error"
			},
			getServerTime: function (opt) {
				var self = this;
				var serverTime = new Date();
				var callback = opt.callback || $.noop;
				$.ajax({
					type: "get",
					url: "scripts/time.js",
					async: false,
					complete: function (XHR, TS) {
						var src = "";
						if (TS == self.MsgType.success) {
							//"Thu Jan 01 1970 08:00:00 GMT+0800"
							serverTime = new Date(XHR.getResponseHeader("Date"));
							src = "server";
							//console.log(serverTime)
							var currentYear = 2015;
							var serverYear = serverTime.getFullYear();
							if (serverYear < currentYear) {
								serverTime = new Date();
								src = "client";
							}
						}
						else {
							serverTime = new Date();
							src = "client";
						}
						if (callback && typeof(callback) == "function") {
							opt.serverTime = serverTime;
							opt.src = src;
							callback(opt);
						}
					}
				});
				return serverTime;
			}

		},
		AlertBoxUtil: {
			show: function (opt) {
				var $src = opt.src;
				var $win = opt.win;
				var $mask = opt.mask;
				var beforeFunction = opt.beforeFunction;
				var closeCallback = opt.closeCallback;
				var confirmFunction = opt.confirmFunction;
				if (beforeFunction && typeof(beforeFunction) == "function") {
					beforeFunction(opt);
				}
				resetWinPosition();
				//$win.show();
				//$mask.show();
				$mask.removeClass("lc-mask-hide").addClass("lc-mask-show");
				$win.removeClass("lc-dialog-hide").addClass("lc-dialog-show");
				function resetWinPosition() {
					var scrollTop = $(window).scrollTop();
					var winTop = ($(window).height() - $win.outerHeight()) / 2;
					var targetTop = winTop + scrollTop;
					if (navigator.userAgent.indexOf("MSIE 6.0") > -1) {
						$win.css({
							top: targetTop + "px"
						});
						$mask.css({
							width: $(window).width() + "px",
							height: $(window).height() + scrollTop + "px"
						})
					}
					else {
						$mask.css({
							width: $(window).width() + "px",
							height: $(window).height() + "px"
						})
					}
				}

				$(window).scroll(function () {
					resetWinPosition();
				});
				$(window).resize(function (e) {
					resetWinPosition();
				});
				//关闭窗口事件
				var $btnClose = $win.find(".J-lc-dialog-close");
				if ($btnClose && $btnClose.size() > 0) {
					$btnClose.unbind("click");
					$btnClose.bind("click", function () {
						if (closeCallback && typeof(closeCallback) == "function") {
							closeCallback(opt);
						}
						return false;
					});
				}
				//关闭窗口事件
				var $btnConfirm = $win.find(".J-lc-dialog-confirm");
				if ($btnConfirm && $btnConfirm.size() > 0) {
					$btnConfirm.unbind("click");
					$btnConfirm.bind("click", function () {
						if (confirmFunction && typeof(confirmFunction) == "function") {
							confirmFunction(opt);
						}
						return false;
					});
				}

			},
			close: function (opt) {
				var $src = opt.src;
				var $win = opt.win;
				var $mask = opt.mask;
				$mask.removeClass("lc-mask-show");
				$win.removeClass("lc-dialog-show");
				setTimeout(function () {
					$win.addClass("lc-dialog-hide");
					$mask.addClass("lc-mask-hide");
				}, 0);
			}
		}
	}
});