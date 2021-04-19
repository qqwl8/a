//dom加载完成后执行的js
;$(function() {
    //ajax get请求
    $('.ajax-get').click(function() {
        var target;
        var that = this;
        if ($(this).hasClass('confirm')) {
            if (!confirm('确认要执行该操作吗?')) {
                return false;
            }
        }
        if ((target = $(this).attr('href')) || (target = $(this).attr('url'))) {
            $.get(target).success(function(data) {
                if (data.status == 1) {
                    if (data.url) {
                        updateAlert(data.info + ' 页面即将自动跳转~');
                    } else {
                        updateAlert(data.info);
                    }
                    setTimeout(function() {
						layer.close(dialogAlert);
                        if (data.url) {
                            location.href = data.url;
                        } else {
                            location.reload();
                        }
                    }, 3000);
                } else {
                    updateAlert(data.info, true);
                    setTimeout(function() {
						layer.close(dialogAlert);
                        if (data.url) {
                            location.href = data.url;
                        }
                    }, 3000);
                }
            });
        }
        return false;
    });
    /**dialog变量*/
    var dialogAlert;
    window.updateAlert = function(text, icon) {
        text = text || 'default';
        if (text != 'default') {
			dialogAlert = layer.alert(text, {icon: icon? 0 : 1});
			return dialogAlert;
        }
    };
});

/* *
 * 调用此方法发送HTTP请求。
 *
 * @public
 * @param   {string}    url           请求的URL地址
 * @param   {mix}       data          发送参数
 * @param   {Function}  callback      回调函数
 * @param   {string}    type          请求的方式，有"GET"和"POST"两种
 * @param   {boolean}   asyn          是否异步请求的方式,true：异步，false：同步,没有回调函数必须同步否则将发生错误
 * @param   {string}    dataType      响应类型，有"JSON"、"XML"和"TEXT"三种
 */
function jq_ajax(url, data, callback, type, async, dataType) {
    //var d = dialog().show();
    type = typeof(type) == 'undefined' ? 'POST' : type
    async = typeof(async) == 'undefined' ? false : async;
    dataType = typeof(dataType) == 'undefined' ? 'json' : dataType;
    if (async == false) {
		$(":submit").addClass("disabled").attr("autocomplete", "off").prop("disabled", !0);
    }
    var jq_ajax_result = new Object;
    if (typeof(data) == 'object') {
        var date_str = '';
        for (var key in data) date_str += key + '=' + encodeURIComponent(data[key]) + '&';
        data = date_str;
    }
    $.ajax({
        url: url,
        type: type,
        data: data,
        dataType: dataType,
        async: async,
        success: function(result) {
            jq_ajax_result = result;
            if (callback == '') return false;
            if (typeof(callback) == 'function') return callback(result);
            if (typeof(callback) != 'undefined') return eval(callback + '(result)');
            $(":submit").removeClass("disabled").prop("disabled", !1);
        },
        error: function() {
            jq_ajax_result.status = 0;
            jq_ajax_result.info = '请求失败请重新尝试，多次失败请联系技术部！';
            if (callback == '') return false;
            if (typeof(callback) == 'function') return callback(jq_ajax_result);
            if (typeof(callback) != 'undefined') return eval(callback + '(jq_ajax_result)');
            $(":submit").removeClass("disabled").prop("disabled", !1);
        }
    });
	//d.close().remove();
    return jq_ajax_result;
}
