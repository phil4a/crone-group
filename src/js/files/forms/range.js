// Подключение из node_modules
import * as noUiSlider from 'nouislider';
import wNumb from 'wnumb';
// Подключение стилей из scss/base/forms/range.scss
// в файле scss/forms/forms.scss

// Подключение стилей из node_modules
// import 'nouislider/dist/nouislider.css';

export function rangeInit() {
	// Общая функция для создания слайдера
	function createSlider(
		sliderId,
		inputStartId,
		inputEndId,
		minValue,
		maxValue,
		step = 1,
		startValues = [0, 600],
	) {
		const slider = document.querySelector(sliderId);
		if (slider) {
			noUiSlider.create(slider, {
				start: startValues,
				connect: true,
				step: step,
				format: wNumb({
					decimals: 0,
				}),
				range: {
					min: [minValue],
					max: [maxValue],
				},
			});

			const inputStart = document.getElementById(inputStartId);
			const inputEnd = document.getElementById(inputEndId);

			inputStart.addEventListener('change', () => setSliderValues(slider, inputStart, inputEnd));
			inputEnd.addEventListener('change', () => setSliderValues(slider, inputStart, inputEnd));

			slider.noUiSlider.on('update', (values, handle) => {
				inputStart.value = values[0];
				inputEnd.value = values[1];
			});
		}
	}

	// Функция для установки значений слайдера
	function setSliderValues(slider, inputStart, inputEnd) {
		const startValue = inputStart.value !== '' ? inputStart.value : null;
		const endValue = inputEnd.value !== '' ? inputEnd.value : null;
		slider.noUiSlider.set([startValue, endValue]);
	}

	// Создание слайдера для площади
	createSlider('#filter-areas', 'filter-areas-start', 'filter-areas-end', 0, 600);

	// Создание слайдера для количества комнат
	createSlider('#filter-rooms', 'filter-rooms-start', 'filter-rooms-end', 1, 7, 1, [3, 5]);
}

rangeInit();
