const player = document.querySelector(".player");
const video = document.querySelector(".player__video");
const progress = document.querySelector(".progress");
const progressFilled = document.querySelector(".progress__filled");
const toggle = document.querySelector(".toggle");
const sliders = document.querySelectorAll(".player__slider");
const skipButtons = document.querySelectorAll("[data-skip]");

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  toggle.textContent = video.paused ? "►" : "❚ ❚";
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  if (this.name === "volume") {
    video.volume = this.value;
  }

  if (
    this.name === "playbackSpeed" ||
    this.name === "playbackRate"
  ) {
    video.playbackRate = this.value;
  }
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = percent + "%";
}

function scrub(e) {
  const scrubTime =
    (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

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

let mouseDown = false;

progress.addEventListener("click", scrub);

progress.addEventListener("mousedown", () => {
  mouseDown = true;
});

progress.addEventListener("mouseup", () => {
  mouseDown = false;
});

progress.addEventListener("mouseleave", () => {
  mouseDown = false;
});

progress.addEventListener("mousemove", e => {
  if (mouseDown) scrub(e);
});

video.volume = 1;
video.playbackRate = 1;
updateButton();