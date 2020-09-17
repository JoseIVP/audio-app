

function createSVGElement(name){
    return document.createElementNS("http://www.w3.org/2000/svg", name);
}

class BarPlot extends HTMLElement{
    
    constructor(){
        super();
        this.maxHeight = 60;
        this.minHeight = 8;
        this.barCount = 14;
        this.attachShadow({ mode: 'open'});
        this._initialRender();
        this.barContainer = this.shadowRoot.querySelector(".bars");
    }

    setBars(barTags){
        const bottomAxis = this.shadowRoot.querySelector(".bottom-axis");
        bottomAxis.innerHTML = "";
        for(let i=0; i<this.barCount; i++){
            // Create a bar
            const bar = createSVGElement("rect");
            bar.setAttribute("class", "bar");
            bar.setAttribute("width", 8);
            bar.setAttribute("height", 8);
            bar.setAttribute("x", 10 * i);
            this.barContainer.appendChild(bar);
            // Add a tag for the bar
            const barTag = createSVGElement("text");
            barTag.textContent = barTags[i];
            barTag.setAttribute("class", "tag");
            barTag.setAttribute("transform", `translate(${10 * i}) rotate(45)`);
            bottomAxis.appendChild(barTag);
        }
    }
    
    update(data, maxValue, minValue){
        const {
            minHeight: minHeight,
            maxHeight: maxHeight
        } = this;
        const heightDiff = maxHeight - minHeight;
        const valueDiff = maxValue - minValue;
        for(let i=0; i<this.barCount; i++){
            const d = data[i];
            let height = null;
            if (d < minValue)
                height = minHeight;
            else if (d > maxValue)
                height = maxHeight;
            else
                height = (minHeight + (d - minValue) / valueDiff * heightDiff);
            this.barContainer.children[i].setAttribute("height", height);
        }
    }

    _initialRender(){
        this.shadowRoot.innerHTML = `
        <style>
            *{
                padding: 0;
                margin: 0;
                border: 0;
            }

            svg{
                display: block;
                margin: 2rem auto;
                width: 100vw;
                height: calc(100vw * 9 / 16);
                max-width: 1000px;
                max-height: calc(1000px * 9 / 16);
                background-color: rgb(21 32 43);
                box-sizing: border-box;
                border-radius: 5px;
                box-shadow: 0px 0px 20px rgb(21 32 43);
            }

            .bar{
                fill: rgb(21 32 43);
                stroke-width: 0.5;
                stroke: rgb(66 161 242);
                rx: 1;
                ry: 1;
            }

            .tag{
                font-size: 4px;
                font-family: Helvetica;
                font-weight: bold;
                fill: rgb(66 161 242);
            }


        </style>

        <svg
            viewBox="0 0 160 90"
        >   
            <g
                class="bars"
                transform="translate(10, 66) scale(1,-1)"
            >
            </g>
            <g
                class="bottom-axis"
                transform="translate(11, 71)"
            >
            </g>
        </svg>
        `;
    }
}

customElements.define("bar-plot", BarPlot);