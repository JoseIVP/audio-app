// Here we import the modules of our web components
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

let IS_PLAYING = false; // true if playing animations and recording from mic


/**
 * Main function of the module/script. This is executed at
 * the end of the file.
 */
function main(){
    initPlots();
    const btn = document.getElementById("start-btn");
    const help = document.getElementById("help-text");
    btn.addEventListener("click", () => {
        // Toggle the animations and sound recording
        IS_PLAYING = !IS_PLAYING;
        if (IS_PLAYING){
            btn.textContent = "Detener";
            btn.className= "active";
            help.textContent = "detener";
            play();
        }else{
            btn.textContent = "Comenzar";
            btn.className = "";
            help.textContent = "iniciar";
        }
    }); 
}


/**
 * Initializes the plots.
 */
function initPlots() {
    // Initialize the bar plot:
    const barPlot = document.getElementById("bar-plot");
    barPlot.setBars(makeBarPlotTags());
}


/**
 * Makes an array of strings as tags for the bar plot.
 */
function makeBarPlotTags(){
    const tags = [];
    // Width in frequency for each bar
    const frequencyWidth = SAMPLE_RATE / FFT_SIZE;
    // We will only plot the first 14 frequencies
    // returned by the FFT in the bar plot.
    for(let i=0; i<14; i++){
        const tag = Math.round(i * frequencyWidth + frequencyWidth / 2)  + "Hz";
        tags.push(tag);
    }
    return tags;
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

    // Here we should get the plots from the document
    const barPlot = document.getElementById("bar-plot");
    // const linePlot = document.getElementById("line-plot");
    
    // Max and min values to plot in the bar plot
    const maxValue = 10;
    const minValue = -100;

    /**
     * Animates the bars of the plot.
     */
    function animate(){
        if (!IS_PLAYING){
            // Stop microphone
            const tracks = srcStream.getAudioTracks();
            for(const track of tracks)
                track.stop();
            // Reset bar plot
            barPlot.setBars(makeBarPlotTags());
            return; // Stop requesting frames
        }
        analyzerNode.getFloatFrequencyData(frArr);
        
        // Here we should update the plots:
        barPlot.update(frArr, maxValue, minValue);
        // linePlot.update(frArr);

        // Call the function itself to calculate the next frame
        requestAnimationFrame(animate);
    }

    // Use the previously defined function to start the animation
    requestAnimationFrame(animate);
}


// Start the script
main();
