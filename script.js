// Your script here.
// let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");
const userText = document.querySelector("#userText");
const rate = document.querySelector('[name="rate"]');
const pitch = document.querySelector('[name="pitch"]');
const selectedVoice = document.querySelector("#voices");
let setPitchValue = 1,setRateValue = 1,userSelectVoice = "";
const synth = window.speechSynthesis;

synth.addEventListener("voiceschanged", (event) => {
  const voiceList = synth.getVoices();
  for (const voice of voiceList) {
    console.log("voices ", voice);
    let option = document.createElement("option");
    let demoName = voice.name.substr(10, voice.name.length);
    let i = 0;
    let voiceName = "";
    while (i < demoName.length && demoName[i] !== " ") {
      voiceName += demoName[i];
      i++;
    }
    option.textContent = `${voiceName} (${voice.lang})`;
    option.setAttribute("data-name",voice.name);
    voicesDropdown.appendChild(option);
  }
});


selectedVoice.addEventListener("input", (event) => {
  userSelectVoice = event.target.value;
});

pitch.addEventListener("change", (event) => {
  setPitchValue = event.target.value;
});

rate.addEventListener("input", (event) => {
  setRateValue = event.target.value;
});

speakButton.addEventListener("click", (event) => {
  const msg = new SpeechSynthesisUtterance(userText.value);
  msg.rate = setRateValue;
  msg.pitch = setPitchValue;
  let vList = synth.getVoices();
  const selectedOption = document.querySelector("select").selectedOptions[0].getAttribute("data-name");
  for(const vc of vList){
    if(vc.name===selectedOption){
      msg.voice = vc; 
    }
  }
  synth.speak(msg);
});

stopButton.addEventListener("click", (event) => {
  console.log("stop button ", event.target.textContent);
  synth.pause();
});

