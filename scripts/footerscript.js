let footerAudioPlaying = false;
let footerAudio = document.getElementById("footer-audio");
let footerPlayPauseButt = document.getElementById("footer-playpause");
let footerVolumeAdjustButt = document.getElementById("footer-volchanger");
const footerVolDisplayList = ["Volume: ● ○ ○ ○", "Volume: ● ● ○ ○", "Volume: ● ● ● ○", "Volume: ● ● ● ●"];
let footerVolIndex = 1;
footerAudio.volume = 0.5;

function toggleMusic(){
    if (footerAudioPlaying){
        footerAudio.pause();
        footerPlayPauseButt.innerHTML = "PLAY";
        footerAudioPlaying = false;
    }
    else {
        footerAudio.play();
        footerPlayPauseButt.innerHTML = "PAUSE";
        footerAudioPlaying = true;
    }
}

function adjustVolume(){
    if (footerAudio.volume == 1){
        footerAudio.volume = 0.25;
        footerVolIndex = 0;
    }
    else{
        footerAudio.volume += 0.25;
        footerVolIndex += 1;
    }
    footerVolumeAdjustButt.innerHTML = footerVolDisplayList[footerVolIndex];
}