// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
    const synth = window.speechSynthesis
    const voices = speechSynthesis.getVoices()
    const voiceSelect = document.getElementById("voice-select")
    const inputText = document.getElementById("text-to-speak")
    const button = document.querySelector("button")
    const face = document.querySelector("img");

    let utterance = new SpeechSynthesisUtterance(inputText.value);
    
    utterance.addEventListener("start", () => {
        face.src = "assets/images/smiling-open.png";
    });

    utterance.addEventListener("end", () => {
        face.src = "assets/images/smiling.png";
    });

        
    populateVoiceList()
    if(
        typeof speechSynthesis !== "undefined" &&
        speechSynthesis.onvoiceschanged !== undefined
    ) {
        speechSynthesis.onvoiceschanged = populateVoiceList
    }

    // speaking on click
    button.addEventListener("click", () => {
        const selectedVoice =
        
            // set voice to chosen voice name
            voiceSelect.selectedOptions[0].getAttribute("data-name");
            
            for (let i = 0; i < voices.length; i++) {
            if (voices[i].name === selectedVoice) {
                utterance.voice = voices[i];
            }
        }
        synth.speak(utterance);
    });


}

// populating
function populateVoiceList(){
    if (typeof speechSynthesis === "undefined"){
        return;
    }

    const voices = speechSynthesis.getVoices()

    for (let i = 0; i < voices.length; i++){
        const option = document.createElement("option")
        option.textContent = `${voices[i].name} (${voices[i].lang})`

        if (voices[i].default){
            option.textContent += " - DEFAULT"
        }

        option.setAttribute("data-lang", voices[i].lang)
        option.setAttribute("data-name", voices[i].name)
        document.querySelector("select").appendChild(option)
    }
}

