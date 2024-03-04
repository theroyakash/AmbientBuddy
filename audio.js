function audioTogglePlay(id) {
    var mainAudio = document.getElementById(id + "_audio");
    var audioButton = document.getElementById(id + "_audio_button");
    var volumeControl = document.getElementById(id + "_volume_control");

    if (mainAudio.paused) {
        mainAudio.play();
        
        audioButton.innerHTML =
            '<span class="text-red-500 dark:text-red-300 font-mono font-bold transition duration-200">STOP</span>';
    } else {
        mainAudio.pause();
        audioButton.innerHTML =
            '<span class="font-mono font-bold text-blue-700 dark:text-white transition duration-200">PLAY</span>';
    }

    // Volume control
    volumeControl.addEventListener("change", function (event) {
        mainAudio.volume = event.currentTarget.value / 100;
    });
}