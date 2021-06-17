/*
const now_btn = document.querySelector(".js-nowbtn");
var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao
            .maps
            .LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 4 // 지도의 확대 레벨
const COORDS = 'coords';
const nowBtn = document.querySelector(".nowBtn");

// var geocoder = new kakao.maps.services.Geocoder();

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
    //localstorage의 key, value 값은 모두 string 타입으로 저장되기때문에 변환시켜준다.

}


function handleSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = { // 객체의 key,  value 값이 동일할 때에는 한번만 써줘도 된다.
        latitude,       // localStorage에 객체로 value에 저장하기위해서 객체에 넣어준다.
        longitude
    };

    console.log(coordsObj);
    console.log(coordsObj.latitude);
    console.log(coordsObj.longitude);

    lat = coordsObj.latitude;
    lon = coordsObj.longitude;

    saveCoords(coordsObj); // localStorage에 위치 저장


    // document.querySelector("#receiver").value = coordsObj.longitude;

}






    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);
}
*/

const COORDS_lat = 'coords_lat';
const COORDS_lon = 'coords_lon';

function saveCoords(lat, lon) {
    localStorage.setItem(COORDS_lat, JSON.stringify(lat)); 
    localStorage.setItem(COORDS_lon, JSON.stringify(lon));
    //localstorage의 key, value 값은 모두 string 타입으로 저장되기때문에 변환시켜준다. 
}

function handleSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = { // 객체의 key,  value 값이 동일할 때에는 한번만 써줘도 된다.
        latitude,       // localStorage에 객체로 value에 저장하기위해서 객체에 넣어준다.    
        longitude
    };

    console.log(coordsObj);
    console.log(coordsObj.latitude);
    console.log(coordsObj.longitude);
    saveCoords(coordsObj.latitude, coordsObj.longitude); // localStorage에 위치 저장 
}

function handleError() {
    console.log('XXXXXXXXX');
}

function askCoords() {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS_lat);
    const loadedCoords_lon = localStorage.getItem(COORDS_lon);
    if(loadedCoords === null || loadedCoords_lon===null) { 
        // localStorage에 좌표값이 저장되어있지않다면
        askCoords(); // 좌표값을 물어본다
    } 
}



function init() {
    nowBtn.addEventListener("click",loadCoords);
}

init();
