import Button from "./Button.js"


class App{
    constructor(){
        this.button = new Button();

    }

    play(){
        this.button.clickSenderBtn();
        this.button.clickReceiverBtn();
    }
}

const app = new App();
app.play();