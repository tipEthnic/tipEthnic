/*
const now_btn = document.querySelector(".js-nowbtn");
var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao
            .maps
            .LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 4 // 지도의 확대 레벨
    };

var map = new kakao
    .maps
    .Map(mapContainer, mapOption); // 지도를 생성합니다

function now() {
    if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator
            .geolocation
            .getCurrentPosition(function (position) {

                var lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude; // 경도

                var locPosition = new kakao
                        .maps
                        .LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                    message = '<div style="padding:5px;">현재 위치</div>'; // 인포윈도우에 표시될 내용입니다

                console.log(locPosition);
                // 마커와 인포윈도우를 표시합니다
                displayMarker(locPosition, message);

            });
    } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
        var locPosition = new kakao
                .maps
                .LatLng(33.450701, 126.570667),
            message = 'geolocation을 사용할수 없어요..'

        displayMarker(locPosition, message);
    }
}

// HTML5의 geolocation으로 사용할 수 있는지 확인합니다 지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayMarker(locPosition, message) {

    // 마커를 생성합니다
    var marker = new kakao
        .maps
        .Marker({map: map, position: locPosition});

    var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

    // 인포윈도우를 생성합니다
    var infowindow = new kakao
        .maps
        .InfoWindow({content: iwContent, removable: iwRemoveable});

    // 인포윈도우를 마커위에 표시합니다
    infowindow.open(map, marker);

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
    loadCoords();
}

init();

// 다시 로드할 때는 localstorage coords값 삭제해야함.