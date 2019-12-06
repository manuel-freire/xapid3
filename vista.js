
// ejemplo de gráfico de barras

class BarChart {
    constructor(selector, data) {
        this.data = data;

        d3.select(selector).append("div")
            .html("BarChart sencillo")
            .classed("chart", true);

        // primera actualización
        this.update();

        // y un boton de actualizacion, que pongo a funcionar
        let that = this;
        d3.select(selector).append("button")
            .html("update")
            .on('click', () => that.update());
    }

    update() {
        d3.select(".chart")
            .selectAll("div")
            .data(this.data)
            .enter().append("div")
            .style("width", function (d) { return d * 10 + "px"; })
            .text(function (d) { return d; })
        d3.select(".chart")
            .selectAll("div")
            .data(this.data)
            .exit().remove();
    }
}

// permite especificar, dado algo que devuelve un array de objetos, qué usar como cajones

class BarChart2 {
    constructor(selector, dataAccessor, binAccessor, binLabelAccessor, barClickCallback) {
        this.odata = dataAccessor;
        this.binAccessor = binAccessor;
        this.binLabelAccessor = binLabelAccessor;
        this.barClickCallback = barClickCallback;
        this.id = "v" + ("" + Math.random()).substring(3, 8);

        d3.select(selector).append("div")
            .classed("chart2", true)
            .attr("id", this.id);

        // primera actualización
        this.update();

        // y un boton de actualizacion, que pongo a funcionar
        let that = this;
        d3.select(selector).append("button")
            .html("update")
            .on('click', () => that.update());
    }

    update() {
        let binProperty = this.binAccessor(); // mira a ver qué propiedad toca usar ahora
        let binCounts = {};    // # de elementos con cada valor de binProperty
        let binData = {};      // array de elementos con cada valor de binProperty
        let v = "???"
        this.odata().forEach(o => {
            v = o[binProperty] || "???";
            if (binCounts[v]) {
                binCounts[v]++;
                binData[v].push(o);
            } else {
                binCounts[v] = 1;
                binData[v] = [o];
            }
        });
        if (!this.selectedBin || !binData[this.selectedValue]) {
            // elige, por defecto, el último
            this.selectedBin = binData[v];
            this.selectedValue = v;
        }
        this.binData = binData;

        // en bins, ahora: { "pedro": 4, "lucas": 2 }
        // y tras esta transposición (ver https://stackoverflow.com/a/49629733/15472),
        // [{key: "pedro", value: 4}, {key: "lucas", value: 2}]
        this.data = Object.entries(binCounts).map(([key, value]) => ({ key, value }))
        let divs = d3.select("#" + this.id)
            .text(this.binLabelAccessor() 
                + ", agregando por '" + binProperty + "' y contando ocurrencias")
            .selectAll("div")
            .data(this.data)
            .enter().append("div")
            .classed("item", true);
        divs.append("div")
            .classed("bar", true)
            .style("width", d => d.value * 10 + "px")
        divs.append("span")
            .text(d => "" + d.key + " (" + d.value + ")")
        d3.select("#" + this.id)
            .selectAll("div.item")
            .data(this.data)
            .exit().remove();

        // manejador de seleccion de barra
        d3.select("#" + this.id).selectAll(".item")
            .on('click', o => {
                console.log("clicked on " + o);
                this.selectedBin = this.binData[o.key];
                this.selectedValue = o.key;               
                if (this.barClickCallback) this.barClickCallback();
            });
    }
}

// ejemplo de dispersión

class Scatter {
    constructor(selector, data) {
        // referencia local a los datos
        this.data = data;
        this.width = 400;
        this.height = 300;

        // ejemplo 2: creo un <svg class="circle" de 400x300 ...
        d3.select(selector).append("svg")
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
        d3.select(selector).append("button")
            .html("update")
            .on('click', () => that.update());
        // y otro para meterle más puntos
        d3.select(selector).append("button")
            .html("+10 puntos")
            .on('click', () => { that.addRandom(10); that.update() });
        // y otro para quitar la mitad de los que haya
        d3.select(selector).append("button")
            .html("-50% puntos")
            .on('click', () => {
                that.data = that.data.filter(() => Math.random() < .5);
                that.update()
            });
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
        for (let i = 0; i < n; i++) this.data.push({
            x: Math.random(),
            y: Math.random()
        });
    }
}

