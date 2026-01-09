document.addEventListener("DOMContentLoaded", () => {

  const map = L.map("map");

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
  }).addTo(map);

  // REAL BUS ICON
  const busIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448339.png",
    iconSize: [40,40],
    iconAnchor: [20,20]
  });

  function interpolate(start, end, steps=40) {
    let arr=[];
    for(let i=0;i<=steps;i++){
      arr.push([
        start[0]+(end[0]-start[0])*i/steps,
        start[1]+(end[1]-start[1])*i/steps
      ]);
    }
    return arr;
  }

  const route = interpolate(
    [31.7085,76.9321],
    [31.6900,76.9400]
  );

  const line = L.polyline(route,{color:"blue"}).addTo(map);
  map.fitBounds(line.getBounds());

  let index=0;
  const marker = L.marker(route[0],{icon:busIcon}).addTo(map);

  setInterval(()=>{
    index=(index+1)%route.length;
    marker.setLatLng(route[index]);
  },700);

});
