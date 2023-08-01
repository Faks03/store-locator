mapboxgl.accessToken =
  'pk.eyJ1IjoiZG9ub3RidWdtZSIsImEiOiJjbGtpaXlxYXEwYmQ2M2VtZ3N1ODJzcHVkIn0.wcrAG5QHGlx9nRr6fGvLOw';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 9,
  center: [-0.06886,51.60548]
});

// Fetch stores from API
async function getStores() {
  const res = await fetch('/api/v1/store');
  const data = await res.json();

  const stores = data.data.map(store => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          store.location.coordinates[0],
          store.location.coordinates[1]
        ]
      },
      properties: {
        storeId: store.storeId,
        icon: 'shop'
      }
    };
  });

  loadMap(stores);
}

// Load map with stores
function loadMap(stores) {
  map.on('load', function() {
    map.addLayer({
      id: 'points',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: stores
        }
      },
      layout: {
        'icon-image': '{icon}-15',
        'icon-size': 1.5,
        'text-field': '{storeId}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.9],
        'text-anchor': 'top'
      }
    });
  });
}

getStores();