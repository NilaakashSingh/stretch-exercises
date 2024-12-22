const exercises = [
    { name: "Static Hip Flexor Stretch", muscles: "Hip Flexors", duration: 30, link: "https://www.youtube.com/embed/UU7Nqd_Dric" },
    { name: "Seated Hamstring Stretch", muscles: "Hamstrings", duration: 30, link: "https://www.youtube.com/embed/kWJQLTIvONY" },
    { name: "Pigeon Stretch", muscles: "Glutes", duration: 30, link: "https://www.youtube.com/embed/FVlX5HNKamw" },
    { name: "Seated Groin Stretch (Frog Stretch)", muscles: "Groin muscles (Adductors)", duration: 30, link: "https://www.youtube.com/embed/Y_y5xss2Gmw" },
    { name: "Open Book Stretch", muscles: "Chest + Back", duration: 10, link: "https://www.youtube.com/embed/I_oQIW635s0" },
    { name: "Back Extension", muscles: "Abdomen", duration: 30, link: "https://www.youtube.com/embed/s7S0umfjktI" },
    { name: "Cat & Camel Stretch", muscles: "Chest + Back", duration: 30, link: "https://www.youtube.com/embed/v1KltmDT8TE" },
    { name: "Downward Dog Stretch", muscles: "Calf + Shoulder", duration: 30, link: "https://www.youtube.com/embed/EH0DiwQaHg4" },
    { name: "Standing Chest Opener", muscles: "Chest", duration: 30, link: "https://www.youtube.com/embed/_wqrLjCm4HQ" },
    { name: "Passive Back Stretch", muscles: "Upper Back", duration: 30, link: "https://www.youtube.com/embed/dNOMmQARQTQ" },
  ];
  
  let currentExercise = 0;
  let timeLeft = exercises[currentExercise].duration;
  let interval;
  let isMuted = false;
  
  const exerciseName = document.getElementById("exercise-name");
  const timer = document.getElementById("time-left");
  const videoFrame = document.getElementById("video-frame");
  const progressBar = document.getElementById("progress-bar");
  const currentExerciseEl = document.getElementById("current-exercise");
  const totalExercisesEl = document.getElementById("total-exercises");
  const beepAudio = document.getElementById("beep-audio");
  const darkModeButton = document.getElementById("dark-mode-btn");  // Dark mode toggle button
  
  totalExercisesEl.textContent = exercises.length;
  
  function updateExercise() {
    const exercise = exercises[currentExercise];
    exerciseName.textContent = exercise.name;
    videoFrame.src = exercise.link;
    timeLeft = exercise.duration;
    timer.textContent = timeLeft;
    currentExerciseEl.textContent = currentExercise + 1;
  }
  
  function playBeep() {
    if (!isMuted) {
      beepAudio.currentTime = 0;
      beepAudio.play();
    }
  }
  
  function startTimer() {
    if (interval) return;
  
    playBeep();
    const initialTime = timeLeft;
  
    interval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        timer.textContent = timeLeft;
        progressBar.style.width = `${(timeLeft / initialTime) * 100}%`;
      } else {
        clearInterval(interval);
        interval = null;
        playBeep();
  
        currentExercise = (currentExercise + 1) % exercises.length;
        updateExercise();
        progressBar.style.width = "100%";
        startTimer();
      }
    }, 1000);
  }
  
  function pauseTimer() {
    clearInterval(interval);
    interval = null;
  }
  
  document.getElementById("start-btn").addEventListener("click", startTimer);
  document.getElementById("pause-btn").addEventListener("click", pauseTimer);
  document.getElementById("next-btn").addEventListener("click", () => {
    pauseTimer();
    currentExercise = (currentExercise + 1) % exercises.length;
    updateExercise();
    progressBar.style.width = "100%";
  });
  document.getElementById("mute-btn").addEventListener("click", () => {
    isMuted = !isMuted;
    document.getElementById("mute-btn").textContent = isMuted ? "Unmute" : "Mute";
  });
  
  darkModeButton.addEventListener("click", toggleDarkMode);
  
  // Check for dark mode preference in localStorage
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }
  
  // Toggle dark mode
  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const darkModeEnabled = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', darkModeEnabled ? 'enabled' : 'disabled');
  }
  
  updateExercise();  
