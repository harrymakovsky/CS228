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
var digitToShow = 4;
var timeSinceLastDigitChange = new Date();


Leap.loop(controllerOptions, function(frame){
    clear();

    currentNumHands = frame.hands.length;
    
    DetermineState(frame);
    if(programState==0){
        HandleState0(frame);
    }else if(programState==1){
        HandleState1(frame);
    }else if(programState==2){
        HandleState2(frame);
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

function SignIn(){

 
    username = document.getElementById('username').value;

    var list = document.getElementById('users');

    
    if(IsNewUser(username,list)){
        CreateNewUser(username,list);
        CreateSignInItem(username,list);
    }else{
        ID = String(username) + "_signins"
        listItem = document.getElementById( ID );

        listItem.innerHTML = parseInt(listItem.innerHTML) + 1;
    }



    //console.log(list.innerHTML);
    return false;
}


function CreateNewUser(username,list){
        var item = document.createElement('li');
        item.innerHTML = String(username);
        item.id = String(username) + "_name";
        list.appendChild(item);

}

function CreateSignInItem(username,list){
        var item = document.createElement('li');
        item.innerHTML = 1;
        item.id = String(username)+ "_signins";
        list.appendChild(item);

}

function IsNewUser(username,list){
    var users = list.children;
    var usernameFound = false;

    for(var i= 0; i< users.length; i++){
        if (String(username) == users[i].innerHTML){
            usernameFound = true;
        }

    }

    return usernameFound == false;
}


function DetermineState(){
    if(currentNumHands==0){
        programState=0;
    }else if(HandIsUncentered()){
        programState=1;
    }else{
        programState=2;
    }
}

function HandIsUncentered(){
    if(HandIsTooFarToTheLeft() || HandIsTooFarToTheRight()
    || HandIsTooFarUp() || HandIsTooFarDown()
    || HandIsTooFarAway() || HandIsTooClose()){
        return true;
    }
}

function HandIsTooFarToTheLeft(){
    xValues = oneFrameOfData.slice([],[],[0,6,3]);
    var currentMean = xValues.mean();
    if(currentMean<0.25){
        return true;
    }else{
        return false;
    }
}

function HandIsTooFarToTheRight(){
    xValues = oneFrameOfData.slice([],[],[0,6,3]);
    var currentMean = xValues.mean();
    if(currentMean>0.75){
        return true;
    }else{
        return false;
    }
}

function HandIsTooFarUp(){
    yValues = oneFrameOfData.slice([],[],[1,6,3]);
    var currentMean = yValues.mean();
    if(currentMean>0.75){
        return true;
    }else{
        return false;
    }
}

function HandIsTooFarDown(){
    yValues = oneFrameOfData.slice([],[],[1,6,3]);
    var currentMean = yValues.mean();
    if(currentMean<0.25){
        return true;
    }else{
        return false;
    }
}

function HandIsTooFarAway(){
    zValues = oneFrameOfData.slice([],[],[2,6,3]);
    var currentMean = zValues.mean();
    if(currentMean<0.25){
        return true;
    }else{
        return false;
    }
}

function HandIsTooClose(){
    zValues = oneFrameOfData.slice([],[],[2,6,3]);
    var currentMean = zValues.mean();
    if(currentMean>0.75){
        return true;
    }else{
        return false;
    }
}

function HandleState1(frame){
    HandleFrame(frame);
    if(HandIsTooFarToTheLeft()){
        DrawArrowRight()
    }else if(HandIsTooFarToTheRight()){
        DrawArrowLeft()
    }else if(HandIsTooFarUp()){
        DrawArrowDown()
    }else if(HandIsTooFarDown()){
        DrawArrowUp()
    }else if(HandIsTooFarAway()){
        DrawArrowToward()
    }else if(HandIsTooClose()){
        DrawArrowAway()
    }


    if(currentNumHands==1){
        //console.log(oneFrameOfData.toString());
        //Test();
    }

}

function HandleState2(frame){
    HandleFrame(frame);
    DrawLowerRightPanel();
    DetermineWhetherToSwitchDigits();
    if(currentNumHands==1){
        //console.log(oneFrameOfData.toString());
        Test();
    }
}

function DetermineWhetherToSwitchDigits(){
    if(TimeToSwitchDigits()){
        SwitchDigits();
    }
}

function TimeToSwitchDigits(){
    currentTime = new Date();
    elapsedTimeInMilliseconds = currentTime - timeSinceLastDigitChange;
    elapsedTimeInSeconds = elapsedTimeInMilliseconds / 1000;
    if(elapsedTimeInSeconds>12){
        return true;
    }else{
        return false;
    }
}


function SwitchDigits(){
    if(digitToShow == 4){
        digitToShow = 1;
    }else if(digitToShow == 1){
        digitToShow = 4;
    }
    n = 0;
    timeSinceLastDigitChange = new Date();
}

function DrawLowerRightPanel(){
    if(digitToShow == 4){
        image(four,window.innerWidth/2,window.innerHeight/2-30,window.innerWidth/2,window.innerHeight/2-30);
    }else{
        image(one,window.innerWidth/2,window.innerHeight/2-30,window.innerWidth/2,window.innerHeight/2-30);
    
    }

}


function DrawArrowRight(){
    image(arrowRight,window.innerWidth/2,0,window.innerWidth/2,window.innerHeight/2);
}
function DrawArrowLeft(){
    image(arrowLeft,window.innerWidth/2,0,window.innerWidth/2,window.innerHeight/2);
}
function DrawArrowUp(){
    image(arrowUp,window.innerWidth/2,0,window.innerWidth/2,window.innerHeight/2);
}
function DrawArrowDown(){
    image(arrowDown,window.innerWidth/2,0,window.innerWidth/2,window.innerHeight/2);
}
function DrawArrowToward(){
    image(arrowToward,window.innerWidth/2,0,window.innerWidth/2,window.innerHeight/2);
}
function DrawArrowAway(){
    image(arrowAway,window.innerWidth/2,0,window.innerWidth/2,window.innerHeight/2);
}

function HandleState0(frame){
    TrainKNNIfNotDoneYet()
    DrawImageToHelpUserPutTheirHandOverTheDevice()
}

function TrainKNNIfNotDoneYet(){
    if(!trainingCompleted){
        Train();
        trainingCompleted = true;
    }
}

function DrawImageToHelpUserPutTheirHandOverTheDevice(){
    image(img,0,0,window.innerWidth/2,window.innerHeight/2);

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

    m = (((n-1)*m)+(c==digitToShow)) / n

    //console.log(n,m,c);
    console.log(digitToShow,m);
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




    oneFrameOfData.set(fingerIndex,boneIndex,0,normalizedPrevJoint[0]);
    oneFrameOfData.set(fingerIndex,boneIndex,1,normalizedPrevJoint[1]);
    oneFrameOfData.set(fingerIndex,boneIndex,2,normalizedPrevJoint[2]);
    oneFrameOfData.set(fingerIndex,boneIndex,3,normalizedNextJoint[0]);
    oneFrameOfData.set(fingerIndex,boneIndex,4,normalizedNextJoint[1]);
    oneFrameOfData.set(fingerIndex,boneIndex,5,normalizedNextJoint[2]);

    [canvasXprev,canvasYprev] = TransformCoordinates(normalizedPrevJoint[0],normalizedPrevJoint[1]);
    [canvasXnext,canvasYnext] = TransformCoordinates(normalizedNextJoint[0],normalizedNextJoint[1]);


    if ( m > .5){
        stroke(0,int(255*m),0)
    }else if(m <=.5){
        stroke(int(255*(1-m)),0,0)
    }


    var zb = base[2];
    var ze = end[2];

    strokeWeight(width*10);
    
    if(currentNumHands == 1){
        //stroke(s);
    }else{
        //stroke(s);
    }
    
    line(canvasXprev,canvasYprev,canvasXnext,canvasYnext);
    
    




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
