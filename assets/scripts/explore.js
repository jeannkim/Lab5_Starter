// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {

    // Get references to the HTML elements
    const voiceSelect = document.querySelector('#voice-select');
    const textToSpeak = document.querySelector('textarea');
    const speakButton = document.querySelector('button');
    const faceImage = document.querySelector('img');

    let voices = [];

    function populateVoiceList() {
        voices = speechSynthesis.getVoices();

        for (let i = 0; i < voices.length; i++) {
          const option = document.createElement("option");
          option.textContent = `${voices[i].name} (${voices[i].lang})`;
      
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

    // When the speak button is clicked, speak the text using the selected voice
    speakButton.addEventListener('click', (event) => {
        const utterance = new SpeechSynthesisUtterance(textToSpeak.value);

      const selectedVoiceIndex = voiceSelect.value;

      for (let i = 0; i < voices.length; i++) {
        if (voices[i].name === selectedOption) {
          utterance.voice = voices[i];
        }
      }
      
      speechSynthesis.speak(utterance);
    });

    const interval = setInterval(function() {
        if (synth.speaking) {
            faceImage.src = "assets/images/smiling-open.png";
        }
        else {
            faceImage.src = "assets/images/smiling.png";
        }
      }, 5);
}