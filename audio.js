function audioTogglePlay(id) {
    var mainAudio = document.getElementById(id + "_audio");
    var crossfadeAudio = document.getElementById(id + "_audio_crossfade");
    var audioButton = document.getElementById(id + "_audio_button");
    var volumeControl = document.getElementById(id + "_volume_control");

    if (mainAudio.paused) {
        var time = new Date().getTime();
        console.log("Main Audio Started... at time: " + time);
        mainAudio.play();
        
        audioButton.innerHTML =
            '<span class="text-red-500 hover:text-blue-900 font-mono font-bold transition duration-200">STOP</span>';

        // Crossfade audio when finishes
        var remainingTime = (mainAudio.duration - mainAudio.currentTime) * 1000;
        var intervalTime = remainingTime - 1000;

        var interval = setInterval(function () {
            console.log("interval running...");
            if (!mainAudio.paused) {

                crossfadeAudio.currentTime = mainAudio.duration - 1;
                time = new Date().getTime();
                console.log("crossfade audio started... at time: " + time);
                crossfadeAudio.play();

                time = new Date().getTime();
                console.log("main audio restart service routine at time: " + time);
                mainAudio.currentTime = 0;

                time = new Date().getTime();
                console.log("main audio re-started... at time: " + time);
                mainAudio.play();

                crossfadeAudio.pause();
                time = new Date().getTime();
                console.log("crossfade audio paused... at time: " + time);
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

        mainAudio.currentTime = 0;
        crossfadeAudio.currentTime = 0;

        console.log("Main Audio and Crossfade Audio paused at time: " + new Date().getTime());

        audioButton.innerHTML =
            '<span class="font-mono font-bold text-blue-700 hover:text-blue-900 transition duration-200">PLAY</span>';
    }

    // Volume control
    volumeControl.addEventListener("change", function (event) {
        mainAudio.volume = crossfadeAudio.volume = event.currentTarget.value / 100;
    });
}
