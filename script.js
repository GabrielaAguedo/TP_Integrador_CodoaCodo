const opcion = document.querySelector("#categoria"),
      btnBorrar = document.querySelector("#btn-borrar"),
      resumen = document.querySelector(".ticket__form--resumen"),
      cantidad = document.querySelector("#cantidad"),
      ticketForm = document.querySelector('#formTicket'),
      expresiones = {
        nom: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, 
        ape: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
},
      form = document.getElementById('formTicket'),
      inputs = document.querySelectorAll('#formTicket input'),
      campos = {
        name: false,
        surname: false,
        email: false,
};
let precio = 200;




btnBorrar.addEventListener("click", () => {
    ticketForm.reset();
    resumen.innerHTML = "Total a pagar:";
    campos['nombre'] = false;
    campos['apellido'] = false;
    campos['email'] = false;
});

function totalApagar(e){
    
    let categoria = opcion.value;
    let monto = cantidad.value;
    let total = precio * monto;
    switch (categoria) {
        case "0" : resumen.innerHTML = `Total a pagar: $ ${total}`;
        break;
        case "1" : resumen.innerHTML = `Total a pagar: $ ${total - (total *(80 / 100) )}`;
        break;
        case "2" : resumen.innerHTML = `Total a pagar: ${total - (total *(50 / 100) )}`;
        break;
        case "3" : resumen.innerHTML = `Total a pagar: $ ${total - (total *(15 / 100) )}`;
    }
    e.preventDefault()
}




const validarForm = (e)=>{
    switch (e.target.name){
        case 'nombre':
                validarCampo(expresiones.nom, e.target, 'nombre');
            break;

        case 'apellido':
            validarCampo(expresiones.ape, e.target, 'apellido');
            break;

        case 'email':
            validarCampo(expresiones.correo, e.target, 'email');
            break;

    }
}

// ```````````````         

const validarCampo = (expresion, input, campo)=>{
    if (expresion.test(input.value)){
        document.getElementById(`${campo}`).classList.remove('border-danger');
        document.getElementById(`${campo}`).classList.add('border-success');
        document.querySelector(`.invalid-feedback-${campo}`).classList.remove('d-flex');
        campos[campo] = true;
    }else{
        document.getElementById(`${campo}`).classList.add('border-danger');
        document.querySelector(`.invalid-feedback-${campo}`).classList.add('d-flex');
    }
}

inputs.forEach((input)=>{
    input.addEventListener('keyup', validarForm);
    input.addEventListener('blur', validarForm);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (campos.nombre && campos.apellido && campos.email){
        totalApagar();
    }
    else{
        Swal.fire({
            title: 'Error!',
            text: 'Debes completar el formulario',
            icon: 'error',
            confirmButtonText: 'Ok!'
})
    }
});










