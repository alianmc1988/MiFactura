
let $form = document.getElementById('consumoFormElec');
let a = $form.addEventListener('submit',calculaElec);
// Entrada de datos para calcular electricidad
function calculaElec(event){
   
    event.preventDefault()
    // Entrada del Form Data
    let form = new FormData(this);
    let anterior = form.get('kwanterior');
    let actual = form.get('kwactual');
    
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
  
    // ==============Llenado de tablas dinamicamente==============
    document.getElementById('resultconsumidos').append(`
    ${dif.toString()}kw
    `);
    document.getElementById('mony').append(` 
    ${mony.toString()}`)
    
    for (let index = 0; index < arrdeslose.length; index++) {
    
    // // <li> Deslose de consumo por intervalos  
    let lideslose = document.createElement('li');
    lideslose.innerText = `${arrdeslose[index]}`
    document.getElementById('deslose').appendChild(lideslose )
    // <li> precios
    let liprecios = document.createElement('li');
    liprecios.innerText = `${precios[index]}`   
    document.getElementById('precio').appendChild(liprecios )  
    // <li> Importe
    let liImporte = document.createElement('li');
    liImporte.innerText = `${importe[index]}`   
    document.getElementById('importe').appendChild(liImporte )
        
        
    }
} 


// Axuiliar functions
// kilowats consumidos
let dif_Kw = (lec_ant,actual)=>{
    return actual-lec_ant;
    
}
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











