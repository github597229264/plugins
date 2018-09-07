/**
 * 图片居中裁剪
 * @author 有鱼
 * @e-mail hxh597229264@sina.com
 * 调用方法：
 * 	var paramObj = {
 *	    canvasId:'',//画布id
 *	    imageUrl:''//加载的图片路径
 *	}
 *	PPPlugin.cutImgAfter(paramObj);
 */
(function(){
    //默认参数
  	var _options = {
 	    canvasId:'',//画布id
 	    imageUrl:''//加载的图片路径
 	};
    /**
     * 裁剪图片
     * @param {Object} paramsObj 参数
     */
	function cutImage(paramsObj) {
		var showImg = document.getElementById(paramsObj.previewImageId);
		var objCanvas = document.getElementById(paramsObj.canvasId);
		var canvasW = window.getComputedStyle(objCanvas).width;
		var	canvasH = window.getComputedStyle(objCanvas).height;
		canvasW = canvasW.substring(0,canvasW.indexOf("px"))*1;
		canvasH = canvasH.substring(0,canvasH.indexOf("px"))*1;
		var ctx = objCanvas.getContext("2d");
		var newImg = new Image();
		newImg.src = paramsObj.imageUrl;
		newImg.onload =function(){
            var w = this.width;  
            var h = this.height;  
            var p = w/h;  
            var x = 0;
            var y = 0;
            var cutW =0;
            var cutH =0;
            if(newImg.readyState=="complete"||newImg.readyState=="loaded"||newImg.complete){  
                if(p == 1){
                    x = 0;
                    y = 0;
                    cutW = w;
                    cutH = h;
                }else if(p>1){  
                    x = (w - h)/2;
                    y = 0;
                    cutW = h;
                    cutH = h;
                }else{  
                    x = 0;
                    y = (h - w)/2;
                    cutW = w;
                    cutH = w;
                }    
                ctx.drawImage(newImg,x,y,cutW,cutH,0,0,canvasW,canvasH);
            }
		}
	};
    //插件api
    var _plugin_api = {
    	/**
    	 * 显示裁剪之后的图片
    	 * @param {Object} paramsObj 参数对象
    	 * @param {String} paramsObj.canvasId 画布id
    	 * @param {String} paramsObj.imageUrl 加载的图片路径
    	 */
        cutImgAfter:function(paramsObj = _options){
        	cutImage(paramsObj);
        	
            return this;//返回当前方法
        }
    };
    //插件的名称
    this.PPPlugin = _plugin_api;
})();