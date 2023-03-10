function goPopup() {
    window.open(
        "/assets/html/sender_address_popup.html",
        "주소 받아오기",
        "width=800, height=500, left=100, top=50"
    );
}

function goPopup2() {
    window.open(
        "/assets/html/receiver_address_popup.html",
        "주소 받아오기",
        "width=800, height=500, left=100, top=50"
    );
}

const btn = document.getElementById("Delivery-fee-Calculation");
const now_btn = document.getElementById("setnow");
const maginot_check = document
    .getElementById("maginot")
    .value;

//console.log(send_trans_lon);
btn.addEventListener('click', function () {
    send_maginot();
    default_map();

});
now_btn.addEventListener('click', function () {
    localStorage.setItem('receiver_latitude_y', localStorage.getItem('coords_lat'));
    localStorage.setItem(
        'receiver_longitude_x',
        localStorage.getItem('coords_lon')
    );
    setTimeout(function () {
        receiver_place = localStorage.getItem("receiver_name");
        //location.reload();
        window
            .document
            .querySelector("#receiver")
            .value = "현재 위치";
    }, 500);
})
