mapboxgl.accessToken = mapboxAccessToken;
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center:[-71,40],  //stayData["price"]
    zoom:9
});

console.log(stayData["price"])
console.log(stayData)
new mapboxgl.Marker().setLngLat([-71,40]).addTo(map);