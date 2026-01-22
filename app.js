const baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const toCurr = document.querySelector(".to select");
const fromCurr = document.querySelector(".from select");
const dropDowns = document.querySelectorAll(".dropdown select");
const msg = document.querySelector(".msg");

const btn = document.querySelector("form button");



for(let select of dropDowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode == "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode == "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=> {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click",  (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amt input");
    let amountVal = amount.value;
    if(amountVal === "" || amountVal < 1){
        amountVal = 1;
        amount.value = "1";
    }

    const URL = `${baseURL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    
    let finalAmt = amountVal*rate;
    msg.innerText = `${amountVal}${fromCurr.value} = ${finalAmt}${toCurr.value}`;
}

window.addEventListener("load",() => {
    updateExchangeRate();
});