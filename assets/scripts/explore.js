// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
    const synth = window.speechSynthesis
    const voices = speechSynthesis.getVoices()
    const inputText = document.getElementById("text-to-speak")
    const button = document.querySelector("button")

    populateVoiceList()
    if(
        typeof speechSynthesis !== "undefined" &&
        speechSynthesis.onvoiceschanged !== undefined
    ) {
        speechSynthesis.onvoiceschanged = populateVoiceList
    }

    // speaking on click
    button.addEventListener("click", () => {
        
        let utterance = new SpeechSynthesisUtterance(inputText.value);

        const selectedVoice =
        
            // set voice to chosen voice name
            document.getElementById("voice-select").selectedOptions[0].getAttribute("data-name");
            
            for (let i = 0; i < voices.length; i++) {
                if (voices[i].name === selectedVoice) {
                    utterance.voice = voices[i];
                }
            }
        synth.speak(utterance);
    });

    setInterval(function() {
        if (synth.speaking) {
            document.querySelector("img").src = "assets/images/smiling-open.png";
        }
        else {
            document.querySelector("img").src = "assets/images/smiling.png";
        }
    }, 5);
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

