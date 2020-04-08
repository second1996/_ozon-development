// document.addEventListener("DOMContentLoaded", function() {

// 	// Custom JS

// });

$(document).ready(function(){
	
	// LazyLoad images
	var lazyLoadInstance = new LazyLoad({
		elements_selector: ".lazy",
		load_delay: 250,
		callback_loaded: function(element) {
			// console.log("👍 LOADED", element);
			$(element).siblings('.lazy-spin').remove();
		},
	});

	// Swiper for Home section: "Heroes"
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
		preloadImages: false,
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

	// Swiper for Home section "Construction"
	var constructionSwiper = new Swiper ('.h-construction-slider', {
		spaceBetween: 20,
		slidesPerView: 3,
		grabCursor: true,
		freeMode: true,
		preloadImages: false,
		lazy: {
			loadPrevNext: true,
		},
		watchSlidesVisibility: true,
		navigation: {
			nextEl: '.h-construction-slider-next',
			prevEl: '.h-construction-slider-prev',
		},
		scrollbar: {
			el: '.h-construction-scrollbar',
		},
	})


	// $('.hamburger').on('click', function() {
	// 	$(this).toggleClass('is-active')
	// });

});