// 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
var infowindow = new kakao
    .maps
    .InfoWindow({zIndex: 1});

var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao
            .maps
            .LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

// 지도를 생성합니다
var map = new kakao
    .maps
    .Map(mapContainer, mapOption);

// 장소 검색 객체를 생성합니다
var ps = new kakao
    .maps
    .services
    .Places();

function searchPlaces() {
    var keyword = document
        .getElementById('keyword')
        .value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }
    // 키워드로 장소를 검색합니다
    ps.keywordSearch(keyword, placesSearchCB);
}

// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해 LatLngBounds 객체에 좌표를 추가합니다
        // var bounds = new kakao
        //     .maps
        //     .LatLngBounds();

        
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].place_name);
            displayList(data[i]);
            // displayMarker(data[i]);
            // bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        // map.setBounds(bounds);
    }
}


function displayList(place){

    const placeInfo = document.querySelector(".js-placewrapper");
    const divwrapper = document.createElement("div");
    divwrapper.className = "css-placeInfo"
    const newdiv = document.createElement("div");
    newdiv.className = "css-place"; 
    const mapBtn = document.createElement("button");
    mapBtn.className = "js-mapBtn";
    const selectBtn = document.createElement("button");
    selectBtn.className = "js-selectBtn";
    // const span = document.createElement("span");
    mapBtn.innerHTML = "지도";
    selectBtn.innerHTML = "선택";
    

    newdiv.innerHTML = '<span id="place_name">'+place.place_name + '</span>' + '<span id="address">'+place.road_address_name+'</span>';
    divwrapper.appendChild(newdiv);
    divwrapper.appendChild(mapBtn);
    divwrapper.appendChild(selectBtn);
    placeInfo.appendChild(divwrapper);
    
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {

    // 마커를 생성하고 지도에 표시합니다
    var marker = new kakao
        .maps
        .Marker({
            map: map,
            position: new kakao
                .maps
                .LatLng(place.y, place.x)
        });

    // 마커에 클릭이벤트를 등록합니다
    kakao
        .maps
        .event
        .addListener(marker, 'click', function () {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent(
                '<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>'
            );
            infowindow.open(map, marker);
        });
}

const select = document.querySelector(".js-selectBtn");

function MovePlaceInfo(){

    
}

function selectPlace(){

    selectBtn.addEventListner("click",MovePlaceInfo,flase);

    
}

// 선택 버튼 눌렀을 때 > 해당 place 정보 index.html 페이지로.
// 지도 버튼 누르면 > 지도 표시 > 해당 위치 마크 표시