import { computePosition, offset, flip, shift, autoUpdate } from '@floating-ui/dom';

// Ждём загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
	const sortButton = document.getElementById('sortButton');
	const sortPopover = document.getElementById('sortPopover');
	let cleanupAutoUpdate = null;

	// Функция для отображения поповера
	function showPopover() {
		sortPopover.setAttribute('data-show', 'true');
		sortPopover.classList.add('visible');
		updatePosition();

		// Добавляем обработчик для закрытия поповера при клике вне его
		document.addEventListener('click', onClickOutside);

		// Инициализируем autoUpdate только при открытом поповере
		if (!cleanupAutoUpdate) {
			cleanupAutoUpdate = autoUpdate(sortButton, sortPopover, updatePosition);
		}
	}

	// Функция для скрытия поповера
	function hidePopover() {
		sortPopover.removeAttribute('data-show');
		sortPopover.classList.remove('visible');
		document.removeEventListener('click', onClickOutside);

		// Очищаем autoUpdate, когда поповер закрыт
		if (cleanupAutoUpdate) {
			cleanupAutoUpdate();
			cleanupAutoUpdate = null;
		}
	}

	// Обработчик клика вне поповера
	function onClickOutside(event) {
		if (!sortPopover.contains(event.target) && event.target !== sortButton) {
			hidePopover();
		}
	}

	// Функция для переключения состояния поповера
	function togglePopover(event) {
		event.stopPropagation(); // Предотвращаем всплытие события
		if (sortPopover.hasAttribute('data-show')) {
			hidePopover();
		} else {
			showPopover();
		}
	}

	// Функция для вычисления позиции поповера
	function updatePosition() {
		computePosition(sortButton, sortPopover, {
			placement: 'bottom-start',
			middleware: [
				offset(5), // Отступ 5px
				flip(), // Автоматическое переворачивание
				shift({ padding: 10 }), // Сдвиг с отступом 10px
			],
		})
			.then(({ x, y }) => {
				Object.assign(sortPopover.style, {
					left: `${x}px`,
					top: `${y}px`,
				});
			})
			.catch((error) => {
				console.error('Ошибка позиционирования поповера:', error);
			});
	}

	// Обработчик клика на кнопку сортировки
	sortButton.addEventListener('click', togglePopover);

	// Обработчики кликов на элементах поповера
	const sortItems = sortPopover.querySelectorAll('.list-sort__item');

	sortItems.forEach((item) => {
		item.addEventListener('click', function () {
			sortButton.textContent = this.textContent; // Обновляем текст кнопки сортировки
			hidePopover();
			// Здесь можно добавить логику сортировки проектов
		});
	});

	// Закрываем поповер при выгрузке страницы
	window.addEventListener('beforeunload', () => {
		if (cleanupAutoUpdate) {
			cleanupAutoUpdate();
		}
	});

	// Дополнительный обработчик для клавиши Esc
	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape' && sortPopover.hasAttribute('data-show')) {
			hidePopover();
		}
	});
});
