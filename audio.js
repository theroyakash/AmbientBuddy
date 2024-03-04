function audioTogglePlay(id) {
    var mainAudio = document.getElementById(id + "_audio");
    var crossfadeAudio = document.getElementById(id + "_audio_crossfade");
    var audioButton = document.getElementById(id + "_audio_button");
    var volumeControl = document.getElementById(id + "_volume_control");

    if (mainAudio.paused) {
        mainAudio.play();
        
        audioButton.innerHTML =
            '<span class="text-red-500 hover:text-blue-900 dark:text-red-300 font-mono font-bold transition duration-200">STOP</span>';

        // Crossfade audio when finishes
        var remainingTime = (mainAudio.duration - mainAudio.currentTime) * 1000;
        var intervalTime = remainingTime - 1000;

        var interval = setInterval(function () {
            if (!mainAudio.paused) {

                crossfadeAudio.currentTime = mainAudio.duration - 1;
                crossfadeAudio.play();

                mainAudio.currentTime = 0;
                mainAudio.play();

                crossfadeAudio.pause();
                crossfadeAudio.currentTime = 0;
            }
        }, intervalTime);

        // Clear the interval when the audio is paused or stopped
        mainAudio.addEventListener("pause", function() {
            console.log("clearInterval cleared through pause event at time: " + new Date().getTime());
            clearInterval(interval);
        });
        mainAudio.addEventListener("ended", function() {
            console.log("clearInterval cleared through ended event at time: " + new Date().getTime());
            clearInterval(interval);
        });

    } else {
        mainAudio.pause();
        crossfadeAudio.pause();
        audioButton.innerHTML =
            '<span class="font-mono font-bold text-blue-700 dark:text-white hover:text-blue-900 transition duration-200">PLAY</span>';
    }

    // Volume control
    volumeControl.addEventListener("change", function (event) {
        mainAudio.volume = crossfadeAudio.volume = event.currentTarget.value / 100;
    });
}
