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
function playStep(overlaySrc, newBg, nextState) {

    unlockAudio(); // 🔊 clave para autoplay con sonido

    // preparar overlay
    overlay.src = overlaySrc;
    overlay.load();

    overlay.classList.add("show");
    overlay.classList.remove("hidden");

    overlay.volume = 1.0;
    overlay.muted = false;

    // 🔥 play seguro (evita fallo silencioso)
    const playPromise = overlay.play();
    if (playPromise !== undefined) {
        playPromise.catch(err => {
            console.log("Autoplay bloqueado:", err);
        });
    }

    overlay.onended = () => {

        // 🍎 transición Apple
        bgVideo.classList.add("transitioning");
        overlay.classList.remove("show");

        setTimeout(() => {

            // cambiar fondo
            bgVideo.src = newBg;
            bgVideo.load();

            const bgPlay = bgVideo.play();
            if (bgPlay !== undefined) {
                bgPlay.catch(err => console.log("BG play error:", err));
            }

            // restaurar transición
            setTimeout(() => {
                bgVideo.classList.remove("transitioning");
            }, 300);

            overlay.classList.add("hidden");

            // guardar progreso
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
            "resources/clip1.mp4",
            "resources/clip2.mp4",
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
            "resources/video2.mp4",
            "resources/fondo3.mp4",
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
            "resources/video3.mp4",
            "resources/fondo4.mp4",
            4
        );
    } else {
        alert("Acceso bloqueado");
    }
}