class Tarefa {
    constructor(titulo, descricao) {
        this.titulo = titulo
        this.descricao = descricao
        this.concluido = false
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

    // Caso tentar criar tarefa com título que já está em uso
    else if (tarefas.some(tarefa => tarefa.titulo === document.getElementById('titulo').value)) {

        Swal.fire({
            title: 'Tarefa duplicada!',
            text: 'Você já criou uma tarefa com esse título.',
            icon: 'error',
            confirmButtonText: 'OK'
        });

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

    // Chamando função "exibirTarefa"
    exibirTarefa(titulo, descricao);

}

// Função para a exibição da tarefa
const exibirTarefa = function (titulo, descricao, concluido = false) {

    // Criando variaveis para exibir a tarefa no front-end
    const lista = document.querySelector('ul')
    const li = document.createElement('li')
    const divTarefa = document.createElement('div')
    const divTitulo = document.createElement('div')
    const checkbox = document.createElement('input')
    const spanCheckbox = document.createElement('span')
    const label = document.createElement('label')
    const divEsquerda = document.createElement('div')
    const btnRemover = document.createElement("button")

    // Colocando tipo "checkbox" e adicionando classe no input "checkbox"
    checkbox.type = 'checkbox';
    spanCheckbox.classList.add('checkbox')
    checkbox.checked = concluido;

    if (concluido) {
        divTitulo.style.textDecoration = "line-through";
    } else {
        divTitulo.style.textDecoration = "none";
    }

    checkbox.addEventListener('change', function () {

        // Descobrindo index do botão que foi clicado
        const tarefaIndex = tarefas.findIndex(t => t.titulo === titulo);

        // Caso encontrar index
        if (tarefaIndex !== -1) {

            tarefas[tarefaIndex].concluido = this.checked; // true ou false
            // Salva no localStorage
            localStorage.setItem("tarefas", JSON.stringify(tarefas));


            // Atualiza visual
            atualizarSite();
        }
    });

    // Adicionando classe para label e divTarefa
    label.classList.add('checkbox-wrapper')
    divTarefa.classList.add('tarefa')

    // Exibindo título da tarefa
    divTitulo.textContent = titulo
    divTitulo.id = "div" + titulo

    btnRemover.textContent = "Deletar"
    btnRemover.id = titulo
    btnRemover.addEventListener('click', () => removerTarefa(titulo));

    // Organizando HTML
    lista.appendChild(li)
    li.appendChild(divTarefa)
    divTarefa.appendChild(divEsquerda)
    divEsquerda.appendChild(label)
    label.appendChild(checkbox)
    label.appendChild(spanCheckbox)
    divEsquerda.appendChild(divTitulo)
    divTarefa.appendChild(btnRemover)

}

// Função para atualizar o site toda vez que ser iniciado ou recarregado
const atualizarSite = function () {

    document.querySelector('ul').innerHTML = ""

    tarefas.forEach(tarefa => {
        exibirTarefa(tarefa.titulo, tarefa.descricao, tarefa.concluido)
    })

    localStorage.setItem("tarefas", JSON.stringify(tarefas));

}

// Função para remover tarefa
const removerTarefa = function (index) {
    Swal.fire({
        title: 'Tem certeza?',
        text: "Você realmente deseja excluir esta tarefa?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#363753',
        cancelButtonColor: '#aaa',
        confirmButtonText: 'Sim, excluir',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            const tarefa = tarefas.findIndex(tarefa => tarefa.titulo == index);
            tarefas.splice(tarefa, 1);
            atualizarSite();

            Swal.fire(
                'Excluída!',
                'A tarefa foi removida com sucesso.',
                'success'
            );
        }
        // Se quiser, pode adicionar um feedback se o usuário cancelar:
        // else {
        //   Swal.fire('Cancelado', 'A tarefa não foi excluída.', 'info');
        // }
    });
}



// Função para tirar a borda vermelha
document.getElementById('titulo').addEventListener('click', function () {
    document.getElementById('titulo').style.border = "none";
});

document.getElementById('addButton').addEventListener('click', criarTarefa);


atualizarSite();
