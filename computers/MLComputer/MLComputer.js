import ComputerInterface from "./../ComputerInterface.js";
import "https://unpkg.com/ml5@latest/dist/ml5.min.js";


export default class MLComputer extends ComputerInterface{
    
    /**
     * Starts listening and processing audio.
     * @returns {Promise} - A promise that is resolved once the computer starts
     * playing.
     * @override
     */
    async play(){
        if(this.isPlaying)
            return;
        const audioContext = new AudioContext();
        // TODO: look for cases in which the promise returned by getUserMedia is
        // rejected (no mic, for example)
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        this.detector = await ml5.pitchDetection('./computers/MLComputer/model', audioContext , this.stream);
    }

    /**
     * Stops listening and processing audio.
     * @override
     */
    stop(){
        if(this.isPlaying){
            const tracks = this.stream.getAudioTracks();
            for(const track of tracks)
                track.stop();
            this.isPlaying = false;
            this.stream = null;
            this.detector = null;
        }
    }
    
    /**
     * Returns a promise that is resolved to the frequency with the maximum
     * intensity.
     * @returns {Promise}
     * @override
     */
    async getMaxFrequency(){
        if(this.detector){
            return (await this.detector.getPitch()) ?? 0;
        }
        return 0;
    }
}