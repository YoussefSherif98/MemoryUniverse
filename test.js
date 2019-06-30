var start = document.getElementById("startbtn");

var solve = document.getElementById("solvebtn");

var imgArray = new Array();

for(var i = 0;i<18;i++)

    {

        imgArray[2*i] = new Image();

        imgArray[2*i].src = "img/"+i+".jpg";

        imgArray[2*i+1] = new Image();

        imgArray[2*i+1].src = "img/"+i+".jpg"; 

    }

var Selected = [];



var SelectedInd = [];



var counter = 0;



var endGame = true ;

var correctSound = new Audio();
correctSound.src = "sound/correct.mp3";

var wrongSound = new Audio();
wrongSound.src = "sound/wrong.mp3";

function flipBack(){

	for (var i=0;i<2 ; i++){

				var x = SelectedInd[i];

				document.getElementById(x.toString()).src ="img/18.png";

			}

			Selected=[];

			SelectedInd=[];

}	

const memCard = document.querySelectorAll('.cards');

function flipCard(){

	

	if (endGame == false ){

	if (Selected.length<2){

	var imgInd = parseFloat(this.getAttribute("id"));

	var source = this.getAttribute("src");
        
    if(SelectedInd.includes(imgInd))
        return;

	this.setAttribute("src",imgArray[imgInd].getAttribute("src"));

	if (Selected.length == 0){

		Selected.push(imgArray[imgInd]);

		SelectedInd.push(imgInd);

	}

	else if(Selected.length == 1){

		Selected.push(imgArray[imgInd]);

		SelectedInd.push(imgInd);

	}

	}

	if (Selected.length == 2){

		if (Selected[0].getAttribute("src") == Selected[1].getAttribute("src")){

			counter +=2;

			Selected=[];

			SelectedInd=[];
            
            correctSound.play();

		}

		else{

            wrongSound.play();
            
			setTimeout(flipBack,700);

		}

	    

	}

	

	}

	

	if (counter == 36){

		endGame = true;
        
        var timerText = document.getElementById("timer");
        var timer = timerText.innerHTML;

        var minutes = timer.slice(0,timer.length-6);
        var seconds = timer.slice(timer.length-5,timer.length-3);
        var millis = timer.slice(timer.length-2,timer.length);

		alert ("Congatulations!! You solved our Universal Memory Problem in "+minutes+" minutes and "+seconds+" seconds :D");
        
        clearInterval(timerInterval);

        start.disabled=false;
        solve.disabled=true;
	}

    	

}

memCard.forEach(memCard => memCard.addEventListener('click',flipCard));


var timerInterval;

start.onclick = function(){
    
    start.disabled=true;
    solve.disabled=false;
    
    resetTimer();
    resetImages();

	counter = 0;

	endGame = false;

    timerInterval = setInterval(addTimer,10);

    imgArray = shuffle(imgArray);

    for(var i=0;i<36;i++)

        {

            buttons[i].disabled=false;

        }

    start.disabled=true;

        

}

solve.onclick = function()
{
    start.disabled=false;
    solve.disabled=true;
    
    for(var i=0;i<36;i++)
        document.getElementById(i.toString()).src =imgArray[i].src;
    
    alert("Bad Luck! You failed to solve our Universal Memory Problem! :(");
    
    clearInterval(timerInterval);
}

function addTimer(){



    var timerText = document.getElementById("timer");

    var timer = timerText.innerHTML;

    

    var minutes = timer.slice(0,timer.length-6);

    var seconds = timer.slice(timer.length-5,timer.length-3);

    var millis = timer.slice(timer.length-2,timer.length);

    

    if(millis=="99")

        {

            millis = "00";

            

            if(seconds=="59")

                {

                    seconds = "00";

                    var temp = parseFloat(minutes);

                    if(temp<9)

                        {

                            minutes=0+(temp+1).toString();

                        }

                    else

                        {

                            minutes=(temp+1).toString();

                        }

                }

            else

                {

                    var temp = parseFloat(seconds);

                    if(temp<9)

                        {

                            seconds=0+(temp+1).toString();

                        }

                    else{

                        seconds = (temp+1).toString();

                    }

                }

        }

    else

        {

            var temp = parseFloat(millis);

            

            if(temp<9)

                {

                    millis = 0+((temp+1).toString());

                }

            else

                {

                    millis = (temp+1).toString();

                }

        }

    

    

    timerText.innerHTML=(minutes+":"+seconds+":"+millis);

    

}

function resetTimer(){
    
    var timerText = document.getElementById("timer");
    
    timerText.innerHTML="00:00:00";
}

function resetImages(){
    
    for(var i=0;i<36;i++)
        document.getElementById(i.toString()).src ="img/18.png";
}

function shuffle(array)
{

    var currentIndex = array.length, temporaryValue, randomIndex;

    

    while(0!=currentIndex) {

        randomIndex = Math.floor(Math.random()* currentIndex);

        currentIndex--;

        

        temporaryValue = array[currentIndex];

        array[currentIndex] = array[randomIndex];

        array[randomIndex] = temporaryValue;

    }

    

    return array;

}