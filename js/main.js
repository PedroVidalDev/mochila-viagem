const forms = document.getElementById("novoItem");
const lista = document.getElementById("lista");

const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach( (element) => {
    criaElemento(element);
});

forms.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = event.target.elements["nome"];
    const qnt = event.target.elements["quantidade"];

    const exist = itens.find(element => element.name === name.value);

    const actualItem = {
        "name": name.value,
        "qnt": qnt.value
    }

    if(exist){
        actualItem.id = exist.id;

        actualizeItem(actualItem);

        itens[itens.findIndex(element => element.id === exist.id)] = actualItem;
    }

    else{
        actualItem.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;
        
        criaElemento(actualItem);
        
        itens.push(actualItem);
    }

    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    qnt.value = "";
});

function criaElemento(item){
    const newItem = document.createElement('li');
    newItem.classList.add("item");

    const numberItem = document.createElement('strong');
    numberItem.innerHTML = item.qnt;
    numberItem.dataset.id = item.id;

    newItem.appendChild(numberItem);
    newItem.innerHTML += item.name;

    newItem.appendChild(deleteButton(item.id));

    lista.appendChild(newItem);

}

function actualizeItem(item){
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.qnt;
}

function deleteButton(id){
    const elementButton = document.createElement("button");
    elementButton.innerText = "X";

    elementButton.addEventListener("click", function(){
        deleteElement(this.parentNode, id);
    })

    return elementButton;
}

function deleteElement(tag, id){
    tag.remove();

    itens.splice(itens.findIndex(element => element.id === id), 1);

    localStorage.setItem("itens", JSON.stringify(itens));
}