const senderBtn = document.querySelector(".senderBtn");
const receiverBtn = document.querySelector(".receiverBtn");
const nowBtn = document.querySelector(".nowBtn");
const resultBtn = document.getElementById("Delivery-fee-Calculation");
import InputView from "./InputView.js"

class Button {
    constructor(){
        // this.saveLatLong = saveLatLong();
    }
    

    clickSenderBtn(){
        senderBtn.addEventListener("click",InputView.searchSender);
        senderBtn.addEventListener("click", () => {
            console.log("senderBtn is clicked");
        })
    }

    clickReceiverBtn(){
        receiverBtn.addEventListener("click",InputView.searchReceiver);
        receiverBtn.addEventListener("click", () => {
            console.log("receiverBtn is clicked");
        })
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






export default Button;





