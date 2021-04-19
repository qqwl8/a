/**
 * 业务类
 * kztype:
 * 		"slmbk":申领密保卡
 * 		"bdmbk":绑定密保卡
 * 		"jbmbk":解绑密保卡
 * 		"ghmbk"：更换密保卡
 * 		"bdsj"：绑定手机
 * 		"bdyx":绑定邮箱
 * 		"jbsj"：解绑手机
 * 		"ghsj": 跟换手机
 * 		"ghyx": 更换邮箱
 * 		"xgmm":修改密码
 * 		"szhbmm":设置划拨密码
 * 		"xghbmm"修改划拨密码
 * 		"zhmbk":x
 * 		"ssjbmbk":申诉解绑密保卡
 * 		"dxxgmm": 短信修改密码
 * 		"captcha":图片验证码
 * 		"fsyzm":发送验证码(例 kztype='fsyzm phone reg useraccount') 第二个参数发送类型手机或邮件email 第三个参数action 第四个参数手机或邮箱是否根据用户输入的发送可不写
 * 		"pwd":密码输入是的密码强度效果
 * 		"zhzlbq":帐号资料补全
 * 		"zczlbq"：注册时资料补全
 * 		"shimingzhi"：实名认证
 *      "kztips" 提示层(例 kztype='kztips tipsid poptips')第二个参数为弹出层的id,第三个参数提示层的id
 * 校验类型
 * vdtype：
 * 		"email (notnull||null) (bdvd||不填)":邮箱格式校验
 */
(function($){
var basePath=window.location.href.split("//")[0]+"//"+window.location.host+"/";
$(function(){
	//动态加载弹窗控件 并给相应元素添加弹窗事件
	//var url=basePath+"resources/js/kz_showform.js";
	var url=window.location.href.split("//")[0]+"//stc2.kongzhong.com/passport/v2/js/kz_showform.js";
	$.getScript(url,kzform.initKzForm());

});
var kzform={
	initKzForm:function(obj){
		var list;
		if(obj){
			list=$(obj).find("[kztype]");
		}else{
			list=$("[kztype]");
		}
	
		$(list).each(function(i,obj){
			var kztype=$(obj).attr("kztype");
			var types=kztype.split(" ");
			switch(types[0]){
				case "slmbk":{$(obj).bind("click",function(){kzform.applySafeCard(types[1])})}break;
				case "bdmbk":{$(obj).bind("click",kzform.bindSafeCard)}break;
				case "jbmbk":{$(obj).bind("click",kzform.noBindSafeCard)}break;
				case "ghmbk":{$(obj).bind("click",kzform.changeSafeCard)}break;
				case "zhmbk":{$(obj).bind("click",kzform.click_findSafeCard)}break;
				case "ssjbmbk":{$(obj).bind("click",kzform.click_ssjbmbk)}break;
			
				case "bdsj":{$(obj).bind("click",function(){kzform.bindPhone(types[1]?types[1]:undefined)})}break;//绑定手机
				case "ghsj":{$(obj).bind("click",kzform.changePhone)}break;
				case "jbsj":{$(obj).bind("click",kzform.unbindPhone)}break;
				case "bdyx":{$(obj).bind("click",function(){kzform.bindEmail(types[1]?types[1]:undefined)})}break;
				case "ghyx":{$(obj).bind("click",kzform.changeEmail)}break;
				case "szhbmm":{$(obj).bind("click",kzform.setHbPWD)}break;
				
				case "xgmm":{$(obj).bind("click",kzform.changePWD)}break;
				case "xghbmm":{$(obj).bind("click",kzform.changeHbPWD)}break;
				case "dxxgmm":{$(obj).bind("click",kzform.shortMsgPwd)}break;
				case "faq":{$(obj).bind("click",kzform.faq)}break;
				case "chenmi":{$(obj).bind("click",kzform.chenmi)}break;
				case "zhzlbq":{$(obj).bind("click",kzform.accountInfo)}break;
				case "zczlbq":{$(obj).bind("click",kzform.zczlbq)}break;
				case "shimingzhi":{$(obj).bind("click",kzform.shimingzhi)}break;
				case "captcha":{$(obj).bind("focus",function(){kzform.captcha($(obj));})}break;
				//发动短信验证码
				case "fsyzm":{
					$(obj).bind("click",function(){kzform.fsyzm($(obj),types[1]?types[1]:undefined,types[2]?types[2]:undefined,types[3]?types[3]:undefined,types[4]?types[4]:undefined);})
				}break;
				//密码强度
				case "pwd":{$(obj).bind("keyup",function(){kzform.pwdIntensity($(obj));}).bind("focus",function(){kzform.pwdIntensity($(obj));})}break;
				case "kztips":{$(obj).bind("click",function(){kzform.showTips($(obj),types[1]?types[1]:undefined,types[2]?types[2]:undefined);})}break;
				case "mbwt":{$(obj).click(function(){kzform.mbwt("safequestion")})}break;
				case "mbwtxg":{$(obj).click(function(){kzform.mbwt("safequestionedit")})}break;
				case "zhhbmm":{$(obj).click(kzform.findHbPWD);}break;
				case "unbindthird":{$(obj).bind("click",function(){kzform.unbindthirduser(types[1]?types[1]:undefined)})}break;
				case "checkthird":{$(obj).bind("click",kzform.checkunbindthirduser)}break;
			}
		});
	},
	checkunbindthirduser :function(){
		$.kzforms.checkphone("unbind"+$("#checkthird").attr("model"));
	},
	unbindthirduser:function(mode){
		kzform.getubdinfo(function(data){
			if(data.phone=="1"){
				$("#checkthird").attr("model",mode);
				switch(mode){
					case "qq":{$("#unbindtips").text("1、即将解除QQ帐号的绑定，解绑后将无法继续使用此QQ快速登录空中网等网站；")}break;
					case "wx":{$("#unbindtips").text("1、即将解除微信帐号的绑定，解绑后将无法继续使用此微信快速登录空中网等网站；")}break;
					case "wb":{$("#unbindtips").text("1、即将解除微博帐号的绑定，解绑后将无法继续使用此微博快速登录空中网等网站；")}break;
				}
				$.KzShowForm( {
							title : "解除绑定",
							boxID : "shortmsg",
							url : "popthirdunbind",
							contentType:"id",
							scroll:"auto"
						});
			}else{
				$.kzforms.nobindphone(mode);
			}
	});
	},
	getubdinfo:function(callback){
		var bindinfo_url=basePath+"ajax/userbindinfo?t="+Math.random();
		$.kzAjax({
			url:bindinfo_url,
			type:"post",
			dataType:"json",
			success:function(data){
				if(data.result=="loginerr"){
					kzAlert("登录失效请刷新重试","","系统提示");
				}else{
					callback(data);
				}
			}
			
		})
	},
	mbwt:function(mode){
		if(mode=="safequestionedit"){
		var bindinfo_url=basePath+"ajax/userbindinfo?t="+Math.random();
		$.ajax({
			url:bindinfo_url,
			type:"post",
			dataType:"json",
			success:function(data){
				if(data.email=="1"||data.phone=="1"){
					$.kzforms.chk_phone_email(mode);
				}else{
					$.KzShowForm.closedcallback=function(){
						$.kzforms.chk_phone_email(mode);
					}
					$.kzforms.allnobind(mode);
				}
			}
		});
	}else{
		var bindinfo_url=basePath+"ajax/userbindinfo?t="+Math.random();
		$.ajax({
			url:bindinfo_url,
			type:"post",
			dataType:"json",
			success:function(data){
				if(data.email=="1"||data.phone=="1"){
					$.kzforms.chk_phone_email(mode);
				}else{
					$.kzforms.safequestion.edit(mode);
				}
			}
		});
	}
		
	},
	//找回密保卡
	click_findSafeCard:function(){
		$.kzforms.chk_phone_email("findsafecard");
		return false;
	},
	//申诉解绑密保卡
	click_ssjbmbk:function(){
		kzform.getubdinfo(function(data){
			if(data.card==1){
				window.location.href=basePath+"ajax/usersafe/tounbind";
			}else{
				$.KzShowForm( {url : "您还未绑定密保卡",contentType:"txt"});
			}
		});	
		return false;
	},
	//解绑密保卡
	noBindSafeCard:function(){
		var isablechange_url=basePath+"ajax/safecardisenable";
		$.ajax({
			url:isablechange_url,
			type:"post",
			dataType:"json",
			success:function(data){
				if(data=="ok"){
					$.kzforms.chk_phone_email("unbindsafecard");
				}else{
					$.kzforms.yigenghuan();
				}
			}
		});
		return false;
	},//申领密保卡
	applySafeCard:function(mode){
		$.kzforms.slsafecard(mode);
		return false;
	},
	bindSafeCard:function(){
		kzform.getubdinfo(function(data){
				if(data.email!="1"&&data.phone!="1"){
					$.KzShowForm.closedcallback=function(){
						$.ajax({
							url:basePath+"ajax/isablegetsafecard?t="+Math.random(),
							type:"post",
							dataType:"json",
							success:function(data){
								if(data=="ok"){
									$.kzforms.slsafecard("bindsafecard");
								}else{
									$.kzforms.yishenling("bindsafecard");
								}
							}
						});
						
					};
					$.kzforms.allnobind("bindsafecard");
				}else{
					$.ajax({
							url:basePath+"ajax/isablegetsafecard?t="+Math.random(),
							type:"post",
							dataType:"json",
							success:function(data){
								if(data=="ok"){
									$.kzforms.slsafecard("bindsafecard");
								}else{
									$.kzforms.yishenling("bindsafecard");
								}
							}
					});
					
				}
				
			});
		return false;
	},
	changeSafeCard:function(){
		//var isablechange_url=basePath+"ajax/safecardisenable";
		//$.ajax({
			//url:isablechange_url,
			//type:"post",
			//dataType:"json",
			//success:function(data){
				//if(data=="ok"){
					dochange();
				//}else{
				//	$.kzforms.yigenghuan();
				//}
			//}
		//});

function dochange(){
	kzform.getubdinfo(function(data){
				if(data.email!="1"&&data.phone!="1"){
					$.KzShowForm.closedcallback=function(){
						$.ajax({
							url:basePath+"ajax/isablegetsafecard?t="+Math.random(),
							type:"post",
							dataType:"json",
							success:function(data){
								if(data=="ok"){
									$.kzforms.slsafecard("changesafecard");
								}else{
									$.kzforms.yishenling("changesafecard");
								}
							}
						});
						
					};
					$.kzforms.allnobind("changesafecard");
				}else{
					$.ajax({
							url:basePath+"ajax/isablegetsafecard?t="+Math.random(),
							type:"post",
							dataType:"json",
							success:function(data){
								if(data=="ok"){
									$.kzforms.slsafecard("changesafecard");
								}else{
									$.kzforms.yishenling("changesafecard");
								}
							}
					});
					
				}
		});
	}
		return false;
	},
	bindPhone:function(mode){
		//mode=mode?mode:"bindphone";
		kzform.getubdinfo(function(data){
				if(data.email=="1"){
					$.kzforms.checkemail("bindphone");
				}else if(data.shiming=="1"){
					//$.KzShowForm.closedcallback=function(){$.kzforms.bdphone.step1(mode)};
					$.kzforms.checkrealname("bindphone");
				}else{
					$.kzforms.norealname("bindphone");
					//$.kzforms.bdphone.step1(mode);
				}
		});
		return false;
	},
	changePhone:function(){
		$.kzforms.checkphone("changephone");
		return false;
	},
	unbindPhone:function(){
		kzform.getubdinfo(function(data){
				if(data.card=="1"&&data.email!="1"){
					kzAlert("您的安全手机目前不可以解绑！","安全手机作为您账号所有权的最高权限判断，您当前仅绑定了安全手机不符合解绑的条件，建议您绑定安全邮箱后再进行操作。","解绑手机");
				}else{
					$.kzforms.checkphone("unbindphone");
				}
		});
		
		return false;
	},
	changePWD:function(){
		kzform.getubdinfo(function(data){
				if(data.dypwd=="1"){
					$.kzforms.checkdypwd("changepwd");
				}else if(data.card=="1"){
					$.kzforms.checksafecard("changepwd");
				}else if(data.phone=="1"){
					$.kzforms.checkphone("changepwd");
				}else if(data.email=="1"){
					$.kzforms.checkemail("changepwd");
				}else if(data.shiming!="1"){
					$.kzforms.norealname("changepwd");
				}else{
					$.kzforms.nobindphone("changepwd");
				}
		});
		return false;
	},
	bindEmail:function(mode){
		//mode=mode?mode:"bindemail";
		kzform.getubdinfo(function(data){
				if(data.phone=="1"){
					$.kzforms.checkphone("bindemail");
				}else if(data.shiming=="1"){
					$.kzforms.checkrealname("bindemail");
				}else{
					$.kzforms.norealname("bindemail");
				}
		});
		return false;
	},
	changeEmail:function(){
		kzform.getubdinfo(function(data){
				if(data.email=="1"){
					$.kzforms.checkemail("changeemail");
				}else{
					alert("没绑定邮箱怎么更换？");
				}
		});
		return false;
	},
	setHbPWD:function(){
		kzform.getubdinfo(function(data){
				if(data.email!="1"&&data.phone!="1"){
					$.KzShowForm.closedcallback=function(){
						$.kzforms.chk_phone_email("sethbpwd");
					};
					$.kzforms.allnobind("sethbpwd");
				}else{
					$.kzforms.chk_phone_email("sethbpwd");
				}
		});
		return false;
	},
	findHbPWD:function(){
		kzform.getubdinfo(function(data){
				if(data.email!="1"&&data.phone!="1"){
					$.KzShowForm.closedcallback=function(){
						$.kzforms.chk_phone_email("findhbpwd");
					};
					$.kzforms.allnobind("findhbpwd");
				}else{
					$.kzforms.chk_phone_email("findhbpwd");
				}
		});
		return false;
	},
	changeHbPWD:function(){
		$.kzforms.hbpwd.changepwd();
		return false;
	},
	shortMsgPwd:function(){
		$.ajax({
			url:basePath+"ajax/isbindphone?t="+Math.random(),
			dataType:"json",
			success:function(data){
				if(data=="1"){
					$.KzShowForm( {
						title : "手机短信修改密码",
						boxID : "shortmsgchangepwd",
						url : "shortmsg",
						contentType:"id",
						scroll:"auto"
					});
				}else if(data=="0"){
					$.KzShowForm( {
						title : "绑定安全手机",
						boxID : "bind_phone_pop",
						url : basePath+"ajax/usersafe/tobindphone/0"
					},function(){
						$.KzShowForm( {
							title : "手机短信修改密码",
							boxID : "shortmsg",
							url : "popSmspwdphone",
							contentType:"id",
							scroll:"auto"
						});
					});
				}else{
					kzAlert("系统繁忙,请稍候再试");
				}
			}
		});
		return false;
	},
	faq:function(){
		$.KzShowForm({
			title : "FAQ",
			boxID : "popFaqbox_safe1",
			height:420,
			url : "popFaqbox_user",
			contentType:"id"	
		});
		return false;
	},
	chenmi:function(){
		$.KzShowForm({
			title:"游戏防沉迷系统规则说明",
			boxID:"popFcminfo",
			url: "popFcminfo2",
			contentType:"id"
		});
		return false;
	},
	shimingzhi:function(){
		kzform.getubdinfo(function(result){
				if(result.dypwd=="1"){
					$.kzforms.checkdypwd("shiming");
				}else if(result.phone=='1'){
					$.kzforms.checkphone("shiming");
				}else if(result.email=="1"){
					$.kzforms.checkemail("shiming");
				}else{
					$.kzforms.shiming.edit();
				}
		});
		return false;
	},
	accountInfo:function(){
	kzform.getubdinfo(function(result){
				if(result.regdays>24){
					if(result.bdpdays<30||result.phone!="1"){
						kzAlert("注册超过24小时的用户需要绑定手机超过30天才可以设置账号资料","","设置账号资料");
						return false;
					}
				}
				if(result.dypwd=="1"){
					$.kzforms.checkdypwd("edituserinfo");
				}else if(result.card=="1"){
					$.kzforms.checksafecard("edituserinfo");
				}else if(result.phone=="1"){
					$.kzforms.checkphone("edituserinfo");
				}else if(result.email=="1"){
					$.kzforms.checkemail("edituserinfo");
				}else if(result.shiming=="1"){
					$.kzforms.checkrealname("edituserinfo");
				}else{
					$.kzforms.norealname("edituserinfo");
				}
		});
		return false;
	},
	zczlbq:function(){
		$.kzforms.edituserinfo.edit();
	},
	captcha:function(obj){
		if($(obj).next()[0].nodeName!="IMG"){
			$(obj).after("<img class=\"fleft\" id=\"verif_code_img\" src=\""+basePath+"ajax/verificationcode/create?w=80&h=30&t="+Math.random()+"\"/><a class=\"vali_next\" id=\"re_verif_code_btn\" style=\"cursor:pointer\" >换一张</a>");
			$("#re_verif_code_btn").bind("click",function(){$('#verif_code_img').attr("src", basePath+"ajax/verificationcode/create?w=80&h=30&t="+Math.random())});
		}
	},
	fsyzm:function(obj,type,action,phoneid,areacode){
		if(!action||action==""||!type||type==""){
			$.formValidator.showTips($(obj).next(),"err","参数错误,校验失败");
			return false;
		}
		
		var url;
		if(phoneid&&$("#"+phoneid)){
			if(action=='getprizecode'||action=='safequestionedit'||action=='bindsafecard'||action=='sethbpwd'||action=='safequestion'||action=='changesafecard '||action=='changepwd'){
				action=type=='phone'?'bindphone':'bindemail';
			}
			var phone=  (type=="phone"&&areacode&&$("#"+areacode) ? encodeURIComponent($("#"+areacode).html()+"a"+$("#"+phoneid).val()) : $("#"+phoneid).val()),
			tip=type=="phone"?"手机号码格式错误或无效":"邮箱格式错误或无效";
			url=type=="phone"?(basePath+"ajax/sendsmscode/"+action+"/"+phone+"?t="+Math.random()):(basePath+"ajax/sendemail/"+action+"?email="+phone+"&t="+Math.random());
			if(phone!=""){
					if($("#"+phoneid).parent().next().find(".info_cur_erro").length>0){
						//$.formValidator.showTips($(obj).next(),"err",tip);
						return false;
					}

				if($(obj).attr("ajaxvalid")=="0"){
					return false;
				}
			}else{
				$.formValidator.showTips($("#"+phoneid+"Tip"),"err",type=="phone"?tips.phone.err_null:tips.email.err_null);
				return false;
			}
		}else{
			url=basePath+"ajax/"+(type=="phone"?"sendsms":"sendemail")+"/"+action+"?t="+Math.random();
		}
		$.formValidator.removeTips($(obj).next());
		$(obj).attr("disabled","disabled");
		//异步发送
		$.ajax({
			type:'get',
			url:url,
			dataType : 'json',  
			success:function(data){
				$(obj).removeAttr("disabled");
				if(data.num==0){
					$.formValidator.showTips($(obj).next(),"err",tips.smscode.err_send);
				}else if(data.num==-1){
					$.formValidator.showTips($(obj).next(),"err",tips.smscode.err_sofast);
				}else if(data.num==-2){
					$.formValidator.showTips($(obj).next(),"err",type=="phone"?"该手机已屏蔽短信服务,请联系客服":"邮箱绑定没有超过30天");
				}else{
					$(obj).attr("disabled","disabled").attr("send","ok");
					$(obj).val("(59秒)后重新获取");
					var s=58;
					var Interval= setInterval(function(){ 
						 $(obj).val("("+s+"秒)后重新获取");
						 s--;
						 if(s==0){
							 $(obj).val("重新获取验证码").removeAttr("disabled");
							 clearInterval(Interval);
						 }
					 },1000);
					var str=type=="phone"?(action=="reg"?"验证码已发送，如未收到，请查看手机管家等软件是否屏蔽":"短信验证码已发送"):"邮箱验证码已发送<a target=\"_blank\" class=\"fblue\" href=\"http://mail."+data.email.split('@')[1]+"\">立即查看邮箱</a>";
					$.formValidator.showTips($(obj).next(),"focus",str);
				}
			},
			error:function(){
				$.formValidator.showTips($(obj).next(),"err",tips.smscode.err_send);
			}
		});
		return false;
	},
	pwdIntensity:function(obj){
		var pwdstr=$(obj).val();
		var num=0;
		var barClass="ruo",wordClass="red",word="低";
		if(/^.*?\d.*?$/.test(pwdstr)){
			num++;
		}
		if(/^.*?[a-zA-Z].*?$/.test(pwdstr)){
			num++;
		}
		if(/^.*?[^a-z0-9A-Z].*?$/.test(pwdstr)){
			num++;
		}
		switch(num){
		case 1:{barClass="ruo",wordClass="red",word="弱"}break;
		case 2:{barClass="zhong",wordClass="yellow",word="中"}break;
		case 3:{barClass="qiang",wordClass="green",word="强"}break;
		}
		$("#password_strongth").remove();
		var html="<div id=\"password_strongth\" class=\"mmqd\"><span class=\"fhui\">密码强度：</span><div class=\"seck\"><span class=\""+barClass+"\">"+word+"</span></div></div>";
		//var html="<div id=\"password_strongth\" class=\"passSten\"><div class=\"r_list\"><span class=\"fleft f12\">密码强度：</span><div class=\""+barClass+"\"></div><div class=\"fleft\"><b class=\""+wordClass+"\">"+word+"</b></div></div></div>";
		$(obj).parent().next().after(html);
		
		return false;
	},
	
	showTips:function(obj,id,type){
		if(type){
			var tiptitle = $("#"+type).attr("title");
			var tipshigh = $("#"+type).attr("height");
			if(!tiptitle){
				tiptitle ="友情提示";
			}
			if(tipshigh&&tipshigh>0){
				$.KzShowForm({
					title:tiptitle,
					boxID:id,
					height:tipshigh,
					url: type,
					contentType:"id"
				});
			}else{
				$.KzShowForm({
					title:tiptitle,
					boxID:id,
					url: type,
					contentType:"id"
				});
			}
		}
		return false;
	}
};
//对外暴露绑定方法
$.kzformvd=kzform.initKzForm;
}(jQuery));

//页面初始化效果
	//帮助提示效果
$(function(){
	$("ul.faq li").click( function(){
		$(this).children("p").show().end().siblings().children("p").hide();
	})
});




//js.js里的方法
function nTabs(tabObj,obj,tag){
	var tabList = document.getElementById(tabObj).getElementsByTagName("li");
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
	} 
}









