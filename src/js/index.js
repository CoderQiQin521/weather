layui.use(['jquery', 'element', 'layer'], function() {
	var $ = layui.jquery,
		element = layui.element,
		layer = layui.layer;

	//	layer.msg('你好5');

	$("#mobileBtn").click(function() {
		$("body").toggleClass("site-mobile");
	});

	var shadeMobile = $(".site-mobile-shade");
	shadeMobile.on('click', function() {
		$('body').removeClass('site-mobile');
	});

	$("#allOpen").click(function() {
		layer.confirm('是否全部开启');
	});

});