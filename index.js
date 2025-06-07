let CURR_FROM = 'USD'
BASE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${CURR_FROM}.json`

const dropdown = document.querySelector('.dropdown select');

for (let select of dropdowns){
    for (code in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerHTML = code;
        newOption.value = code;
        select.append(newOption);
    }
}
