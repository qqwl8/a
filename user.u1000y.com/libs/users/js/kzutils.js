/**
 * 工具类
 */
(function($) {
	
	$.KzRequest = {
		    q: function(val) {
		        var uri = window.location.search;
		        var re = new RegExp("" + val + "\=([^\&\?]*)", "ig");
		        return ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null);
		    },
		    qs: function(uri) {
		        if (uri == "") uri = window.location.search;
		        var re = /\w*\=([^\&\?]*)/ig;
		        var retval = [];
		        while ((arr = re.exec(uri)) != null)
		            retval.push(arr[0]);
		        return retval;
		    },
		    s: function(uri, val1, val2) {
		        var a = this.qs(uri);
		        var retval = "";
		        var seted = false;
		        var re = new RegExp("^" + val1 + "\=([^\&\?]*)$", "ig");
		        for (var i = 0; i < a.length; i++) {
		            if (re.test(a[i])) {
		                seted = true;
		                a[i] = val1 + "=" + val2;
		            }
		        }
		        retval = a.join("&");
		        return "?" + retval + (seted ? "" : (retval ? "&" : "") + val1 + "=" + val2);
		    }
		};

	$.KzCookie = {
		    g: function(name) {
		        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		        if (arr != null) return unescape(arr[2]); return null;
		    },

		    d: function(name) {
		        var exp = new Date();
		        exp.setTime(exp.getTime() - 1);
		        var cval = getCookie(name);
		        if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
		    },

		    s: function(name, value,t) {
		        var days = 30;
		        var exp = new Date();
		        if(t){
		        	exp.setTime(exp.getTime()+t* 60 * 60 * 1000);
		        }else{
		        	exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
		        }
		        
		        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
		    }
		};
	
	var gamemetre = {
		"1000000":	"",//"功夫OnWeb"
		"100000":	"",//"功夫世界"
		"200000":	"",//"疯狂派对"
		"300000":	"",//"武林英雄"
		"400000":	"",//"新墨香"
		"500000":	"",//"墨香3"
		"600000":	"",//"功夫Online"
		"700000":	"",//"新天地"
		"800000":	"",//"墨香"
		"900000":	"元宝",//"龙女传说-(龙)"
		"1700000":	"",//"纸片人"
		"1500000":	"金币",//"坦克世界"
		"4800000":	"金币",//"战机世界"
		"2100000":	"银票",//"龙门客栈"
		"3400000":	"",//"坦克世界-将军"
		"3800000":	"金币",//"大决战"
		"1600000":	"",//"恶魔法则Ⅲ"
		"1900000":	"",//"坦克.战"
		"1100000":	"",//"恶魔法则"
		"4100000":	"元宝",//"新流星搜剑录"
		"2600000":	"",//"原质生命"
		"2700000":	"",//"暗黑防御"
		"2800000":	"",//"星际帝国"
		"1400000":	"元宝",//"功夫英雄-太极"
		"1200000":	"",//"侠客行"
		"3900000":	"",//"名将"
		"4000000":	"",//"疯狂娃娃机"
		"2900000":	"",//"苍穹启示录"
		"3200000":	"宝石",//"激战2"
		"3600000":	"",//"英雄之剑"
		"1300000":	"圣币",//"猎灵"
		"2300000":	"",//"合金要塞"
		"2400000":	"",//"银河创世录"
		"2500000":	"",//"美女村"
		"1800000":	"",//"王国创世录"
		"2200000":	"",//"逐浪"
		"3300000":	"",//"蒸汽时代"
		"3100000":	"琥珀",//"疯狂都市"
		"3500000":	"",//"空中网军事频道"
		"3000000":	"",//"魔界勇士"
		"2000000":	"",//"怒.战"
		"3700000":	"",//"空中小说"
		"4500000":  "元宝",//"国战"2013-07-26-add-han
		"5000000":  "圣币",//"圣魔之血怀旧服"2013-09-22-add-zhangqiang
		"5600000":	"元宝",//"功夫世界"
		"5700000":	"元宝",//"龙2"
		"4900000":	"金币",//"闪电战3"
		"5900000":	"金币",//"坦克风云"
		"7000000":	"血钻",//"像素骑士团"
		"7400000":	"元宝",//"星垂"
		"7500000":	"金币",//"攻城掠地"
		"7600000":	"元宝",//"天书世界"
		"7800000":	"元宝",//"绝世武神-鹏超"
		"6700000":	"金币",//"战舰世界"
		"8100000":	"钻",//"村长打天下"
		"8600000":	"钻",//"刀空"
		"8800000":	"钻",//"SD敢达大作战"
		"8900000":	"钻",//"战棋时代"
		"9000000":	"钻",//"将星决"
		"9100000":	"金币",//"装甲风暴"
		"9200000":	"钻",//""
		"9300000":	"金卡",//"ko三国"
		"9800000":	"元宝",//"御封神"
		"7100000":	"符石",//"龙翼"
		"10100000":	"元宝",//
		"11100000":	"元宝",//
		"11200000":	"元宝",//
		"11300000":	"元宝",//
		"10600000":	"元宝",//
		"9900000":	"金条",//
		"10700000":	"钻",//
		"11000000": "元宝",
		"11400000": "元宝",
		"11700000": "元宝",
		"11600000": "钻石",
		"12200000":	"元宝",//"九阴九阳"
		"13400000": "钻石",
		"13500000": "元宝",
		"13700000":	"元宝",//
		"13800000":	"圣币",//
		"14600000":	"元宝",//
		"12100000":	"金币",//
		"14200000":	"血钻",//
		"11800000": "元宝"
	};
	
	$.KzPayUtils = {
			
			getGameConvertable : function(point,minvalue){
				if(Number(point) < Number(1) || Number(point) % Number(minvalue) != 0) {
					return false;
				}else{
					return true;
				}
			},
			
			getGameMetre:function(gameid){
				return gamemetre[gameid];
			},
			
			pointToGame:function(showtipid,gameid,gamename,pointid,dianjuan,rate){
				if(gameid==""){
					$("#"+showtipid).html("折合空中网点券<strong class='orange' id='"+pointid+"'>"+dianjuan+"</strong>点");
				}else{
					if(dianjuan>0){
						$("#"+showtipid).html("折合《"+gamename+"》游戏"+ $.KzPayUtils.getGameMetre(gameid)+"<strong class='orange' id='"+pointid+"'>"+dianjuan*rate+"</strong>个");
					}
				}
				return false;
			},

			changeBankPayType:function(thirdpay,banktype,isquickpay){
				$("#thirdpay").val(thirdpay);
				var thirdpaytype ='';
				if("alipay"==thirdpay || "alipaysaoma"==thirdpay){
					thirdpaytype='alipayBankCardSubmit';
					if("0"==banktype){
						$("#defaultbank").val("");
						$("#paymethod").val("");
					}else{
						$("#defaultbank").val(banktype);
						$("#paymethod").val("bankPay");
					}
					if(isquickpay&&isquickpay!=""){
						//储蓄卡
						if(isquickpay=="qpsc"){
							$("#paymethod").val("expressGatewayDebit");
						}else if(isquickpay=="qpcc"){
							$("#paymethod").val("expressGatewayCredit");
						}
						$("#default_login").val("Y");
					}else{
						$("#default_login").val("");
					}
				}else if("yeepay"==thirdpay){
					thirdpaytype='yeepaysubmit';
	     			if("0"!=banktype){
	      				$("#pd_FrpId").val(banktype);
	     			}else{
	     				$("#pd_FrpId").val("");
	     			}                
				}else if("cft"==thirdpay){
					thirdpaytype='cftsubmit';
					if("0"!=banktype){
						$("#bank_type").val(banktype);
					} 
				}else if("ips"==thirdpay){
					
					thirdpaytype='ipsform';
					
				}else if("sft-hongd"==thirdpay){// 盛付通宏电
					if("0"!=banktype){
						$("#InstCode").val(banktype);
					}  
					else{
						$("#InstCode").val("");
					}
					$("#MsgSender").val("225283");
				}
				else if("sft-dach"==thirdpay){// 盛付通大承
					if("0"!=banktype){
						$("#InstCode").val(banktype);
					} 
					else{
						$("#InstCode").val("");
					}
					$("#MsgSender").val("234191");
				}
				$("#thirdPayType").val(thirdpaytype);
				return false;
			},

			getPoints: function(amout){
				if(amout>1){
					return Math.round((amout)*20);
				}else{
					return amout*20;
				}
			},
			getPoints2: function(amout){
				if(amout>=1 && amout<100)
	    		{
	    			return Math.round((parseInt(amout)+amout*0.02)*20);
	    		}else if(amout>=100 && amout<500)
	    		{
	    			return Math.round((parseInt(amout)+amout*0.03)*20);
	    		}else if(amout>=500)
	    		{
	    			return Math.round((parseInt(amout)+amout*0.04)*20);
	    		}else
	    		{
	    			return amout*20;
	    		}
			}

			
		};
	$.relogin=function(callback){ 
		var basePath=window.location.href.split("//")[0]+"//"+window.location.host+"/";
		$("#reloginiframe").remove();
		var iframe=document.createElement("iframe");
		iframe.id="reloginiframe";
		iframe.src = basePath+"v/usersafe/relogin?t="+Math.random(); 
		
		$("<div id='reloginiframe' style='display:none'><div>").appendTo($("body"));
		$("#reloginiframe").html(iframe);
		if (iframe.attachEvent){ 
			iframe.attachEvent("onload", function(){ 
				callback();
			}); 
		} else { 
			iframe.onload = function(){ 
				callback();
			}; 
		} 
	}
	$.kzAjax=function(o){

		$.relogin(function(){
			doajax();
		})

	    function doajax(){
	    	$.ajax({
	        url:o.url+(o.url.indexOf("?")>0?"&":"?")+"t="+Math.random(),
	        type:o.type||"post",
	        dataType:o.dataType||"json",
	        data:o.data||{},
	        async : o.async===undefined?true:o.async,
	        beforeSend:function(jqXHR, settings){
	            //loading 效果
	          
	        },
	        success:function(data){	        	
	            if(o.success && typeof o.success==="function"){
	                o.success(data);
	            }
	        },
	        error:function(jqXHR, textStatus, errorThrown){
	            if(o.error&& typeof o.error==="function"){
	                o.error(jqXHR, textStatus, errorThrown);
	            }else{
	            	if(jqXHR.responseText=="ULogout"){
	        			return false;
	            	}else{
	                	//默认系统提示
	                	alert(errorThrown);
	            	}
	            }
	        },
	        complete:function(jqXHR, textStatus){
	            //关闭loading效果
	        }

	   	})
	    }
	}
	$.KzUtils = {
			hidename: function(name){
				var RegCellPhone = /^([0-9]{11})?$/;
				var hideString='******';
				if(name==""){
					return "";
				}
				if(name.search(RegCellPhone)>-1){
					var phoneuser = name.substring(0,3)+"****"+name.substring(7,11);
					return phoneuser;
				}
				if(name.indexOf('@')>-1){
					var emailarray = name.split('@');
					var emailname = emailarray[0];
					if(emailname.length<6){
						emailname = emailname.substring(0,1)+hideString.substring(0,emailname.length-2)+emailname.substring(emailname.length-1,emailname.length);
					}else{
						if(emailname.length>12){
							emailname = emailname.substring(0,1)+"****"+emailname.substring(emailname.length-4,emailname.length);
						}else{
							emailname = emailname.substring(0,1)+"****"+emailname.substring(5,emailname.length);
						}
					}
					var emailuser = emailname +"@"+emailarray[1];
					return emailuser;
				}else{
					if(name.length<6){
						name = name.substring(0,1)+hideString.substring(0,name.length-2)+name.substring(name.length-1,name.length);
					}else{
						name = name.substring(0,1)+"****"+name.substring(name.length-2,name.length);
					}
					return name;
				}
			},
			
			topTabs: function(i){
				$("#menu li").each(function(j,obj){
					$(obj).removeClass();
					if(j==i){
						$(obj).addClass("cur");
					}else if(j==i-1){
						$(obj).addClass("bgnone");
					}else if(i!=4&&j==4){
						$(obj).addClass("bgnone");
					}
				});
			},
			
			billingTabs: function(url){
				if(url.indexOf("/game_")!=-1){
					$("#billing_menu").find("a").eq(0).addClass("current").first().addClass("current").prev().css("background","none");
					return;	
				}else if(url.indexOf("/card_")!=-1){
					$("#billing_menu").find("a").eq(2).addClass("current").first().addClass("current").prev().css("background","none");
					return;	
				}else if(url.indexOf("/history/")!=-1){
					$("#billing_menu").find("a").eq(5).addClass("current").first().addClass("current").prev().css("background","none");
					return;	
				}else if(url.indexOf("/prop")!=-1){
					$("#billing_menu").find("a").eq(4).addClass("current").first().addClass("current").prev().css("background","none");
					return;
				}else if(url.indexOf("/transfer")!=-1){
					$("#billing_menu").find("a").eq(3).addClass("current").first().addClass("current").prev().css("background","none");
					return;
				}else if(url.indexOf("/shop")!=-1){
					$("#billing_menu").find("a").eq(6).addClass("current").first().addClass("current").prev().css("background","none");
					return;
				}else{
					$("#billing_menu").find("a").eq(1).addClass("current").first().addClass("current").prev().css("background","none");
					return;
				}
			},
			
			page: function(url,total,current,param){
				total = parseInt(total);
				current = parseInt(current);
		        var result = "";
			    if(current>0&&total>1){
			    	var astart ="<a style=\"cursor:pointer;\" href=\""+url;
			    	var paramtag ="\"";
			    	if(param&&param!=""){
			    		paramtag = "?"+param+"\"";
			    	}
			    	var aend ="</a>";
			    	if(current>1){
			    		result += astart+"p"+(parseInt(current)-1)+paramtag+" class=\"prev\" title=\"上一页\"><< 上一页"+aend;
			    	}
			    	if(total<9){
			    	   for(var i=1;i<=total;i++){
			    		   if(i==current){
			    			   result += "<a class=\"current\">"+i+aend;
			    		   }else{
			    			   result += astart+"p"+i+paramtag+">"+i+aend;
			    		   }
			    	   }
			    	}else{
			    	   var start =1;
			    	   var end = current;
			    	   if(current<6){
			    		   for(var i=start;i<=6;i++){
			    			   if(i==current){
				    			   result += "<a class=\"current\">"+i+aend;
				    		   }else{
				    			   result += astart+"p"+i+paramtag+">"+i+aend;
				    		   }
			    		   }
			    		   result += "<span>...</span>"+astart+"p"+total+paramtag+">"+total+aend;
			    	   }else{
			    		   if((total-current)<5){
			    			   start = total-4;
			    			   end=total;
			    		   }else{
			    			   if(current==6){
			    				   start=5;
			    				   end =9;
			    			   }else{
			    				   start = current-2;
			    				   end = current+2;
			    			   }
			    		   }
			    		   result += astart+"p1\">1"+aend+"<span>...</span>";
			    		   for(var i=start;i<=end;i++){
			    			   if(i==current){
				    			   result += "<a class=\"current\">"+i+aend;
				    		   }else{
				    			   result += astart+"p"+i+paramtag+">"+i+aend;
				    		   }
			    		   }
			    	   }
			    	}
			    	if(current<total){
			    		result += astart+"p"+(parseInt(current)+1)+paramtag+" class=\"next\" title=\"下一页\">下一页 >>"+aend;
					}
			    }
			  return result;  
			},
			ajaxPage: function(parentID, total, current, callback){
				total = parseInt(total);
				current = parseInt(current);
		        var result = "";
			    if(current > 0 && total > 1){
			    	var astart ='<a style="cursor:pointer" ';
			    	var aend ="</a>";
			    	if(current>1){
			    		result += astart+'p="'+(parseInt(current)-1)+'" class="prev" title="上一页"><< 上一页'+aend;
			    	}
			    	if(total<9){
			    	   for(var i=1;i<=total;i++){
			    		   if(i==current){
			    			   result += '<a class="current">'+i+aend;
			    		   }else{
			    			   result += astart+'p="'+i+'">'+i+aend;
			    		   }
			    	   }
			    	}else{
			    	   var start =1;
			    	   var end = current;
			    	   if(current<6){
			    		   for(var i=start;i<=6;i++){
			    			   if(i==current){
				    			   result += '<a class="current">'+i+aend;
				    		   }else{
				    			  result += astart+'p="'+i+'">'+i+aend;
				    		   }
			    		   }
			    		   result += '<span>...</span>'+astart+'p="'+total+'">'+total+aend;
			    	   }else{
			    		   if((total-current)<5){
			    			   start = total-4;
			    			   end=total;
			    		   }else{
			    			   if(current==6){
			    				   start=5;
			    				   end =9;
			    			   }else{
			    				   start = current-2;
			    				   end = current+2;
			    			   }
			    		   }
			    		   result += astart+'p="1">1'+aend+'<span>...</span>';
			    		   for(var i=start;i<=end;i++){
			    			   if(i==current){
				    			   result += '<a class="current">'+i+aend;
				    		   }else{
				    			   result += astart+'p="'+i+'">'+i+aend;
				    		   }
			    		   }
			    	   }
			    	}
			    	if(current<total){
			    		result += astart+'p="'+(parseInt(current)+1)+'" class="next" title="下一页">下一页 >>'+aend;
					}
			    }
			  $('#'+parentID).empty().append(result).find('a[p]').click(function(){
				callback($(this).attr("p"));
			  });
			},
			
			getGameActivateUrl : function(gameid){
				var result = window.location.href.split("//")[0]+"//"+window.location.host+"/";
				switch(gameid){
					case "1500000":{
						result += "v/activate/actgame?gameId=" + gameid +"&areatype=0&activateType=game";
					}
					break;
					case "1400000":
					case "1300000":
					case "3800000":	
					case "900000":{
						result += "v/activate/actgame?gameId=" + gameid +"&areatype=0&activateType=area";
					}
					break;
					case "3100000":{
						result = "javascript:void();";
					}
					break;
					default:{
						result += "v/activate/index#" + gameid;
					}
					break;
				}
				return result;
			}
	};
}(jQuery));


$(function(){
	var basePath=window.location.href.split("//")[0]+"//"+window.location.host+"/",
	ssourl = "https://"+window.location.host.replace(/passport/,"sso")+"/",
	localurl = window.location.href,
	reg =/\/((user)|(billing)|(activate)|(usersafe))\//,
	prop_reg =/\/((v\/billing\/prop))\//;
	if(localurl.match(prop_reg) != null){
		$.KzUtils.topTabs(4);
		$.KzUtils.billingTabs(localurl);
	}else{
		var r = localurl.match(reg);
    		var m='user';
		if(r!=null) m=r[1];
	
		switch(m){
			case "user":{
				$.KzUtils.topTabs(0);
			}
			break;
			case "billing":{
				$.KzUtils.topTabs(1);
				$.KzUtils.billingTabs(localurl);
			}
			break;
			case "activate":{
				$.KzUtils.topTabs(3);
				}
				break;
			case "usersafe":
				$.KzUtils.topTabs(2);
				break;
			}
		}
		var username = $.trim($.KzCookie.g('UDT-KZG'));
		if(username==""){
			$('#user_head_top').html('<span class="line">|</span><a class="fsan" href="'+basePath+'acc">免费注册</a><span class="line">|</span><a class="fsan" href="'+basePath+'login">登录</a>');
		}else{
			
			username = $.KzUtils.hidename(username);
			$('#user_head_top').html('<span class="line">|</span><a href="'+ssourl+'logout?service='+basePath+'login" style="cursor:pointer" id="logout_btn">注销</a><span class="line">|</span><span>您好，<span>'+username+'</span></span>');
		}
		$('span#xst').hover(
			function(){$(this).find('.tsbox').css('display','block');},
			function(){$(this).find('.tsbox').css('display','none');});
		$(".alersys a.guan").click(
			function(){$(this).parent().hide();});
		 $(".gm_ct").hover(
			  		function () { $(this).addClass("gmt");},
			  		function () { $(this).removeClass("gmt");}
			        );
				$('.gamelist li').last().addClass('bgbone');
				$('.gamelist li').hover(
				 function(){$(this).addClass("bg");},
				 function(){$(this).removeClass("bg");});
				$('.game_list li').hover(
				 function(){$(this).addClass("bg");},
				 function(){$(this).removeClass("bg");});
				$(function(){
					$('.bsec a.forg,.bsec a.fhui').hover(
					 function(){$(this).nextAll('.edit').css('display','block');},
					 function(){$(this).nextAll('.edit').css('display','none');});
					});
				
				if (document.all){
					window.attachEvent('onload', onloadwindow);//IEÖÐ
				}else{
					window.addEventListener('load',onloadwindow,false);//firefox
				}
});

	
	
function onloadwindow(){ 
	var yxzx = document.getElementById("yxzx");
    var sqzx = document.getElementById("sqzx");
    if(yxzx&&sqzx){
    yxzx.onmouseover = function(evert) {
        this.getElementsByTagName("dd")[0].style.display = "block";
        this.getElementsByTagName("dt")[0].className = "avc";
    }
    yxzx.onmouseout = function(evert) {
        this.getElementsByTagName("dd")[0].style.display = "none";
        this.getElementsByTagName("dt")[0].className = "";
    }
    sqzx.onmouseover = function(evert) {
        this.getElementsByTagName("dd")[0].style.display = "block";
        this.getElementsByTagName("dt")[0].className = "avc";
    }
    sqzx.onmouseout = function(evert) {
        this.getElementsByTagName("dd")[0].style.display = "none";
        this.getElementsByTagName("dt")[0].className = "";
    }
    }
}

function showMoreBank()
{
	var str = document.getElementById('displayTable').style.display ;
	if(str=="none")
	{
		document.getElementById('displayTable').style.display = "block";
		document.getElementById('moreBank').innerHTML="收起";
	}else
	{
		document.getElementById('displayTable').style.display = "none";
		document.getElementById('moreBank').innerHTML="更多银行";
	}
} 


function getOuterHtml(obj) {
    var box = $('<div></div>');

    for (var i = 0; i < obj.length; i ++) {

        box.append($(obj[i]).clone());

    }

    return box.html();

}

