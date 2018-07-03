/**
 * js调用android和ios的方法
 * @author 有鱼
 * @e-mail hxh597229264@sina.com
 * 调用方法：
 *	var defaultObj = {
 *		iosMethod:"callBack",//调用ios方法名
 *		callAndroid:function(str){ //android执行方法 （传入参数字符串）
 *			window.moumou.callBack(str);
 *		},
 *		methodInfo:{
 *			name:"back", //方法字段  必传参数
 *			value:"gobackApp" // 方法对应内容   必传参数
 *		},
 *		params:[
 *			{
 *				param:"type", //android或者ios方法执行类型 ：  type = 1 执行一般页面返回   type = 2 执行支付的返回
 *				value :1
 *			}
 *		]
 *	};
 *	JAA_Plugin.runAppMethod(defaultObj);
 */
(function(){
	//js调用app方法的信息  默认 调用返回的方法
	var defaultObj = {
		iosMethod:"callBack",//调用ios方法名
		callAndroid:function(str){ //android执行方法 （传入参数字符串）
			window.moumou.callBack(str);
		},
		methodInfo:{
			name:"back", //方法字段  必传参数
			value:"gobackApp" // 方法对应内容   必传参数
		},
		params:[
			{
				param:"type", //android或者ios方法执行类型 ：  type = 1 执行一般页面返回   type = 2 执行支付的返回
				value :1
			}
		]
	};
	/**
	 * 调用ios方法
	 * @param {Object} obj js调用app方法的对象
	 */
	function ios(obj) {
		function setupWebViewJavascriptBridge(callback) {
			if(window.WebViewJavascriptBridge) {
				return callback(WebViewJavascriptBridge);
			}
			if(window.WVJBCallbacks) {
				return window.WVJBCallbacks.push(callback);
			}
			window.WVJBCallbacks = [callback];
			var WVJBIframe = document.createElement('iframe');
			WVJBIframe.style.display = 'none';
			WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
			document.documentElement.appendChild(WVJBIframe);
			setTimeout(function() {
				document.documentElement.removeChild(WVJBIframe)
			}, 0)
		};
		setupWebViewJavascriptBridge(function(bridge) {
			var changeObj = dataChange(obj);//数据转换
			bridge.callHandler(
				changeObj.iosMethod,
				changeObj.newObj,
				function responseCallback(responseData) {
					console.log("ios返回的数据："+responseData); //ios返回
				}
			);
		});
	};
	/**
	 * 调用android方法
	 * @param {Object} obj js调用app方法的对象
	 */
	function android(obj) {
		var changeObj = dataChange(obj);//数据转换
		changeObj.callAndroid(JSON.stringify(changeObj.newObj));
	};
	/**
	 * 数据转换
	 * @param {Object} obj
	 */
	function dataChange(obj){
		var newObj = new Object();
		newObj[obj.methodInfo.name] = obj.methodInfo.value;
		if(obj.params.length > 0){
			for(let i=0;i<obj.params.length;i++){
				newObj[obj.params[i].param] = obj.params[i].value;
			}	
		}
		obj["newObj"] = newObj;
		return obj;
	};
	//插件api对象
	var _plugin_api={
		/**
		 * 获取终端浏览器版本信息
		 */
		versions: function() {
			var u = navigator.userAgent,
				app = navigator.appVersion;
			return {
				trident: u.indexOf('Trident') > -1, //IE内核
				presto: u.indexOf('Presto') > -1, //opera内核
				webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
				mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/), //是否为移动终端
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
				iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
				iPad: u.indexOf('iPad') > -1, //是否iPad
				webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
			};
		}(),
		/**
		 * 属性:返回当前浏览器的语言
		 */
		language: (navigator.browserLanguage || navigator.language).toLowerCase(),
		/**
		 * 执行app方法
		 * @param {Object} obj js调用app方法的对象
		 */
		runAppMethod:function(obj){
			if(obj){
				defaultObj = obj;
			}
			if(this.versions.iPhone || this.versions.iPad || this.versions.ios) {
				ios(defaultObj);
			}
			if(this.versions.android) {
				android(defaultObj);
			}
		}
	};
	//插件的名称
    this.JAA_Plugin = _plugin_api;
})();
