// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
    const synth = window.speechSynthesis;
    const voiceSelect = document.querySelector('#voice-select');
    const textToSpeak = document.querySelector('textarea');
    const speakButton = document.querySelector('button');
    const faceImage = document.querySelector('img');
    let voices = [];

    function populateVoiceList() {
        if (typeof speechSynthesis === "undefined") {
        return;
        }

        voices = speechSynthesis.getVoices();

        for (let i = 0; i < voices.length; i++) {
        const option = document.createElement("option");
        option.textContent = `${voices[i].name} (${voices[i].lang})`;

        if (voices[i].default) {
            option.textContent += " — DEFAULT";
        }

        option.setAttribute("data-lang", voices[i].lang);
        option.setAttribute("data-name", voices[i].name);
        document.getElementById("voice-select").appendChild(option);
        } 
    }

    populateVoiceList();
    if (
        typeof speechSynthesis !== "undefined" &&
        speechSynthesis.onvoiceschanged !== undefined
    ) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    let buttonEvent = document.querySelector("button");

    buttonEvent.addEventListener("click", (event) => {
        let utterance = new SpeechSynthesisUtterance(document.querySelector("textarea").value);

        const selectedOption =
        document.getElementById("voice-select").selectedOptions[0].getAttribute("data-name");
        for (let i = 0; i < voices.length; i++) {
        if (voices[i].name === selectedOption) {
            utterance.voice = voices[i];
        }
        }
        synth.speak(utterance);
    });

    const interval = setInterval(function() {
        if (synth.speaking) {
        document.querySelector("img").src = "assets/images/smiling-open.png";
        }
        else {
        document.querySelector("img").src = "assets/images/smiling.png";
        }
    }, 5);
}