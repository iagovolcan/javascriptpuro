const tela = document.querySelector('.tela')

const numero = (number)=>{
    tela.innerHTML += number
}

const limpar = ()=>{
    tela.innerHTML = ''
}

const resultado = ()=>{
    tela.innerHTML = eval(tela.innerHTML)
}

const apagar = ()=>{
    tela.innerHTML = tela.innerHTML.substring(0, tela.innerHTML.length - 1)
}