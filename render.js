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