function audioTogglePlay(id) {
    var audio = document.getElementById(id + "_audio");
    var audio_button = document.getElementById(id + "_audio_button");

    if (audio.paused) {
        audio.play();
        audio_button.innerHTML = "<span class=\"text-blue-700 hover:text-blue-900 transition duration-200\">Pause</span>";
    } else {
        audio.pause();
        audio_button.innerHTML = "<span class=\"text-blue-700 hover:text-blue-900 transition duration-200\">Play</span>";
    };

    let volume_service = document.querySelector("#" + id + "_volume_control");    
    volume_service.addEventListener("change", function (event) {
        audio.volume = event.currentTarget.value / 100;
    });
};