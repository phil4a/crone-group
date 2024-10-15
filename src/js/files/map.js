if (document.querySelector('#contacts-map')) {
	function map(n) {
		ymaps.ready(init);
		function init() {
			// Создание карты.
			var myMap = new ymaps.Map('contacts-map', {
				// Координаты центра карты.
				// Порядок по умолчанию: «широта, долгота».
				// Чтобы не определять координаты центра карты вручную,
				// воспользуйтесь инструментом Определение координат.
				controls: [],
				center: [55.030668, 82.895424],
				// Уровень масштабирования. Допустимые значения:
				// от 0 (весь мир) до 19.
				zoom: 16,
			});

			let myPlacemark = new ymaps.Placemark(
				[55.030668, 82.895424],
				{
					balloonContentHeader: 'Крона Групп',
					balloonContentBody: 'Новосибирск, ​Кубановская, 1/1, 206 офис, 2 этаж',
				},
				{
					// Опции.
					hasBalloon: true,
					hideIconOnBalloonOpen: false,
					// Необходимо указать данный тип макета.
					iconLayout: 'default#imageWithContent',
					// Своё изображение иконки метки.
					iconImageHref: 'img/icons/marker.svg',
					// Размеры метки.
					iconImageSize: [52, 64],
					// Смещение левого верхнего угла иконки относительно
					// её "ножки" (точки привязки).
					iconImageOffset: [-26, -32],
					// Смещение слоя с содержимым относительно слоя с картинкой.
					iconContentOffset: [0, 0],
				},
			);

			myMap.geoObjects.add(myPlacemark);

			myMap.behaviors.disable('scrollZoom');
			myMap.behaviors.disable('drag');
			myMap.controls.add('zoomControl', {
				size: 'medium',
			});
		}
	}
	map();
}
