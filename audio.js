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

// Global dictionary to store references to audio pairs
const audioPairs = {};

function audioTogglePlay2(id) {
    var mainAudio = document.getElementById(id + "_audio");
    var audioButton = document.getElementById(id + "_audio_button");
    var volumeControl = document.getElementById(id + "_volume_control");
    
    // Initialize the audio pair if not already done
    if (!audioPairs[id]) {
        // Create a copy of the audio element
        var copyAudio = new Audio();
        copyAudio.src = mainAudio.src;
        copyAudio.volume = mainAudio.volume;
        copyAudio.load();
        
        // Store references
        audioPairs[id] = {
            original: mainAudio,
            copy: copyAudio,
            currentlyPlaying: mainAudio,
            nextToPlay: copyAudio,
            fadeTimeSeconds: 10, // Start fading 10 seconds before end
            isPlaying: false,
            baseVolume: mainAudio.volume || 1
        };
    }
    
    const audioPair = audioPairs[id];
    
    // Toggle play/pause
    if (mainAudio.paused) {
        // Start playing
        audioPair.currentlyPlaying.play();
        audioPair.isPlaying = true;
        audioButton.innerHTML =
            '<span class="text-red-500 dark:text-red-300 font-mono font-bold transition duration-200">STOP</span>';
        
        // Set up the seamless loop
        setupSeamlessLoop(id);
    } else {
        // Pause both audios
        audioPair.original.pause();
        audioPair.copy.pause();
        audioPair.isPlaying = false;
        audioButton.innerHTML =
            '<span class="font-mono font-bold text-blue-700 dark:text-white transition duration-200">PLAY</span>';
    }
    
    // Volume control
    volumeControl.addEventListener("change", function(event) {
        const volume = event.currentTarget.value / 100;
        audioPair.baseVolume = volume;
        
        // Apply volume to both audio elements based on current state
        if (audioPair.isPlaying) {
            // If we're in a crossfade, maintain appropriate volumes
            updateAudioVolumes(id);
        } else {
            // When paused, set both to the same volume
            audioPair.original.volume = volume;
            audioPair.copy.volume = volume;
        }
    });
}

function setupSeamlessLoop(id) {
    const audioPair = audioPairs[id];
    const currentAudio = audioPair.currentlyPlaying;
    const nextAudio = audioPair.nextToPlay;
    
    // Remove any existing timeupdate handler
    currentAudio.removeEventListener('timeupdate', currentAudio.timeUpdateHandler);
    
    // Create a new timeupdate handler
    currentAudio.timeUpdateHandler = function() {
        if (!audioPair.isPlaying) return;
        
        const timeRemaining = currentAudio.duration - currentAudio.currentTime;
        
        // Start crossfade when approaching the end
        if (timeRemaining <= audioPair.fadeTimeSeconds && timeRemaining > 0.1) {
            // Calculate fade factor (0 = beginning of fade, 1 = end of fade)
            const fadeFactor = 1 - (timeRemaining / audioPair.fadeTimeSeconds);
            
            // Fade out current audio
            currentAudio.volume = audioPair.baseVolume * (1 - fadeFactor);
            
            // If next audio hasn't started yet, start it
            if (nextAudio.paused) {
                nextAudio.currentTime = 0;
                nextAudio.volume = 0;
                nextAudio.play();
            }
            
            // Fade in next audio
            nextAudio.volume = audioPair.baseVolume * fadeFactor;
        }
        
        // When current audio is about to end
        if (timeRemaining <= 0.1) {
            // Reset the current audio
            currentAudio.pause();
            currentAudio.currentTime = 0;
            
            // Swap the roles
            audioPair.currentlyPlaying = nextAudio;
            audioPair.nextToPlay = currentAudio;
            
            // Set up the loop for the new current audio
            setupSeamlessLoop(id);
        }
    };
    
    // Add the timeupdate event listener
    currentAudio.addEventListener('timeupdate', currentAudio.timeUpdateHandler);
}

function updateAudioVolumes(id) {
    const audioPair = audioPairs[id];
    const currentAudio = audioPair.currentlyPlaying;
    const nextAudio = audioPair.nextToPlay;
    
    const timeRemaining = currentAudio.duration - currentAudio.currentTime;
    
    if (timeRemaining <= audioPair.fadeTimeSeconds && timeRemaining > 0.1) {
        // We're in a crossfade
        const fadeFactor = 1 - (timeRemaining / audioPair.fadeTimeSeconds);
        currentAudio.volume = audioPair.baseVolume * (1 - fadeFactor);
        nextAudio.volume = audioPair.baseVolume * fadeFactor;
    } else {
        // Normal playback
        currentAudio.volume = audioPair.baseVolume;
        nextAudio.volume = 0;
    }
}