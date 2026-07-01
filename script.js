const player = document.querySelector(".player");
const video = player.querySelector(".player__video");
const progress = player.querySelector(".progress");
const progressFilled = player.querySelector(".progress__filled");
const toggleButton = player.querySelector(".toggle");
const volumeInput = player.querySelector("input[name='volume']");
const playbackSpeedInput = player.querySelector("input[name='playbackSpeed']");
const skipButtons = player.querySelectorAll("[data-skip]");

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  toggleButton.textContent = video.paused ? "►" : "❚ ❚";
}

function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100 || 0;
  progressFilled.style.width = `${percent}%`;
}

function scrub(event) {
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function skip() {
  video.currentTime += Number(this.dataset.skip);
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", updateProgress);

toggleButton.addEventListener("click", togglePlay);
volumeInput.addEventListener("input", handleRangeUpdate);
playbackSpeedInput.addEventListener("input", handleRangeUpdate);
skipButtons.forEach((button) => button.addEventListener("click", skip));

let mouseDown = false;

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (event) => mouseDown && scrub(event));

progress.addEventListener("mousedown", () => {
  mouseDown = true;
});

progress.addEventListener("mouseup", () => {
  mouseDown = false;
});

progress.addEventListener("mouseleave", () => {
  mouseDown = false;
});