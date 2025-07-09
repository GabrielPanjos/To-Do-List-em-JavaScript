class Tarefa {
    constructor(titulo, descricao) {
        this.titulo = titulo
        this.descricao = descricao
    }
}


// Variável lista de tarefas para guardar as tarefas
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
// Armazenando a lista de tarefas no local storage
localStorage.setItem("tarefas", JSON.stringify(tarefas));


// Função para a criação de tarefa
const criarTarefa = function () {

    // Caso tentar criar tarefa sem título
    if (document.getElementById('titulo').value == "") {

        // Sweetalert para erro
        Swal.fire({
            title: 'Sem título!',
            text: 'Você esqueceu de colocar um título para a tarefa.',
            icon: 'error',
            confirmButtonText: 'OK, entendi'
        })

        // Deixando borda do input vermelho
        document.getElementById('titulo').style.border = "2px solid rgb(255, 112, 112)";

    }

    // Caso tentar criar tarefa sem descrição
    else if (document.getElementById('descricao').value == "") {

        // Sweetalert para perguntar se deseja criar tarefa sem descrição
        Swal.fire({
            title: 'Criar sem descrição?',
            text: 'Você não colocou uma descrição para a tarefa. Deseja continuar mesmo assim?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, criar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {

            // Se usuário confirmar a criação da tarefa sem descrição
            if (result.isConfirmed) {

                // lógica para criar a tarefa mesmo sem descrição
                adicionarTarefa(document.getElementById('titulo').value)

                // Limpando input de colocar título e input de colocar a descrição
                document.getElementById('titulo').value = ""
                document.getElementById('descricao').value = ""

                // Sweetalert para confirmar a criação da tarefa
                Swal.fire(
                    'Criada!',
                    'A tarefa foi criada sem descrição.',
                    'success'
                );
            }
            // Se usuário cancelar a criação da tarefa sem descrição
            else if (result.dismiss === Swal.DismissReason.cancel) {
                // O usuário cancelou
            }

        });
    }

    // Caso ja tenha título e descrição
    else {

        // Adicionar tarefa
        adicionarTarefa(document.getElementById('titulo').value, document.getElementById('descricao').value)
    }

}

// Função para adicionar tarefa
const adicionarTarefa = function (titulo, descricao = "") {

    // Criando novo objeto "Tarefa"
    let tarefa = new Tarefa(titulo, descricao)

    // Adicionando tarefa na lista de tarefas
    tarefas.push(tarefa)
    // Atualizando lista de tarefas no localstorage
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    // Variaveis da tarefa salva
    const tarefaSalvaObject = JSON.parse(localStorage.getItem(titulo))
    const tarefaSalvaString = JSON.parse(localStorage.getItem(descricao))

    // Variavel para separar título e descrição
    const tituloTarefa = function () { return tarefaSalvaObject.titulo }
    const descricaoTarefa = function () { return tarefaSalvaObject.descricao }

    // Chamando função "exibirTarefa"
    exibirTarefa(tituloTarefa(), descricaoTarefa())

}

// Função para a exibição da tarefa
const exibirTarefa = function (titulo, descricao) {

    // Criando variaveis para exibir a tarefa no front-end
    const lista = document.querySelector('ul')
    const li = document.createElement('li')
    const divTarefa = document.createElement('div')
    const divTitulo = document.createElement('div')
    const checkbox = document.createElement('input')
    const spanCheckbox = document.createElement('span')
    const label = document.createElement('label')

    // Colocando tipo "checkbox" e adicionando classe no input "checkbox"
    checkbox.type = 'checkbox';
    spanCheckbox.classList.add('checkbox')

    // Adicionando classe para label e divTarefa
    label.classList.add('checkbox-wrapper')
    divTarefa.classList.add('tarefa')

    // Exibindo título da tarefa
    divTitulo.textContent = titulo

    // Organizando HTML
    lista.appendChild(li)
    li.appendChild(divTarefa)
    divTarefa.appendChild(divTitulo)
    divTarefa.appendChild(label)
    label.appendChild(checkbox)
    label.appendChild(spanCheckbox)

}

// Função para atualizar o site toda vez que ser iniciado ou recarregado
const atualizarSite = function () {

    tarefas.forEach(tarefa => {
        exibirTarefa(tarefa.titulo, tarefa.descricao)
    })

}

// Função para remover tarefa
const removerTarefa = function () {

}

// Função para tirar a borda vermelha
document.getElementById('titulo').addEventListener('click', function () {
    document.getElementById('titulo').style.border = "none";
});

document.getElementById('addButton').addEventListener('click', criarTarefa);

atualizarSite()