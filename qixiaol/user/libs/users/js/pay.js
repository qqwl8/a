
$(function() {
    // 选择支付类型
    $('.TypeItem').click(function() {
        var $this = $(this);
        // 清除支付渠道选中状态
        $('.TypeItem').removeClass('aOn');
		//增加当前选中支付渠道选中状态
        $this.addClass('aOn');
		//获取分组ID
		var gid = $this.attr('groupid');
		//改变payTips
		$('.payTips').html(pay_config['Tips'][gid]).show();
		//切换显示的DIV
        $('.groupPay').hide();
		var $group = $("div[groupid=" + gid + "]");
		$group.show();
		//判断是否卡类
		if(gid == 3){
			$('.qyCard').show();
		}
		//改变支付paytype
		$('#pay_type').val(gid);
		//搜索PayItem并改变
		$('#pay_item').val($group.find('.aOn').attr('data-code'));
		//记录渠道比例
		pay_config['bili'] = $group.find('.aOn').attr('data-bili');
		
		//获取支付套餐
		paySel_sel($group.find('.aOn').attr('data-code'), pay_config['paySel_url']);
        return false;
    }); 

    // 选择分区按钮，显示列表处理
    $('.selGameBtn').click(function() {
        var $this = $(this);
        var $choiceDiv = $('.choiceDiv');
        if ($choiceDiv.css('display') == 'none' || $('.choiceCon_server').css('display') == 'none') {
            // 按钮状态处理
            $this.removeClass('aOn').addClass('aOver');
            $choiceDiv.css('left', '100px').show();
            var $choiceCon_server = $('.choiceCon_server');
            $choiceCon_server.show().siblings('.choiceCon').hide();
            $('.choiceCon .gTab').css({zIndex:999});
            $choiceDiv.trigger('updateScrollBar');
        } else {
            $choiceDiv.css('display', 'none');
            // 按钮状态处理
            var pay_server = $('#pay_server').val() || 0;
            if (pay_server) {
                $this.removeClass('aOver').addClass('aOn');
            } else {
                $this.removeClass('aOver aOn');
            }
        }
        return false;
    });
    // 选择分区列表处理
    $('.serverItem').click(function() {
        var $this = $(this);
        var id = parseInt($this.attr('data-id')) || 0;
        $('#pay_server').val(id);
		$('.choiceDiv').hide();
        $('.selGameBtn').html($this.text()).addClass('aOn');
		//改变payTips
		$('.ItemInfo').html(pay_config['ItemInfo'][id]);
        return false;
    });
    // 选择支付渠道
    $('.PayItem').click(function() {
        var $this = $(this);
        // 清除同级支付渠道选中状态
		//console.log($this.parent().parent().children().find('.aOn').removeClass('aOn')); 
		$this.parent().parent().children().find('.aOn').removeClass('aOn');
        //$('.PayItem').removeClass('aOn');
		//增加当前选中支付渠道选中状态
        $this.addClass('aOn');
		//改变支付PayItem
		$('#pay_item').val($this.attr('data-code'));
		//获取支付套餐
		paySel_sel($this.attr('data-code'), pay_config['paySel_url']);
		//记录渠道比例
		pay_config['bili'] = $this.attr('data-bili');
        return false;
    }); 
    // 显示更多银行
    $('.moreBankItem').click(function() {
        var $this = $(this);
        var $bankCon = $('.bankList .bankCont');
        if ($bankCon.hasClass('bankCon')) {
            $bankCon.removeClass('bankCon');
            $this.html('收起更多银行');
        } else {
            $bankCon.addClass('bankCon');
            $this.html('选择更多银行');
        }
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