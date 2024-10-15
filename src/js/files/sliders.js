import { isMobile } from './functions.js';
/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper from 'swiper';
import {
	Navigation,
	Pagination,
	Scrollbar,
	FreeMode,
	Autoplay,
	EffectCreative,
	EffectFade,
} from 'swiper/modules';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import '../../scss/base/swiper.scss';
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на стронице
	// if (document.querySelector('.swiper')) { // Указываем скласс нужного слайдера
	// 	// Создаем слайдер
	// 	new Swiper('.swiper', { // Указываем скласс нужного слайдера
	// 		// Подключаем модули слайдера
	// 		// для конкретного случая
	// 		modules: [Navigation],
	// 		observer: true,
	// 		observeParents: true,
	// 		slidesPerView: 1,
	// 		spaceBetween: 0,
	// 		autoHeight: true,
	// 		speed: 800,
	// 		//touchRatio: 0,
	// 		//simulateTouch: false,
	// 		//loop: true,
	// 		//preloadImages: false,
	// 		//lazy: true,
	// 		/*
	// 		// Эффекты
	// 		effect: 'fade',
	// 		autoplay: {
	// 			delay: 3000,
	// 			disableOnInteraction: false,
	// 		},
	// 		*/
	// 		// Пагинация
	// 		/*
	// 		pagination: {
	// 			el: '.swiper-pagination',
	// 			clickable: true,
	// 		},
	// 		*/
	// 		// Скроллбар
	// 		/*
	// 		scrollbar: {
	// 			el: '.swiper-scrollbar',
	// 			draggable: true,
	// 		},
	// 		*/
	// 		// Кнопки "влево/вправо"
	// 		navigation: {
	// 			prevEl: '.swiper-button-prev',
	// 			nextEl: '.swiper-button-next',
	// 		},
	// 		// Брейкпоинты
	// 		/*
	// 		breakpoints: {
	// 			320: {
	// 				slidesPerView: 1,
	// 				spaceBetween: 0,
	// 				autoHeight: true,
	// 			},
	// 			768: {
	// 				slidesPerView: 2,
	// 				spaceBetween: 20,
	// 			},
	// 			992: {
	// 				slidesPerView: 3,
	// 				spaceBetween: 20,
	// 			},
	// 			1268: {
	// 				slidesPerView: 4,
	// 				spaceBetween: 30,
	// 			},
	// 		},
	// 		*/
	// 		// События
	// 		on: {
	// 		}
	// 	});
	// }
	if (document.querySelector('.features__slider')) {
		// Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.features__slider', {
			// Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Autoplay],
			observer: true,
			observeParents: true,
			// slidesPerView: 4,
			// spaceBetween: 20,
			// autoHeight: true,
			speed: 1800,

			// loop: true,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},

			// Пагинация
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.features__button_left',
				nextEl: '.features__button_right',
			},

			// Брейкпоинты

			breakpoints: {
				320: {
					slidesPerView: 1.1,
					spaceBetween: 20,
					// autoHeight: true,
				},
				480: {
					slidesPerView: 1.5,
					spaceBetween: 20,
				},
				768: {
					slidesPerView: 1.75,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1314: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
			},

			// События
			on: {},
		});
	}
	if (window.innerWidth >= 1200 && document.querySelector('.steps__slider')) {
		// Создаем слайдер
		const swiper = new Swiper('.steps__slider', {
			modules: [Navigation, Autoplay, EffectFade],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
			speed: 500,

			effect: 'fade',
			autoplay: {
				disableOnInteraction: true,
			},
			// События
			on: {
				// Обновление класса активного элемента при смене слайда
				slideChange: function () {
					const paginationItems = document.querySelectorAll('.step-pagination');
					paginationItems.forEach((item, index) => {
						item.classList.toggle('active', index === this.activeIndex);
					});
				},
				init: function () {
					const paginationItems = document.querySelectorAll('.step-pagination');
					if (paginationItems.length > 0) {
						paginationItems[0].classList.add('active');
					}
				},
			},
		});

		// Переключение слайда при нажатии на шаг
		const paginationItems = document.querySelectorAll('.step-pagination');
		paginationItems.forEach((item, index) => {
			item.addEventListener('click', () => {
				swiper.slideTo(index); // Переключаем слайд
				paginationItems.forEach((i) => i.classList.remove('active')); // Удаляем класс active со всех элементов
				item.classList.add('active'); // Добавляем класс active к текущему элементу
			});
		});
	}

	if (document.querySelectorAll('.project-card__slider').length) {
		const sliders = document.querySelectorAll('.project-card__slider');

		sliders.forEach((slider) => {
			const projectsSlider = new Swiper(slider, {
				// Указываем скласс нужного слайдера
				// Подключаем модули слайдера
				// для конкретного случая
				modules: [Autoplay, Pagination, EffectFade],
				observer: true,
				observeParents: true,
				slidesPerView: 'auto',
				spaceBetween: 0,
				// autoHeight: true,
				speed: 800,

				//touchRatio: 0,
				//simulateTouch: false,
				//loop: true,
				//preloadImages: false,
				//lazy: true,

				// Эффекты
				effect: 'fade',
				autoplay: {
					delay: 3000,
					disableOnInteraction: false,
				},

				// Пагинация

				pagination: {
					el: '.project-card__pagination',
					clickable: true,
					bulletClass: 'project-card__bullet',
					bulletActiveClass: 'project-card__bullet_active',
				},

				on: {
					init: function () {
						if (!isMobile.any()) this.autoplay.stop();
					},
					slideChange: function () {
						this.params.autoplay.delay = 800;
					},
				},
			});
			slider.addEventListener('mouseenter', () => {
				projectsSlider.params.autoplay.delay = 100;
				projectsSlider.autoplay.start();
			});
			slider.addEventListener('mouseleave', () => {
				projectsSlider.autoplay.stop();
			});
		});
	}
	if (document.querySelector('.project-card__slider')) {
		// Указываем скласс нужного слайдера
		// Создаем слайдер
	}
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false,
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener('load', function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});
