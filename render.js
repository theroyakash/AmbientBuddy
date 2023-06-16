var gta5Audio = document.getElementById("gta5Audio");
var isPlaying = false;

gta5Button = document.getElementById("gta5button");

function togglePlay() {
    if (isPlaying) {
        gta5Audio.pause();
        gta5Button.innerHTML = "Start Playing";
    } else {
        gta5Audio.play();
        gta5Button.innerHTML = "Stop Playing";
    }
};

gta5Audio.onplaying = function () {
    isPlaying = true;
};
gta5Audio.onpause = function () {
    isPlaying = false;
};

let volume = document.querySelector("#volume-control");
volume.addEventListener("change", function (event) {
    gta5Audio.volume = event.currentTarget.value / 100;
});


// Abusive audio
var abusiveAudio = document.getElementById("abusive-audio");
var abusiveAudio_isPlaying = false;

abusiveAudioButton = document.getElementById("abusive-audio-button");

function abusiveAudioTogglePlay() {
    if (abusiveAudio_isPlaying) {
        abusiveAudio.pause();
        abusiveAudioButton.innerHTML = "Start Playing";
    } else {
        abusiveAudio.play();
        abusiveAudioButton.innerHTML = "Stop Playing";
    }
};

abusiveAudio.onplaying = function () {
    abusiveAudio_isPlaying = true;
};
abusiveAudio.onpause = function () {
    abusiveAudio_isPlaying = false;
};

let abusivevolume = document.querySelector("#volume-control-abusive");
abusivevolume.addEventListener("change", function (event) {
    abusiveAudio.volume = event.currentTarget.value / 100;
});


// generic function 
var audioStateStore = new Map();

function audioTogglePlay(id) {
    var audio = document.getElementById(id + "_audio");
    var audio_button = document.getElementById(id + "_audio_button");
    
    if (!audioStateStore.has(id + "_audioIsPlaying")) {
        audioStateStore[id + "_audioIsPlaying"] = false;
    }

    var audio_state = audioStateStore[id + "_audioIsPlaying"];

    if (audio_state) {
        audio.pause();
        audio_button.innerHTML = "Start Playing";
    } else {
        audio.play();
        audio_button.innerHTML = "Stop Playing";
    }

    audio.onplaying = function () {
        audioStateStore[id + "_audioIsPlaying"] = true;
    };

    audio.onpause = function () {
        audioStateStore[id + "_audioIsPlaying"] = false;
    };

    let volume_service = document.querySelector("#" + id + "_volume_control");
    console.log(volume_service);
    
    setupVolumeControlEventListener(audio, volume_service);
};

function setupVolumeControlEventListener(audio, volume_service) {
    volume_service.addEventListener("change", function (event) {
        audio.volume = event.currentTarget.value / 100;
    });
}