const senderBtn = document.querySelector(".senderBtn");
const receiverBtn = document.querySelector(".receiverBtn");
const btn = document.getElementById("Delivery-fee-Calculation");
const nowBtn = document.querySelector(".nowBtn");
const maginot_check = document.getElementById("maginot").value;

senderBtn.addEventListener("click",searchSender);
receiverBtn.addEventListener("click",searchReceiver);

function searchSender() {
    window.open(
        "/assets/html/sender_address_popup.html",
        "주소 받아오기",
        "width=800, height=500, left=100, top=50"
    );
}

function searchReceiver() {
    window.open(
        "/assets/html/receiver_address_popup.html",
        "주소 받아오기",
        "width=800, height=500, left=100, top=50"
    );
}


//console.log(send_trans_lon);
btn.addEventListener('click', function () {
    send_maginot();
    default_map();

});
nowBtn.addEventListener('click', function () {
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
