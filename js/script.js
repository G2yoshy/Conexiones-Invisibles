const bgVideo = document.getElementById("bgVideo");
const overlay = document.getElementById("overlayVideo");

const params = new URLSearchParams(window.location.search);
const nfc = params.get("nfc");

let progreso = parseInt(localStorage.getItem("progreso") || "0");

// FUNCIÓN PRINCIPAL
function playStep(overlaySrc, newBg, nextState) {

    //  preparar overlay
    overlay.src = overlaySrc;
    overlay.load();

    overlay.classList.add("show");
    overlay.classList.remove("hidden");

    overlay.play();

    overlay.onended = () => {

        //  INICIO TRANSICIÓN APPLE
        bgVideo.classList.add("transitioning");
        overlay.classList.remove("show");

        setTimeout(() => {

            //  cambiar fondo
            bgVideo.src = newBg;
            bgVideo.load();
            bgVideo.play();

            //  restaurar fondo
            setTimeout(() => {
                bgVideo.classList.remove("transitioning");
            }, 300);

            // ocultar overlay
            overlay.classList.add("hidden");

            // guardar progreso
            localStorage.setItem("progreso", nextState);

        }, 600);
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

            "resources/clip1",
            "resources/clip2",
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

//NFC 3
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