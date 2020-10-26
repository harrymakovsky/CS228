const knnClassifier = ml5.KNNClassifier();
nj.config.printThreshold = 1000;
var controllerOptions = {}

var programState = 0;

var i = 0;
var previousNumHands = 0;
var currentNumHands = 0;
var numSamples = 100;
var currentSample = 0;

var oneFrameOfData = nj.zeros([5,4,6]);
nj.config.printThreshold = 1000;
var trainingCompleted = false;
var n = 0; 
var m = 0;

Leap.loop(controllerOptions, function(frame){
    clear();

    currentNumHands = frame.hands.length;
    
    DetermineState(frame);
    if(programState==0){
        HandleState0(frame);
    }else if(programState==1){
        HandleState1(frame);
    }


//    if(!trainingCompleted){
        //Train();
//        trainingCompleted = true;
//    }
//    HandleFrame(frame);


//    if(currentNumHands==1){
        //console.log(oneFrameOfData.toString());
        //Test();
//    }

    previousNumHands = currentNumHands;
    

});

function DetermineState(){
    if(currentNumHands==0){
        programState=0;
    }else{
        programState=1;
    }
}

function HandleState1(frame){
    HandleFrame(frame);
    if(currentNumHands==1){
        //console.log(oneFrameOfData.toString());
        //Test();
    }

}

function HandleState0(frame){
    TrainKNNIfNotDoneYet()
    DrawImageToHelpUserPutTheirHandOverTheDevice()
}

function TrainKNNIfNotDoneYet(){
    if(!trainingCompleted){
        //Train();
        trainingCompleted = true;
    }
}

function DrawImageToHelpUserPutTheirHandOverTheDevice(){
    image(img,0,0);

}


function Train(){

    for(var i = 0; i<train4.shape[3] ;i++){

        var features = train0.pick(null,null,null,i);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),0);
        features = train0.pick(null,null,null,i);
        features = MirrorHand(features);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),0);

        features = train1Davis.pick(null,null,null,i);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),1);
        features = train1Davis.pick(null,null,null,i);
        features = MirrorHand(features);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),1);
        
        features = train1Bongard.pick(null,null,null,i);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),1);
        features = train1Bongard.pick(null,null,null,i);
        features = MirrorHand(features);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),1);
        

        features = train1Allison.pick(null,null,null,i);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),1);
        features = train1Allison.pick(null,null,null,i);
        features = MirrorHand(features);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),1);

        features = train2.pick(null,null,null,i);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),2);
        features = train2.pick(null,null,null,i);
        features = MirrorHand(features);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),2);
        
        features = train3.pick(null,null,null,i);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),3);       
        features = train3.pick(null,null,null,i);
        features = MirrorHand(features);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),3);
        
        features = train4.pick(null,null,null,i);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),4);
        features = train4.pick(null,null,null,i);
        features = MirrorHand(features);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),4);
        
        features = train5.pick(null,null,null,i);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),5);
        features = train5.pick(null,null,null,i);
        features = MirrorHand(features);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),5);
        
        features = train5Faucher.pick(null,null,null,i);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),5);
        features = train5Faucher.pick(null,null,null,i);
        features = MirrorHand(features);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),5);
        
        features = train6.pick(null,null,null,i);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),6);
        features = train6.pick(null,null,null,i);
        features = MirrorHand(features);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),6);
        
        features = train7.pick(null,null,null,i);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),7);
        features = train7.pick(null,null,null,i);
        features = MirrorHand(features);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),7);
        
        features = train7Fisher.pick(null,null,null,i);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),7);
        features = train7Fisher.pick(null,null,null,i);
        features = MirrorHand(features);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),7);
        
        features = train8.pick(null,null,null,i);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),8);  
        features = train8.pick(null,null,null,i);
        features = MirrorHand(features);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),8);
        
        features = train9.pick(null,null,null,i);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),9);
        features = train9.pick(null,null,null,i);
        features = MirrorHand(features);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),9);
    }
}

function GotResults(err, result){
    n+=1;
    var c = parseInt(result.label);

    m = (((n-1)*m)+(c==9)) / n

    //console.log(n,m,c);
    console.log(parseInt(result.label));
    //
}

function Test(){
    CenterData();
    
    var currentFeatures = oneFrameOfData.pick(null,null,null).reshape(1,120);

    
    var predictedLabel = knnClassifier.classify(currentFeatures.tolist(),GotResults);

}

function CenterXData(){
    xValues = oneFrameOfData.slice([],[],[0,6,3]);
    var currentMean = xValues.mean();
    var horizontalShift = 0.5 - currentMean;

    for(var currentRow = 0; currentRow<5; currentRow++){
        for(var currentColumn = 0; currentColumn<4; currentColumn++){
            currentX = oneFrameOfData.get(currentRow,currentColumn,0);
            shiftedX = currentX + horizontalShift;
            oneFrameOfData.set(currentRow,currentColumn,0, shiftedX);
            
            currentX = oneFrameOfData.get(currentRow,currentColumn,3);
            shiftedX = currentX + horizontalShift;
            oneFrameOfData.set(currentRow,currentColumn,3, shiftedX);

        }
    }
}
function MirrorHand(frameOfData){
    xValues = frameOfData.slice([],[],[0,6,3]);
    var currentMean = xValues.mean();
    var horizontalShift = 0.5 - currentMean;

    for(var currentRow = 0; currentRow<5; currentRow++){
        for(var currentColumn = 0; currentColumn<4; currentColumn++){
            currentX = frameOfData.get(currentRow,currentColumn,0);
            shiftedX = 1 - currentX;
            frameOfData.set(currentRow,currentColumn,0, shiftedX);
            
            currentX = frameOfData.get(currentRow,currentColumn,3);
            shiftedX = 1 - currentX;
            frameOfData.set(currentRow,currentColumn,3, shiftedX);

        }
    }
    return frameOfData;
}

function CenterYData(){
    yValues = oneFrameOfData.slice([],[],[1,6,3]);
    var currentMean = yValues.mean();
    var verticalShift = 0.5 - currentMean;
    for(var currentRow = 0; currentRow<5; currentRow++){
        for(var currentColumn = 0; currentColumn<4; currentColumn++){

            currentY = oneFrameOfData.get(currentRow,currentColumn,1);
            shiftedY = currentY + verticalShift;
            oneFrameOfData.set(currentRow,currentColumn,1, shiftedY);
            
            currentY = oneFrameOfData.get(currentRow,currentColumn,4);
            shiftedY = currentY + verticalShift;
            oneFrameOfData.set(currentRow,currentColumn,4, shiftedY);


        }
    }
}

function CenterZData(){
    zValues = oneFrameOfData.slice([],[],[2,6,3]);
    var currentMean = zValues.mean();
    var zShift = 0.5 - currentMean;
    for(var currentRow = 0; currentRow<5; currentRow++){
        for(var currentColumn = 0; currentColumn<4; currentColumn++){


            currentZ = oneFrameOfData.get(currentRow,currentColumn,2);
            shiftedZ = currentZ + zShift;
            oneFrameOfData.set(currentRow,currentColumn,2, shiftedZ);
            
            currentZ = oneFrameOfData.get(currentRow,currentColumn,5);
            shiftedZ = currentZ + zShift;
            oneFrameOfData.set(currentRow,currentColumn,5, shiftedZ);
        }
    }
}

function CenterData(){
    CenterXData();
    CenterYData();
    CenterZData();
    
}





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

    var width = 8;
    var stroke = 220;
    for(var i = 0; i<4 ; i++){
        HandleBone(finger.bones[i],width,stroke);
        width-=2;
        stroke-=70;
    }

}


function HandleBone(bone,width,s,fingerIndex,boneIndex,interactionBox){

    var base = bone.prevJoint;
    var end = bone.nextJoint;

    var normalizedPrevJoint = interactionBox.normalizePoint(base,true);
    var normalizedNextJoint = interactionBox.normalizePoint(end,true);
    //console.log(normalizedPrevJoint,normalizedNextJoint);
    //console.log(bone);



    oneFrameOfData.set(fingerIndex,boneIndex,0,normalizedPrevJoint[0]);
    oneFrameOfData.set(fingerIndex,boneIndex,1,normalizedPrevJoint[1]);
    oneFrameOfData.set(fingerIndex,boneIndex,2,normalizedPrevJoint[2]);
    oneFrameOfData.set(fingerIndex,boneIndex,3,normalizedNextJoint[0]);
    oneFrameOfData.set(fingerIndex,boneIndex,4,normalizedNextJoint[1]);
    oneFrameOfData.set(fingerIndex,boneIndex,5,normalizedNextJoint[2]);

    [canvasXprev,canvasYprev] = TransformCoordinates(normalizedPrevJoint[0],normalizedPrevJoint[1]);
    [canvasXnext,canvasYnext] = TransformCoordinates(normalizedNextJoint[0],normalizedNextJoint[1]);

    //console.log(canvasXprev,canvasYprev,canvasXnext,canvasYnext)



    var zb = base[2];
    var ze = end[2];

    strokeWeight(width*10);
    
    if(currentNumHands == 1){
        stroke(s);
    }else{
        stroke(s);
    }
    
    line(canvasXprev,canvasYprev,canvasXnext,canvasYnext);
    
    
  //  circle(x,y,50);



}

function RecordData(){
    if(currentNumHands == 2){
        //console.log( oneFrameOfData.pick(null,null,null,currentSample).toString() );

        currentSample +=1;
        if(currentSample==numSamples){
            currentSample=0;
        }
    }
    if(previousNumHands == 2 && currentNumHands == 1){

        background(50);
        //console.log( oneFrameOfData.pick(null,null,null,currentSample).toString() );
        //console.log(oneFrameOfData.toString())
    } 

}

function TransformCoordinates(x,y){
    x = (window.innerWidth/2) * x;
    y = (window.innerHeight/2) * (1 - y);

    return [x,y]
}
