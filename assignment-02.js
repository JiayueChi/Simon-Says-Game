let pool;                   //int, the number of times of the total flash. 

let pattern = [];           //int[], the pattern/sequence stored in a array, for example, 0,0,2,3 means green, green, yellow, blue
let input = [];             //int[], the pattern that is input by the user
let flash;                  //int, between 0-3, indicats the colors flashed
let level;                  //int, corrent level
let yes;                    //boolean, to indicate if the user input pattern is correct
let display;                //boolean, to indicate if it's the programme's time to display patterns 
let ingame;                 //boolean, to indicate if it's user's time to input


function change() {     //changing the light color, then start the game after 3 seconds
    let color =document.getElementById("light");
    color.style.backgroundColor = "green";
    setTimeout(game, 3000);             //start the game process after 3 seconds
}

const one = document.getElementById("green");       //set one be the green
const two = document.getElementById("red");         //set two be the red
const three = document.getElementById("yellow");    //set three be the yellow
const four = document.getElementById("blue");       //set the four be the blue

function g() {
    one.style.backgroundColor = "lightgreen";       //flash green
}

function r() {
    two.style.backgroundColor = "pink";            //flash red
}

function y() {
    three.style.backgroundColor = "yellow";        //flash yellow
}

function b() {
    four.style.backgroundColor = "lightblue";      //flash blue
}

function resetColour() {                            //reset color to the oringial color so it could looks like "flashing"
    one.style.backgroundColor = "green";      
    two.style.backgroundColor = "red";
    three.style.backgroundColor = "goldenrod";
    four.style.backgroundColor = "blue";
}

function game() {       //the real game function, this functiuon will be called by clicking "start" button
    pattern = [];       //reset the pattern
    input = [];         //reset user input
    flash = 0;          //reset the colors to be flashed
    pool = 0;           //reset the interval(s)
    level = 1;          //reset to level 1
    yes = true;         //assume the input is correct
    ingame = false;     //make sure the user won't input when the game is displaying the pattern
    for(var i=0; i<300; i++) {          //a loop to generate ints between 0-3 to indicate which color to flash
                                        //the loop is capped at 300 times. I don't think anyone can get to level 300
        pattern.push(Math.floor(Math.random() * 4));    //push a random int between 0-3 to the pateern array
    }
    
    display = true;     //game displaying time
    pool = setInterval(show, 800);  //display the patterns to to screen
}

function show() {       //display/show the patterns to screen
    if(flash == level) {
        clearInterval(pool);    //clear the interval of displaying, coz all the patterns are shown
        display = false;        //stop displaying
        resetColour();          //set color to oringinal color
        fiveSec();              //call the timmer function, counting down 5 seconds
        ingame = true;          //it's time for user to input
    }

    if(display && level < 5) {      //the interval is 200ms between patterns when it's below level 5
        ingame = false;             //make sure the user can't interrupt 
        resetColour();
        setTimeout(() => {
            if(pattern[flash] == 0) g();    
            if(pattern[flash] == 1) r();
            if(pattern[flash] == 2) y();
            if(pattern[flash] == 3) b();
            flash++;
        }, 200);    //new pattern every 200ms
    }
    else if(display && level>=5 && level < 9) {     //the patterns speed up to 150ms after level 5
        ingame = false;
        resetColour();
        setTimeout(() => {
            if(pattern[flash] == 0) g();    
            if(pattern[flash] == 1) r();
            if(pattern[flash] == 2) y();   
            if(pattern[flash] == 3) b(); 
            flash++;
        }, 150);    //new pattern every 150ms
    }
    else if(display && level>=9 && level < 13) {    //speeds up to 100ms after level 9
        ingame = false;
        resetColour();
        setTimeout(() => {
            if(pattern[flash] == 0) g();    
            if(pattern[flash] == 1) r();    
            if(pattern[flash] == 2) y();   
            if(pattern[flash] == 3) b();    
            flash++;
        }, 100);    //new pattern every 100ms
    }
    else if(display && level>=13) {     //50ms after level 13
        ingame = false;
        resetColour();
        setTimeout(() => {
            if(pattern[flash] == 0) g();   
            if(pattern[flash] == 1) r();   
            if(pattern[flash] == 2) y();   
            if(pattern[flash] == 3) b();   
            flash++;
        }, 50);     //new pattern every 50ms
    }

    
}

one.addEventListener('click', (event) => {      //when green is clicked
    if(ingame) {                        //make sure it's input time
        input.push(0);                  //push 0 to the input array
        resetTimer();                   //stop counting down from 5
        validate();                     //check if it's correct (green in this case)

        g();                            //flah the color (green in this case)
        setTimeout(() => {
        resetColour();
        }, 200);
    }
    
})

two.addEventListener('click', (event) => {      //when red clicked
    if(ingame) {
        input.push(1);
        resetTimer();
        validate();

        r();
        setTimeout(() => {
        resetColour();
        }, 200);
    }
    
})

three.addEventListener('click', (event) => {    //when yellow clicked
    if(ingame) {
        input.push(2);
        resetTimer();
        validate();

        y();
        setTimeout(() => {
        resetColour();
        }, 200);
    }
    
})

four.addEventListener('click', (event) => {     //when blue clicked
    if(ingame) {
        input.push(3);
        resetTimer();
        validate();

        b();
        setTimeout(() => {
        resetColour();
        }, 200);
    }
    
})

function validate() {             //to validate if the clicked one is correct
    if(input[input.length-1] !== pattern[input.length-1] && ingame) {   //if the last one clicked is not the one reletively stored in the pattern array, it's incorrect
        yes = false;                //incorrect
    }

    if(yes == false) {
        lost();     //lose the game
    }

    if(level == input.length && yes == true && ingame) {      //if the one clicked in correct, and it's input time
        level++;                            //level up
        input = [];                         //reset input
        display = true;                     //exit input time, start display time
        flash = 0;                          //reset flash color to 0
        pool = setInterval(show, 800);      //to display patterns of the next level, same as the game() function
    }
}

function lost() {       //lost the game, by either using over 5 seconds or input the wrong color
    let color =document.getElementById("light");    //change the green light back to red
    color.style.backgroundColor = "red";
    flashAll();         //flash all colors five times
    ingame = false;     //not in game anymore
    let right = document.getElementById("last");    //print the level to the right side
    right.innerText = level;   
    checkHigh();        //check if this is the best score
}

function flashAll() {       //flash all colours for five times
    let count = 0;
    let interval = setInterval(() => {
      if (count >= 5) {     //stop after the 5th time
        clearInterval(interval);
        setTimeout(resetColour, 1000);
      } else {
        g();
        r();
        y();
        b();
        setTimeout(resetColour, 500);
        count++;
      }
    }, 1000);
}

let high = 0;               //int, to store best score
function checkHigh() {      //check if this is the best score
    if(high <= level) {     //if it's the best score
        high = level;       //set best score to current THE score
        let left = document.getElementById("best"); //print the best score to left side
        left.innerText = level;   
    }
}

let timer;                  //int, counting down 5 seconds
function fiveSec() {        //count down 5 seconds
    timer = setTimeout(() => {      //call lost() function after 5 seconds to lose the game
        lost();
    }, 5000)
}

function resetTimer() {     //reset the counting down timer if any colors is clicked
    clearTimeout(timer);
}
  