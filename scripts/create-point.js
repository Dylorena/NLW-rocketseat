function populateufs(){
    const ufselect = document.querySelector("select[name=uf]")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json()
    ).then ( states => {
        for(state of states){
            ufselect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }     
        
    } )
}

function getCities(event){
    const cityselect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const index = event.target.selectedIndex
    stateInput.value = event.target.options[index].text

    cityselect.innerHTML = '<option value="">Selecione a Cidade</option>'
    cityselect.disabled = true

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`)
    .then(res => res.json()
    ).then ( cities => {
        for(city of cities){
            cityselect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        cityselect.disabled = false
    } )
}

populateufs();

document.querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// ////////////////////////// itens de coleta

// Retornará um array de li
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click",handleSelectedItem)
}

let selectedIems = []
const collectedItems = document.querySelector("input[name=item]")

function handleSelectedItem(event){

    const itemLi = event.target 
    const itemID = event.target.dataset.id

    /* adicionar ou remover classe com javascript
    classList.add("selected") - Adicionar uma classe), classList.remove("selected")*/
    itemLi.classList.toggle("selected") //Adiciona se não tem, remove se tem

    //retorna true ou false
    const alreadySelected = selectedIems.findIndex(item => item == itemID)
    
    

    if(alreadySelected >= 0){

        // Filtereditems será um novo array com o resultado da função filter
        const filtereditems = selectedIems.filter(item => item != itemID)

        selectedIems = filtereditems
    } else {
        selectedIems.push(itemID)
    }   

    collectedItems.value = selectedIems
}