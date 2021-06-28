import "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.bundle.min.js"

const keymapResponse = await fetch(new URL('keymap.json', import.meta.url));
const keymap = await keymapResponse.json();

/**
 * A class for a web component that represents a line plot.
 */
export default class LinePlot extends HTMLElement {

    constructor() {
        super();
        Chart.defaults.global.animation.duration = 0;
        this.attachShadow({ mode: 'open' });
        this.#initialRender();
        this.canvas = this.shadowRoot.querySelector("#chart");
        this.xAxisLength = 100;
        this.chartData = []
        this.labels = []
        // Get the frequencies from the keys of keymap object
        this.frequencies = Object.keys(keymap).map(Number).sort((x, y) => x - y);
        // Populate the x-axis with empty labels
        for (let i = 0; i < this.xAxisLength; i++) {
            this.labels.push("");
        }
        this.chart = new Chart(this.canvas, {
            type: 'line',
            data: {
                labels: this.labels,
                datasets: [{
                    label: 'Nota',
                    data: this.chartData,
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderColor: 'rgb(66 161 242)',
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
                            callback: value => {
                                // Search the closest key according to the frequency received
                                return keymap[this.closest(value, this.frequencies).toString()];
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
    }

    /**
    * Sets the chart's css style and container.
    */
    #initialRender() {
        this.shadowRoot.innerHTML = /*html*/`
        <style>
        #chart-container{
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
        <div id="chart-container">
            <canvas id="chart" width="400" height="200"></canvas>
        </div>
        `;
    }

    /**
     * Find the closest element to number in array.
     * @param {number} number - The number to find the closest to.
     * @param {Array} array - The ascending ordered array in which to perform the search.
     */
    closest(number, array) {
        let middleIndex;
        let lowerIndex = 0;
        let higherIndex = array.length - 1;
        while (higherIndex - lowerIndex > 1) {
            middleIndex = Math.floor((lowerIndex + higherIndex) / 2);
            if (array[middleIndex] < number) {
                lowerIndex = middleIndex;
            } else {
                higherIndex = middleIndex;
            }
        }
        if (number - array[lowerIndex] <= array[higherIndex] - number) {
            return array[lowerIndex];
        }
        return array[higherIndex];
    }

    /**
     * Updates the data and the chart.
     * @param {number} num - A number to update the chart data with.
     */
    update(num) {
        this.chartData.push(num);
        if (this.chartData.length > this.xAxisLength) {
            this.chartData.shift();
        }
        this.chart.update();
    }
}
