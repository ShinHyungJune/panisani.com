$(document).ready(function(){
	//spaceBox();
	//autoSection();
});

// space-box
/*
function spaceBox(){
	var documentHei = $(document).height();

	$(".space-box").height(documentHei);
}
*/

// section
/*
function autoSection(){
	var is_header = $("header").length;
	var is_footer = $("footer").length;

	if(is_header > 0){
		var header = $("header").outerHeight();
		$("section").css({"padding-top":header+"px"});
	}

	if(is_footer > 0){
		var footer = $("footer").outerHeight();
		$("section").css({"padding-bottom":footer+"px"});
	}
}
*/

// modal open
function modalOpen(type){
	var box = $(".modal-box .box[data-name=" + type + "]");

	box.show();
	box.siblings().hide();
	$("html , body , .modal-box").addClass("fixed");
	box.removeClass("nofixed");
	box.addClass("fixed");
}

// modal close
function modalClose(type){
	var box = $(".modal-box .box[data-name=" + type + "]");

	box.removeClass("fixed");
	box.addClass("nofixed");
	setTimeout(function(){
		$("html , body , .modal-box").removeClass("fixed");
	},500);
}

// menu open
function menuOpen(){
	$("html , body , .fnb").addClass("fixed");
}

// menu close
function menuClose(){
	$("html , body , .fnb").removeClass("fixed");
}

function searchToggle(obj){
	var parent = $(obj).parent();

	parent.toggleClass("active");
	parent.siblings().removeClass("active");
	$(".comment-search").toggleClass("active");
}

function toggle(obj){
	var parent = $(obj).closest(".toggle-box");

	$(obj).toggleClass("active");
	parent.find(".toggle-body").stop().slideToggle();
	parent.siblings(".toggle-box").find(".more").removeClass("active");
	parent.siblings(".toggle-box").find(".toggle-body").stop().slideUp();
}

function setting(obj){
	var parent = $(obj).closest(".list-item");

	parent.toggleClass("active");
	parent.siblings(".list-item").removeClass("active");
	parent.find(".setting-body").stop().slideToggle();
	parent.siblings(".list-item").find(".setting-body").stop().slideUp();
}

function stateMore(obj){
	var parent = $(obj).closest("dd");
	parent.find("div").toggle();
}

// input focus
$(document).on("focus",".input-box input",function(){
	parent = $(this).parent();
	parent.addClass("active");
});

// input blur
$(document).on("blur",".input-box input",function(){
	parent = $(this).parent();
	parent.removeClass("active");

	var box = $(this).closest(".input-box");
	var redex = /\s/ig;
	var value = $(this).val().toString().replace(redex, "").length;

	if(value > 0){
		box.addClass("success");
	}else{
		box.removeClass("success");
	}
});


// search
$(document).on("keydown",".search-box input",function(){
	$(".search-box").addClass("active");
});

// search blur
$(document).on("blur",".search-box input",function(){
	$(".search-box").removeClass("active");
});

// select
$(document).on("click",".select-box button",function(){
	var parent = $(this).parent(".select-box");

	parent.toggleClass("active");
	$(".select-box").not(parent).removeClass("active");
});

$(document).on("click",".select-box a",function(){
	var parent = $(this).closest(".select-box");
	var list = $(this).parent("dd");
	var btn = parent.find("button");
	var inputs = parent.find("input[type=hidden]");

	btn.text($(this).text());
	inputs.val($(this).text());
	list.addClass("active");
	list.siblings().removeClass("active");
	parent.removeClass("active").addClass("on");
});



// 외부클릭
$(document).click(function(event){
	var isToggle = $(event.target);
	var Tag = isToggle[0].tagName;
	var Object = $(".select-box.active");

	// 열려있는 셀렉박스가 있을때만 실행
	if(Object.length == 0){
		if(Object.hasClass("active") == true){
			Object.removeClass("active");
		}
	}
});
