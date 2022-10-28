// letters 
const letters = "abcdefghijklmnopqrstuvwxyz";

// get array from letters 
let lettersArray = Array.from(letters);

// select letters container
let lettersContainer = document.querySelector(".letters");


// generate letters 
lettersArray.forEach(letter => {

    // create span
    let span = document.createElement("span");

    // create single letter text node 
    let theletter = document.createTextNode(letter);

    // append theletter to span 
    span.appendChild(theletter);

    // add class to span 
    span.classList.add("letter-box");

    // append span to the letters container
    lettersContainer.appendChild(span);
});

async function fetchData() {
    console.log("Before Fetch");
    try {
      let myData = await fetch("./word.json");
      let objData = await myData.json();

// object Of words + categories
// I turned this to json object 

// const word = {
//     programing : ["php","javascript","go","scala","fortan","R","mysql","python"],
//     movies : ["prestige","inception","interstellar","whiplash","memento","coco","up"],
//     people : ["albert einstein","hitchocok","alexander","cleopatra","Mahatma Ghandi"],
//     countries : ["syria","palestine","yemen","egypt","bahrain","qatar"],
// }





// get random property
let allkeys = Object.keys(objData[0]);
let allHintkeys = Object.keys(objData[1]);

// random number depend on keys length
let randomPropNumber = Math.floor(Math.random() * allkeys.length);
// category names
let randomPropName = allkeys[randomPropNumber];
// category  words "arrays"
let randomPropValue = objData[0][randomPropName];

// random index number depend on words in arrays
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
// random words in arrays (the choosen word)
let randomValueName = randomPropValue[randomValueNumber];
console.log(randomValueName);

// set gategory info 
document.querySelector(".game-info .gategory span").innerHTML = randomPropName;

// select letters guess element
let letterGuessContainer = document.querySelector(".letters-guess");

// convert choosen word to array
let lettersAndSpace = Array.from(randomValueName);


// creat spans Depend on words 
lettersAndSpace.forEach(letter => {

    // create empty span 
    let emptySpan = document.createElement("span");

    // if letter is space
    if (letter === ' '){
        // add class to the space
        emptySpan.className = "has-space";
    };

    // append all spans to the letter Guess Container
    letterGuessContainer.appendChild(emptySpan);
});

// select guess spans 
let guessSpans = document.querySelectorAll(".letters-guess span");

// set wrong attempts
let wrongAttempts = 0 ;

// select the draw element
let theDraw = document.querySelector(".hangman-draw")

let rightAttempts = 0;
// handle clicking On letters 
document.addEventListener("click", (e) => {
    // set the choose status
    let theStatus = false ;

    if (e.target.className === 'letter-box'){
        e.target.classList.add("clicked");

        // get clicked letter
        let theClickedLetter = e.target.innerHTML.toLowerCase();
        
        // the choosen word
        let theChoosenWord = Array.from(randomValueName.toLowerCase())
        
        theChoosenWord.forEach((wordLetter, wordIndex) => {

            // if the clicked letter equal the letter in the word
            if (theClickedLetter == wordLetter) {
                
                // set status to Correct
                theStatus = true ;

                // loop on all guss spans
                guessSpans.forEach((span, spanIndex) => {
                    
                    if (wordIndex === spanIndex) {

                        span.innerHTML = wordLetter;
                    };
                });
            };
        });
        // outside loop 

        // if letter is wrong 
        if (theStatus !== true) {

            // increase the wrong attempts  
            wrongAttempts++;

            // add class wrong on the draw Element 
            theDraw.classList.add(`wrong-${wrongAttempts}`);

            // play fail sound 
            document.getElementById("fail").play();

            // ceack 
            if (wrongAttempts === 8) {

                endGame();

                lettersContainer.classList.add("finished");

            }
            
        } else {
            
            if (randomValueName.toLowerCase() === letterGuessContainer.textContent ){
                youWon();
            }
            // play success sound 
            document.getElementById("success").play();
        }

    };
});

// End Game function 
function endGame() {
    // create popup Div 
    let div = document.createElement(`div`);

    // ceate try again btn 
    let btn = document.createElement(`button`)
    btn.className = `try-again`
    btn.appendChild(document.createTextNode("Try Again"))
    
    
    // create text
    let divText;
    if (wrongAttempts === 8) {
        divText = document.createTextNode(`Game Over, The Word Is "${randomValueName}" 
        You've lost your ${wrongAttempts} Attempts`);

    // append text to div 
    div.appendChild(divText);
    
    
    // add class on div 
    div.className = `popup`;
    
    div.appendChild(btn);
    // append To the body
    document.body.prepend(div);

    // remove the popup and refresh the page
    btn.onclick = () => {
        btn.parentElement.remove();
        window.location.reload();
        }
    }
}

function youWon() {
    // create popup Div 
    let div = document.createElement(`div`);

    // ceate try again btn 
    let btn = document.createElement(`button`)
    btn.className = `try-again`
    btn.appendChild(document.createTextNode("Try Again"))
    
    
    // create text
    if (wrongAttempts === 0) {
        var divText;
        divText = document.createTextNode(`Good job!, The Word Is "${randomValueName}" bravo!
    ,you didn't missed  You are professional`)} 
        else if ((wrongAttempts < 4 &&  wrongAttempts > 0)) {
        divText = document.createTextNode(`Good!, The Word Is "${randomValueName}" bravo!
        ,You've missed up ${wrongAttempts} times You've make it`);
    } else if (wrongAttempts > 4 &&  wrongAttempts < 8){
        divText = document.createTextNode(`well!, The Word Is "${randomValueName}" bravo!
        ,You've missed up ${wrongAttempts} times your lucky`);
    }


    // append text to div 
    div.appendChild(divText);
    
    
    // add class on div 
    div.className = `popup`;
    
    div.appendChild(btn);
    // append To the body
    document.body.prepend(div);

    // remove the popup and refresh the page
    btn.onclick = () => {
        btn.parentElement.remove();
        window.location.reload();
    }
}

// hint button 

let hints = objData[1][allHintkeys[randomPropNumber]][randomValueNumber];

function showHint (hintStr) {
    let hintText = document.createTextNode(hintStr);
    let hintDiv = document.createElement("div");
    let hintbtn = document.createElement("button");
    hintbtn.appendChild(document.createTextNode( "click to get a Hint"));
    hintbtn.classList.add("hintbtn");
    hintDiv.classList.add("hintDivText");
    hintDiv.appendChild(hintText);
    let container = document.querySelector(".container-hint");
    container.appendChild(hintDiv);
    container.appendChild(hintbtn);
}


document.addEventListener("click", function(e){
    if (e.target.className === "hintbtn"){
    let container = document.querySelector(".hintDivText");
    container.style.display = "block";
        
    }
});
showHint (hints);


} catch (reason) {
    console.log(`Reason: ${reason}`);
  } finally {
    console.log("After Fetch");
  }
}

fetchData();


// i tried to mute the game but it dosent work with me yet 
// let mute = document.querySelector(".fa-volume-xmark");
// let sound1 = document.getElementById("success");
// let sound2 = document.getElementById("fail");
// mute.addEventListener("click", () => {
//     if (sound1.play === true && sound2.play === true) {
//         sound1.paused();
//         sound2.paused();
//     } else {
//         sound1.play = true;
//         sound2.play = true;
//     }
// })



