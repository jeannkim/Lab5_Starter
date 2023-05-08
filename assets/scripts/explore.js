// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {

    function populateVoiceList() {
        if (typeof speechSynthesis === "undefined") {
          return;
        }
      
        const voices = speechSynthesis.getVoices();
      
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
  
    // When the speak button is clicked, speak the text using the selected voice
    speakButton.addEventListener('click', () => {
      const selectedVoiceIndex = voiceSelect.value;
      const selectedVoice = speechSynthesis.getVoices()[selectedVoiceIndex];
      if (selectedVoice && textToSpeak.value !== '') {
        const utterance = new SpeechSynthesisUtterance(textToSpeak.value);
        utterance.voice = selectedVoice;
        utterance.onstart = () => {
          faceImage.src = 'assets/images/open-mouth.png';
        };
        utterance.onend = () => {
          faceImage.src = 'assets/images/smiling.png';
        };
        speechSynthesis.speak(utterance);
      }
    });
}