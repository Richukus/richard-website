const players = document.querySelectorAll("[data-player]");

players.forEach((player) => {
  const audio = player.querySelector("audio");
  const playButton = player.querySelector(".play-button");
  const icon = playButton.querySelector("i");
  const progressBar = player.querySelector(".progress-bar");
  const timeDisplay = player.querySelector(".player-time");

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) {
      return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  function updateTime() {
    const current = formatTime(audio.currentTime);
    const duration = formatTime(audio.duration);

    timeDisplay.textContent = `${current} / ${duration}`;
  }

  function updateProgress() {
    if (!audio.duration) {
      progressBar.value = 0;
      return;
    }

    const percentage = (audio.currentTime / audio.duration) * 100;

    progressBar.value = percentage;
  }

  function setPlayingState() {
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");

    playButton.setAttribute("aria-label", "Pause");
  }

  function setPausedState() {
    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");

    playButton.setAttribute("aria-label", "Play");
  }

  playButton.addEventListener("click", () => {
    if (audio.paused) {
      players.forEach((otherPlayer) => {
        const otherAudio = otherPlayer.querySelector("audio");

        if (otherAudio !== audio) {
          otherAudio.pause();
        }
      });

      audio.play();
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", () => {
    setPlayingState();
  });

  audio.addEventListener("pause", () => {
    setPausedState();
  });

  audio.addEventListener("loadedmetadata", () => {
    updateTime();
  });

  audio.addEventListener("timeupdate", () => {
    updateTime();
    updateProgress();
  });

  audio.addEventListener("ended", () => {
    setPausedState();

    progressBar.value = 0;
    audio.currentTime = 0;
  });

  progressBar.addEventListener("input", () => {
    if (!audio.duration) {
      return;
    }

    const newTime = (progressBar.value / 100) * audio.duration;

    audio.currentTime = newTime;
  });
});
