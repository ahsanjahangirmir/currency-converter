BASE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies`

const dropdowns = document.querySelectorAll('.dropdown select');
const button  = document.querySelector('form button');
const CURR_FROM = document.querySelector('.from select');
const CURR_TO = document.querySelector('.to select');
const msg = document.querySelector('.msg')

console.log(CURR_FROM);

for (let select of dropdowns)
{    
    for (code in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerHTML = code;
        newOption.value = code;

        if (select.name === "from" && code === "USD")
        {
            newOption.selected = "selected";
        }

        else if (select.name === "to" && code === "PKR")
        {
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    })
}

const updateFlag = (element) => {
    // console.log(element); // prints the selected select tag 
    let code = element.value;
    let countryCode = countryList[code];
    let imageSource  = `https://flagsapi.com/${countryCode}/flat/64.png`
    element.parentElement.querySelector('img').src = imageSource;
}

const updateExchangeRate = async () => {
    
    let amount = document.querySelector('.amount input').value;
    
    if (amount < 0)
    {
        amount = 1;
    }

    const URL  = `${BASE_URL}/${CURR_FROM.value.toLowerCase()}.json`;

    try
    {
        const response = await fetch(URL);

        if (!response.ok)
        {
            throw new Error(`Error Occured. Status ${response.status}`);
        }

        const data = await response.json();
        
        let rate = data[CURR_FROM.value.toLowerCase()][CURR_TO.value.toLowerCase()];
        let conversion = rate * amount; 
        conversion = conversion.toFixed(2);
        // console.log(conversion);

        msg.innerText = `${amount} ${CURR_FROM.value.toUpperCase()} = ${conversion} ${CURR_TO.value.toUpperCase()}`
    }
    catch(error)
    {
        console.log('error: ', error);
    }
}

button.addEventListener('click', (event) => {
    event.preventDefault();
    updateExchangeRate();
})

window.addEventListener('load', () => {
    updateExchangeRate();
})