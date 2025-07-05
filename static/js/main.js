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
                adicionarTarefa()

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
        adicionarTarefa()
    }

}

// Função para adicionar tarefa
const adicionarTarefa = function (titulo, descricao = "") {

}

// Função para tirar a borda vermelha
document.getElementById('titulo').addEventListener('click', function () {
    document.getElementById('titulo').style.border = "none";
});

document.getElementById('addButton').addEventListener('click', criarTarefa);