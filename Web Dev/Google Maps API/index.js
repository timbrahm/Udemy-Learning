// /*
//  * Click the map to set a new location for the Street View camera.
//  */
// let map;
// let panorama;
//
//
// function initMap() {
//   const berkeley = { lat: 37.869085, lng: -122.254775 };
//   const sv = new google.maps.StreetViewService();
//   panorama = new google.maps.StreetViewPanorama(
//     document.getElementById("pano")
//   );
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: berkeley,
//     zoom: 16,
//     streetViewControl: false,
//   });
//   map.addListener("click", (event) => {
//     sv.getPanorama({ location: event.latLng, radius: 10000 }, processSVData);
//   });
// }
//
// function processSVData(data, status) {
//   console.log(data.location.latLng.toString());
// }


sv.getPanorama({ location: new google.maps.LatLng(%d, %d), preference: google.maps.StreetViewPreference.NEAREST }, (data, status) => {
                                            console.log(data.location.latLng.toString());});
