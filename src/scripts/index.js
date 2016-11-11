var Swiper = require("./components/swiper/swiper-3.3.1.min");
var SwiperAnimate = require("./components/swiper/swiper.animate1.0.2.min");
var $ = require('zepto-modules/zepto');
require('zepto-modules/event');
require('zepto-modules/ajax');
require('zepto-modules/touch');
require('../font/iconfont');
module.exports = $;
require('./components/rem'); //引入remjs文件，用作手机端响应式布局
var wx = require("./components/weixin/jweixin");
var IScroll = require("./components/iscroll/iscroll");
//用swiper控制开始进入时的引导动画...
var swiper = new Swiper(".swiper-container", {
	onInit: function(swiper) { //Swiper2.x的初始化是onFirstInit
		SwiperAnimate.swiperAnimateCache(swiper); //隐藏动画元素 
		SwiperAnimate.swiperAnimate(swiper); //初始化完成开始动画
	},
	onSlideChangeEnd: function(swiper) {
		SwiperAnimate.swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
	}
});

//定义三个变量，作为加载过的标记，如果之前加载过，则不重复加载
var skill = true;
var project = true;
var work = true;
var my = true;

//如果本地存储没有保存数据，则显示出场动画
if (!window.localStorage.getItem("first")) {
	window.localStorage.setItem("first", "true"); //设置数据

	$('#myIscroll').hide();
	$('.swiper-container').show();

	$('.exprience').tap(function() {
		$('#myIscroll').show()
		$('.swiper-container').hide();

		//如果没有加载过数据，则加载数据
		if (skill) {
			$.ajax({
				'type': 'get',
				'url': 'http://3.592606942.applinzi.com/skill.php',
				'async': 'true',
				'success': function(data) {
					var dataUrl = data.indexOf("<");
					dataStr = data.substring(0, dataUrl);
					var data = JSON.parse(dataStr);

					$('.wrapper').css({ //默认显示第一个技能页面
						'display': 'none'
					})
					$('#wrapper1').css({
						'display': 'block'
					})
					$('#header .title').html('技能');

					$.each(data, function() { //加载第一个页面的内容
						$('<li>' +
							'<img src=' + this.src + ' alt="规范">' +
							'<div class="infoContainer">' +
							'<p>' + this.category + '</p>' +
							'<p>' + this.time + '&nbsp;&nbsp;' + this.level + '</p>' +
							'<p>' + this.name + '</p>' +
							'</div>' +
							'</li>').appendTo($('#scroller1 ul'))
					})



					var myScroll;
					myScroll = new IScroll('#wrapper1', {
						mouseWheel: true
					});

					document.addEventListener('touchmove', function(e) {
						e.preventDefault();
					}, false);

					skill = false;
				}
			})
		}

	})

} else {
	if (skill) {
		$.ajax({
			'type': 'get',
			'url': 'http://3.592606942.applinzi.com/skill.php',
			'async': 'true',
			'success': function(data) {
				var dataUrl = data.indexOf("<");
				dataStr = data.substring(0, dataUrl);
				var data = JSON.parse(dataStr);

				$('.wrapper').css({ //默认显示第一个技能页面
					'display': 'none'
				})
				$('#wrapper1').css({
					'display': 'block'
				})
				$('#header .title').html('技能');

				$.each(data, function() { //加载第一个页面的内容
					$('<li>' +
						'<img src=' + this.src + ' alt="规范">' +
						'<div class="infoContainer">' +
						'<p>' + this.category + '</p>' +
						'<p>' + this.time + '&nbsp;&nbsp;' + this.level + '</p>' +
						'<p>' + this.name + '</p>' +
						'</div>' +
						'</li>').appendTo($('#scroller1 ul'))
				})


				setTimeout(function() {
					var myScroll;
					myScroll = new IScroll('#wrapper1', {
						mouseWheel: true
					});

					document.addEventListener('touchmove', function(e) {
						e.preventDefault();
					}, false);

					skill = false;
				}, 500)
			}
		})
	}
}

//点击三个按钮时按钮的高亮选中效果
$('#footer div').tap(function(){
	$('#footer div').removeClass("active");
	$(this).addClass("active");
})



//技能按钮
$('#skill').tap(function() {

	$('.wrapper').css({ //默认显示第一个技能页面
		'display': 'none'
	})
	$('#wrapper1').css({
		'display': 'block'
	})
	$('#header .title').html('技能');

	if (skill) { //判断是否加载过，没加载过重新加载，加载过就不不加载了
		$.ajax({
			'type': 'get',
			'url': 'http://3.592606942.applinzi.com/skill.php',
			'async': 'true',
			'success': function(data) {
				var dataUrl = data.indexOf("<");
				dataStr = data.substring(0, dataUrl);
				var data = JSON.parse(dataStr);

				$.each(data, function() { //加载第一个页面的内容
					$('<li>' +
						'<img src=' + this.src + ' alt="规范">' +
						'<div class="infoContainer">' +
						'<p>' + this.category + '</p>' +
						'<p>' + this.time + '&nbsp;&nbsp;' + this.level + '</p>' +
						'<p>' + this.name + '</p>' +
						'</div>' +
						'</li>').appendTo($('#scroller1 ul'))
				})


				setTimeout(function() {
					var myScroll;
					myScroll = new IScroll('#wrapper1', {
						mouseWheel: true
					});

					document.addEventListener('touchmove', function(e) {
						e.preventDefault();
					}, false);

					skill = false;
				}, 500)
			}
		})
	}
})



//项目按钮
$('#project').tap(function() {


	$('.wrapper').css({ //切换页面
		'display': 'none'
	})
	$('#wrapper2').css({
		'display': 'block'
	})
	$('#header .title').html('项目');

	if (project) {
		$.ajax({ //进行请求
			'type': 'post',
			'url': 'http://3.592606942.applinzi.com/project.php',
			'async': 'true',
			'success': function(data) {
				var dataUrl = data.indexOf("<");
				dataStr = data.substring(0, dataUrl);
				var data = JSON.parse(dataStr);

				//第二页  
				$.each(data, function() {
					$('<li>' +
						'<div class="title">' +
						'<img src=' + this.headPort + '>' +
						'<div class="titleInfo">' +
						'<h2>' + this.name + '</h2>' +
						'<p>' + this.category + '</p>' +
						'<p>' + this.url + '</p>' +
						'</div>' +
						'</div>' +
						'<div class="info">' +
						'<img src=' + this.image + ' >' +
						'<div class="details">' +
						'<p>' + this.description + '</p>' +
						'<p>' + this.detail + '</p>' +
						'<p>' + this.tech + '</p>' +
						'</div>' +
						'</div>' +
						'</li>').appendTo($('#scroller2 ul'));
				});

				setTimeout(function() {
					var myScroll;
					myScroll = new IScroll('#wrapper2', {
						mouseWheel: true
					});

					document.addEventListener('touchmove', function(e) {
						e.preventDefault();
					}, false);
					project = false;
				}, 500)
			}
		})
	}
})

// //经历按钮

$('#work').tap(function() {
	$('.wrapper').css({ //切换页面
		'display': 'none'
	})
	$('#wrapper3').css({
		'display': 'block'
	})
	$('#header .title').html('项目');

	if (work) {
		$.ajax({ //进行请求
			'type': 'post',
			'url': 'http://3.592606942.applinzi.com/work.php',
			'async': 'true',
			'success': function(data) {
				var dataUrl = data.indexOf("<");
				dataStr = data.substring(0, dataUrl);
				var data = JSON.parse(dataStr);

				//第三页  
				$.each(data, function() {
					$('<li>' +
						'<div class="title">' +
						'<img src=' + this.headPort + ' >' +
						'<div class="titleInfo">' +
						'<h2>' + this.name + '</h2>' +
						'<p>' + this.category + '</p>' +
						'<p>' + this.url + '</p>' +
						'</div>' +
						'</div>' +
						'<div class="info">' +
						'<img src=' + this.image + ' >' +
						'<div class="details">' +
						'<p>任职：' + this.posts + '</p>' +
						'<p>部门人数：' + this.people + '</p>' +
						'<p>承包项目：' + this.projects + '</p>' +
						'<p>任职时长：' + this.time + '</p>' +
						'</div>' +
						'</div>' +
						'</li>').appendTo($('#scroller3 ul'));
				})

				setTimeout(function() {
					var myScroll;
					myScroll = new IScroll('#wrapper3', {
						mouseWheel: true
					});

					document.addEventListener('touchmove', function(e) {
						e.preventDefault();
					}, false);
					work = false;
				}, 500)
			}
		})
	}
})

$('#my').tap(function() {
	$('.wrapper').css({ //切换页面
		'display': 'none'
	})
	$('#wrapper4').css({
		'display': 'block'
	})
	$('#header .title').html('我的');

	if (my) {
		$.ajax({ //进行请求
			'type': 'get',
			'url': 'http://3.592606942.applinzi.com/my.php',
			'async': 'true',
			'success': function(data) {
				var dataUrl = data.indexOf("<");
				dataStr = data.substring(0, dataUrl);
				var data = JSON.parse(dataStr);

				//第四页请求数据遍历结构
				$.each(data, function() {
					if (this.type == "contact") {
						$('<li>' +
							'<svg class="icon" aria-hidden="true">' +
							'<use xlink:href=' + this.icon + '></use>' +
							'</svg>' +
							'<div class="myDetails">' +
							this.details +
							'</div>' +
							'</li>').appendTo($($('#scroller4 .infoContainer>li').get(1)).find('ul'));
					}
					if (this.type == "interest") {
						$('<li>' +
							'<svg class="icon" aria-hidden="true">' +
							'<use xlink:href=' + this.icon + '></use>' +
							'</svg>' +
							'<div class="myDetails">' +
							this.details +
							'</div>' +
							'</li>').appendTo($($('#scroller4 .infoContainer>li').get(2)).find('ul'));
					}
				})

				setTimeout(function() {
					var myScroll;
					myScroll = new IScroll('#wrapper4', {
						mouseWheel: true
					});

					document.addEventListener('touchmove', function(e) {
						e.preventDefault();
					}, false);
					my = false;
				}, 500)
			}
		})
	}
})

// //调用微信接口
$.post('http://2.592606942.applinzi.com/php/getSign.php',{
        url:window.location.href
    },function(data){
        pos=data.indexOf('}');
        dataStr=data.substring(0,pos+1);

        objData=JSON.parse(dataStr);

        wx.config({
   		 debug: true,
   		 appId:objData.appId,
  		 timestamp: objData.timestamp,
   		 nonceStr: objData.nonceStr,
    	 signature: objData.signature,
    	 jsApiList: [
      		// 所有要调用的 API 都要加到这个列表中
     		 'chooseImage','scanQRCode'
    	 ]
    })  
});

wx.ready(function() {
	// 在这里调用 API
	$('.back').tap(function(){
		wx.chooseImage({
			count: 1, // 默认9
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function(res) {
				var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
			}
		});
	})
	$('.more').tap(function() {
		wx.scanQRCode({
			needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
			scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
			success: function(res) {
				var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
			}
		});
	})
});