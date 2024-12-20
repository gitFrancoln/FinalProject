fetch('http://dummyjson.com/products')

//respuesta del json (encabezados y datos en bruto)
.then(response=>response.json())
//extrae solo los datos (lo necesario en este caso)
.then(data=>console.log(data));
