layui.use(['jquery', 'element', 'layer'], function() {
	var $ = layui.jquery,
		element = layui.element,
		layer = layui.layer;

	var wSlide = $(".w-slide"),
		wBottom = $(".w-bottom");

	//	layer.msg('你好5');

	$("#mobileBtn").click(function() {
		$("body").toggleClass("site-mobile");
	});

	var shadeMobile = $(".site-mobile-shade");
	shadeMobile.on('click', function() {
		$('body').removeClass('site-mobile');
	});

	$("#allOpen").click(function() {
		layer.confirm('是否全部开启?',function(){
			console.log(1);
		});
	});
	$("#allClose").click(function(){
		layer.confirm('是否全部禁用?');
	});

	$(".w-slide-header .icon").click(function() {
		wSlide.animate({
			right: '-100%'
		}, function() {
			$(this).hide();
		});
	});

	$(".js_open_slide").click(function() {
		wSlide.show();
		wSlide.animate({
			right: '0'
		});
	});
	
	$(".w-bottom .icon").click(function(){
		wBottom.animate({
			bottom: '-100%'
		},function(){
			$(this).hide();
		});
	});

});