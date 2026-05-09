const openLetter = document.querySelector("#openLetter");
const rainLove = document.querySelector("#rainLove");
const letter = document.querySelector("#letter");
const toast = document.querySelector("#toast");
const questText = document.querySelector("#questText");
const xpFill = document.querySelector("#xpFill");
const gems = document.querySelectorAll(".heart-gem");
const musicButton = document.querySelector("#musicButton");
const song = document.querySelector("#song");

let gameStarted = false;
let collectedGems = 0;
let musicReady = false;

const floatingMessages = [
  "Te amo, mam\u00e1",
  "Gracias por protegernos",
  "Eres mi lugar seguro",
  "Te quiero much\u00edsimo",
  "Gracias por todo",
  "Eres la mejor mam\u00e1",
  "Con cari\u00f1o, Anthony",
  "Siempre te llevo en mi coraz\u00f3n",
  "Eres la m\u00e1s linda",
  "Eres la m\u00e1s hermosa",
  "Gracias por tu paciencia",
  "Gracias por tus abrazos"
];

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function playMusic() {
  if (!song.getAttribute("src")) {
    showToast("P\u00e1same la m\u00fasica y la conecto aqu\u00ed.");
    return;
  }

  song.volume = 0.72;
  song.play()
    .then(() => {
      musicReady = true;
      musicButton.textContent = "Pausar m\u00fasica";
    })
    .catch(() => {
      musicReady = false;
      musicButton.textContent = "Reproducir m\u00fasica";
    });
}

function createHeart(delay = 0) {
  window.setTimeout(() => {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = "\u2665";
    heart.style.left = `${Math.random() * 92 + 4}%`;
    heart.style.fontSize = `${Math.random() * 18 + 18}px`;
    heart.style.animationDuration = `${Math.random() * 1.2 + 2.2}s`;
    document.body.appendChild(heart);

    heart.addEventListener("animationend", () => heart.remove());
  }, delay);
}

function createLoveText(delay = 0) {
  window.setTimeout(() => {
    const text = document.createElement("span");
    const message = floatingMessages[Math.floor(Math.random() * floatingMessages.length)];
    text.className = "love-text";
    text.textContent = message;
    text.style.left = `${Math.random() * 70 + 8}%`;
    text.style.animationDuration = `${Math.random() * 1.1 + 3.4}s`;
    document.body.appendChild(text);

    text.addEventListener("animationend", () => text.remove());
  }, delay);
}

function launchSurprise() {
  for (let index = 0; index < 42; index += 1) {
    createHeart(index * 45);
  }

  for (let index = 0; index < 22; index += 1) {
    createLoveText(index * 130);
  }
}

openLetter.addEventListener("click", () => {
  if (!gameStarted) {
    gameStarted = true;
    openLetter.textContent = "Recoge los corazones";
    questText.textContent = "Toca los 3 corazones brillantes dentro del juego.";
    showToast("Juego iniciado: recoge los corazones.");
    gems.forEach((gem) => {
      gem.disabled = false;
    });
    return;
  }

  if (collectedGems < gems.length) {
    showToast(`Te faltan ${gems.length - collectedGems} corazones.`);
    return;
  }

  document.body.classList.add("mission-complete");
  letter.classList.remove("locked");
  letter.scrollIntoView({ behavior: "smooth", block: "start" });
  showToast("Misi\u00f3n completada: Mam\u00e1 sonriendo.");
  launchSurprise();
});

rainLove.addEventListener("click", () => {
  if (letter.classList.contains("locked")) {
    showToast("Primero completa el juego para desbloquearla.");
    return;
  }

  showToast("Lluvia de te amo activada.");
  launchSurprise();
});

musicButton.addEventListener("click", () => {
  if (!song.getAttribute("src")) {
    showToast("P\u00e1same la m\u00fasica y la conecto aqu\u00ed.");
    return;
  }

  if (song.paused) {
    playMusic();
    musicButton.textContent = "Pausar m\u00fasica";
    showToast("M\u00fasica activada.");
    return;
  }

  song.pause();
  musicButton.textContent = "Reproducir m\u00fasica";
  showToast("M\u00fasica pausada.");
});

window.addEventListener("DOMContentLoaded", () => {
  playMusic();
});

window.addEventListener("pointerdown", () => {
  if (!musicReady && song.paused) {
    playMusic();
  }
}, { once: true });

gems.forEach((gem) => {
  gem.disabled = true;

  gem.addEventListener("click", () => {
    if (!gameStarted || gem.classList.contains("collected")) {
      return;
    }

    gem.classList.add("collected");
    gem.disabled = true;
    collectedGems += 1;
    xpFill.style.width = `${(collectedGems / gems.length) * 100}%`;

    if (collectedGems === gems.length) {
      openLetter.textContent = "Desbloquear sorpresa";
      questText.textContent = "Misi\u00f3n completa. Presiona el bot\u00f3n para ver la sorpresa.";
      showToast("Carta desbloqueada.");
      return;
    }

    questText.textContent = `Muy bien. Faltan ${gems.length - collectedGems} corazones.`;
    showToast("Coraz\u00f3n recogido.");
  });
});
