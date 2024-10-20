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
const checkedButton = document.querySelector('.alphabet-sort');
const sortItems = document.querySelectorAll('.list-sort__item');

// Инициализация tippy
if (checkedButton && sortItems) {
	const popover = tippy('.alphabet-sort', {
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
	// Делаем нулевой элемент _active
	sortItems[0].classList.add('_active');

	sortItems.forEach((item) => {
		item.addEventListener('click', function () {
			// Обновляем текст кнопки с выбранным элементом
			const checkedText = checkedButton.querySelector('.alphabet-sort__checked');
			if (checkedText) {
				checkedText.textContent = this.textContent;
			}

			// Закрываем popover (можно вручную скрыть, если нужно)
			popover[0].hide();

			// Добавляем/удаляем класс _active
			sortItems.forEach((el) => el.classList.remove('_active'));
			this.classList.add('_active');
		});
	});
}
