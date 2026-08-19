/* =====================================================
   SCRATCH REVEAL
===================================================== */

const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");

const intro = document.getElementById("intro");
const revealScreen = document.getElementById("revealScreen");
const main = document.getElementById("main");

let scratching = false;
let scratches = 0;
let revealed = false;


function resizeCanvas() {

    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.globalCompositeOperation = "source-over";

    /*
        Metallic scratch texture
    */

    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            canvas.width,
            canvas.height
        );

    gradient.addColorStop(0, "#d1c9bc");
    gradient.addColorStop(.5, "#81796e");
    gradient.addColorStop(1, "#c7beb1");

    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    /*
        tiny visual texture
    */

    ctx.fillStyle = "rgba(255,255,255,.15)";

    for(let i = 0; i < 300; i++) {

        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;

        ctx.fillRect(x, y, 1, 1);
    }

    ctx.globalCompositeOperation =
        "destination-out";
}


resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


function scratch(x, y) {

    if(revealed) return;

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        32,
        0,
        Math.PI * 2
    );

    ctx.fill();

    scratches++;

    /*
        Reveal after enough movement.
    */

    if(scratches > 130) {

        revealed = true;

        intro.style.transition =
            "opacity 1s ease";

        intro.style.opacity = "0";

        setTimeout(() => {

            intro.classList.add("hidden");

            revealScreen.classList.remove(
                "hidden"
            );

        }, 1000);
    }
}


/* mouse */

canvas.addEventListener(
    "mousedown",
    () => scratching = true
);

canvas.addEventListener(
    "mouseup",
    () => scratching = false
);

canvas.addEventListener(
    "mouseleave",
    () => scratching = false
);

canvas.addEventListener(
    "mousemove",
    event => {

        if(!scratching) return;

        const rect =
            canvas.getBoundingClientRect();

        scratch(
            event.clientX - rect.left,
            event.clientY - rect.top
        );
    }
);


/* touch */

canvas.addEventListener(
    "touchstart",
    event => {

        scratching = true;

        event.preventDefault();

    },
    { passive:false }
);

canvas.addEventListener(
    "touchend",
    () => scratching = false
);

canvas.addEventListener(
    "touchmove",
    event => {

        if(!scratching) return;

        event.preventDefault();

        const rect =
            canvas.getBoundingClientRect();

        const touch =
            event.touches[0];

        scratch(
            touch.clientX - rect.left,
            touch.clientY - rect.top
        );

    },
    { passive:false }
);


/* =====================================================
   ENTER STORY
===================================================== */

document
    .getElementById("enterButton")
    .addEventListener(
        "click",
        () => {

            revealScreen.style.transition =
                "opacity .8s ease";

            revealScreen.style.opacity = "0";

            setTimeout(() => {

                revealScreen.classList.add(
                    "hidden"
                );

                main.classList.remove(
                    "hidden"
                );

                window.scrollTo(0,0);

            },800);

        }
    );


/* =====================================================
   MUSIC
===================================================== */

const music =
    document.getElementById("music");

const musicButton =
    document.getElementById("musicButton");

let playing = false;


musicButton.addEventListener(
    "click",
    () => {

        if(!playing) {

            music.play();

            playing = true;

            musicButton.innerHTML =
                "♫ <span>PAUSE</span>";

        } else {

            music.pause();

            playing = false;

            musicButton.innerHTML =
                "♫ <span>PLAY</span>";
        }

    }
);


/* =====================================================
   COUNTDOWN
===================================================== */

const weddingDate =
    new Date(
        "December 12, 2026 19:00:00"
    ).getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const difference =
        weddingDate - now;


    if(difference <= 0) return;


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            difference /
            (1000 * 60 * 60) % 24
        );

    const minutes =
        Math.floor(
            difference /
            (1000 * 60) % 60
        );

    const seconds =
        Math.floor(
            difference /
            1000 % 60
        );


    document.getElementById("days")
        .textContent =
        String(days).padStart(2,"0");

    document.getElementById("hours")
        .textContent =
        String(hours).padStart(2,"0");

    document.getElementById("minutes")
        .textContent =
        String(minutes).padStart(2,"0");

    document.getElementById("seconds")
        .textContent =
        String(seconds).padStart(2,"0");
}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* =====================================================
   RSVP
===================================================== */

document
    .getElementById("rsvpButton")
    .addEventListener(
        "click",
        () => {

            /*
              Later we'll replace this with:
              - Google Form
              - WhatsApp
              - Google RSVP page
              - custom RSVP modal
            */

            alert(
                "RSVP link coming soon ♡"
            );

        }
    );