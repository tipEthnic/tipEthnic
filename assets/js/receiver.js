// // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
// var infowindow = new kakao
//     .maps
//     .InfoWindow({zIndex: 1});

var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };


function toggle() {
    var display = document.getElementById('map').style.display;
    if (display === 'block') { // on -> off
        document.getElementById('map').style.display = "none";
    } else { // off -> on
        document.getElementById('map').style.display = "block";
    }
}


// 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);
toggle();  //map -> display :  none으로 지정.

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();

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
    // console.log(ps);
}

let place;
let place_data;

// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    // 장소 검색이 완료되었다면
    if (status === kakao.maps.services.Status.OK) {

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해 LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();

        // console.log(data);
        for (var i = 0; i < data.length; i++) {
            // console.log(data[i]);
            place = data[i];

            // console.log(place);
            displayList(place);
            a++;
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        toggle();
        //검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);

        place_data = data;
        console.log(place_data);
    }
}



document.addEventListener('click', function (event) {
    if (event.target.className === "js-mapBtn") {
        const Mbtn = event.target;
        const Mbtn_num = Mbtn.value;

        var bounds = new kakao.maps.LatLngBounds();
        displayMarker(place_data[Mbtn_num],place_data[Mbtn_num].y,place_data[Mbtn_num].x );
        bounds.extend(new kakao.maps.LatLng(place_data[Mbtn_num].y,place_data[Mbtn_num].x ));

        map.setBounds(bounds);

        // document.getElementById('map').style.display = "block";
        // console.log(Mbtn.parentNode);
        // console.log(Mbtn);

    
    } else if (event.target.className === "js-selectBtn") {
        const Sbtn = event.target;
        const Sbtn_num = Sbtn.value;

        
        localStorage.setItem('receiver_name', place_data[Sbtn_num].place_name);
        localStorage.setItem('receiver_address', place_data[Sbtn_num].address_name);
        localStorage.setItem(
            'receiver_road_address',
            place_data[Sbtn_num].road_address_name
        );
        localStorage.setItem('receiver_latitude_y', place_data[Sbtn_num].y); //위도
        localStorage.setItem('receiver_longitude_x', place_data[Sbtn_num].x); // 경도

        setTimeout(function () {
            receiver_place = localStorage.getItem("receiver_name");
            window.opener.document.querySelector("#receiver").value = receiver_place;
            window.close();
        }, 1000);
    }
});

/* 버튼 ------------------------------- */

let a = 0;
function displayList(place) {
    const places = document.querySelector(".js-placewrapper");
    const divwrapper = document.createElement("div");
    divwrapper.className = "css-placeInfo"
    const Infowrapper = document.createElement("div");
    const newdiv = document.createElement("div");
    newdiv.className = "css-place";

    const btnwrapper = document.createElement('div');
    const mapBtn = document.createElement("button");
    mapBtn.className = "js-mapBtn";
    mapBtn.value = a;
    // btns.push(mapBtn);
    const selectBtn = document.createElement("button");
    selectBtn.className = "js-selectBtn";
    selectBtn.value = a;
    // const span = document.createElement("span");
    mapBtn.innerHTML = "지도";
    selectBtn.innerHTML = "선택";


    newdiv.innerHTML = '<span id="place_name">' + place.place_name + '</span><span ' +
            'id="address">' + place.road_address_name + '</span>';
    btnwrapper.appendChild(mapBtn);
    btnwrapper.appendChild(selectBtn);
    Infowrapper.appendChild(newdiv);
    Infowrapper.appendChild(btnwrapper);
    divwrapper.appendChild(Infowrapper);
    places.appendChild(divwrapper);

}

/* 지도 WTM좌표-> WGS84좌표로 변환------*/
var geocoder = new kakao.maps.services.Geocoder(), // 좌표계 변환 객체를 생성합니다
    wtmX = localStorage.getItem("receiver_longitude_x"), // 변환할 WTM X 좌표 입니다
    wtmY = localStorage.getItem("receiver_latitude_y"); // 변환할 WTM Y 좌표 입니다

// WTM 좌표를 WGS84 좌표계의 좌표로 변환합니다
geocoder.transCoord(wtmX, wtmY, transCoordCB, {
    input_coord: kakao.maps.services.Coords.WTM, // 변환을 위해 입력한 좌표계 입니다
    output_coord: kakao.maps.services.Coords.WGS84 // 변환 결과로 받을 좌표계 입니다 
});

// 좌표 변환 결과를 받아서 처리할 콜백함수 입니다.
function transCoordCB(result, status) {

    localStorage.setItem('receive_trans_x', result[0].x);
    localStorage.setItem('receive_trans_y', result[0].y);
            
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place,y,x) {
    // 마커를 생성하고 지도에 표시합니다
    var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(y,x),
        });

    // 마커에 클릭이벤트를 등록합니다
    // kakao.maps.event.addListener(marker, 'click', function () {
    //         // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
    //         infowindow.setContent(
    //             '<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>'
    //         );
    //         infowindow.open(map, marker);
    //     });

}

// 선택 버튼 눌렀을 때 > 해당 place 정보 index.html 페이지로. 지도 버튼 누르면 > 지도 표시 > 해당 위치 마크 표시