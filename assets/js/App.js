import Button from "./Button.js"
import NowLocation from "./now.js"

class App{
    constructor(){
        this.button = new Button();
        this.nowLocation = new NowLocation
    }

    play(){
        this.nowLocation.init();
        this.button.clickSenderBtn();
        this.button.clickReceiverBtn();
        this.button.clickNowBtn();
        this.button.clickResultBtn();
    }
}

const app = new App();
app.play();