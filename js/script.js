const bgVideo = document.getElementById("bgVideo");
const overlay = document.getElementById("overlayVideo");

const params = new URLSearchParams(window.location.search);
const nfc = params.get("nfc");

let progreso = parseInt(localStorage.getItem("progreso") || "0");

// FUNCIÓN PRINCIPAL
function playStep(overlaySrc, newBg, nextState) {

    overlay.src = overlaySrc;
    overlay.classList.remove("hidden");
    overlay.play();

    overlay.onended = () => {

        bgVideo.style.opacity = 0;

        setTimeout(() => {
            bgVideo.src = newBg;
            bgVideo.load();
            bgVideo.play();
            bgVideo.style.opacity = 1;
        }, 300);

        overlay.classList.add("hidden");

        localStorage.setItem("progreso", nextState);
        progreso = nextState;
    };
}

// NFC START 
if (nfc === "start") {
    localStorage.setItem("progreso", "1");
    progreso = 1;
}

// NFC 1
if (nfc === "video1") {

    if (progreso >= 1) {
        playStep(
            //cambia vide1 y fondo2 por tus videos
            "resources/2026-06-03 00-54-13.mp4",
            "resources/fondo2.mp4",
            2
        );
    } else {
        alert("Primero activa el NFC inicial");
    }
}

//NFC 2
if (nfc === "video2") {

    if (progreso >= 2) {
        playStep(
            //cambia vide2 y fondo3 por tus videos
            "resources/video2.mp4",
            "resources/fondo3.mp4",
            3
        );
    } else {
        alert("Acceso bloqueado");
    }
}

if (nfc === "video3") {

    if (progreso >= 3) {
        playStep(
            //cambia vide1 y video2 por tus videos
            "resources/video3.mp4",
            "resources/fondo4.mp4",
            3
        );
    } else {
        alert("Acceso bloqueado");
    }
}