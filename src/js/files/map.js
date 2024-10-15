import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
	apiKey: 'AIzaSyAppTefFqt0HNEG95Ci0LG88wRULXIRbyM',
	version: 'weekly',
	libraries: ['places'],
});

const contactsMapOptions = {
	center: {
		lat: 55.030596,
		lng: 82.895268,
	},
	zoom: 16,
	mapId: '7528d041054a80e2',
	disableDefaultUI: true,
	zoomControl: false,
	mapTypeControl: false,
	scaleControl: false,
	streetViewControl: false,
	rotateControl: false,
	fullscreenControl: false,
};

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
	contactsMapOptions.zoom = 15;
}

if (document.getElementById('contacts-map')) {
	const importMaps = loader.importLibrary('maps');
	const importMarker = loader.importLibrary('marker');

	Promise.all([importMaps, importMarker])
		.then(([{ Map, InfoWindow }, { AdvancedMarkerElement }]) => {
			const map = new Map(document.getElementById('contacts-map'), contactsMapOptions);

			const officeMarkers = [
				{
					lat: 55.030596,
					lng: 82.895268,
					title: 'г. Новосибирск, Кубановская улица, 1/1, офис 206',
				},
			];

			officeMarkers.forEach(({ lat, lng, title }) => {
				const markerImg = document.createElement('img');
				markerImg.classList.add('about-map__marker');
				markerImg.src = './img/icons/marker.svg';

				// Создаем маркер с содержимым (custom HTML элементом)
				const marker = new AdvancedMarkerElement({
					position: { lat, lng },
					content: markerImg,
					map: map,
					title: title,
				});

				// Создаем InfoWindow с содержимым
				const infoWindow = new InfoWindow({
					content: `
							<div class="contacts-map__info-window">
									<h5 class="h5 contacts-map__window-title">Крона Групп</h5>
									<p class="contacts-map__window-text">${title}</p>
							</div>`,
				});

				// Привязываем обработчик клика к самому маркеру, а не к его содержимому
				marker.addListener('click', () => {
					infoWindow.open(map, marker);
				});
			});
		})
		.catch((e) => {
			console.log(e);
		});
}
