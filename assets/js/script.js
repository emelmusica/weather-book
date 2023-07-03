const dateEl =$('#date');
var today = dayjs();


let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: -33.868, lng: 151.209 },
    zoom: 12,
  });
}


function getDate() {
  dateEl.text(today.format('dddd, MMMM D'))
}

function init(){
  initMap();
  getDate();
}

init();