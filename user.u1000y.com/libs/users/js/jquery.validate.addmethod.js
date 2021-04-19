$(function() {
    // 判断整数value是否等于0 
    jQuery.validator.addMethod("isIntEqZero", function(value, element) { 
         value=parseInt(value);      
         return this.optional(element) || value==0;       
    }, "整数必须为0"); 
    // 判断整数value是否不等于0 
    jQuery.validator.addMethod("isnoIntEqZero", function(value, element) { 
         //value=parseInt(value);      
         return this.optional(element) || value!=0;       
    }, "整数必须为0"); 
    // 只能输入[0-9]数字
    jQuery.validator.addMethod("isDigits", function(value, element) {       
         return this.optional(element) || /^\d+$/.test(value);       
    });  
	//用户名
    jQuery.validator.addMethod("username", function(value, element) {
        var username = /^[\d_a-zA-Z_]{4,16}$/
        return this.optional(element) || (username.test(value));
    }, "用户名格式错误。");
	//密码
    jQuery.validator.addMethod("password", function(value, element) {
        var password = /^[^\u4E00-\u9FA5]{4,30}$/
        return this.optional(element) || (password.test(value));
    }, "密码格式错误");
	//联系人
    jQuery.validator.addMethod("contact", function(value, element) {
        var contact = /(?:[\u4E00-\u9FFF]{1,8}·\u4E00-\u9FFF]{1,8})|(?:[\u4E00-\u9FFF]{2,5})/
        return this.optional(element) || (contact.test(value));
    }, "联系人格式错误");
	//身份证
    jQuery.validator.addMethod("cardno", function(value, element) { 
      return this.optional(element) || cardno(value);    
    }, "请输入正确的身份证号码。"); 
	//手机号
    jQuery.validator.addMethod("phone", function(value, element) { 
       // var phone = /^0?(13[0-9]|15[0-9]|18[0-9]|14[0-9]|17[0-9])[0-9]{8}$/
        var phone = /^0?((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8]))\d{8}$/
        return this.optional(element) || (phone.test(value));
    }, "请输入正确的手机号码。"); 
	//手机号
    jQuery.validator.addMethod("money", function(value, element) { 
        var money = /^\d+(\.\d{1,2})?$/
        return this.optional(element) || (money.test(value));
    }, "金额正确格式【1.00】"); 
	
	//身份证验证
        function cardno(code) { 
		   // alert(code);
		   code = code.toUpperCase();
            var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
            var tip = "";
            var pass= true;
            
            if(!code || !/^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2010)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/i.test(code)){
                tip = "身份证号格式错误";
                pass = false;
            }
            
           else if(!city[code.substr(0,2)]){
                tip = "地址编码错误";
                pass = false;
            }
            else{
                //18位身份证需要验证最后一位校验位
                if(code.length == 18){
                    code = code.split('');
                    //∑(ai×Wi)(mod 11)
                    //加权因子
                    var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                    //校验位
                    var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                    var sum = 0;
                    var ai = 0;
                    var wi = 0;
                    for (var i = 0; i < 17; i++)
                    {
                        ai = code[i];
                        wi = factor[i];
                        sum += ai * wi;
                    }
                    var last = parity[sum % 11];
                    if(parity[sum % 11] != code[17]){
                        tip = "校验位错误";
                        pass =false;
                    }
                }
            }
         //   if(!pass) alert(tip);
            return pass;
        }
});