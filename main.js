import LinePlot from "./components/LinePlot.js";
// import BarPlot from "./components/BarPlot.js";
import BarChart from 'https://cdn.jsdelivr.net/gh/joseivp/bar-chart@1.0/BarChart.js';
import FourierComputer from "./computers/FourierComputer.js";
import MLComputer from "./computers/MLComputer/MLComputer.js";
import AnimationCicle from "./AnimationCicle.js";

customElements.define("line-plot", LinePlot);
customElements.define("bar-chart", BarChart);

const linePlot = document.querySelector("line-plot");
const barChart = document.querySelector("bar-chart");
barChart.plot({
    size: 10,
    gapFraction: 0.1,
    padding: 30,
    values: [7, 5, 2, 4, 8, 2, 1, 6, 3, 8],
    maxValue: 8,
    yLabels: [0, 2, 4, 6, 8],
    yLabelsMapping: ['a', 'b', 'c', 'd', 'e'],
    yLabelsGap: 10,
    xLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    xLabelsGap: 5,
    yLegend: 'Y Legend',
    yLegendGap: 10,
    xLegend: 'X Legend',
    xLegendGap: 5,
    title: 'Chart Title',
    titleGap: 10,
});

const fourierComputer = new FourierComputer();
const mlComputer = new MLComputer();
let selectedComputer = fourierComputer; // To compute pitch
const animation = new AnimationCicle();

animation.onUpdate = async () =>{
    barChart.update(fourierComputer.getFrequencyArray());
    linePlot.update(await selectedComputer.getMaxFrequency());
};

const playBtn = document.getElementById("play-btn");
playBtn.onclick = async () => {
    if(animation.isPlaying()){
        animation.stop();
        fourierComputer.stop();
        selectedComputer.stop();
    }else{
        await fourierComputer.play();
        await selectedComputer.play();
        animation.play();
    }
}

const computerSelect = document.getElementById("computer-select");
computerSelect.onchange = () => {
    mlComputer.stop();
    switch(computerSelect.value){
        case "Fourier":
            selectedComputer = fourierComputer;
            break;
        case "MachineLearning":
            selectedComputer = mlComputer;
    }
    if(animation.isPlaying()){
        selectedComputer.play();
    }
};
