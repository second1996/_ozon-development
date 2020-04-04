// document.addEventListener("DOMContentLoaded", function() {

// 	// Custom JS

// });


$(document).ready(function(){

	//initialize swiper when document ready
	var homeSwiper = new Swiper ('.h-heroes-slider', {
		effect: 'fade',
		loop: true,
		speed: 1000,
		lazy: {
			loadOnTransitionStart: true,
		},
		allowTouchMove: false,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
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


	// $('.hamburger').on('click', function() {
	// 	$(this).toggleClass('is-active')
	// });

});