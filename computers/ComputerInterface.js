export default class ComputerInterface {

    constructor(){
        this.isPlaying = false;
    }

    /**
     * Starts listening and processing audio.
     * @returns {Promise} - A promise that is resolved once the computer starts
     * playing.
     */
    play(){
        throw new Error("Interface method 'play' not implemented");
    }

    /**
     * Stops listening and processing audio.
     */
    stop(){
        throw new Error("Interface method 'stop' not implemented");
    }
    
    /**
     * Returns a promise that is resolved to the frequency with the maximum
     * intensity.
     * @returns {Promise}
     */
    getMaxFrequency(){
        throw new Error("Interface method 'getMaxFrequency' not implemented");
    }

}