const video = document.getElementById("bgVideo");
const source = document.getElementById("videoSource");


function checkOrientation() {
    if (window.innerHeight > window.innerWidth) {
        console.log("Modo vertical → mostrar aviso");
    } else {
        console.log("Modo horizontal → mostrar vídeo");
    }
}

window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);

checkOrientation();


function setVideo() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const newSrc = isMobile
        ? "videos/mobile.mp4"
        : "videos/desktop.mp4";

    if (source.getAttribute("src") !== newSrc) {
        source.setAttribute("src", newSrc);
        video.load();
        video.play();
    }
}

// Ejecutar al cargar
setVideo();

// Ejecutar si cambia tamaño (rotación móvil / resize)
window.addEventListener("resize", setVideo);

let current = "";

function setVideo() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const newSrc = isMobile
        ? "videos/mobile.mp4"
        : "videos/desktop.mp4";

    if (current === newSrc) return;

    current = newSrc;
    source.src = newSrc;
    video.load();
    video.play();
}

//girar movil
function updateLandscape() {
    const isLandscape = window.matchMedia("(orientation: landscape)").matches;
    //horizontal
    if(isLandscape){
        video.style.objectFit = "cover";
        video.style.transform = "scale(1)";
    } else {
        //vertical
        video.style.objectFit = "cover";
        video.style.transform = "scale(1.2)";
    }
}

updateLandscape();

window.addEventListener("resize", updateLandscape);
window.addEventListener("orientationchange", updateLandscape);

