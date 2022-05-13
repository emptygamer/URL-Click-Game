const hostUrl = window.location.href.split("#")[0];

// Note : Render the string to URL.
function renderString(s){
    location.replace(hostUrl + "#" + s);
}

// Note : Do the text mask marquee animation.
// let animationText = "Hello_World!!";
// let animationIndex = 0;
// function getAnimationString(){
//     let resultText = animationText.substring(0, animationIndex) + "*" + animationText.substring(animationIndex+1);
//     animationIndex = (animationIndex > animationText.length-2) ? 0 : animationIndex + 1;
//     return resultText;
// }

class ClickGame{
    //  Note : Game data.
    constructor(){
        this.isGameStart = false;
        this.countDownTimer = 0;
        this.clickCount = 0;
        this.gameResult = "";
    }

    startGame(){
        this.isGameStart = true;
        this.countDownTimer = 3;
        this.clickCount = 0;
        this.gameResult = "";
    }

    //  Note : Game update function.
    update(deltaTime){
        if(this.isGameStart){
            this.countDownTimer -= deltaTime;
            if(this.countDownTimer <= 0){
                this.isGameStart = false;
                this.gameResult = "總共點擊_"+this.clickCount+"_次";
            }
        }
    }

    //  Note : Get the game rendered string result.
    getRenderString(){
        if(!this.isGameStart){
            if(this.gameResult == ""){
                return "按下_R_開始(重置)遊戲！";
            }else{
                return this.gameResult + "|按下_R_開始(重置)遊戲！";
            }
        }else{
            return this.clickCount + "|倒數_" + (parseInt(this.countDownTimer)+1) +"_秒";
        }
    }

    //  Note : Game keyboard input events.
    keyboardInput(key){
        if(key == "r"){
            this.startGame();
        }
        if(key == "z" && this.isGameStart){
            this.clickCount += 1;
        }
    }
}

let clickGame = new ClickGame();
const updateTimeSecond = 0.2;

// Note : Connect the browser control with the game logic.
function update(){
    // renderString(getAnimationString());

    clickGame.update(updateTimeSecond);
    renderString(clickGame.getRenderString());
    setTimeout(()=>{
        requestAnimationFrame(update);
    }, updateTimeSecond*1000 );
}
update();

window.addEventListener("keydown", function(e){
    // console.log(e.key);
    clickGame.keyboardInput(e.key);
});