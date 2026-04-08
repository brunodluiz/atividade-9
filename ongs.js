document.getElementById("formAdocao").addEventListener("submit", function(e) {
e.preventDefault();

let nome = document.getElementById("nome").value;

let email = document.getElementById("email").value;

let moradia = document.getElementById("moradia").value;

let quintal = document.querySelector('input[name="quintal"]:checked');

let pet = document.querySelector('input[name="pet"]:checked');

if(nome.length < 3) return alert("Nome Inválido");

document.getElementById("resultado").innerHTML = "cadastro realizado com sucesso<br> " +"Nome:" +
nome;
let horas = document.querySelector('input[name="horas"]:checked');

let cpf = document.getElementById("cpf").value;

let cidade = document.getElementById("cidade").value;

let adc = document.getElementById("adc").value;

let telefone = document.getElementById("telefone").value;
if(telefone.length < 8) return alert("Numero Inválido");






});