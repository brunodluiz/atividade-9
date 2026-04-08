const cpfsCadastrados = ["123.456.789-00", "111.222.333-44", "999.888.777-66"];
 
const motivosGenericos = ["quero", "porque sim", "gosto", "quero um cachorro", "porque quero"];

document.getElementById("moradia").addEventListener("change", function () {
    const moradia = this.value;
    const campoPermite = document.getElementById("campoPermiteAnimais");
    const campoQuintal = document.getElementById("campoQuintalSeguro");
 
    if (moradia === "apartamento") {
        campoPermite.classList.remove("escondido");
    } else {
        campoPermite.classList.add("escondido");
    }
 
    if (moradia === "apartamento") {
        campoQuintal.classList.add("escondido");
    }
});
 
document.querySelectorAll('input[name="quintal"]').forEach(function (radio) {
    radio.addEventListener("change", function () {
        const moradia = document.getElementById("moradia").value;
        const campoQuintalSeguro = document.getElementById("campoQuintalSeguro");
 
        if (this.value === "sim" && moradia !== "apartamento") {
            campoQuintalSeguro.classList.remove("escondido");
        } else {
            campoQuintalSeguro.classList.add("escondido");
        }
    });
});
 
document.getElementById("horasSozinho").addEventListener("input", function () {
    const horas = parseInt(this.value);
    const campoJust = document.getElementById("campoJustificativa");
 
    if (!isNaN(horas) && horas > 8) {
        campoJust.classList.remove("escondido");
    } else {
        campoJust.classList.add("escondido");
    }
});
 
document.getElementById("formAdocao").addEventListener("submit", function (e) {
    e.preventDefault();
 
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const idade = parseInt(document.getElementById("idade").value);
    const cidade = document.getElementById("cidade").value.trim();
    const moradia = document.getElementById("moradia").value;
    const quintalRadio = document.querySelector('input[name="quintal"]:checked');
    const tevePetRadio = document.querySelector('input[name="tevePet"]:checked');
    const horasSozinho = parseInt(document.getElementById("horasSozinho").value);
    const motivo = document.getElementById("motivo").value.trim();
    const condicaoFinanceira = document.getElementById("condicaoFinanceira").value;
    const decisao = document.getElementById("decisao").value;
    const termo = document.getElementById("termo").checked;
 
    const quintalSeguroRadio = document.querySelector('input[name="quintalSeguro"]:checked');
    const permiteAnimais = document.getElementById("permiteAnimais").value;
 
 
    if (nome.length < 3) {
        return alert("nome inválido, digite pelo menos 3 caracteres.");
    }
 
    if (!email.includes("@")) {
        return alert("e-mail inválido, deve conter @.");
    }
 
    const telefoneLimpo = telefone.replace(/\D/g, "");
    if (telefoneLimpo.length < 8) {
        return alert("telefone inválido, digite pelo menos 8 dígitos.");
    }
 
    if (cpf === "") {
        return alert("CPF é obrigatório.");
    }
 
    if (isNaN(idade)) {
        return alert("idade inválida.");
    }
 
    if (cidade === "") {
        return alert("cidade é obrigatória.");
    }
 
    if (moradia === "") {
        return alert("selecione o tipo de moradia.");
    }
 
    if (!quintalRadio) {
        return alert("informe se possui quintal.");
    }
 
    if (!tevePetRadio) {
        return alert("informe se já teve pet antes.");
    }
 
    if (isNaN(horasSozinho)) {
        return alert("informe quantas horas o animal ficará sozinho.");
    }
 
    if (motivo.length < 10) {
        return alert("o motivo deve ter pelo menos 10 caracteres.");
    }
 
    if (!termo) {
        return alert("você precisa aceitar o termo de responsabilidade.");
    }


    if (idade < 18) {
        return alert("você precisa ter 18 anos ou mais para adotar.");
    }
 
    if (moradia === "apartamento" && permiteAnimais === "") {
        return alert("informe se o seu apartamento permite animais.");
    }
    if (moradia === "apartamento" && permiteAnimais === "nao") {
        return alert("infelizmente não é possível realizar a adoção em imóvel que não permite animais.");
    }
 
    if (moradia === "apartamento" && quintalRadio.value === "sim") {
        return alert(" quem mora em apartamento não possui quintal.");
    }
 
    if (moradia === "casa" && quintalRadio.value === "sim" && !quintalSeguroRadio) {
        return alert("informe se o quintal é seguro (cercado).");
    }
    if (moradia === "casa" && quintalRadio.value === "sim" && quintalSeguroRadio.value === "nao") {
        alert("a ONG recomenda que o quintal seja cercado para a segurança do animal.");
    }
 
    if (cpfsCadastrados.includes(cpf)) {
        return alert("CPF já cadastrado no sistema, não é possível realizar outro cadastro.");
    }
 
    if (horasSozinho > 8) {
        const justificativa = document.getElementById("justificativa").value.trim();
        if (justificativa.length < 10) {
            return alert("o animal ficará mais de 8h sozinho por dia, por favor, preencha a justificativa.");
        }
    }

    if (condicaoFinanceira === "nao") {
        return alert("infelizmente, o envio foi bloqueado. é necessário ter condições financeiras para garantir o bem-estar do animal.");
    }
 
    if (decisao === "hoje") {
        alert("Atenção: decisões impulsivas podem ser prejudiciais ao animal, reflita bem antes de prosseguir com a adoção.");
    }
 
    const motivoLower = motivo.toLowerCase();
    for (let i = 0; i < motivosGenericos.length; i++) {
        if (motivoLower === motivosGenericos[i] || motivoLower.startsWith(motivosGenericos[i])) {
            return alert("o motivo informado é muito genérico, por favor, descreva melhor sua motivação.");
        }
    }
 
    let avisos = "";
 
    if (tevePetRadio.value === "nao") {
        avisos += `<div class="aviso"> como você nunca teve um pet antes, a ONG pode realizar um acompanhamento após a adoção.</div>`;
    }
 
    if (horasSozinho > 8) {
        avisos += `<div class="aviso"> Atenção: se o animal ficará mais de 8h sozinho, certifique-se de que ele terá água, comida e um ambiente seguro.</div>`;
    }

    const resultado = document.getElementById("resultado");
    resultado.style.display = "block";
    resultado.innerHTML = `
        <h3> Cadastro realizado com sucesso!</h3>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${telefone}</p>
        <p><strong>CPF:</strong> ${cpf}</p>
        <p><strong>Idade:</strong> ${idade} anos</p>
        <p><strong>Cidade:</strong> ${cidade}</p>
        <p><strong>Moradia:</strong> ${moradia}</p>
        <p><strong>Possui quintal:</strong> ${quintalRadio.value}</p>
        <p><strong>Já teve pet:</strong> ${tevePetRadio.value}</p>
        <p><strong>Horas sozinho por dia:</strong> ${horasSozinho}h</p>
        <p><strong>Motivo:</strong> ${motivo}</p>
        ${avisos}
    `;

    resultado.scrollIntoView({ behavior: "smooth" });
});