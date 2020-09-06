// Fast Fourier Transform (FFT) size (Number of bins in wich the FFT collects
// frequencies, each bin represents a frequency spectrum or range)
const FFT_SIZE = 128;
// Number of audio samples per second gotten by the microphone (This
// is twice the maximum frequency that will be measured, beacause of the
// "Nyquist Sampling Theorem" which states that any signal can be
// represented if sampled at least twice the rate of the highest
// frequency of interest)
const SAMPLE_RATE = 44100; // This means the highest measured frequency will be around 22050 Hz
// Range of sizes for the bars of the plot
const MAX_BAR_HEIGHT = 400;
const MIN_BAR_HEIGHT = 30;
// Range of decibels to measure for each frequency
const MAX_FLOAT_DECIBELS = 30;
const MIN_FLOAT_DECIBELS = -100;


/**
 * Main function of the module/script. This is executed at
 * the end of the file.
 */
function main(){
    initBars();
    const btn = document.getElementById("start-btn");
    btn.addEventListener("click", play); 
}


/**
 * Initializes the bar plot visualization, adding the bars and
 * their tags to the document.
 */
function initBars() {
    const barContainer = document.getElementById("bars");
    const bottomAxis = document.getElementById("bottom-axis");
    // The number of frequencies obtained is always half the FFT size,
    // this has to do with the way the FFT is computed. 
    const numberOfBars = FFT_SIZE / 2;
    // Width in frequency for each bar:
    const frequencyWidth = SAMPLE_RATE / FFT_SIZE;
    // Add bars and tags for the plot:
    for(let i = 0; i < numberOfBars; i++){
        const bar = document.createElement("div");
        bar.className = "bar";
        barContainer.appendChild(bar);
        // Add a tag for the bar with its middle frequency
        const barTag = document.createElement("div");
        barTag.textContent = Math.round(i * frequencyWidth + frequencyWidth / 2)  + "Hz";
        barTag.className = "bar-tag";
        bottomAxis.appendChild(barTag);
    }
}


/**
 * Starts the gathering of sound from the microphone and
 * starts the bar plot animation.
 */
async function play(){
    const ctx = new window.AudioContext({ sampleRate: SAMPLE_RATE });
    // Get microphone audio stream
    const srcStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const srcNode = ctx.createMediaStreamSource(srcStream);
    const analyzerNode = ctx.createAnalyser();
    srcNode.connect(analyzerNode);
    analyzerNode.fftSize = FFT_SIZE;
    // Array to store frequencies from the FFT
    const frArr = new Float32Array(FFT_SIZE / 2);
    const decibelRange = MAX_FLOAT_DECIBELS - MIN_FLOAT_DECIBELS;
    const barHeightRange = MAX_BAR_HEIGHT - MIN_BAR_HEIGHT;
    const barContainer = document.getElementById("bars");
    
    /**
     * Animates the bars of the plot.
     */
    function animate(){
        analyzerNode.getFloatFrequencyData(frArr);
        // Change the height of each bar based on the frequencies obtained:
        for(let i = 0; i < analyzerNode.frequencyBinCount; i++){
            const fr = frArr[i];
            const barSytle = barContainer.children[i].style;
            if (fr < MIN_FLOAT_DECIBELS)
                barSytle.height = MIN_BAR_HEIGHT + "px";
            else if (fr > MAX_FLOAT_DECIBELS)
                barSytle.height = MAX_BAR_HEIGHT + "px";
            else
                barSytle.height = (MIN_BAR_HEIGHT + (fr - MIN_FLOAT_DECIBELS) / decibelRange * barHeightRange) + "px";
        }
        // Call the function itself to calculate the next frame
        requestAnimationFrame(animate);
    }

    // Use the previously defined function to start the animation
    requestAnimationFrame(animate);
}


// Start the script
main();
