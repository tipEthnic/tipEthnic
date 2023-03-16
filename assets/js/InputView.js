
// const maginot_check = document.getElementById("maginot").value;

function saveLatLong() {
    localStorage.setItem('receiver_latitude_y', localStorage.getItem('coords_lat'));
    localStorage.setItem('receiver_longitude_x', localStorage.getItem('coords_lon'));
    
    // setTimeout(() =>{
    //     receiver_place = localStorage.getItem("receiver_name");
    //     //location.reload();
    //     window
    //         .document
    //         .querySelector("#receiver")
    //         .value = "현재 위치";
    // }, 500);
}

const InputView = {
    searchSender(){
        window.open(
            "../views/sender_address_popup.html",
            "주소 받아오기",
            "width=800, height=500, left=100, top=50"
        );
    },

    searchReceiver(){
        window.open(
            "../views/receiver_address_popup.html",
            "주소 받아오기",
            "width=800, height=500, left=100, top=50"
        );
    }
}

export default InputView;





