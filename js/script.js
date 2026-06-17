const bgVideo = document.getElementById("bgVideo");
const overlay = document.getElementById("overlayVideo");

const params = new URLSearchParams(window.location.search);
const nfc = params.get("nfc");

let progreso = parseInt(localStorage.getItem("progreso") || "0");

/* 🔊 DESBLOQUEO DE AUDIO GLOBAL (IMPORTANTE) */
function unlockAudio() {
    overlay.muted = false;
    bgVideo.muted = true;
}

/* 🎬 FUNCIÓN PRINCIPAL */
function safePlay(video) {
  video.pause();
  video.currentTime = 0;

  const p = video.play();
  if (p) p.catch(err => console.log("Play error:", err));
}

function playStep(overlaySrc, newBg, nextState) {
  unlockAudio();

  overlay.onended = null;

  overlay.pause();
  overlay.currentTime = 0;

  overlay.src = overlaySrc;
  overlay.load();

  overlay.classList.add("show");
  overlay.classList.remove("hidden");

  overlay.muted = false;

  overlay.play().catch(err => console.log("Overlay autoplay error:", err));

  overlay.onended = () => {
    bgVideo.classList.add("transitioning");
    overlay.classList.remove("show");

    setTimeout(() => {
      bgVideo.pause();
      bgVideo.currentTime = 0;

      bgVideo.src = newBg;
      bgVideo.load();

      bgVideo.oncanplay = () => {
        safePlay(bgVideo);
      };

      setTimeout(() => {
        bgVideo.classList.remove("transitioning");
      }, 300);

      overlay.classList.add("hidden");

      localStorage.setItem("progreso", nextState);
      progreso = nextState;
    }, 600);
  };
}
/* 🧲 NFC START */
if (nfc === "start") {
    localStorage.setItem("progreso", "1");
    progreso = 1;
    unlockAudio(); // 🔊 importante desde el inicio
}

/* 🎬 NFC 1 */
if (nfc === "video1") {

    if (progreso >= 1) {
        playStep(
            //aqui cambias los videos, el de arriba(clip1) es el q va por encima y el clip2 es el background y asi con todos)
            "resources/videolatam.mp4",
            "resources/videofondo.mp4",
            2
        );
    } else {
        alert("Primero activa el NFC inicial");
    }
}

/* 🎬 NFC 2 */
if (nfc === "video2") {

    if (progreso >= 2) {
        playStep(
            "resources/videocongo.mp4",
            "resources/videofondo.mp4",
            3
        );
    } else {
        alert("Acceso bloqueado");
    }
}

/* 🎬 NFC 3 */
if (nfc === "video3") {

    if (progreso >= 3) {
        playStep(
            "resources/videoespa.mp4",
            "resources/videofondo.mp4",
            4
        );
    } else {
        alert("Acceso bloqueado");
    }
}
