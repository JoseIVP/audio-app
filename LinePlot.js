import "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.bundle.min.js"

/**
 * A class for a web component that represents a bar plot.
 */
export default class LinePlot extends HTMLElement{
    
    constructor(){
        super();
        Chart.defaults.global.animation.duration = 0;
        this.attachShadow({ mode: 'open'});
        this._initialRender();
        this.canvas = this.shadowRoot.querySelector("#myChart");
        this.largo_eje_x=100;
        this.datos=[]
        this.labels= []
        this.frecuencias=[16.35, 17.32, 18.35, 19.45, 20.6, 21.83, 23.12, 24.5, 25.96, 27.5, 29.14, 30.87, 32.7, 34.65, 36.71, 38.89, 41.2, 43.65, 46.25, 49.0, 51.91, 55.0, 58.27, 61.74, 65.41, 69.3, 73.42, 77.78, 82.41, 87.31, 92.5, 98.0, 103.83, 110.0, 116.54, 123.47, 130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185.0, 196.0, 207.65, 220.0, 233.08, 246.94, 261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.0, 415.3, 440.0, 466.16, 493.88, 523.25, 554.37, 587.33, 622.25, 659.25, 698.46, 739.99, 783.99, 830.61, 880.0, 932.33, 
            987.77, 1046.5, 1108.73, 1174.66, 1244.51, 1318.51, 1396.91, 1479.98, 1567.98, 1661.22, 1760.0, 1864.66, 1975.53, 2093.0, 2217.46, 2349.32, 2489.02, 2637.02, 2793.83, 2959.96, 3135.96, 3322.44, 3520.0, 3729.31, 3951.07, 4186.01, 4434.92, 4698.63, 4978.03, 5274.04, 5587.65, 5919.91, 6271.93, 6644.88, 7040.0, 7458.62, 7902.13]
        this.keymap={'16.35': 'C0', '17.32': 'C#0', '18.35': 'D0', '19.45': 'D#0', '20.6': 'E0', '21.83': 'F0', '23.12': 'F#0', '24.5': 'G0', '25.96': 'G#0', '27.5': 'A0', '29.14': 'A#0', '30.87': 'B0', '32.7': 'C1', '34.65': 'C#1', '36.71': 'D1', '38.89': 'D#1', '41.2': 'E1', '43.65': 'F1', '46.25': 'F#1', '49': 'G1', '51.91': 'G#1', '55': 'A1', '58.27': 'A#1', '61.74': 'B1', '65.41': 'C2', '69.3': 'C#2', '73.42': 'D2', '77.78': 'D#2', '82.41': 'E2', '87.31': 'F2', '92.5': 'F#2', '98': 'G2', '103.83': 'G#2', '110': 'A2', '116.54': 'A#2', '123.47': 'B2', '130.81': 'C3', '138.59': 'C#3', '146.83': 'D3', '155.56': 'D#3', '164.81': 'E3', '174.61': 'F3', '185': 'F#3', '196': 
'G3', '207.65': 'G#3', '220': 'A3', '233.08': 'A#3', '246.94': 'B3', '261.63': 'C4', '277.18': 'C#4', '293.66': 'D4', '311.13': 'D#4', '329.63': 'E4', '349.23': 'F4', '369.99': 'F#4', '392': 'G4', '415.3': 'G#4', '440': 'A4', '466.16': 'A#4', '493.88': 'B4', '523.25': 'C5', '554.37': 'C#5', '587.33': 'D5', '622.25': 'D#5', '659.25': 'E5', '698.46': 'F5', '739.99': 'F#5', '783.99': 'G5', '830.61': 'G#5', '880': 'A5', '932.33': 'A#5', '987.77': 'B5', '1046.5': 'C6', '1108.73': 'C#6', '1174.66': 'D6', '1244.51': 'D#6', '1318.51': 'E6', '1396.91': 'F6', '1479.98': 'F#6', '1567.98': 'G6', '1661.22': 'G#6', '1760': 'A6', '1864.66': 'A#6', '1975.53': 'B6', '2093': 'C7', '2217.46': 'C#7', '2349.32': 'D7', '2489.02': 'D#7', '2637.02': 'E7', '2793.83': 'F7', '2959.96': 'F#7', '3135.96': 'G7', '3322.44': 'G#7', '3520': 'A7', '3729.31': 'A#7', '3951.07': 'B7', '4186.01': 'C8', '4434.92': 'C#8', '4698.63': 'D8', '4978.03': 
'D#8', '5274.04': 'E8', '5587.65': 'F8', '5919.91': 'F#8', '6271.93': 'G8', '6644.88': 'G#8', '7040': 'A8', '7458.62': 'A#8', '7902.13': 'B8'}    
        for(let i=0;i<this.largo_eje_x;i++){
            this.labels.push("");
        }
        this.myChart = new Chart(this.canvas, {
            type: 'line',
            data: {
                labels: this.labels,
                datasets: [{
                    label: 'Nota',
                    data: this.datos,
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderColor:'rgb(66 161 242)',
                    pointRadius: 0,
                    borderWidth: 3.5,
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: 'rgb(66 161 242)',
                            fontStyle: 'bold',
                            fontSize: 16,
                            callback: (value, index, values) => {
                            return this.keymap[this.closest(value,this.frecuencias).toString()];
                            }
                        },
                        gridLines: {
                            color: 'rgba(66, 161,  242, 0.5)',
                        },
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        },
                    }],
                },
                legend: {
                    labels: {
                        fontColor: 'rgb(66 161 242)',
                        fontStyle: 'bold',
                        fontSize: 16,
                    },
                }
            }
        });
        const tiempoEnMilisegundos=100
        
            
    }

    _initialRender(){
        this.shadowRoot.innerHTML = `
        <style>
        #line_chart_container{
            width:100%;
            max-width:1000px;
            margin:30px auto;
            background-color: rgb(21 32 43);
            border-radius: 5px;
            box-shadow: 0px 0px 20px rgb(21 32 43);
            box-sizing: border-box;
            padding: 20px;
        }
        </style>
        <div id="line_chart_container">
            <canvas id="myChart" width="400" height="200"></canvas>
        </div>
        `;
    }

    /**
     * find closest element in an ascending ordered array
     * @param {number} num - An array of numbers
     * @param {Array} arr - An array of numbers
     */
    closest (num, arr) {
        var mid;
        var lo = 0;
        var hi = arr.length - 1;
        while (hi - lo > 1) {
            mid = Math.floor ((lo + hi) / 2);
            if (arr[mid] < num) {
                lo = mid;
            } else {
                hi = mid;
            }
        }
        if (num - arr[lo] <= arr[hi] - num) {
            return arr[lo];
        }
        return arr[hi];
    }

    update(num){
        this.datos.push(num);
        //this.labels.push("");
        if(this.datos.length>this.largo_eje_x){
            //this.labels.shift();
            this.datos.shift();
        } 
        this.myChart.update();
    }
}