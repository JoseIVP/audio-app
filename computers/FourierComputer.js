import ComputerInterface from "./ComputerInterface.js";

// Fast Fourier Transform (FFT) size (Number of bins in wich the FFT collects
// frequencies, each bin represents a frequency spectrum or range)
const FFT_SIZE = 2**14;

// Number of audio samples per second gotten by the microphone (This
// is twice the maximum frequency that will be measured, beacause of the
// "Nyquist Sampling Theorem" which states that any signal can be
// represented if sampled at least twice the rate of the highest
// frequency of interest)
const SAMPLE_RATE = 44100; // This means the highest measured frequency will be around 22050 Hz


export default class FourierComputer extends ComputerInterface{

    play(){
        if(this.isPlaying)
            return;
        const ctx = new window.AudioContext({ sampleRate: SAMPLE_RATE });
        // Get microphone audio stream
        this.srcStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const srcNode = ctx.createMediaStreamSource(this.srcStream);
        this.analyzerNode = ctx.createAnalyser();
        srcNode.connect(this.analyzerNode);
        this.analyzerNode.fftSize = FFT_SIZE;
        // Array to store frequencies from the FFT
        this.frequencyArray = new Float32Array(FFT_SIZE / 2);
    }


    stop(){
        const tracks = this.srcStream.getAudioTracks();
        for(const track of tracks)
            track.stop();
    }
    
    /**
     * Returns a promise that is resolved to the frequency with the maximum
     * intensity.
     * @returns {Promise}
     * @override
     */
    getMaxFrequency(){
        this.analyzerNode.getFloatFrequencyData(this.frequencyArray);
        let max = 0;
        for(let i=0; i<this.frequencyArray.length; i++){
            if(this.frequencyArray[i]>this.frequencyArray[max])
                max = i;
        }
        return max;
    }

    getFrequencyArray(){
        const arr = new Float32Array(FFT_SIZE / 2);
        this.analyzerNode.getFloatFrequencyData(arr);
        return arr;
    }
}