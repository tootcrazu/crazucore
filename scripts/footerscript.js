let footerAudioPlaying = false;
let footerAudio = document.getElementById("footer-audio");
let footerPlayPauseButt = document.getElementById("footer-playpause");
let footerVolumeAdjustButt = document.getElementById("footer-volchanger");
const footerVolDisplayList = ["Volume: ● ○ ○ ○", "Volume: ● ● ○ ○", "Volume: ● ● ● ○", "Volume: ● ● ● ●"];
let footerVolIndex = 1;
footerAudio.volume = 0.4;

function toggleFooterMusic(){
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

function adjustFooterVolume(){
    if (footerAudio.volume >= 0.8){
        footerAudio.volume = 0.2;
        footerVolIndex = 0;
    }
    else{
        footerAudio.volume += 0.2;
        footerVolIndex += 1;
    }
    console.log(footerAudio.volume)
    footerVolumeAdjustButt.innerHTML = footerVolDisplayList[footerVolIndex];
}