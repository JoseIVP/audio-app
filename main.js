// Here we import the module of ourt web components
import "./BarPlot.js";

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
    initPlots();
    const btn = document.getElementById("start-btn");
    btn.addEventListener("click", play); 
}


/**
 * Initializes the plots.
 */
function initPlots() {
    // Here is an example
    // const barPlot = document.getElementById("bar-plot");
    // barPlot.init({
    //     fftSize: FFT_SIZE,
    //     sampleRate: SAMPLE_RATE,
    //     minBarHeight: MIN_BAR_HEIGHT,
    //     maxBarHeight: MAX_BAR_HEIGHT,
    // });
}


/**
 * Starts the gathering of sound from the microphone and
 * starts the plot animations.
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

    // Here we should get the plots from the document
    // const barPlot = document.getElementById("bar-plot");
    // const linePlot = document.getElementById("line-plot");
    
    /**
     * Animates the bars of the plot.
     */
    function animate(){
        analyzerNode.getFloatFrequencyData(frArr);
        
        // Here we should update the plots:
        // barPlot.update(frArr);
        // linePlot.update(frArr);

        // Call the function itself to calculate the next frame
        requestAnimationFrame(animate);
    }

    // Use the previously defined function to start the animation
    requestAnimationFrame(animate);
}


// Start the script
main();
