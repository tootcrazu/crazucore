
const textSpeedD = 20;
const dialogueTextBoxD = document.getElementById("dia-text");
const dialogueContainer = document.getElementById("dia-container");
const diaPortraitContainer = document.getElementById("dia-portraits");
const diaPortraitBounce = diaPortraitContainer.animate([{transform:"translateY(0px)"}, {transform:"translateY(-10px)"}, {transform:"translateY(0px)"}], {duration:100, fill:"forwards"})

let currentDiaSpeaker = ["cc", ['0', 'o']];
let dialogueLineBuffer = [];
let dialogueSeqFinished = false;
let dialogueBoxShown = false;
let indexTracker = 0;
let currentLine = "";
let abortDiaWrite = false;
let currentSpecialAction = 0;

if (getCookie('all_vs_name') == undefined){
    updateCookie('all_vs_name', 'my visiting friend')
}


class DialougeLine {
    constructor(charID, expID, textBody) {
        //  Dialogue Line object structure:
        // XXX.character: 'cc-inadialogue'            < speaker ref (the element id of their dialogue portrait)
        //                                   ^ a 0 is a pass, i.e. use the same character as before

        // XXX.expression: ['>', '<']             < dialouge expression id (the raw text that'll go into their expression hole(s), if applicable)
        //                                    ^same goes, 0 is a pass

        // XXX.text: "Line of Dialogue" < string containing the line of dialogue

        this.character = charID;
        this.expression = expID; 
        this.text = textBody;
    };

    testReturn(){
        return ["CharacterID: " + this.character, "Expression: " + this.expression, "Text: " + this.text];
    };
};

function dialogueUpdate(sequence, special = 0){
    // takes input of an array of dialogue (sequence) lines, plus a two piece array of 'special actions'.
    // handles queueing of lines, and tells the portrait updater to update the portraits.
    
    
    if (indexTracker > 1){ //If we're aborting the line, then tell the dialoge writer to stop writing. Otherwise, keep going.
        abortDiaWrite = true;
    }else{

        if (dialogueLineBuffer.length == 0){

            if (special != 0){ //if there's a special action, store it for when the dialogue is finished
               currentSpecialAction = structuredClone(special);
            };


            if (dialogueSeqFinished == true){ //If we just finished a sequence, clear that variable.
                dialogueSpecialAction();
                dialogueSeqFinished = false;
            }else{ // if we're just getting started, add all the lines to the buffer (and let the console know)
                
                dialogueLineBuffer = structuredClone(sequence);
                
                console.log("Wrote new sequence to buffer:" + sequence);
                
            };
            toggleDialogueBox();
        };

        if (dialogueBoxShown == true){  // if the box is shown, then we're good to write.
            
            if (dialogueLineBuffer[0].character != currentDiaSpeaker[0] || dialogueLineBuffer[0].portrait != currentDiaSpeaker[0]){
                
                dialoguePortraitUpdate(dialogueLineBuffer[0]);
            }
            diaPortraitBounce.play();




            // Start writing the line;
            dialogueTextBoxD.innerHTML = "";
            currentLine = dialogueLineBuffer[0].text;
            writeCurrentLineToBox();
    };
    }                          
};

function dialoguePortraitUpdate(imAnIdiot){
    // updates the portrait and character expression in a dialogue box.
    
    if (imAnIdiot.character != currentDiaSpeaker[0] && imAnIdiot.character != 0){
        
        document.getElementById(currentDiaSpeaker[0]).classList.add('_hide');
        
        document.getElementById(imAnIdiot.character).classList.remove('_hide');

        currentDiaSpeaker[0] = imAnIdiot.character;
    }

    

    if (imAnIdiot.expression != 0){ //if we're not passing on expression, then...

        if (currentDiaSpeaker[0] == "cc"){ 
            // if it's CC, then update her eyes;
            document.getElementById("ccsit-eyeL").innerHTML = imAnIdiot.expression[0];
            document.getElementById("ccsit-eyeR").innerHTML = imAnIdiot.expression[1];

            currentDiaSpeaker[1] = imAnIdiot.expression;
        }

    }

};

function dialogueSpecialAction(){
    // Handles excecuting of special actions.
    // currentSpecialAction is in the form of:
    // [id, content] where 'id' is the special action number
    
    if (currentSpecialAction == 0){
        //pass if we don't have a special action
        return;

    }else if (currentSpecialAction[0] == "cookieupdate"){
        // UPDATE COOKIE
        // expects currentSpecialAction[1] to be [cookieid, cookiecontent]
        console.log(currentSpecialAction);
        updateCookie(currentSpecialAction[1][0], currentSpecialAction[1][1]);

    }else if (currentSpecialAction[0] == "roomvisit"){
        // noting down that a room has been visited

        if (getCookie('all_vs_roomsvisited') == undefined){
            updateCookie('all_vs_roomsvisited', '')
        };

        let roomslist = getCookie('all_vs_roomsvisited').split(',');
        console.log(roomslist);

        if (roomslist.includes(currentSpecialAction[1]) != true){

            updateCookie('all_vs_roomsvisited', getCookie('all_vs_roomsvisited') + ',' + currentSpecialAction[1]);

            // add the target room to the visted list.
            // and if the requisites have been met for completing the cc explore quest,
            // let her prompt you to go back to the cookie room.

            if (roomslist.length > 10 && roomslist.includes('about') && roomslist.includes('links')){
                updateCookie('all_cc_questline','backtocookieroomhint')
            }
        };

    }else if (currentSpecialAction[0] == "ccjump"){
        // cc hopping from the top of the orange testbox to the footer

        document.getElementById('cc-incookieroom').classList.add('_hide');
        document.getElementById('footer-cc').classList.remove('_hide');
        updateCookie('all_cc_location', 'footer');
    }else if (currentSpecialAction[0] == "deciderooms"){
        // the visitor decides which room cc should get.

        document.getElementById('about-ccroomchoicer').classList.remove('_hide');
    }
}


function writeCurrentLineToBox(){
    // writes the 'currentLine' of dialogue to the box
    
     setTimeout(addNewCharD, textSpeedD);
        
        function addNewCharD(){
            
            if (abortDiaWrite == true){   // if we're gonna abort the line, slap the rest of the words on there, reset the index and clear the buffer.
                
                abortDiaWrite = false;

                
                dialogueTextBoxD.innerHTML += currentLine.slice(indexTracker);

                indexTracker = 0;

                    dialogueLineBuffer.shift();

                    if (dialogueLineBuffer.length == 0){

                        dialogueSeqFinished = true;
                    };


            }else{
                
                dialogueTextBoxD.innerHTML += currentLine[indexTracker];

                indexTracker += 1;
                
                if (indexTracker < currentLine.length){
                    setTimeout(addNewCharD, textSpeedD);
                }
                else {
                    
                    indexTracker = 0;
                    
                    dialogueLineBuffer.shift();

                    if (dialogueLineBuffer.length == 0){
                        
                        dialogueSeqFinished = true;
                    };
                }

            }
        }
};

function toggleDialogueBox(){
    if (dialogueBoxShown == false){
        dialogueContainer.classList.remove("_hide");
        dialogueBoxShown = true;
    }else {
        dialogueContainer.classList.add("_hide");
        dialogueBoxShown = false;
    };
};

function meetingGrazuMan(){
    // extra little thing for meeting the grazu creature bc I didn't know where else to put it
    if (getCookie("all_cc_location") == 'footer'){
        if (getCookie("all_cc_metgrazu") == undefined){
            updateCookie("all_cc_metgrazu", 'true');

            dialogueUpdate([
            new DialougeLine ("cc", ['0','0'], "Woah!!! I didn't see you!")
            ,new DialougeLine ("cc", '0o', "Were you always there???")
            ,new DialougeLine ("gz", 0, "¯\\_(ツ)_/¯")
            ,new DialougeLine ("cc", '**', 'Wow... I like your kaomoji!!!')
            ,new DialougeLine ("gz", 0, "(^-^)ゝ")
            ,new DialougeLine ("cc", 'o7', ' ')
            ])
        }else{
            dialogueUpdate([
            new DialougeLine ("cc", ['0','0'], "Rock on, big man!")
            ,new DialougeLine ("gz", 0, "*★,°*:.☆(￣▽￣)/$:*.°★* 。")
            ,new DialougeLine ("cc", '☆★', ' ')
            ])
        };
    };
};

const cctestsequence = [
    new DialougeLine ("cc", ['o', '0'], "Hi!! Welcome to the we're testing all of the dialogue now!"),
    new DialougeLine (0, ['>', '<'], "bleghhhhhhhgablagh"),
    new DialougeLine (0, ['♀', '♀'], "Whoooaaahhh"),
    new DialougeLine ("ob", 0, ".      .      ."),
    new DialougeLine ("ob", 0, "..what are you doing"),
    new DialougeLine ("cc", ['♀', '♀'], "Having Fun.                                                                                                                          Duh.")
]

