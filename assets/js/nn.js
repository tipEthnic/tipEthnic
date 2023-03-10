const COORDS = 'coords';

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
    //localstorage의 key, value 값은 모두 string 타입으로 저장되기때문에 변환시켜준다.
}

function handleSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = { // 객체의 key,  value 값이 동일할 때에는 한번만 써줘도 된다.
        latitude, // localStorage에 객체로 value에 저장하기위해서 객체에 넣어준다.
        longitude
    };

    console.log(coordsObj);
    console.log(coordsObj.latitude);
    console.log(coordsObj.longitude);
    saveCoords(coordsObj); // localStorage에 위치 저장
}

function handleError() {
    console.log('XXXXXXXXX');
}

function askCoords() {
    navigator
        .geolocation
        .getCurrentPosition(handleSuccess, handleError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        // localStorage에 좌표값이 저장되어있지않다면
        askCoords(); // 좌표값을 물어본다
    }
}

function init() {
    loadCoords();
}

init();

// 다시 로드할 때는 localstorage coords값 삭제해야함.