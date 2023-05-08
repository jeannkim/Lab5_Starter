// explore.js
window.addEventListener("DOMContentLoaded", init);

function init() {
  const voiceSelect = document.querySelector("#voice-select");
  const speakButton = document.querySelector("button");
  const textInput = document.querySelector("textarea");
  const img = document.querySelector("img");

  let voices = [];

  speechSynthesis.onvoiceschanged = () => {
    voices = speechSynthesis.getVoices();
    voices.forEach((voice) => {
      const option = document.createElement("option");
      option.textContent = `${voice.name} (${voice.lang})`;
      option.setAttribute("data-lang", voice.lang);
      option.setAttribute("data-name", voice.name);
      voiceSelect.appendChild(option);
    });
  };

  speakButton.addEventListener('click', () => {
    let utterance = new SpeechSynthesisUtterance(textInput.value);
    
    voices.forEach(voice => {
      if (voice.name === voiceSelect.selectedOptions[0].getAttribute('data-name')) {
        utterance.voice = voice;
      }
    })
    speechSynthesis.speak(utterance);

    // change img
    img.setAttribute('src', 'assets/images/smiling.png')

    utterance.addEventListener('start', () => {
      img.setAttribute('src', 'assets/images/smiling-open.png')
    });
  })
}