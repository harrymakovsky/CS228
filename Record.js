var controllerOptions = {};
var i = 0;
var x = window.innerWidth / 2; 
var y = window.innerHeight / 2;
var z = 50;
var rawXMin = 10000;
var rawXMax = -10000;
var rawYMin = 10000;
var rawYMax = -10000;
var previousNumHands = 0;
var currentNumHands = 0;
var numSamples = 100;
var currentSample = 0;

var framesOfData = nj.zeros([5,4,6,numSamples]);
nj.config.printThreshold = 1000;


Leap.loop(controllerOptions, function(frame)
{

    currentNumHands = frame.hands.length;

    clear();
    HandleFrame(frame);
    RecordData();
    

    previousNumHands = currentNumHands;
}
);

function HandleFrame(frame){

    
    
    if (frame.hands.length>=1){
        var hand = frame.hands[0];
        HandleHand(hand,frame.interactionBox);
    } 

}

function HandleHand(hand,interactionBox){
        var fingers = hand.fingers;
        var width = 3;
        var stroke = 100;

        
        for(var j = 3; j>=0 ; j--){
            for(var i = 0; i<5 ; i++){
                HandleBone(fingers[i].bones[j],width,stroke,i,j,interactionBox);
            } 
            width+=1;
            stroke+=40;
        }

}

function HandleFinger(finger){

    var width = 6;
    var stroke = 220;
    for(var i = 0; i<4 ; i++){
        HandleBone(finger.bones[i],width,stroke);
        width-=1;
        stroke-=50;
    }

}


function HandleBone(bone,width,s,fingerIndex,boneIndex,interactionBox){

    var base = bone.prevJoint;
    var end = bone.nextJoint;

    var normalizedPrevJoint = interactionBox.normalizePoint(base,true);
    var normalizedNextJoint = interactionBox.normalizePoint(end,true);
    //console.log(normalizedPrevJoint,normalizedNextJoint);
    //console.log(bone);



    framesOfData.set(fingerIndex,boneIndex,0,currentSample,normalizedPrevJoint[0]);
    framesOfData.set(fingerIndex,boneIndex,1,currentSample,normalizedPrevJoint[1]);
    framesOfData.set(fingerIndex,boneIndex,2,currentSample,normalizedPrevJoint[2]);
    framesOfData.set(fingerIndex,boneIndex,3,currentSample,normalizedNextJoint[0]);
    framesOfData.set(fingerIndex,boneIndex,4,currentSample,normalizedNextJoint[1]);
    framesOfData.set(fingerIndex,boneIndex,5,currentSample,normalizedNextJoint[2]);

    [canvasXprev,canvasYprev] = TransformCoordinates(normalizedPrevJoint[0],normalizedPrevJoint[1]);
    [canvasXnext,canvasYnext] = TransformCoordinates(normalizedNextJoint[0],normalizedNextJoint[1]);

    //console.log(canvasXprev,canvasYprev,canvasXnext,canvasYnext)



    var zb = base[2];
    var ze = end[2];

    strokeWeight(width*5);
    
    if(currentNumHands == 1){
        stroke(0,s,0);
    }else{
        stroke(s,0,0);
    }
    
    line(canvasXprev,canvasYprev,canvasXnext,canvasYnext);
    
    
  //  circle(x,y,50);



}

function RecordData(){
    if(currentNumHands == 2){
        //console.log( framesOfData.pick(null,null,null,currentSample).toString() );

        currentSample +=1;
        if(currentSample==numSamples){
            currentSample=0;
        }
    }
    if(previousNumHands == 2 && currentNumHands == 1){

        background(50);
        //console.log( framesOfData.pick(null,null,null,currentSample).toString() );
        console.log(framesOfData.toString())
    } 

}

function TransformCoordinates(x,y){
    x = window.innerWidth * x;
    y = window.innerHeight * (1 - y);

    return [x,y]
}



