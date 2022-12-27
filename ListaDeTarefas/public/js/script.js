// LocalStorage --------------------------------------------------------------------------------
if(!localStorage.tarefas){
    localStorage.setItem('tarefas', '[]')
}

const tarefas = JSON.parse(localStorage.tarefas)
const setLocal = ()=>{localStorage.setItem('tarefas', JSON.stringify(tarefas))}

// Captura Elementos --------------------------------------------------------------------------------
const formSalvar = document.getElementById('formSalvar')
const formEditar = document.getElementById('formEditar')
const formFiltro = document.getElementById('formFiltro')

const tarefaInput = document.getElementById('tarefaInput')

const idInput = document.getElementById('idInput')
const editarInput = document.getElementById('editarInput')

const buscarInput = document.getElementById('buscarInput')

const filtrar = document.getElementById('filtrar')

const lista = document.querySelector('.lista')

// Salvar Tarefa --------------------------------------------------------------------------------
formSalvar.addEventListener('submit', (e)=>{
    e.preventDefault()
    salvarTarefa()
    listarTarefas()
})

const salvarTarefa = ()=>{
    if(tarefaInput.value.trim().length === 0){
        tarefaInput.classList.add('erroInput')
        alert('Digite uma tarefa válida!')
    }else{
    tarefas.push({
        id: gerarId(),
        tarefa: tarefaInput.value,
        completa: false
    })
    setLocal()}
    tarefaInput.value = ''
    tarefaInput.focus()
}

const gerarId = ()=>{
    return parseInt(Math.random() * 9999)
}

tarefaInput.addEventListener('keydown', ()=>{
    tarefaInput.classList.remove('erroInput')
})

// Listar Tarefas --------------------------------------------------------------------------------
const listarTarefas = ()=>{
    lista.innerHTML = ''
    for(var indice = 0; indice < tarefas.length; indice++){
        const item = document.createElement('div')
        item.classList.add('item')

        const itemTexto = document.createElement('span')
        itemTexto.innerText = tarefas[indice].tarefa

        const acoes = document.createElement('section')
        acoes.classList.add('acoes')
        //Marcador:
        const marcador = document.createElement('button')
        marcador.classList.add('btnacoes')
        const iconeMarcador = document.createElement('img')
        iconeMarcador.setAttribute('src', 'public/img/marcador.png')
        iconeMarcador.setAttribute('data-index', `${indice}`)
        marcador.setAttribute('data-index', `${indice}`)
        marcador.addEventListener('click', (event)=>{marcarTarefa(event)})
        marcador.appendChild(iconeMarcador)

        if(tarefas[indice].completa === true){
            itemTexto.classList.add('completa')
        }

        //Editar:
        const editar = document.createElement('button')
        editar.classList.add('btnacoes')
        const iconeEditar = document.createElement('img')
        iconeEditar.setAttribute('src', 'public/img/editar.png')
        iconeEditar.setAttribute('data-index', `${indice}`)
        editar.setAttribute('data-index', `${indice}`)
        editar.addEventListener('click',(event)=>{editarTarefa(event)})
        editar.appendChild(iconeEditar)

        //Excluir:
        const excluir = document.createElement('button')
        excluir.classList.add('btnacoes')
        const iconeExcluir = document.createElement('img')
        iconeExcluir.setAttribute('src', 'public/img/excluir.png')
        iconeExcluir.setAttribute('data-index', `${indice}`)
        excluir.setAttribute('data-index', `${indice}`)
        excluir.addEventListener('click', (event)=>{excluirTarefa(event)})
        excluir.appendChild(iconeExcluir)
       

        acoes.appendChild(marcador)
        acoes.appendChild(editar)
        acoes.appendChild(excluir)

        item.appendChild(itemTexto)
        item.appendChild(acoes)

        lista.appendChild(item)

    }
}
listarTarefas()

// Marcar Tarefa --------------------------------------------------------------------------------
const marcarTarefa = (event)=>{
    const posicao = event.target.dataset.index
    
    if(tarefas[posicao].completa === false){
        tarefas[posicao].completa = true
    }else{
        tarefas[posicao].completa = false
    }
    setLocal()
    listarTarefas()
}

// Editar Tarefas --------------------------------------------------------------------------------
const editarTarefa = (event)=>{
    formEditar.classList.remove('escondeForm')
    formSalvar.classList.add('escondeForm')
    editarInput.classList.add('inputEditarGreen')
    const posicao = event.target.dataset.index

    idInput.value = tarefas[posicao].id
    editarInput.value = tarefas[posicao].tarefa

    formEditar.addEventListener('submit', (e)=>{
        e.preventDefault()
        for(var indice = 0; indice<tarefas.length; indice++){
            if(idInput.value == tarefas[indice].id){
                tarefas[indice].tarefa = editarInput.value
                setLocal()
                listarTarefas()
                formSalvar.classList.remove('escondeForm')
                formEditar.classList.add('escondeForm')
            }
        }
    })
}

// Excluir Tarefas --------------------------------------------------------------------------------
const excluirTarefa = (event)=>{
    const desejaExcluir = confirm('Deseja excluir a tarefa?')
    if(desejaExcluir === true){
    const posicao = event.target.dataset.index
    tarefas.splice(posicao, 1)
    setLocal()
    listarTarefas()}else{
        return
    }
    listaVazia()
}

// Buscar Tarefas --------------------------------------------------------------------------------
buscarInput.addEventListener('keyup', ()=>{
    const expressao = buscarInput.value.toLowerCase()

    const itens = lista.getElementsByTagName('div')

    for(let item in itens){
       if(true === isNaN(item)){
        continue;
       }

       const conteudoItem = itens[item].textContent.toLocaleLowerCase()

       if(true === conteudoItem.includes(expressao)){
            itens[item].style.display = ''
       }else{
            itens[item].style.display = 'none'
       }
    }
})

// Filtrar Tarefas --------------------------------------------------------------------------------
const filtrarTarefas = ()=>{
    switch (filtrar.value){
        case 'todas':
                listarTarefas()
                if(lista.innerHTML === ''){
                    lista.innerHTML = 'Sem tarefas...'
                }
                break;
        case 'concluidas':
                    lista.innerHTML = ''
                    for(var indice = 0; indice < tarefas.length; indice++){
                    if(tarefas[indice].completa === true){
                    const item = document.createElement('div')
                    item.classList.add('item')

                    const itemTexto = document.createElement('span')
                    itemTexto.innerText = tarefas[indice].tarefa

                    const acoes = document.createElement('section')
                    acoes.classList.add('acoes')
                    //Marcador:
                    const marcador = document.createElement('button')
                    marcador.classList.add('btnacoes')
                    const iconeMarcador = document.createElement('img')
                    iconeMarcador.setAttribute('src', 'public/img/marcador.png')
                    iconeMarcador.setAttribute('data-index', `${indice}`)
                    marcador.setAttribute('data-index', `${indice}`)
                    marcador.addEventListener('click', (event)=>{marcarTarefa(event)})
                    marcador.appendChild(iconeMarcador)

                    if(tarefas[indice].completa === true){
                        itemTexto.classList.add('completa')
                    }

                    //Editar:
                    const editar = document.createElement('button')
                    editar.classList.add('btnacoes')
                    const iconeEditar = document.createElement('img')
                    iconeEditar.setAttribute('src', 'public/img/editar.png')
                    iconeEditar.setAttribute('data-index', `${indice}`)
                    editar.setAttribute('data-index', `${indice}`)
                    editar.addEventListener('click',(event)=>{editarTarefa(event)})
                    editar.appendChild(iconeEditar)

                    //Excluir:
                    const excluir = document.createElement('button')
                    excluir.classList.add('btnacoes')
                    const iconeExcluir = document.createElement('img')
                    iconeExcluir.setAttribute('src', 'public/img/excluir.png')
                    iconeExcluir.setAttribute('data-index', `${indice}`)
                    excluir.setAttribute('data-index', `${indice}`)
                    excluir.addEventListener('click', (event)=>{excluirTarefa(event)})
                    excluir.appendChild(iconeExcluir)
                

                    acoes.appendChild(marcador)
                    acoes.appendChild(editar)
                    acoes.appendChild(excluir)

                    item.appendChild(itemTexto)
                    item.appendChild(acoes)

                    lista.appendChild(item)

                }}
                if(lista.innerHTML === ''){
                    lista.innerHTML = 'Não há tarefas concluidas.'
                }
                break;

        case 'afazer':
                    lista.innerHTML = ''
                    for(var indice = 0; indice < tarefas.length; indice++){
                    if(tarefas[indice].completa === false){
                    const item = document.createElement('div')
                    item.classList.add('item')

                    const itemTexto = document.createElement('span')
                    itemTexto.innerText = tarefas[indice].tarefa

                    const acoes = document.createElement('section')
                    acoes.classList.add('acoes')
                    //Marcador:
                    const marcador = document.createElement('button')
                    marcador.classList.add('btnacoes')
                    const iconeMarcador = document.createElement('img')
                    iconeMarcador.setAttribute('src', 'public/img/marcador.png')
                    iconeMarcador.setAttribute('data-index', `${indice}`)
                    marcador.setAttribute('data-index', `${indice}`)
                    marcador.addEventListener('click', (event)=>{marcarTarefa(event)})
                    marcador.appendChild(iconeMarcador)

                    if(tarefas[indice].completa === true){
                        itemTexto.classList.add('completa')
                    }

                    //Editar:
                    const editar = document.createElement('button')
                    editar.classList.add('btnacoes')
                    const iconeEditar = document.createElement('img')
                    iconeEditar.setAttribute('src', 'public/img/editar.png')
                    iconeEditar.setAttribute('data-index', `${indice}`)
                    editar.setAttribute('data-index', `${indice}`)
                    editar.addEventListener('click',(event)=>{editarTarefa(event)})
                    editar.appendChild(iconeEditar)

                    //Excluir:
                    const excluir = document.createElement('button')
                    excluir.classList.add('btnacoes')
                    const iconeExcluir = document.createElement('img')
                    iconeExcluir.setAttribute('src', 'public/img/excluir.png')
                    iconeExcluir.setAttribute('data-index', `${indice}`)
                    excluir.setAttribute('data-index', `${indice}`)
                    excluir.addEventListener('click', (event)=>{excluirTarefa(event)})
                    excluir.appendChild(iconeExcluir)
                

                    acoes.appendChild(marcador)
                    acoes.appendChild(editar)
                    acoes.appendChild(excluir)

                    item.appendChild(itemTexto)
                    item.appendChild(acoes)

                    lista.appendChild(item)

                }}
                if(lista.innerHTML === ''){
                    lista.innerHTML = 'Não há tarefas a fazer.'
                }
                break;
    }
}
// Sem Tarefas --------------------------------------------------------------------------------
const semTarefas = document.createElement('span')
semTarefas.innerHTML = 'Sem tarefas...'

const listaVazia = ()=>{
    if(tarefas.length === 0){
        lista.appendChild(semTarefas)
    }
}
listaVazia()