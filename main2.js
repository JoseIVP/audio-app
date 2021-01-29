import LinePlot from "./LinePlot.js";
import BarPlot from "./BarPlot.js";
import FourierComputer from "./FourierComputer.js";
import MLComputer from "./MLComputer.js";
import AnimationCicle from "./AnimationCicle.js";

customElements.define("line-plot", LinePlot);
customElements.define("bar-plot", BarPlot);

const linePlot = document.querySelector("line-plot");
const barPlot = document.querySelector("bar-plot");

const fourierComputer = new FourierComputer();
const mlComputer = new MLComputer();
let selectedComputer = fourierComputer; // To compute pitch
const animation = new AnimationCicle();
animation.onPlay = () =>{
    fourierComputer.play();
    selectedComputer.play();
}
animation.onStop = () => {
    fourierComputer.stop();
    selectedComputer.stop();
}

animation.onUpdate = () =>{
    barPlot.update(fourierComputer.getFrequencyArray());
    linePlot.update(selectedComputer.getMaxFrequency());
};

const playBtn = document.getElementById("play-btn");
playBtn.onclick = () => {
    if(animation.isPlaying()){
        animation.stop();
    }else{
        animation.play();
    }
}

const computerSelect = document.getElementById("computer-select");
computerSelect.onchange = () => {
    mlComputer.stop();
    switch(computerSelect.value){
        case "Fourier":
            selectedComputer = fourierComputer;
        case "MachineLearnig":
            selectedComputer = mlComputer;
    }
    if(animation.isPlaying()){
        selectedComputer.play();
    }
};


class ComputerInterface {

    play(){
        throw new Error("Interface method not implemented");
    }

    stop(){
        throw new Error("Interface method not implemented");
    }
    
    getMaxFrequency(){
        throw new Error("Interface method not implemented");
    }
}