import "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.bundle.min.js"

/**
 * A class for a web component that represents a bar plot.
 */
export default class LinePlot extends HTMLElement{
    
    constructor(){
        super();
        this.attachShadow({ mode: 'open'});
        this._initialRender();
        this.canvas = this.shadowRoot.querySelector("#myChart");
        this.largo_eje_x=500;
        this.datos=[]
        this.labels= []
        this.myChart = new Chart(this.canvas, {
            type: 'line',
            data: {
                labels: this.labels,
                datasets: [{
                    label: '# of Votes',
                    data: this.datos,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
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
        
        setInterval(() => { const num=Math.random()*22050;
                            this.datos.push(num);
                            this.labels.push("");
                            if(this.datos.length>this.largo_eje_x){
                                this.labels.shift();
                                this.datos.shift();
                            } 
                            this.myChart.update();
                            },  
                            tiempoEnMilisegundos);
            
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
}