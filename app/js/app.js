// document.addEventListener("DOMContentLoaded", function() {

// 	// Custom JS

// });


$(document).ready(function(){

	var homeSwiper = new Swiper ('.h-heroes-slider', {
		effect: 'fade',
		loop: true,
		speed: 0,
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

	var constructionSwiper = new Swiper ('.h-construction-slider', {
		spaceBetween: 20,
		slidesPerView: 3,
		grabCursor: true,
		freeMode: true,
		navigation: {
			nextEl: '.h-construction-slider-next',
			prevEl: '.h-construction-slider-prev',
		},
		scrollbar: {
			el: '.swiper-scrollbar',
		},
	})


	// $('.hamburger').on('click', function() {
	// 	$(this).toggleClass('is-active')
	// });

});