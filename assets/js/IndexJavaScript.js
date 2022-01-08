$(function(){
	$(window).scroll(function(){
		$("nav").stop().animate({"top":$(window).scrollTop()+200},500);
		});
});