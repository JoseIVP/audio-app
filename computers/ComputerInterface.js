export default class ComputerInterface {

    constructor(){
        this.isPlaying = false;
    }

    play(){
        throw new Error("Interface method 'play' not implemented");
    }


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