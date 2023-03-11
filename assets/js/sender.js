const places = document.querySelector(".js-placewrapper");

var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao
            .maps
            .LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

var map = new kakao
    .maps
    .Map(mapContainer, mapOption);

var ps = new kakao
    .maps
    .services
    .Places();

let status = 0;
function searchPlaces() {
    status++;
    var keyword = document
        .getElementById('keyword')
        .value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }
    if (status === 1) {
        console.log("검색");
        ps.keywordSearch(keyword, placesSearchCB, {size: 7});
        status = 0;
    }
}

let place;
let place_data;

// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    // 장소 검색이 완료되었다면
    if (status === kakao.maps.services.Status.OK) {

        a = 0

        removeAllChildNods(places);
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해 LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao
            .maps
            .LatLngBounds();

        // console.log(data);
        for (var i = 0; i < data.length; i++) {
            // console.log(data[i]);
            place = data[i];

            // console.log(place);
            displayList(place);
            a++;
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        displayPagination(pagination);
        // toggle(); 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);

        place_data = data;
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}

document.addEventListener('click', function (event) {
    if (event.target.className === "js-mapBtn") {
        const Mbtn = event.target;
        const Mbtn_num = Mbtn.value;

        var bounds = new kakao
            .maps
            .LatLngBounds();
        displayMarker(
            place_data[Mbtn_num],
            place_data[Mbtn_num].y,
            place_data[Mbtn_num].x
        );
        bounds.extend(
            new kakao.maps.LatLng(place_data[Mbtn_num].y, place_data[Mbtn_num].x)
        );

        map.setBounds(bounds);

        // document.getElementById('map').style.display = "block";
        // console.log(Mbtn.parentNode); console.log(Mbtn);

    } else if (event.target.className === "js-selectBtn") {
        const Sbtn = event.target;
        const Sbtn_num = Sbtn.value;

        localStorage.setItem('sender_name', place_data[Sbtn_num].place_name);
        localStorage.setItem('sender_address', place_data[Sbtn_num].address_name);
        localStorage.setItem(
            'sender_road_address',
            place_data[Sbtn_num].road_address_name
        );
        localStorage.setItem('sender_latitude_y', place_data[Sbtn_num].y); //위도
        localStorage.setItem('sender_longitude_x', place_data[Sbtn_num].x); // 경도

        setTimeout(function () {

            sender_place = localStorage.getItem("sender_name");
            //location.reload();
            window
                .opener
                .document
                .querySelector("#sender")
                .value = sender_place;
            window.close();
        }, 1000);
    }
});

let a = 0;
function displayList(place) {

    const divwrapper = document.createElement("li");
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
var geocoder = new kakao
        .maps
        .services
        .Geocoder(), // 좌표계 변환 객체를 생성합니다
    wtmX = localStorage.getItem("sender_longitude_x"), // 변환할 WTM X 좌표 입니다
    wtmY = localStorage.getItem("sender_latitude_y"); // 변환할 WTM Y 좌표 입니다

// WTM 좌표를 WGS84 좌표계의 좌표로 변환합니다
geocoder.transCoord(wtmX, wtmY, transCoordCB, {
    input_coord: kakao.maps.services.Coords.WTM, // 변환을 위해 입력한 좌표계 입니다
    output_coord: kakao.maps.services.Coords.WGS84 // 변환 결과로 받을 좌표계 입니다
});

// 좌표 변환 결과를 받아서 처리할 콜백함수 입니다.
function transCoordCB(result, status) {

    localStorage.setItem('send_trans_x', result[0].x);
    localStorage.setItem('send_trans_y', result[0].y);

}

function removeAllChildNods(places) {
    while (places.hasChildNodes()) {
        places.removeChild(places.firstChild);
        console.log("다시 ");
    }
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place, y, x) {
    // 마커를 생성하고 지도에 표시합니다
    var marker = new kakao
        .maps
        .Marker({
            map: map,
            position: new kakao
                .maps
                .LatLng(y, x)
        });

    // 마커에 클릭이벤트를 등록합니다 kakao.maps.event.addListener(marker, 'click', function () {
    // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다         infowindow.setContent(             '<div
    // style="padding:5px;font-size:12px;">' + place.place_name + '</div>'
    // );         infowindow.open(map, marker);     });

}

function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i;

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
    }

    for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i === pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function (i) {
                return function () {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}
