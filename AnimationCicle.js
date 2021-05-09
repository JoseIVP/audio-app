export default class AnimationCicle{
    constructor(){
        this._playing = false;
    }
    
    async onPlay(){
        console.warn('AnimationCicle.onPlay function not defined');
        return;
    }    

    onStop(){
        console.warn('AnimationCicle.onStop function not defined');
        return;
    }

    onUpdate(){
        console.warn('AnimationCicle.onUpdate function not defined');
        return;
    }

    isPlaying(){
        return this._playing;
    }

    async play(){
        if(this.isPlaying())
            return;
        this._playing = true;
        const cicle = () => {
            this.onUpdate()
            if(this.isPlaying())
                requestAnimationFrame(cicle);
        };
        requestAnimationFrame(cicle);
    }

    stop(){
        if(!this.isPlaying())
            return;
        this._playing = false;
        this.onStop();
    }
}
