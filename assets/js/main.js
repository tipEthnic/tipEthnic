
function goPopup() {
	window.open("/assets/html/sender_address_popup.html",
				"주소 받아오기",
				"width=800, height=500, left=100, top=50");
}

function goPopup2() {
	window.open("/assets/html/receiver_address_popup.html",
				"주소 받아오기",
				"width=800, height=500, left=100, top=50");
}

const btn = document.getElementById("Delivery-fee-Calculation");
const Distance = document.getElementById("distance");
const Fee = document.getElementById("fee");

// 거리 및 가격 계산
let dist = 13;
let fe = 7000;

btn.addEventListener('click', function() {
	Distance.innerHTML = dist;
	Fee.innerHTML = fe;
});