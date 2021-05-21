// script cuenta electrica



let dif_Kw = (lec_ant,actual)=>{
    return actual-lec_ant;
    
}

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
function calcularya(){
    let a = addEventListener('click',(e)=>{
        e.preventDefault()
    })
}