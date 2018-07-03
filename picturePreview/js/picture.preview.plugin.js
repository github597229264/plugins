/**
 * 图片居中预览
 * @author 有鱼
 * @e-mail hxh597229264@sina.com
 * 调用方法：
 * 	var paramObj = {
 *	    parentDivId:'',//父容器id
 *	    previewImageId:'',//预览图片容器id
 *	    inputFileId:'' //上传文件的控件id
 *	}
 *	PPPlugin.previewFunc(paramObj);
 */
(function(){
    //默认参数
    var _options={
        parentDivId:'',//父容器id
        previewImageId:'',//预览图片容器id
        inputFileId:'' //上传文件控件id
    };
    /**
     * 改变显示的图片
     * @param {Object} paramsObj 参数
     * @param {Object} file 选择的文件对象
     */
	function changeImg(paramsObj,file) {
		var showImg = document.getElementById(paramsObj.previewImageId);
		var parentDiv = document.getElementById(paramsObj.parentDivId);
		
		if(file.files && file.files[0]) {
			var reader = new FileReader();
			//获取选中的图片
			reader.onload = function(evt) {
				showImg.src = evt.target.result;
                showImg.style.display = "block";
                parentDiv.style.cssText="overflow: hidden;";
				parentDiv.style.backgroundImage = "none";
				
			};
			reader.readAsDataURL(file.files[0]);
			//图片尺寸适配
	        showImg.onload = function(){  
	            var w = this.width;  
	            var h = this.height;  
	            var p = w/h;  
	            if(showImg.readyState=="complete"||showImg.readyState=="loaded"||showImg.complete){  
	                if(p>1){  
	                    this.style.width = parentDiv.clientWidth+"px";  
	                    this.style.height = "auto";  
	                }else{  
	                    this.style.width = "auto";   
	                    this.style.height = parentDiv.clientHeight+"px";  
	                }    
	            }  
	        };  
		} else {
			//parentDiv.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';
		}
	};
    //插件api
    var _plugin_api = {
    	/**
    	 * 预览图片
    	 * @param {Object} paramsObj 参数对象
    	 * @param {String} paramsObj.parentDivId 父容器id
    	 * @param {String} paramsObj.previewImageId 预览图片容器id
    	 * @param {String} paramsObj.inputFileId 上传文件的控件id
    	 */
        previewFunc:function(paramsObj = _options){
        	var inputFile = document.getElementById(paramsObj.inputFileId);
            inputFile.onchange=function(){
				var self = this;
				changeImg(paramsObj,self);
			};
            return this;//返回当前方法
        }
    };
    //插件的名称
    this.PPPlugin = _plugin_api;
})();