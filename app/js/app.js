// document.addEventListener("DOMContentLoaded", function() {

// 	// Custom JS

// });


$(document).ready(function(){

	//initialize swiper when document ready
	var homeSwiperAutoplay = 5000;
	var homeSwiper = new Swiper ('.h-heroes-slider', {
		effect: 'fade',
		loop: true,
		speed: 1000,
		lazy: {
			loadOnTransitionStart: true,
		},
		allowTouchMove: false,
		autoplay: {
			delay: homeSwiperAutoplay,
		},
		// preloadImages: false,
		// navigation: {
		// 	nextEl: '.swiper-button-next',
		// 	prevEl: '.swiper-button-prev',
		// },
		pagination: {
			el: '.h-heroes-slider-pagination',
			clickable: true,
			renderBullet: function(index, className) {
				var names = [];
				$(".swiper-wrapper .swiper-slide").each(function(i) {
					names.push($(this).data("title"));
				});
				return '<div class="' + className + '"><span class="current">0' + [index + 1] + '</span><span class="title">' + (names[index + 1]) + '</span><span class="progress"></span></div>';
			}
		},
	});

	// homeSwiper.on('initialSlide', function () {
	// 	console.log('slide changed');
	// 	var elem         = $('.h-heroes-slider .swiper-pagination-bullets .swiper-pagination-bullet .progress'),
	// 			width        = 0,
	// 			autoplayTime = homeSwiperAutoplay / 100,
	// 			id           = setInterval(frame, autoplayTime);
	// 	function frame() {
	// 			if (width >= 100) {
	// 					clearInterval(id);
	// 			} else {
	// 					width++; 
	// 					elem.css({ width: width + '%' }); 
	// 			}
	// 	}
	// });

	// function () {
	// 	var elem         = $('.h-heroes-slider .swiper-pagination-bullets .swiper-pagination-bullet .title'),
	// 			width        = 1,
	// 			autoplayTime = homeSwiperAutoplay / 100,
	// 			id           = setInterval(frame, autoplayTime);
	// 			elem.hide();
	// 	function frame() {
	// 			if (width >= 100) {
	// 					clearInterval(id);
	// 			} else {
	// 					width++; 
	// 					elem.css({ width: width + '%' }); 
	// 			}
	// 	}
	// }

	// $('.hamburger').on('click', function() {
	// 	$(this).toggleClass('is-active')
	// });

});