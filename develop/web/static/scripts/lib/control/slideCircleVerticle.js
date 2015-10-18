define(['jquery'], function($){
	function slideCircleVerticle(opt){			
			/**
		 * @param  {[type]} wrap [最外层DOM元素id或class]
		 * @param  {[type]} loopBox [循环滚动的DOM元素]
		 * @param  {[type]} triggerLeft [控制左移的按钮]
		 * @param  {[type]} triggerRight [控制右移的按钮]
		 * @param  {[Object]} step [滚动的元素数量]
		 * @param  {[type]} isLazyLoad [是否需要图片懒加载]
		 * @return {[type]}     [description]
		 */
		var _opt = {
			wrap: '.product-body',
			loopBox: '.nav-tab-panel',
			triggerLeft: '.roll-up',
			triggerRight: '.roll-down',
			height: 2,
			step: 2,
			deviation: -4,
			isLazyLoad: true
		}
		function isFunction(obj) {
			return Object.prototype.toString.call(obj) === '[object Function]'
		}
		$.extend(_opt,opt);
		var box = typeof _opt.wrap == 'string'? $(_opt.wrap) : _opt.wrap,
			leftCtrl = box.find(_opt.triggerLeft),
			rightCtrl = box.find(_opt.triggerRight),
			moveBox = box.find(_opt.loopBox),
			moveBoxLi = moveBox.find("li"),
			step = _opt.step,
			scrollHeight = box.height(),
			liLen = moveBoxLi.length,
			endIndex = _opt.height;//当前显示最后一列的下标
		leftCtrl.hide();
		if(liLen>step){
			rightCtrl.show();
		}
		leftCtrl.click(function(){
			if(moveBox.is(":animated")){
				return false;
			}
			rightCtrl.show();
			var moveHeight;
			if(endIndex - _opt.step > _opt.step){
				moveHeight = -Math.floor(((endIndex - _opt.step)/_opt.step) - 1) * scrollHeight - endIndex%_opt.step * scrollHeight/_opt.step - (endIndex - _opt.step*2)*2 ;
				endIndex -= _opt.step;
			}
			else if(endIndex - _opt.step <= _opt.step && endIndex > _opt.step){
				moveHeight = 0;
				leftCtrl.hide();
				endIndex = _opt.step;
			}
			move(moveHeight, function(){
				moveBox.css("marginTop", moveHeight);
			});
		});
		rightCtrl.click(function(){
			if(moveBox.is(":animated")){
				return false;
			}
			leftCtrl.show();
			var moveHeight;
			if(endIndex + _opt.step < liLen){
				moveHeight = -Math.floor(((endIndex + _opt.step)/_opt.step) - 1) * (scrollHeight + _opt.deviation);
				endIndex += _opt.step;
			}
			else if(endIndex + _opt.step >= liLen && endIndex < liLen){
				moveHeight = -Math.floor((endIndex/_opt.step - 1)) * (scrollHeight + _opt.deviation) - (liLen - endIndex)*scrollHeight/_opt.step - (liLen - endIndex)*2;
				endIndex = liLen;
				rightCtrl.hide();
			}
			move(moveHeight, function(){
				moveBox.css("marginTop", moveHeight);
			});
		});
		function move(moveHeight, callback){
			moveBox.stop().animate({marginTop:moveHeight},300,callback);
		};
	};
	return slideCircleVerticle;
});