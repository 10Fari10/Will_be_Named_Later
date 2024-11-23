const roomName = JSON.parse(document.getElementById('room-name').textContent);
const layout = JSON.parse(document.getElementById('map_layout').textContent);
const game_socket = new WebSocket('wss://' + window.location.host+ '/ws/game/'+ roomName+ '/');



game_socket.onopen = function() {
    
    startTimer();
};
game_socket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    if (data.correct && data.redirect) {
    window.location.href = "/completed_screen"; 
    }else if (data.correct === false) {
        alert("Incorrect solution. The puzzle will reset.");
        //resetGame();
    }
    console.log(data)
    console.log(layout)
}
  //for reset functionality. must be fixed 
//function resetGame(){
    //document.getElementById("pin-bar").innerText = "Your Path: (Select pins to build your sequence)"; 
    //pinSequence = [];
    //selectPin();
//}


game_socket.onclose = function(e) {
    console.error('Socket closed unexpectedly');
};


document.getElementById("submit").onclick = function(e) {
    const solution = pinSequence.join(",");  
    console.log("Submitting solution: ", solution);
    
    
    game_socket.send(JSON.stringify({
        "solution": solution,
        "room": roomName
    }));
};

let pinSequence = [];
function selectPin(pinID) {
    if (!pinSequence.includes(pinID)) {
        pinSequence.push(pinID);
        updatePinBar(pinSequence);
    }
}

function updatePinBar(sequence) {
    const pinBar = document.getElementById("pin-bar");
    pinBar.textContent = `Your Path: ${sequence.join(" → ")}`;
}
window.onload = function(){

    let minutes = 0;
    let seconds = 0;
    let tens = 0;
    let appendMinutes = document.getElementById("minutes");
    let appendSeconds = document.getElementById("seconds");
    let appendTens = document.getElementById("tens");
    let interval;

    const startTimer = () => {
        if (interval) clearInterval(interval); 
        interval = setInterval(() => {
         tens ++;
         if (tens <= 9){
             appendTens.innerHTML = '0'+ tens.toString();
         }
         if (tens>9){
             appendTens.innerHTML = tens.toString();
         }
         if (tens > 99){
              seconds ++;
              appendSeconds.innerHTML = '0' + seconds.toString();
              tens = 0 ;
             appendTens.innerHTML = '00';
         }
         if (seconds > 9){
             appendSeconds.innerHTML = seconds.toString();
         }
         if (seconds > 59){
             minutes ++;
             appendMinutes.innerHTML ='0'+ minutes.toString();
             seconds = 0
             appendSeconds.innerHTML = '00';
         }

     },10);
    }
     startTimer();
}