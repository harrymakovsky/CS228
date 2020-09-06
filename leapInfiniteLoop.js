var controllerOptions = {};

var i = 0;
var x = window.innerWidth / 2; 
var y = window.innerHeight / 2;
var z = 50;
var rawXMin = 10000;
var rawXMax = -10000;
var rawYMin = 10000;
var rawYMax = -10000;


Leap.loop(controllerOptions, function(frame)
{
    clear();
    HandleFrame(frame);
}
);

function HandleFrame(frame){

    //x += Math.floor(Math.random()*3)-1;
    //y += Math.floor(Math.random()*3)-1;
    circle(x,y,50);
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

   

    if(finger.tipPosition[0]< rawXMin){
        rawXMin = finger.tipPosition[0];
    }
    if(finger.tipPosition[0]> rawXMax){
        rawXMax = finger.tipPosition[0];
    }
    
    if(finger.tipPosition[1]< rawYMin){
        rawYMin = finger.tipPosition[1];
    }
    if(finger.tipPosition[1]> rawYMax){
        rawYMax = finger.tipPosition[1];
    }

    
   
    x  = scaleValue(finger.tipPosition[0],[rawXMin,rawXMax],[0,window.innerWidth]);
    y  = window.innerHeight - scaleValue(finger.tipPosition[1],[rawYMin,rawYMax],[0,window.innerHeight]);
    z = finger.tipPosition[2] + 400;


    console.log("X:")
    console.log(rawXMin);
    console.log(rawXMax);

    console.log("Y:")
    console.log(rawYMin);
    console.log(rawYMax);
    //console.log(finger.tipPosition);
    
}

//Found this code on github
function scaleValue(value, from, to) {

	var scale = (to[1] - to[0]) / (from[1] - from[0]);
	var capped = Math.min(from[1], Math.max(from[0], value)) - from[0];

	return ~~(capped * scale + to[0]);
}
