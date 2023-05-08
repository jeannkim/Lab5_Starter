// Wait for the DOM to load before running the script
document.addEventListener('DOMContentLoaded', () => {

  // Get references to the HTML elements
  const textToSpeak = document.getElementById('text-to-speak');
  const voiceSelect = document.getElementById('voice-select');
  const speakButton = document.querySelector('button');
  const faceImage = document.querySelector('img');

  // Populate the voice select dropdown with available voices
  function populateVoiceList() {
    const voices = speechSynthesis.getVoices();
    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
      option.value = i;
      voiceSelect.appendChild(option);
    }
  }
  // Wait for the voices to load before populating the dropdown
  speechSynthesis.onvoiceschanged = () => {
    populateVoiceList();
  };

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
});