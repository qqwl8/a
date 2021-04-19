$(document).ready(function(){		
	//分类热门切换
	$(".nav span").click(function(){
		var page=$(this).attr("uid");//滑动门页面
		//当前选项高亮
		$(".nav span").removeClass();
		$(this).addClass("hover");
		//页面隐藏与现实
		$("#news .list").hide();		
		$(page).fadeIn(300);
	});
});