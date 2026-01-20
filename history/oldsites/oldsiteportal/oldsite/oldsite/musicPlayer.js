const mp3s = [
    "00 - Toby Fox - greenroom.mp3",
    "01 - Toby Fox - Faint Glow.mp3",
    "05 - Toby Fox - Ruins.mp3",
    "26 - Toby Fox - Pandora Palace.mp3"
]

let currentTrack = 0

function loadMp3(trackIndex=0) {
    const mp3 = document.querySelector("#trackAudio")
    mp3.src = `./mp3/${mp3s[trackIndex]}`
    mp3.load()
    mp3.play()
    
    const trackName = document.querySelector("#trackName")
    trackName.innerHTML = mp3s[trackIndex]?.replaceAll('_', ' ').replaceAll('.mp3', '')
}

function next() {
    if (currentTrack === mp3s.length - 1) {
        currentTrack = 0
        loadMp3(currentTrack)
    } else {
        currentTrack += 1
        loadMp3(currentTrack)
    }
}

function previous() {
    if (currentTrack === 0) {
        currentTrack = mp3s.length - 1
        loadMp3(currentTrack)
    } else {
        currentTrack -= 1
        loadMp3(currentTrack)
    }
}

function secondsToMMSS(seconds) {
    if (typeof seconds !== 'number' || isNaN(seconds)) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

function togglePause() {
    const mp3 = document.querySelector("#trackAudio")
    if (mp3.paused) {
        mp3.play()
    } else {
        mp3.pause()
    }

    // next() if no track playing
    if (!mp3.src) {
        next()
    }

}

function setVolumn(volume) {
    const mp3 = document.querySelector("#trackAudio")
    mp3.volume = volume
}

function addListeners() {

    const progressSlider = document.getElementById('progressSlider')

    const vs = document.getElementById('volSlider')
    volSlider.addEventListener('change', (e) => {
        setVolumn(e.target.value)
    })
    vs.value = 0.5

    const audio = document.getElementById('trackAudio')
    audio.addEventListener('play', () => {
        document.getElementById('pauseToggle').classList.add('playing')
    })
    audio.addEventListener('pause', () => {
        document.getElementById('pauseToggle').classList.remove('playing')
    })
    audio.addEventListener('ended', () => {
        next()
    })
    audio.addEventListener('timeupdate', () => {
        document.getElementById('trackProgress').innerText = secondsToMMSS(audio.currentTime)
        document.getElementById('trackTotalLength').innerHTML = secondsToMMSS(audio.duration);
        progressSlider.value = audio.currentTime / audio.duration * 100
        progressSlider.min = 0
        progressSlider.max = 100
    })

    progressSlider.addEventListener('change', (e) => {
        audio.currentTime = audio.duration * e.target.value / 100
    })



}


document.addEventListener('DOMContentLoaded', () => {
    addListeners()
})