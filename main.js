const F_BIN_COUNT = 128;
const MAX_BAR_HEIGHT = 400;
const MIN_BAR_HEIGTH = 30;
const MAX_FLOAT_DECIBELS = 30;
const MIN_FLOAT_DECIBELS = -100;

async function play(){
    const ctx = new window.AudioContext();
    const srcStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const srcNode = ctx.createMediaStreamSource(srcStream);
    const analyzerNode = ctx.createAnalyser();
    srcNode.connect(analyzerNode);
    analyzerNode.fftSize = F_BIN_COUNT * 2;
    const frArr = new Float32Array(F_BIN_COUNT);
    const decibelRange = MAX_FLOAT_DECIBELS - MIN_FLOAT_DECIBELS;
    const barHeightRange = MAX_BAR_HEIGHT - MIN_BAR_HEIGTH;
    const bars = document.getElementById("bars");

    function animate(){
        analyzerNode.getFloatFrequencyData(frArr);
        for(let i = 0; i < F_BIN_COUNT; i++){
            const fr = frArr[i];
            const bar = bars.children[i];
            if (fr < MIN_FLOAT_DECIBELS)
                bar.style.height = MIN_BAR_HEIGTH + "px";
            else if (fr > MAX_FLOAT_DECIBELS)
                bar.style.height = MAX_BAR_HEIGHT + "px";
            else
                bar.style.height = (MIN_BAR_HEIGTH + (fr - MIN_FLOAT_DECIBELS) / decibelRange * barHeightRange) + "px";
        }
        requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
}

function initBars() {
    for(let i = 0; i < F_BIN_COUNT; i++){
        const bar = document.createElement("div");
        bar.className = "bar";
        bars.appendChild(bar);
    }
}

initBars();
const btn = document.getElementById("start-btn");
btn.addEventListener("click", play)