// let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");
const userText = document.querySelector("#userText");
const rate = document.querySelector('[name="rate"]');
const pitch = document.querySelector('[name="pitch"]');
// const selectedVoice = document.querySelector("#voices");
const errorMessage = document.querySelector('.error-msg');
const synth = window.speechSynthesis;
let setPitchValue = 1,setRateValue = 1,userSelectVoice = "";

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
    option.value= voice.name;
    option.textContent = `${voiceName} (${voice.lang})`;
    option.setAttribute("data-name",voice.name);
    voicesDropdown.appendChild(option);
  }
});


// selectedVoice.addEventListener("input", (event) => {
//   userSelectVoice = event.target.value;
//   console.log(event.target.getAttribute("data-name"));
// });

pitch.addEventListener("change", (event) => {
  setPitchValue = event.target.value;
});

rate.addEventListener("input", (event) => {
  setRateValue = event.target.value;
});

speakButton.addEventListener("click", (event) => {
    if (!userText) {
    console.log("Text input element not found");
    return; // stop here instead of crashing
  }
   if(userText.value.trim()===""){
    let p = document.createElement('p');
    p.textContent = "Put the text before speech to text";
    errorMessage.appendChild(p);
    return;
  }
  const msg = new SpeechSynthesisUtterance(userText.value);
  msg.rate = setRateValue;
  msg.pitch = setPitchValue;
  let vList = synth.getVoices();
  console.log("voice dropdown ",voicesDropdown)
  // const selectedOption = document.querySelector("select").selectedOptions[0].getAttribute("data-name");
  const selectedOption = voicesDropdown.selectedOptions[0]?.getAttribute("data-name");
  console.log("Selected option ",selectedOption);
  if(selectedOption===null) {
   let p = document.createElement('p');
   p.textContent = "First Select the voice and start speech to text";
   errorMessage.appendChild(p);
   console.log("First Select the voice and start speech to text");
   return;
  }
  for(const vc of vList){
    if(vc.name===selectedOption){
      msg.voice = vc; 
      console.log("message voice ",msg.voice)
      console.log("voice selection",selectedOption);
    }
  }
  msg.onstart=() =>console.log("speech started");
  msg.onend = ()=>console.log("speech end");
  msg.onerror =()=>console.log("speech error");
  synth.speak(msg);
});

stopButton.addEventListener("click", (event) => {
  console.log("stop button ", event.target.textContent);
  synth.cancel();
  synth.pause();
});

