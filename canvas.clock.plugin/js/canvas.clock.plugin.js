/**
 * 绘制时钟
 * @author 有鱼
 * @e-mail hxh597229264@sina.com
 * 调用方法：
 * CCPlugin.initClock({
 *	 x:400,//圆心X坐标
 *	 y:400,//圆心y坐标
 *	 r:400,//圆半径
 *	 canvasId:"画布id"
 * });
 */
(function() {
	var gct = undefined;
	/**
	 * 绘制静态时钟
	 * @param {Object} obj 参数对象
	 * @param {Number} obj.x 圆心X坐标
	 * @param {Number} obj.y 圆心Y坐标 
	 * @param {Number} obj.r 圆半径 
	 */
	function draw(obj) {
		let x = obj.x || 400;
		let y = obj.y || 400;
		let radius = obj.r || 300;
		let time = new Date();
		let h = time.getHours();
		let m = time.getMinutes();
		let s = time.getSeconds();
		let hValue = (h * 30 - 90 + m / 2) * Math.PI / 180; //时针弧度
		let mValue = (m * 6 - 90 + s / 10) * Math.PI / 180; //分针弧度
		let sValue = (s * 6 - 90) * Math.PI / 180; //秒针弧度
		gct.save();
			gct.clearRect(0,0,gct.width,gct.height);
			//分针和秒针的刻度
			for(let i = 0; i < 60; i++) {
				gct.beginPath();
				gct.moveTo(x, y);
				gct.arc(x, y, radius, i * 6 * Math.PI / 180, (i + 1) * 6 * Math.PI / 180);
				gct.closePath();
				gct.stroke();
			}
			gct.fillStyle = "#FFFFFF";
			gct.beginPath();
			gct.moveTo(x, y);
			gct.arc(x, y, radius * 0.97, 0, 360 * Math.PI / 180);
			gct.closePath();
			gct.fill();
	
			gct.lineWidth = 5;
			//时针的刻度
			for(let i = 0; i < 12; i++) {
				gct.beginPath();
				gct.moveTo(x, y);
				gct.arc(x, y, radius, i * 30 * Math.PI / 180, (i + 1) * 30 * Math.PI / 180);
				gct.closePath();
				gct.stroke();
			}
			gct.fillStyle = "#FFFFFF";
			gct.beginPath();
			gct.moveTo(x, y);
			gct.arc(x, y, radius * 0.95, 0, 360 * Math.PI / 180);
			gct.closePath();
			gct.fill();
			//绘制时针
			gct.lineWidth = 5;
			gct.beginPath();
			gct.moveTo(x, y);
			gct.arc(x, y, radius * 0.5, hValue, hValue);
			gct.closePath();
			gct.stroke();
			//绘制分针
			gct.lineWidth = 3;
			gct.beginPath();
			gct.moveTo(x, y);
			gct.arc(x, y, radius * 0.7, mValue, mValue);
			gct.closePath();
			gct.stroke();
			//绘制秒针
			gct.lineWidth = 1;
			gct.beginPath();
			gct.moveTo(x, y);
			gct.arc(x, y, radius * 0.96, sValue, sValue);
			gct.closePath();
			gct.stroke();
		gct.restore();
	}
 	//插件api
    var _plugin_api = {
    	/**
    	 * 初始化时钟
    	 * @param {Object} paramsObj 参数对象
    	 * @param {String} paramsObj.canvasId 画布id
		 * @param {Number} paramsObj.x 圆心X坐标
		 * @param {Number} paramsObj.y 圆心Y坐标 
		 * @param {Number} paramsObj.r 圆半径 
    	 */
        initClock:function(paramsObj){
        	let cvs = document.getElementById(paramsObj.canvasId);
        	if(!paramsObj){
        		alert("参数不完整");
        	}else if(!cvs){
        		alert("canvas元素id无效!");
        	}else if(paramsObj.r > paramsObj.x || paramsObj.r > paramsObj.y){
        		alert(" 半径  r 不能大于圆心坐标点 x 或 y ");
        	}else if(cvs.width < paramsObj.r*2 || cvs.height < paramsObj.r*2){
        		alert("canvas元素高宽值不能小于两倍的半径值!");
        	}else{
	        	gct = cvs.getContext("2d");
	            setInterval(function() {
					draw(paramsObj);
				},1000);	
        	}
            return this;//返回当前方法
        }
    };
    //插件的名称
    this.CCPlugin = _plugin_api;
})();