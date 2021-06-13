export default class AnimationCicle{
    
    constructor(){
        this._isPlaying = false;
    }  

    onUpdate(){
        console.warn('AnimationCicle.onUpdate function not defined');
        return;
    }

    isPlaying(){
        return this._isPlaying;
    }

    play(){
        if(this.isPlaying())
            return;
        this._isPlaying = true;
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
        this._isPlaying = false;
    }
}
