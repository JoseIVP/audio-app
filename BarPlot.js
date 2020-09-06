class BarPlot extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({ mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
                .bars {
                    width: 100%;
                    height: 400px;
                    background-color: rgb(82, 82, 82);
                    margin-top: 20px;
                    display: flex;
                    align-items: flex-end;
                }
                
                .bar {
                    flex-grow: 1;
                    width: 10px;
                    margin: 2px;
                    height: 30px;
                    background-color: rgb(0, 255, 242);
                }
                
                .bottom-axis {
                    height: 200px;
                    width: 100%;
                    display: flex;
                }
                
                .bar-tag {
                    width: 10px;
                    flex-grow: 1;
                    transform: translate(-60px, 0) rotate(45deg);
                }
            </style>
            <div class="bars"></div>
            <div class="bottom-axis"></div>
        `;
        this.barContainer = this.shadowRoot.querySelector(".bars");
    }

    /**
     * Initialize the initial state of the visualization, calculating
     * the number and width of the bars, and the tags below each one.
     * @param {Object} options - Options to initialize the plot.
     */
    init({
        FFT_SIZE,
        SAMPLE_RATE,
        MIN_BAR_HEIGHT,
        MAX_BAR_HEIGHT,
        MIN_FLOAT_DECIBELS,
        MAX_FLOAT_DECIBELS
    }){
        this.MIN_BAR_HEIGHT =  MIN_BAR_HEIGHT;
        this.MAX_BAR_HEIGHT = MAX_BAR_HEIGHT;
        this.MIN_FLOAT_DECIBELS = MIN_FLOAT_DECIBELS;
        this.MAX_FLOAT_DECIBELS = MAX_FLOAT_DECIBELS;
        this.frequencyBinCount = FFT_SIZE / 2;
        this.decibelRange = MAX_FLOAT_DECIBELS - MIN_FLOAT_DECIBELS;
        this.barHeightRange = MAX_BAR_HEIGHT - MIN_BAR_HEIGHT;
        const bottomAxis = this.shadowRoot.querySelector(".bottom-axis");
        // The number of frequencies obtained is always half the FFT size,
        // this has to do with the way the FFT is computed. 
        const numberOfBars = FFT_SIZE / 2;
        // Width in frequency for each bar:
        const frequencyWidth = SAMPLE_RATE / FFT_SIZE;
        // Add bars and tags for the plot:
        for(let i = 0; i < numberOfBars; i++){
            const bar = document.createElement("div");
            bar.className = "bar";
            this.barContainer.appendChild(bar);
            // Add a tag for the bar with its middle frequency
            const barTag = document.createElement("div");
            barTag.textContent = Math.round(i * frequencyWidth + frequencyWidth / 2)  + "Hz";
            barTag.className = "bar-tag";
            bottomAxis.appendChild(barTag);
        }
    }
    
    /**
     * Updates the bars of the plot according to the frequencies
     * in frArr.
     * @param {Float32Array} frArr - The array of frequencies.
     */
    update(frArr){
        const {
            MIN_FLOAT_DECIBELS,
            MAX_FLOAT_DECIBELS,
            MIN_BAR_HEIGHT,
            MAX_BAR_HEIGHT,
            decibelRange,
            barHeightRange,
            frequencyBinCount,
            barContainer
        } = this;
        // Update each bar according to its corresponding frequency.
        for(let i = 0; i < frequencyBinCount; i++){
            const fr = frArr[i];
            const barSytle = barContainer.children[i].style;
            if (fr < MIN_FLOAT_DECIBELS)
                barSytle.height = MIN_BAR_HEIGHT + "px";
            else if (fr > MAX_FLOAT_DECIBELS)
                barSytle.height = MAX_BAR_HEIGHT + "px";
            else
                barSytle.height = (MIN_BAR_HEIGHT + (fr - MIN_FLOAT_DECIBELS) / decibelRange * barHeightRange) + "px";
        }
    }
}

customElements.define("bar-plot", BarPlot);