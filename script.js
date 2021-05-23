
let $form = document.getElementById('consumoFormElec');
let a = $form.addEventListener('submit',calculaElec);
// Entrada de datos para calcular electricidad

function calculaElec(event){
    event.preventDefault()
    // Entrada del Form Data
    let form = new FormData(this);
    let anterior = form.get('kwanterior');
    let actual = form.get('kwactual');
    
    //Prevent negatives numbers || past lecture > than actual lecture
    if (anterior<0 || actual<0) {
        return(alert('numero negativo'))
    }else if(anterior == 0 && actual == 0){
        return(alert("Debe agregar valores antes de enviar"))
    } 
    else if(actual - anterior < 0){
        return(alert('La lectura actual no puede ser menor a la anterior'))
        
    }else {
        let dif = actual-anterior;
        let arrdeslose = deslose(dif)
        let mony=0;
        let importe = [];
        let precios = [0.09,0.30,0.40,0.60,0.80,1.50,1.80,2.00,3.00,5.00]
        // ==========Calculo de precios por intervalos==================
        for (let i = 0; i < precios.length; i++) {
            let multi = arrdeslose[i] * precios[i]
            importe.push(multi);
            mony = mony + multi ;
        }
      
        //===========Llenado de los labels=======================
        // document.getElementById('resultconsumidos').append(`
        //     ${dif.toString()}kw `);
        // document.getElementById('mony').append(` 
        //     ${mony.toString()}`)
        // ==============Llenado de tablas dinamicamente==============
        let arr = arrTabla(arrdeslose,precios,importe);
        renderTabla(arr);
        
        let labelConsumo = `<label><b>Consumidos:</b>${dif.toString()}kw</label></br>`
        let labelPago = `<label><b>A Pagar:$</b>${mony.toString()}</label>`
        document.getElementById('consumoInfo').innerHTML = labelConsumo + labelPago
    }
    
}



// // Axuiliar functions
//funcion deslose de consumo por intervalos
function deslose (consumo){
    let interval = [0,100,150,200,250,300,350,500,1000,5000]
    let valores = [100,50,50,50,50,50,150,500,4000,0]
    let otro = [0,0,0,0,0,0,0,0,0,0]
    if(consumo <= interval[1]){
    otro[0] = consumo;
    return otro;
        
    }else if (consumo > interval[interval.length-1] ){
       valores[valores.length-1] = consumo - interval[interval.length-1]
       return valores;
    }else{
        for (let i = 0; i < interval.length; i++) {
            
            if(consumo>interval[i]  && consumo> interval[i+1]){
                otro[i] = valores[i];
            }else if(consumo>interval[i]  && consumo <= interval[i+1]){
                otro[i] = consumo - interval[i];
            }
            
        }
        return  otro;
    }
   
}

// Crea arreglo anidado para generar Tabla
function arrTabla (arr1,arr2,arr3){
    let arrResult=[];
    
    for (let i = 0; i < arr1.length; i++) {
        let aux = [arr1[i],arr2[i],arr3[i]]
        arrResult.push(aux)
    }
    return arrResult;
}

// Genera una tabla dinamicamente de 3 columnas (deslose,precios,resultados) a partir de un arreglo anidado de elementos
function renderTabla(arr){
   let tb = "<thead><tr> <th>Deslose</th><th>Precio</th><th>Importe</th></tr></thead><tbody>"
                
    for(let element of arr){
        tb += `<tr><td>${element[0]}</td><td>${element[1]}</td><td>${element[2]}</td></tr>`
    }
    
    tb+="</tbody>" 
    
    document.getElementById("factura").innerHTML = tb;
    
}
//<A>













