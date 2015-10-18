/**
 * Created by 14080226 on 2015/5/18.
 */
define(['jquery'], function ($) {
    var ActionType = {
        click: "click",
        hover: "hover"
    };

    function tabUtil(opt){
        var _opt = {
            actionType: ActionType.click,
            callback: function () {
            },
            $tab: $(".j-tab"),
            tabClassName:"j-tab",
            tabTitleClassName:"j-tab-title",
            currentClassName: "current",
            tabContentClassName:"j-tab-content"
        };
        $.extend(_opt, opt);
        this.opt = _opt;
        this.init();
    }
    tabUtil.prototype = {
        init: function () {
            this.initHandler(this.opt);
        },
        initHandler: function () {
            var root = this;
            var tabClassName = root.opt.tabClassName;
            var tabTitleClassName = root.opt.tabTitleClassName;
            var currentClassName = root.opt.currentClassName;
            var tabContentClassName = root.opt.tabContentClassName;
            //默认tab为classNames指定
            var $tabs = $("." + tabClassName);
            //传参数
            if (root.opt.$tab && root.opt.$tab.size() > 0) {
                $tabs = this.opt.$tab;
            }
            if ($tabs) {
                $tabs.each(function (index, tab) {
                    var $tab = $(tab);
                    var $lis = $tab.find("."+tabTitleClassName).find("li");
                    var $tabContents = $tab.find("." + tabContentClassName);
                    $lis.bind(root.opt.actionType, function (e) {
                        var $this = $(this);
                        $lis.removeClass(currentClassName);
                        $this.addClass(currentClassName);
                        //tab内容显隐
                        $tabContents.hide();
                        var index = $this.index();
                        $tabContents.eq(index).show();

                        if (root.opt.callback && typeof(root.opt.callback) == "function") {
                            root.opt.current = $this;
                            root.opt.currentTabContent = $tabContents.eq(index);
                            root.opt.index=index;
                            root.opt.callback(root.opt);
                        }
                        return false;
                    });
                });
            }
        },
        setTab:function(index){
            var root=this;
            var $tabTitle=root.opt.$tab.find("." + root.opt.tabTitleClassName).find("li");
            $tabTitle.eq(index).trigger("click");
        }
    };
    return tabUtil;


});
