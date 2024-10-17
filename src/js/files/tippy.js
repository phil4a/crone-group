// Подключение функционала "Чертогов Фрилансера"
import { isMobile, FLS } from './functions.js';
// Подключение списка активных модулей
import { flsModules } from './modules.js';

// Подключение из node_modules
import tippy, { animateFill, hideAll } from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling
import 'tippy.js/animations/shift-away.css';

// Подключение cтилей из src/scss/libs
import '../../scss/libs/tippy.scss';

// Запускаем и добавляем в объект модулей
const checkedButton = document.querySelector('.alphabet-sort__checked');
const sortItems = document.querySelectorAll('.list-sort__item');

// Инициализация tippy
const popover = tippy('.alphabet-sort__checked', {
	theme: 'crone',
	placement: 'bottom',
	allowHTML: true,
	interactive: true,
	arrow: false,
	animateFill: true,
	plugins: [animateFill],
	inertia: true,
	zIndex: 1,
	trigger: 'click',
	content: function () {
		return document.querySelector('.tip-template');
	},
});

// Обработчик клика по элементам сортировки
sortItems.forEach((item) => {
	item.addEventListener('click', function () {
		// Обновляем текст кнопки с выбранным элементом
		checkedButton.textContent = this.textContent;

		// Закрываем popover (можно вручную скрыть, если нужно)
		popover[0].hide();
	});
});
