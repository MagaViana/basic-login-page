let validator1 = {
  handleSubmit:(event)=>{
    event.preventDefault();
    let send = true;

    let inputs = form.querySelectorAll('input');

    validator1.clearErrors();

    for(let i=0;i<inputs.length;i++){
      let input = inputs[i];
      let check = validator1.checkInput(input);
      if(check !== true) {
        send = false;
        validator1.showError(input, check);
      }
    }

    if(send) {
      form.submit();
    }
  },
  checkInput:(input) => {
    let rules = input.getAttribute('data-rules');
    if(rules !== null) {
      rules = rules.split('|');
      for(let k in rules) {
        let rDetails = rules[k].split('=');
        switch(rDetails[0]){
          case 'required':
            if(input.value == '') {
              return 'Este campo é obrigatório.';
            }
          break;
          case 'min':
            if(input.value.length < rDetails[1]) {
              return 'Campo tem que ter pelo menos '+rDetails[1]+' caracteres';
            }
          break;
          case 'email':
            if(input.value != ''){
              const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if(!regex.test(input.value.toLowerCase())){
                return 'Email inválido';
              }
            }
          break;
        }
      }
    }
    return true;
  },
  showError:(input, error) => {
    input.style.borderColor = '#FF0000';

    let errorElement = document.createElement('div');
    errorElement.classList.add('error');
    errorElement.innerHTML = error;

    input.parentElement.insertBefore(errorElement, input.ElementSibling);
  },
  clearErrors:() => {
    let inputs = form.querySelectorAll('input')
    for(let i=0;i<inputs.length;i++) {
      inputs[i].style = '';
    }

    let errorElements = document.querySelectorAll('.error');
    for(let i=0;i<errorElements.length;i++){
      errorElements[i].remove();
    }
  }
};
let form = document.querySelector('.validator1');
form.addEventListener('submit', validator1.handleSubmit);