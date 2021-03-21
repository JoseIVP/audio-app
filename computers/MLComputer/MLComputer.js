import ComputerInterface from "./../ComputerInterface.js";
// TODO: Remove unused librearies
import "https://unpkg.com/ml5@latest/dist/ml5.min.js";


export default class MLComputer extends ComputerInterface{
    

    async play(){
        if(this.isPlaying)
            return;
        const audioContext = new AudioContext();
        // TODO: look for cases in which the promise returned by getUserMedia is rejected (no mic, for example)
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        this.detector = await ml5.pitchDetection('./computers/MLComputer/model', audioContext , this.stream);
    }

    stop(){
        if(this.isPlaying){
            const tracks = this.stream.getAudioTracks();
            for(const track of tracks)
                track.stop(); 
        }
    }
    
    getMaxFrequency(){
        return this.detector.getPitch();
    }
}