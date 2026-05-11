const wordSpeed = 200;
let wordBank = [];
let target;


function rantReveal(i){
    target = document.getElementById(i);
    clearTarget(target);
    setTimeout(addWords, wordSpeed);

    function addWords(){
    if (wordBank.length > 0){
        currentWord = wordBank.splice(0, 1)
        console.log(currentWord)

        target.innerHTML += currentWord;
        target.innerHTML += " ";
        setTimeout(addWords, wordSpeed);
    }
}
}

function clearTarget(){
    text = target.innerHTML;
    wordBank = text.split(" ");

    target.innerHTML = ("");
    target.classList.remove("_hide");
}

