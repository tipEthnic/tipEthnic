const senderBtn = document.querySelector(".senderBtn");
const receiverBtn = document.querySelector(".receiverBtn");
const nowBtn = document.querySelector(".nowBtn");
const resultBtn = document.getElementById("Delivery-fee-Calculation");

class Button {
    constructor(){
        this.saveLatLong = saveLatLong();
    }
    

    clickSenderBtn(){
        // senderBtn.addEventListener("click",searchSender);
        console.log("click")

    }

    clickReceiverBtn(){
        receiverBtn.addEventListener("click",searchReceiver);
    }

    clickNowBtn(){
        nowBtn.addEventListener('click',this.saveLatLong)

    }

    clickResultBtn(){
        resultBtn.addEventListener('click', function () {
            send_maginot();
            default_map();
        });        
    }

}

function saveLatLong() {
    localStorage.setItem('receiver_latitude_y', localStorage.getItem('coords_lat'));
    localStorage.setItem(
        'receiver_longitude_x',
        localStorage.getItem('coords_lon')
    );
    setTimeout(() =>{
        receiver_place = localStorage.getItem("receiver_name");
        //location.reload();
        window
            .document
            .querySelector("#receiver")
            .value = "현재 위치";
    }, 500);
}




export {Button}






