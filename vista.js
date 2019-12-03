
// ejemplo de gráfico de barras

class BarChart {
    constructor(data) {
        this.data = data;

        d3.select("body").append("div")
            .html("Hello, world!")
            .classed("chart", true);

        // primera actualización
        this.update();

        // y un boton de actualizacion, que pongo a funcionar
        let that = this;
        d3.select("body").append("button")            
            .html("update")
            .on('click', () => that.update());            
    }

    update() {
        d3.select(".chart")
            .selectAll("div")
            .data(this.data)
            .enter().append("div")
            .style("width", function(d) { return d * 10 + "px"; })
            .text(function(d) { return d; })
        d3.select(".chart")
            .selectAll("div")
            .data(this.data)
            .exit().remove();   
    }
}


// ejemplo de dispersión

class Scatter {
    constructor(data) {
        // referencia local a los datos
        this.data = data;
        this.width = 400;
        this.height = 300;

        // ejemplo 2: creo un <svg class="circle" de 400x300 ...
        d3.select("body").append("svg")
            .classed("circles", true)
            .attr("width", this.width)
            .attr("height", this.height);

        // defino eje lógico x
        this.x = d3.scaleLinear(
            [0, d3.max(this.data, p => p.x)],
            [0, this.width]);

        // defino eje lógico y
        this.y = d3.scaleLinear(
            [0, d3.max(this.data, p => p.y)],
            [0, this.height]);

        // primera actualización
        this.update();

        // y un boton de actualizacion, que pongo a funcionar
        let that = this;
        d3.select("body").append("button")            
            .html("update")
            .on('click', () => that.update());
    }

    update() {
        console.log("en", this, "actualizando circulos con ", this.data);

        this.circles = d3.select(".circles")
            .selectAll("circle")
            // asocio a cada circulo con un punto de datos...
            .data(this.data)
            // elijo cómo se pintan los puntos entrantes
            .enter()
            .append("circle")
            .attr("cx", d => this.x(d.x))
            .attr("cy", d => this.y(d.y))
            .attr("r", 5)
            .style("fill", "purple")
            
        d3.select(".circles")
            .selectAll("circle")
            // asocio a cada circulo con un punto de datos...
            .data(this.data)
            // y cómo se trata a los que se van
            .exit().remove();
    }

    addRandom(n) {
        for (let i=0; i<n; i++) this.data.push({
            x: Math.random(), 
            y: Math.random() 
        });
    }
}

