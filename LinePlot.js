import "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.bundle.min.js"

/**
 * A class for a web component that represents a bar plot.
 */
export default class LinePlot extends HTMLElement{
    
    constructor(){
        super();
        Chart.defaults.global.animation.duration = 0;
        this.attachShadow({ mode: 'open'});
        this._initialRender();
        this.canvas = this.shadowRoot.querySelector("#myChart");
        this.largo_eje_x=100;
        this.datos=[]
        this.labels= []
        for(let i=0;i<this.largo_eje_x;i++){
            this.labels.push("");
        }
        this.myChart = new Chart(this.canvas, {
            type: 'line',
            data: {
                labels: this.labels,
                datasets: [{
                    label: '# of Votes',
                    data: this.datos,
                    backgroundColor: 'rgb(21 32 43)',
                    borderColor:'rgb(66 161 242)',
                    
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        const tiempoEnMilisegundos=100
        
            
    }

    /**
     * Adds as many vertical bars as elements in barTags to the plot,
     * and puts below each bar its corresponding tag.
     * @param {Array} barTags - An array of strings as tags for the bars.
     */
    setBars(barTags){}
    _initialRender(){
        this.shadowRoot.innerHTML = `
        <style>
            #line_chart_container{
                width:100%;
                max-width:1000px;
                margin:30px auto;
            }
        </style>
        <div id="line_chart_container">
            <canvas id="myChart" width="400" height="200"></canvas>
        </div>
        `;
    }
    updateGraph(num){
        this.datos.push(num);
        //this.labels.push("");
        if(this.datos.length>this.largo_eje_x){
            //this.labels.shift();
            this.datos.shift();
        } 
        this.myChart.update();
    }
}