$(document).ready(function () {
	/**
	 * Genplan Tooltip
	 */
	$gpWrap = $('.h-genplan-wrap');
	$gpCards = $('.h-genplan-map .house--sale, .h-genplan-map .house--sold, .h-genplan-map .house--reserved, .h-genplan-map .house--first-stage, .h-genplan-map .house--second-stage, .h-genplan-map .house--second-stage-addition, .h-genplan-map .house--third-stage');
	$gpVacation = $('.h-genplan-map .vacation-zone');
	$gpStage = $('.h-genplan-map .second-stage');
	$gpTooltip = $('.h-genplan-tooltip');
	$gpVacationTooltip = $('.h-genplan-vacation-tooltip');
	$gpStageTooltip = $('.h-genplan-stage-tooltip');
	$gpTooltipTitle = $('#gp-tooltip-title');
	$gpTooltipNumber = $('#gp-tooltip-number');
	$gpTooltipProgress = $('#gp-tooltip-progress');
	$gpTooltipSquare = $('#gp-tooltip-square');
	$gpTooltipArea = $('#gp-tooltip-area');
	$gpTooltipStatus = $('#gp-tooltip-status');
	$gpTooltipPhoto = $('#gp-tooltip-photo');
	$gpHousePhotos = {
		Nebokray: 'https://ozon-ltd.com/wp-content/uploads/2020/05/villa-nebokray-main-1024x579.jpg',
		Zatyshok: 'https://ozon-ltd.com/wp-content/uploads/2020/05/villa-zatyshok-main-1024x579.jpg',
		Svitanok: 'https://ozon-ltd.com/wp-content/uploads/2020/05/villa-svitanok-main-1024x579.jpg',
		Harmonia: 'https://ozon-ltd.com/wp-content/uploads/2020/09/villa-harmonia-main-1024x579.jpg',
		Prostir: 'https://ozon-ltd.com/wp-content/uploads/2021/11/02_CShading_LightMix-1-1024x673.jpg',
		Mriya: 'https://ozon-ltd.com/wp-content/uploads/2022/04/03-1024x578.jpg',
		Obriy: 'https://ozon-ltd.com/wp-content/uploads/2023/02/3_31-Photo-1024x576.jpg',
		ObriyB: 'https://ozon-ltd.com/wp-content/uploads/2023/11/1_12-Photo-1024x576.jpg',
		Vesna: 'https://ozon-ltd.com/wp-content/uploads/2023/02/2_21-Photo-1024x576.jpg',
		VesnaB: 'https://ozon-ltd.com/wp-content/uploads/2023/11/1_1-Photo-1024x576.jpg',
		Oberih: 'https://ozon-ltd.com/wp-content/uploads/2023/11/1_26-Photo-1024x576.jpg',
		Zahid: 'https://ozon-ltd.com/wp-content/uploads/2024/10/2_4-Photo-1024x576.jpg',
		Zlahoda: 'https://ozon-ltd.com/wp-content/uploads/2024/10/10-1-1-1024x576.jpg',
	};

	$gpCards.hover(
		function () {
			let houseType = $(this).data('house-name');
			let houseStatus = $(this).data('house-status');

			$gpTooltip.addClass('active');
			$gpTooltipTitle.text($(this).data('house-name'));
			$gpTooltipNumber.text($(this).data('house-number'));
			$gpTooltipProgress.find('.progress-bar .value').text($(this).data('house-progress') + '%');
			$gpTooltipProgress.find('.progress-bar .line').css('width', $(this).data('house-progress') + '%');
			$gpTooltipSquare.text($(this).data('house-square'));
			$gpTooltipArea.text($(this).data('house-area'));

			if (houseStatus == 'sold' || houseStatus == 'reserved') {
				$gpTooltipProgress.addClass('d-none');
			} else {
				$gpTooltipProgress.removeClass('d-none');
			}

			switch (houseType) {
				case 'VILLA NEBOKRAY':
					$gpTooltipPhoto.attr('style', 'background-image: url("' + $gpHousePhotos.Nebokray + '")');
					break;
				case 'VILLA SVITANOK':
					$gpTooltipPhoto.attr('style', 'background-image: url("' + $gpHousePhotos.Svitanok + '")');
					break;
				case 'VILLA ZATYSHOK':
					$gpTooltipPhoto.attr('style', 'background-image: url("' + $gpHousePhotos.Zatyshok + '")');
					break;
				case 'VILLA HARMONIA':
					$gpTooltipPhoto.attr('style', 'background-image: url("' + $gpHousePhotos.Harmonia + '")');
					break;
				case 'VILLA PROSTIR':
					$gpTooltipPhoto.attr('style', 'background-image: url("' + $gpHousePhotos.Prostir + '")');
					break;
				case 'VILLA MRIYA':
					$gpTooltipPhoto.attr('style', 'background-image: url("' + $gpHousePhotos.Mriya + '")');
					break;
				case 'VILLA OBRIY':
					$gpTooltipPhoto.attr('style', 'background-image: url("' + $gpHousePhotos.Obriy + '")');
					break;
				case 'VILLA OBRIY В':
					$gpTooltipPhoto.attr('style', 'background-image: url("' + $gpHousePhotos.ObriyB + '")');
					break;
				case 'VILLA VESNA':
					$gpTooltipPhoto.attr('style', 'background-image: url("' + $gpHousePhotos.Vesna + '")');
					break;
				case 'VILLA VESNA В':
					$gpTooltipPhoto.attr('style', 'background-image: url("' + $gpHousePhotos.VesnaB + '")');
					break;
				case 'VILLA OBERIH':
					$gpTooltipPhoto.attr('style', 'background-image: url("' + $gpHousePhotos.Oberih + '")');
					break;
				case 'VILLA ZAHID':
					$gpTooltipPhoto.attr('style', 'background-image: url("' + $gpHousePhotos.Zahid + '")');
					break;
				case 'VILLA ZLAHODA':
					$gpTooltipPhoto.attr('style', 'background-image: url("' + $gpHousePhotos.Zlahoda + '")');
					break;
				default:
					break;
			}

			switch (houseStatus) {
				case 'reserved':
					$gpTooltipStatus.attr('class', 'status status--reserved');
					$gpTooltipStatus.text('Заброньовано');
					break;
				case 'sold':
					$gpTooltipStatus.attr('class', 'status status--sold');
					$gpTooltipStatus.text('Продано');
					break;
				case 'sale':
					$gpTooltipStatus.attr('class', 'status status--sale');
					$gpTooltipStatus.text('В продажу');
					break;
				case 'first-stage':
					$gpTooltipStatus.attr('class', 'status status--first-stage');
					$gpTooltipStatus.text('1 черга');
					break;
				case 'second-stage':
					$gpTooltipStatus.attr('class', 'status status--second-stage');
					$gpTooltipStatus.text('2 черга');
					break;
				case 'second-stage-addition':
					$gpTooltipStatus.attr('class', 'status status--second-stage');
					$gpTooltipStatus.text('2 черга');
				case 'third-stage':
					$gpTooltipStatus.attr('class', 'status status--third-stage');
					$gpTooltipStatus.text('3 черга');
					break;
				default:
					break;
			}
		},
		function () {
			$gpTooltip.removeClass('active');
		},
	);

	$gpVacation.hover(
		function () {
			$gpVacationTooltip.addClass('active');
		},
		function () {
			$gpVacationTooltip.removeClass('active');
		},
	);

	$gpStage.hover(
		function () {
			$gpStageTooltip.addClass('active');
		},
		function () {
			$gpStageTooltip.removeClass('active');
		},
	);

	$('#second-stage').on('mousemove', function (e) {
		$gpStageTooltip.css({
			top: e.pageY + 30,
			left: e.pageX,
		});
	});

	$('.h-genplan-map .vacation-zone').on('mousemove', function (e) {
		$gpVacationTooltip.css({
			top: e.pageY + 30,
			left: e.pageX - 10,
		});
	});

	$gpCards.on('mousemove', function (e) {
		$gpTooltip.css({
			top: e.pageY + 30,
			left: e.pageX - 10,
		});
	});

	/**
	 * Choose your house tooltip
	 */
	$('.h-genplan-map .house--process').hover(
		function () {
			$('.h-genplan-process-tooltip').addClass('active');
			$('#gp-process-tooltip-number').text($(this).data('house-number'));
			$('#gp-process-tooltip-area').text($(this).data('house-area'));
		},
		function () {
			$('.h-genplan-process-tooltip').removeClass('active');
		},
	);

	$('.h-genplan-map .house--process').bind('click.smoothscroll', function () {
		var target = $(this).parent().attr('xlink:href'),
			bl_top = $(target).offset().top - 75;

		$('body, html').animate({ scrollTop: bl_top }, 1000);
		return false;
	});

	$('.h-genplan-map .house--process').on('mousemove', function (e) {
		$('.h-genplan-process-tooltip').css({
			top: e.pageY + 30,
			left: e.pageX - 10,
		});
	});

	/**
	 * Init Inputmask
	 */
	$(':input').inputmask();

	/**
	 * Construction Modal Template (Модальне вікно для "Хід будівництва")
	 */
	$('#constructionModal').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget),
			title = button.data('constr-title'),
			images = button.data('constr-images'),
			text = button.data('constr-text'),
			modal = $(this);

		modal.find('.modal-title > span').text(title);
		modal.find('.modal-fancy').html(images);
		modal.find('.modal-text').html(text);
	});

	/**
	 * Init Fancybox
	 */
	$('[data-fancybox]').fancybox({
		buttons: ['zoom', 'fullScreen', 'thumbs', 'close'],
		thumbs: {
			autoStart: true,
			axis: 'x',
		},
		backFocus: false,
	});

	// LazyLoad images
	var lazyLoadInstance = new LazyLoad({
		elements_selector: '.lazy',
		load_delay: 250,
		callback_loaded: function (element) {
			// console.log("👍 LOADED", element);
			$(element).siblings('.lazy-spin').remove();
		},
	});

	/**
	 * Swiper for Home section: "Heroes"
	 */
	var homeSwiperAutoplay = 6000;
	var homeSwiper = new Swiper('.h-heroes-slider', {
		effect: 'fade',
		speed: 0,
		autoplay: {
			delay: homeSwiperAutoplay,
			disableOnInteraction: false,
		},
		lazy: {
			loadOnTransitionStart: true,
		},
		allowTouchMove: false,
		preloadImages: false,
		pagination: {
			el: '.h-heroes-slider-pagination',
			clickable: true,
			renderBullet: function (index, className) {
				var slideNames = [],
					slideTitle = $('.h-heroes-slide-content > .title');

				slideTitle.each(function (i) {
					slideNames.push($(this).text());
					// console.log(slideNames);
				});
				return (
					'<div class="' +
					className +
					'"><span class="current">0' +
					[index + 1] +
					'</span><span class="title">' +
					slideNames[index] +
					'</span><span class="progress" style="animation-duration: ' +
					homeSwiperAutoplay +
					'ms"></span></div>'
				);
			},
		},
		breakpoints: {
			320: {
				autoplay: false,
			},
			768: {
				autoplay: {
					delay: homeSwiperAutoplay,
					disableOnInteraction: false,
				},
			},
		},
	});

	/**
	 * Swiper for Home section: "About Us"
	 */
	var quoteSwiper = new Swiper('.h-about-quote-slider', {
		slidesPerView: 1,
		speed: 1000,
		grabCursor: true,
		autoplay: {
			delay: 5000,
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	});

	/**
	 * Swiper for Home section "Construction"
	 */
	var constructionSwiper = new Swiper('.h-construction-slider', {
		spaceBetween: 20,
		slidesPerView: 3,
		grabCursor: true,
		freeMode: true,
		preloadImages: false,
		navigation: {
			nextEl: '.h-construction-slider-next',
			prevEl: '.h-construction-slider-prev',
		},
		scrollbar: {
			el: '.h-construction-scrollbar',
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			660: {
				slidesPerView: 2,
			},
			940: {
				slidesPerView: 3,
			},
		},
	});

	/**
	 * Swiper for single page News & Promo section "Other news"
	 */
	var newsSwiper = new Swiper('.s-news-slider', {
		spaceBetween: 20,
		slidesPerView: 3,
		freeMode: true,
		grabCursor: true,
		preloadImages: false,
		navigation: {
			nextEl: '.s-news-slider-next',
			prevEl: '.s-news-slider-prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			660: {
				slidesPerView: 2,
			},
			940: {
				slidesPerView: 3,
			},
		},
	});

	/**
	 * Swiper for House section "Planning"
	 */
	// var planningSwiper = $('.planning-slider');
	// planningSwiper.each(function(){
	//   var planningSlider = new Swiper (this, {
	//     slidesPerView: 1,
	//     grabCursor: true,
	//     preloadImages: false,
	//     navigation: {
	//       nextEl: $(this).parent().find('.planning-slider-next')[0],
	//       prevEl: $(this).parent().find('.planning-slider-prev')[0],
	//     }
	//   });
	//   $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	//     // e.target // newly activated tab
	//     // e.relatedTarget // previous active tab
	//     planningSlider.update();
	//   });
	// });

	// breakpoint where swiper will be destroyed
	// const breakpoint = window.matchMedia( '(min-width:991.98px)' );
	// // keep track of swiper instances to destroy later
	// let planningSwiper;

	// const breakpointChecker = function() {
	//   // if larger viewport and multi-row layout needed
	//   if ( breakpoint.matches === true ) {
	//     // clean up old instances and inline styles when available
	//   if ( planningSwiper !== undefined ) planningSwiper.destroy( true, true );
	//   // or/and do nothing
	//   return;
	//     // else if a small viewport and single column layout needed
	//     } else if ( breakpoint.matches === false ) {
	//       // fire small viewport version of swiper
	//       return enableSwiper();
	//     }
	// };

	// const enableSwiper = function() {
	//   planningSwiper = new Swiper ('.planning-slider', {
	//     slidesPerView: 1,
	//     grabCursor: true,
	//     preloadImages: false,
	//     navigation: {
	//       nextEl: '.planning-slider-next',
	//       prevEl: '.planning-slider-prev'
	//     }
	//   });
	// };

	// // keep an eye on viewport size changes
	// breakpoint.addListener(breakpointChecker);
	// // kickstart
	// breakpointChecker();

	/**
	 * Swiper for House section "Gallery"
	 */
	var galleryThumbs = new Swiper('.gallery-thumbs', {
		spaceBetween: 10,
		slidesPerView: 12,
		freeMode: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		breakpoints: {
			320: {
				slidesPerView: 4,
			},
			576: {
				slidesPerView: 6,
			},
			768: {
				slidesPerView: 12,
			},
		},
	});

	var gallerySlider = new Swiper('.gallery-slider', {
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		thumbs: {
			swiper: galleryThumbs,
		},
	});

	/**
	 * Swiper for House section "Other houses"
	 */
	var housesSwiper = new Swiper('.houses-slider', {
		spaceBetween: 20,
		slidesPerView: 1,
		grabCursor: true,
		freeMode: true,
		preloadImages: false,
		navigation: {
			nextEl: '.houses-slider-next',
			prevEl: '.houses-slider-prev',
		},
		scrollbar: {
			el: '.houses-scrollbar',
		},
		breakpoints: {
			520: {
				slidesPerView: 1.25,
			},
			768: {
				slidesPerView: 1.75,
			},
			992: {
				slidesPerView: 2.25,
			},
			1240: {
				slidesPerView: 2.5,
			},
			1800: {
				slidesPerView: 3,
			},
		},
	});

	/**
	 * Open "Site menu" when clicked on hamburger button
	 */
	var humbBtn = $('.hamburger'),
		siteMenu = $('.site-menu');

	humbBtn.on('click', function () {
		$('body').toggleClass('menu-open');
		$(humbBtn).toggleClass('is-active');
		siteMenu.toggleClass('shown');
	});
	$('.site-menu-footer-btn, .site-menu-navigation-list > li > a').on('click', function () {
		$('body').removeClass('menu-open');
		$(humbBtn).removeClass('is-active');
		siteMenu.removeClass('shown');
	});

	/**
	 * Anchor smooth scroll link
	 */
	$('a[data-link^="anchor"]').bind('click.smoothscroll', function () {
		var target = $(this).attr('href'),
			bl_top = $(target).offset().top - 75;

		$('body, html').animate({ scrollTop: bl_top }, 1000);
		return false;
	});
});

$(window).on('load', function () {
	/**
	 * Marquee string for background text (classname: .bg-text)
	 */
	$('.marquee').marquee({
		// duration: 12000,
		delayBeforeStart: 0,
		startVisible: true,
		duplicated: true,
		gap: 350,
	});
});
