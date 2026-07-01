const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressFilled = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const sliders = player.querySelectorAll(".player__slider");
const skipButtons = player.querySelectorAll("[data-skip]");

// Play / Pause
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// Change play button icon
function updateButton() {
    toggle.textContent = video.paused ? "►" : "❚ ❚";
}

// Update progress bar
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressFilled.style.flexBasis = `${percent}%`;
}

// Seek video
function scrub(e) {
    const scrubTime =
        (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Skip
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

// Volume & Playback Speed
function handleRangeUpdate() {
    video[this.name] = this.value;
}

// Events
video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);

video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

video.addEventListener("timeupdate", handleProgress);

skipButtons.forEach(button =>
    button.addEventListener("click", skip)
);

sliders.forEach(slider =>
    slider.addEventListener("input", handleRangeUpdate)
);

// Click progress bar to seek
let mousedown = false;

progress.addEventListener("click", scrub);

progress.addEventListener("mousedown", () => mousedown = true);

progress.addEventListener("mouseup", () => mousedown = false);

progress.addEventListener("mousemove", e => {
    if (mousedown) scrub(e);
});