/* =========================
   YOUTUBE MUSIC
========================= */

let player = null;
let playerReady = false;
let musicPlaying = false;

const youtubeVideoId = "LjhCEhWiKXk";

const musicButton = document.getElementById("musicButton");


/* =========================
   YOUTUBE API
========================= */

function onYouTubeIframeAPIReady() {

    player = new YT.Player("youtube-player", {

        height: "112",
        width: "200",

        videoId: youtubeVideoId,

        playerVars: {
            autoplay: 0,
            controls: 0,
            loop: 1,
            playlist: youtubeVideoId,
            playsinline: 1,
            rel: 0
        },

        events: {

            onReady: function () {

                playerReady = true;

                console.log("YouTube player ready.");

            },

            onStateChange: function (event) {

                if (event.data === YT.PlayerState.PLAYING) {

                    musicPlaying = true;

                    musicButton.innerText = "🔊";

                }

                if (event.data === YT.PlayerState.PAUSED) {

                    musicPlaying = false;

                    musicButton.innerText = "🎵";

                }

                if (event.data === YT.PlayerState.ENDED) {

                    player.playVideo();

                }

            },

            onError: function (event) {

                console.log(
                    "YouTube error:",
                    event.data
                );

            }

        }

    });

}


/* =========================
   OPEN GIFT
========================= */

function openGift() {

    const intro =
        document.getElementById("intro");

    const mainContent =
        document.getElementById("mainContent");


    /*
        The visitor has clicked a button,
        so this is the best opportunity
        for the browser to allow playback.
    */

    if (playerReady && player) {

        player.unMute();

        player.setVolume(100);

        player.playVideo();

        musicPlaying = true;

        musicButton.innerText = "🔊";

    }


    /* Fade out opening screen */

    intro.style.opacity = "0";

    intro.style.transition =
        "opacity 0.8s ease";


    setTimeout(function () {

        intro.style.display = "none";

        mainContent.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 800);

}


/* =========================
   MUSIC BUTTON
========================= */

musicButton.addEventListener("click", function () {

    if (!playerReady || !player) {

        console.log(
            "YouTube player is still loading."
        );

        return;

    }


    if (musicPlaying) {

        player.pauseVideo();

        musicPlaying = false;

        musicButton.innerText = "🎵";

    } else {

        player.unMute();

        player.setVolume(100);

        player.playVideo();

        musicPlaying = true;

        musicButton.innerText = "🔊";

    }

});


/* =========================
   SECRET MESSAGE
========================= */

function showMessage() {

    const message =
        document.getElementById("secretMessage");


    if (message.style.display === "block") {

        message.style.display = "none";

    } else {

        message.style.display = "block";

        message.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        createConfetti();

    }

}


/* =========================
   FLOATING ELEMENTS
========================= */

const floatingContainer =
    document.querySelector(".floating-container");


function createFloatingElement() {

    const element =
        document.createElement("div");

    element.classList.add("floating");


    const symbols = [
        "♡",
        "♥",
        "✦",
        "✧",
        "♡",
        "✩"
    ];


    element.innerText =
        symbols[
            Math.floor(
                Math.random() *
                symbols.length
            )
        ];


    element.style.left =
        Math.random() * 100 + "%";


    element.style.fontSize =
        (12 + Math.random() * 20) + "px";


    element.style.animationDuration =
        (6 + Math.random() * 7) + "s";


    floatingContainer.appendChild(element);


    setTimeout(function () {

        element.remove();

    }, 13000);

}


setInterval(
    createFloatingElement,
    800
);


/* =========================
   CONFETTI
========================= */

function createConfetti() {

    const symbols = [
        "💜",
        "✨",
        "🌸",
        "💫",
        "🎉",
        "♡",
        "🪻"
    ];


    for (let i = 0; i < 35; i++) {

        const confetti =
            document.createElement("div");


        confetti.innerText =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        confetti.style.position =
            "fixed";

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.top =
            "-30px";

        confetti.style.fontSize =
            (15 + Math.random() * 20) + "px";

        confetti.style.zIndex =
            "9999";

        confetti.style.pointerEvents =
            "none";


        document.body.appendChild(
            confetti
        );


        const animation =
            confetti.animate(

                [
                    {
                        transform:
                            "translateY(0) rotate(0deg)",
                        opacity: 1
                    },

                    {
                        transform:
                            `translateY(110vh) rotate(${Math.random() * 720}deg)`,
                        opacity: 0
                    }
                ],

                {
                    duration:
                        2500 +
                        Math.random() * 2000,

                    easing:
                        "cubic-bezier(.2,.8,.3,1)"
                }

            );


        animation.onfinish =
            function () {

                confetti.remove();

            };

    }

}