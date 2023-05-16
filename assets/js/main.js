// 가게 검색버튼, 배달장소 검색버튼, 현위치, 거리입력값, 조회, 메인지도
const senderBtn = document.querySelector(".senderBtn");
const receiverBtn = document.querySelector(".receiverBtn");
const nowBtn = document.getElementById("nowBtn"); 
const maginot_check = document.getElementById("maginot").value;
const calBtn = document.getElementById("Delivery-fee-Calculation");
const navigationMap = document.getElementById("map_div");

senderBtn.addEventListener('click',() => {
	window.open("/assets/html/sender_address_popup.html",
				"주소 받아오기",
				"width=800, height=500, left=100, top=50");
});

receiverBtn.addEventListener('click',()=>{
	window.open("/assets/html/receiver_address_popup.html",
	"주소 받아오기",
				"width=800, height=500, left=100, top=50");
});

calBtn.addEventListener('click', function() {
	if (maginot_check){
		send_maginot();
	}

	default_map();
});

nowBtn.addEventListener('click', function(){
	localStorage.setItem('receiver_latitude_y',localStorage.getItem('coords_lat'));
	localStorage.setItem('receiver_longitude_x', localStorage.getItem('coords_lon'));
	setTimeout(function () {
		receiver_place = localStorage.getItem("receiver_name");
		//location.reload();
		window.document.querySelector("#receiver").value = "현재 위치";
	}, 500);
})

