var controllerOptions = {};

var i = 0;
var x = window.innerWidth / 2; 
var y = window.innerHeight / 2;
Leap.loop(controllerOptions, function(frame)
{
    //clear();
    //x += Math.floor(Math.random()*3)-1;
    //y += Math.floor(Math.random()*3)-1;

    //circle(x,y,50);

    //console.log(i);
    //i+=1;
    if (frame.hands.length==1){
        //console.log(frame.hands[0]);
        var fingers = frame.hands[0].fingers;
        console.log(fingers);

        for(var i = 0; i<5 ; i++){

            if(i==1){
                console.log(fingers[i].tipPosition);
                console.log(fingers[i].tipVelocity);
            }
        }

    } 

}
);
