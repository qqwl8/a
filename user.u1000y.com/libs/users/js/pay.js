
$(function() {
    // 选择支付类型
    $('.TypeItem').click(function() {
		$('.TypeItem').removeClass('active');
		$('.TypeItem').addClass('normal');
		var $this = $(this);
		$this.removeClass('normal');
        $this.addClass('active');
		//获取内容ID
		var gid = $this.attr('groupid');
		//显示
		$('.groupPay').hide();
		var $group = $("div[groupid=" + gid + "]");
		$group.show();
		//console.log(sid);
		//查询元素
		var ids = $group.find('input').first().val();
		//改变默认选中支付方式
		$(":radio[name='pay_item'][value='" + ids + "']").prop("checked", "checked");
		//获取支付套餐
		paySel_sel(ids, pay_config['paySel_url']);
		//改变支付方式
		$('#pay_type').val(gid);
        return false;
		//改变 pay_item 选择
    }); 
    // 选择支付渠道
    $('.pay_item').click(function() {
        var $this = $(this);
		//获取支付套餐
		paySel_sel($this.val(), pay_config['paySel_url']);
		//记录渠道比例
		pay_config['bili'] = $this.attr('data-bili');
        return false;
    }); 
	//选择充值套餐
    $('.selectMain').change(function() {
        if ($(".selectMain").val() == 0) {
            $('.pay_point_p').hide();
        } else {
            var $pay_point_p = $('.pay_point_p');
            var price = Number($(".selectMain").val());
            var bili = Number(pay_config['bili']);
            $pay_point_p.find('strong').html(bili * price);
            //$pay_point_p.find('i').html(gcoin);
            $('.pay_point_p').show();
        }
        return false;
    });
});


/* *
* 支付套餐获取
*/
function paySel_sel(name, url)
{
	$(".selectMain option[value!=0]").remove();  
	$('.pay_point_p').hide();
	//获取支付方式套餐列表
	var arr = new Object;
	arr.name = name;
	var msg = jq_ajax(url, arr);
	if (msg.code == 0) {
		if (msg.msg) alert(msg.msg);
	} else {
		$(".selectMain option[value=0]").attr("selected", true);
		$(".selectMain").append(msg.msg);
	}
}

//js.js里的方法
function nTabs(tabObj,obj,tag){
/* 	var tabList = document.getElementById(tabObj).getElementsByTagName("li");
	if(tag){
		tabList = document.getElementById(tabObj).getElementsByTagName(tag);
	}
	for(i=0; i <tabList.length; i++)
	{
		if (tabList[i].id == obj.id)
		{
			document.getElementById(tabObj+"_Title"+i).className = "active"; 
    		document.getElementById(tabObj+"_Content"+i).style.display = "block";
		}else{
			document.getElementById(tabObj+"_Title"+i).className = "normal"; 
			document.getElementById(tabObj+"_Content"+i).style.display = "none";
		}
	}  */
}