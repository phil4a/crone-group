import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function () {
	const header = document.querySelector('header');
	const headerHeight = header.offsetHeight; // Высота хедера
	const sections = document.querySelectorAll('._dark, ._light, ._transparent');

	// Функция для управления классами шапки
	function toggleHeaderClass(section) {
		// Определение нужного класса на основе классов секции
		const targetClass = section.classList.contains('_dark')
			? 'header-dark'
			: section.classList.contains('_light')
				? 'header-light'
				: 'header-transparent';

		// Удаление всех возможных классов
		if (header) {
			header.classList.remove('header-dark', 'header-light', 'header-transparent');
			// Добавление нужного класса
			header.classList.add(targetClass);
		}
	}

	// Установка начальных классов
	toggleHeaderClass(sections[0]);

	// Создаем триггеры для каждой секции
	sections.forEach((section) => {
		ScrollTrigger.create({
			trigger: section,
			start: 'top top', // Начало секции
			end: 'bottom top', // Конец секции
			toggleActions: 'play none play none',
			onEnter: () => toggleHeaderClass(section),
			onEnterBack: () => toggleHeaderClass(section),
			// markers: true, // Установите true для визуальной отладки
		});
	});
});
