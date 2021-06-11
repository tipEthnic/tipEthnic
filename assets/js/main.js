
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


//console.log(send_trans_lon);
btn.addEventListener('click', function() {
	default_map();
});

