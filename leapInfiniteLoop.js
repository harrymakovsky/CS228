var controllerOptions = {};

var i = 0;
var x = window.innerWidth / 2; 
var y = window.innerHeight / 2;
Leap.loop(controllerOptions, function(frame)
{
    HandleFrame(frame);
}
);

function HandleFrame(frame){
    //clear();
    //x += Math.floor(Math.random()*3)-1;
    //y += Math.floor(Math.random()*3)-1;
    //circle(x,y,50);
    //console.log(i);
    //i+=1;
    
    if (frame.hands.length==1){
        var hand = frame.hands[0];
        HandleHand(hand);
    } 

}

function HandleHand(hand){
        var fingers = hand.fingers;

        for(var i = 0; i<5 ; i++){
            if(fingers[i].type==1){
                HandleFinger(fingers[i]);
            }
        }

}

function HandleFinger(finger){
    
    console.log(finger.tipPosition);
    
}
