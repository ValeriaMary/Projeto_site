
class validator{

    constructor(){
        this.validator = [

        ]
    }
    //Iniciar validações de todos os campos
    validate(form){

        //Pegar os inputs
        let inputs = form.getElementsByTagName('input');

        //Transformo uma HTMLCollection -> Array
        let inputsArray = [...inputs]

        //Loop nos inputs  e validações  mediante  ao que for enconrtrado
        inputsArray.forEach(function(input) {

        });
    }
}




let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit")

//Evento que dispara as validações

submit.addEventListener('click',function (e){
    
    e.preventDefault(); 

    console.log('Funcionou');

});

