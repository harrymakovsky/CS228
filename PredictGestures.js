const knnClassifier = ml5.KNNClassifier();
nj.config.printThreshold = 1000;




var trainingCompleted = false;
var testingSampleIndex = 0;

function draw(){
    clear();

    if(!trainingCompleted){
        Train();
        trainingCompleted = true;
    }

    Test();

}

function Train(){

    for(var i = 0; i<train0.shape[3] ;i++){

        var features = train0.pick(null,null,null,i);
        features = features.reshape(1,120);

        knnClassifier.addExample(features.tolist(),0);

        features = train1.pick(null,null,null,i);
        features = features.reshape(1,120);

        knnClassifier.addExample(features.tolist(),1);
    }
}

function GotResults(err, result){
    console.log(testingSampleIndex,":",parseInt(result.label));
    //console.log(parseInt(result.label));
    testingSampleIndex += 1;
    if(testingSampleIndex>=train0.shape[3]){
        testingSampleIndex = 0;
    }
}

function Test(){
    
    var currentFeatures = train0.pick(null,null,null,testingSampleIndex).reshape(1,120);

    
    var predictedLabel = knnClassifier.classify(currentFeatures.tolist(),GotResults);



}

