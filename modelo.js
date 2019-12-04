var data = {};

data.chart = [4, 8, 15, 16, 23, 42];

data.circle = [{
    "x": 1.0, 
    "y": 1.1
}, {
    "x": 2.0, 
    "y": 2.5
}];

// carga contenido de a.json en data.a
$.ajax({
    dataType: "json",
    url: "a.json",
    async: false, 
    success: d => data.a = d
})
// carga contenido de b.json en data.b
$.ajax({
    dataType: "json",
    url: "b.json",
    async: false, 
    success: d => data.b = d
})

// hace una primera limpieza de estos datos
function clean(data) {
    return data.map(data.a = d => {      
      let o = d._source.out; // los datos de _source.out son los interesantes
      // convierte algunas fechas a fechas de JS reales
      o.currentSessionStarted = new Date(o.timestamp); 
      o.timestamp = new Date(o.timestamp); 
      return o;
    })
}

// limpia datos de entrada. Modifica `clean` para limpiarlos de otra forma
data.a = clean(data.a)
data.b = clean(data.b)