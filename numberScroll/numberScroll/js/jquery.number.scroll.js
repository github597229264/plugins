/**
 * 数字滚动插件 V2.0
 * create by Mantou qq:676015863
 * edit by Youyu hxh597229264@sina.com
 * edit time 2018-09-07
 */
;(function($) {
	var default_font_size = 36;
	$.fn.numberAnimate = function(setting) {
		var defaults = {
			speed: 1000, //动画速度
			num: "", //初始化值
			iniAnimate: true, //是否要初始化动画效果
			setSymbol: '', //默认的分割符号，千，万，千万
			dot: 0, //保留几位小数点
			numberSize:36,//字体大小
			numberColor:"#000000"//字体颜色
		}
		//如果setting为空，就取default的值
		var setting = $.extend(defaults, setting);

		//如果对象有多个，提示出错
		if($(this).length > 1) {
			alert("只能有一个对象!");
			return;
		}
		//如果未设置初始化值。提示出错
		if(setting.num == "") {
			alert("必选先设置初始的数字!");
			return;
		}
		var computeHeight =((setting.numberSize/default_font_size)*40).toFixed(2);
		var computeWidth =((setting.numberSize/default_font_size)*20).toFixed(2);
		var nHtml = '<div class="mt-number-animate-dom" data-num="{{num}}" style="width:'+computeWidth+'px;">' +
			'<span class="mt-number-animate-span">0</span>' +
			'<span class="mt-number-animate-span">1</span>' +
			'<span class="mt-number-animate-span">2</span>' +
			'<span class="mt-number-animate-span">3</span>' +
			'<span class="mt-number-animate-span">4</span>' +
			'<span class="mt-number-animate-span">5</span>' +
			'<span class="mt-number-animate-span">6</span>' +
			'<span class="mt-number-animate-span">7</span>' +
			'<span class="mt-number-animate-span">8</span>' +
			'<span class="mt-number-animate-span">9</span>' +
			'<span class="mt-number-animate-span">.</span>' +
			'</div>';
		//数字处理
		var numToArr = function(num) {
			num = parseFloat(num).toFixed(setting.dot);
			if(typeof(num) == 'number') {
				var arrStr = num.toString().split("");
			} else {
				var arrStr = num.split("");
			}
			return arrStr;
		}
		//设置DOM symbol:分割符号
		var setNumDom = function(arrStr) {
			var shtml = '<div class="mt-number-animate" style="font-size:'+setting.numberSize+'px;height:'+computeHeight+'px;line-height:'+computeHeight+'px;color:'+setting.numberColor+'">';
			for(var i = 0, len = arrStr.length; i < len; i++) {
				if(i != 0 && (len - i) % 3 == 0 && setting.setSymbol != "" && arrStr[i] != ".") {
					shtml += '<div class="mt-number-animate-dot" style="width:'+computeWidth+'px;line-height:'+computeHeight+'px;">' + setting.setSymbol + '</div>' + nHtml.replace("{{num}}", arrStr[i]);
				} else {
					shtml += nHtml.replace("{{num}}", arrStr[i]);
				}
			}
			shtml += '</div>';
			return shtml;
		}
		//执行动画
		var runAnimate = function($parent) {
			$parent.find(".mt-number-animate-dom").each(function() {
				var num = $(this).attr("data-num");
				num = (num == "." ? 10 : num);
				var spanHei = $(this).height() / 11; //11为元素个数
				var thisTop = -num * spanHei + "px";
				if(thisTop != $(this).css("top")) {
					if(setting.iniAnimate) {
						//HTML5不支持
						if(!window.applicationCache) {
							$(this).animate({
								top: thisTop
							}, setting.speed);
						} else {
							$(this).css({
								'transform': 'translateY(' + thisTop + ')',
								'-ms-transform': 'translateY(' + thisTop + ')',
								/* IE 9 */
								'-moz-transform': 'translateY(' + thisTop + ')',
								/* Firefox */
								'-webkit-transform': 'translateY(' + thisTop + ')',
								/* Safari 和 Chrome */
								'-o-transform': 'translateY(' + thisTop + ')',
								'-ms-transition': setting.speed / 1000 + 's',
								'-moz-transition': setting.speed / 1000 + 's',
								'-webkit-transition': setting.speed / 1000 + 's',
								'-o-transition': setting.speed / 1000 + 's',
								'transition': setting.speed / 1000 + 's'
							});
						}
					} else {
						setting.iniAnimate = true;
						$(this).css({
							top: thisTop
						});
					}
				}
			});
		}

		//初始化
		var init = function($parent) {
			//初始化
			$parent.html(setNumDom(numToArr(setting.num)));
			runAnimate($parent);
		};

		//重置参数
		this.resetData = function(num) {
			var newArr = numToArr(num);
			var $dom = $(this).find(".mt-number-animate-dom");
			if($dom.length < newArr.length) {
				$(this).html(setNumDom(numToArr(num)));
			} else {
				$dom.each(function(index, el) {
					$(this).attr("data-num", newArr[index]);
				});
			}
			runAnimate($(this));
		}
		init($(this));
		return this;
	}
})(jQuery);