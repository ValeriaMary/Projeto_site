
class Validator{

    constructor(){
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-email-validate',
            'data-only-letters',
            'data-equal',
            
        ]
    }
    //Iniciar validações de todos os campos
    validate(form){

        //resgatas todas as validações
        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length > 0){
            this.cleanValidations(currentValidations);
        }

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
    //Verifica se o input excedeu o número de caracterer
    maxlength(input, maxValue){

        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;

        if(inputLength > maxValue){
            this.printMessage(input, errorMessage);
           // console.log(errorMessage);
        }

    }

    // Valida emails
    emailvalidate(input){
        
        // email@email.com -> email@email.com.br
        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = `Insera um email valido do tipo email@email.com`;

        if(!re.test(email)){
            this.printMessage(input, errorMessage);
        }
    }

    // Valida se o campo tem apenas letras
    onlyletter(input){

        let re = /^[A-Za-z]+$/;

        let inputValue = input.value;

        let errorMessage = `Esse campo não aceita números nem caracteres especiais `

        if(!re.test(inputValue)){
            this.printMessage(input, errorMessage);
        }
    }

    //Método para imprimir mensagens de erro na tela
    printMessage(input, msg){

        //Quantidade de erros 
        let errorsQty = input.parentNode.querySelector('.error-validation');

        if(errorsQty === null){
            let template = document.querySelector('.error-validation').cloneNode(true);

        template.textContent = msg;

        let inputParent = input.parentNode;

        template.classList.remove('template');

        inputParent.appendChild(template);
        }

    }

    //verifica se o input é requerido
    required(input){

        let inputValue = input.value;

        if(inputValue === ''){
            let errorMessage = `Esse campo é obrigatório`;

            this.printMessage(input, errorMessage);
        }
    }

    // Verifica se dois campos são iguais
    equal(input, inputName){
        
        let inputToCompare = document.getElementsByName(inputName)[0];

        let errorMessage = `Esse campo precisa ser igual ao ${inputName}`;

        if(input.value != inputToCompare.value){
            this.printMessage(input, errorMessage);
        }
    }
    
    //Limpa as validações de tela
    cleanValidations(validations){
        validations.forEach(el => el.remove());
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

