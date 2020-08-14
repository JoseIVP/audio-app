const FFT_SIZE = 128; // Fast Fourier Transform size
const SAMPLE_RATE = 44100;
const MAX_BAR_HEIGHT = 400;
const MIN_BAR_HEIGHT = 30;
const MAX_FLOAT_DECIBELS = 30;
const MIN_FLOAT_DECIBELS = -100;

async function play(){
    const ctx = new window.AudioContext({ sampleRate: SAMPLE_RATE });
    const srcStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const srcNode = ctx.createMediaStreamSource(srcStream);
    const analyzerNode = ctx.createAnalyser();
    srcNode.connect(analyzerNode);
    analyzerNode.fftSize = FFT_SIZE;
    const frArr = new Float32Array(FFT_SIZE / 2);
    const decibelRange = MAX_FLOAT_DECIBELS - MIN_FLOAT_DECIBELS;
    const barHeightRange = MAX_BAR_HEIGHT - MIN_BAR_HEIGHT;
    const barContainer = document.getElementById("bars");
    function animate(){
        analyzerNode.getFloatFrequencyData(frArr);
        for(let i = 0; i < analyzerNode.frequencyBinCount; i++){
            const fr = frArr[i];
            const barSytle = barContainer.children[i].style;
            if (fr < MIN_FLOAT_DECIBELS)
                barSytle.height = MIN_BAR_HEIGHT + "px";
            else if (fr > MAX_FLOAT_DECIBELS)
                barSytle.style.height = MAX_BAR_HEIGHT + "px";
            else
                barSytle.height = (MIN_BAR_HEIGHT + (fr - MIN_FLOAT_DECIBELS) / decibelRange * barHeightRange) + "px";
        }
        requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
}

function initBars() {
    const barContainer = document.getElementById("bars");
    const bottomAxis = document.getElementById("bottom-axis");
    const numberOfBars = FFT_SIZE / 2;
    // Width in frequency for each bar:
    const frequencyWidth = SAMPLE_RATE / FFT_SIZE;
    for(let i = 0; i < numberOfBars; i++){
        const bar = document.createElement("div");
        bar.className = "bar";
        barContainer.appendChild(bar);
        // Add a tag for the bar with its middle frequency
        const barTag = document.createElement("div");
        barTag.textContent = Math.round((i + 1) * frequencyWidth - frequencyWidth / 2)  + "Hz";
        barTag.className = "bar-tag";
        bottomAxis.appendChild(barTag);
    }
}

initBars();
const btn = document.getElementById("start-btn");
btn.addEventListener("click", play);