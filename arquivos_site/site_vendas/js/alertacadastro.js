
class Validator{

    constructor(){
        this.validations = [
            'data-min-length',
        ]
    }
    //Iniciar validações de todos os campos
    validate(form){

        //Pegar os inputs
        let inputs = form.getElementsByTagName('input');

        //Transformo uma HTMLCollection -> Array
        let inputsArray = [...inputs];

        //Loop nos inputs  e validações  mediante  ao que for encontrado
        inputsArray.forEach(function(input) {

            //Loop em todas as validações existentes
            for(let i = 0; this.validations.length > i; i++){
                if(input.getAttribute(this.validations[i]) != null){
                    console.log(input.getAttribute());
                    console.log('Achou validação');

                    //data-min-length -> minlength
                    //Limpado a string para virar um metodo
                    let method = this.validations[i].replace('data-', '').replace('-', '');

                    //Valor do input
                    let value = input.getAttribute(this.validations[i]);

                    //Invocar o método
                    this[method](input, value);
                }
            }

        }, this);
    }
    //Verificar se um input  tem um número mínimo de caracteres
    minlength(input, minValue){

        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

        if(inputLength < minValue){
            this.printMessage(input, errorMessage);
           // console.log(errorMessage);
        }
        console.log(input);
        console.log(minValue);

    }
    //Método para imprimir mensagens de erro na tela
    printMessage(input, msg){

        let template = document.querySelector('.error-validation').cloneNode(true);

        template.textContent = msg;

        let inputParent = input.parentNode;

        template.classList.remove('template');

        inputParent.appendChild(template);

    }
}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

//Evento que dispara as validações

submit.addEventListener('click', function(e) {
    
    e.preventDefault(); 

    validator.validate(form);

//console.log('Funcionou');

});

