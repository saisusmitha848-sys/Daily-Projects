const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convert = document.getElementById("convert");
const swap = document.getElementById("swap");
const result = document.getElementById("result");
const rateText = document.getElementById("rate");

async function convertCurrency() {
    const value = parseFloat(amount.value);

    if (!value || value <= 0) {
        result.textContent = "Please enter a valid amount";
        rateText.textContent = "";
        return;
    }

    const from = fromCurrency.value;
    const to = toCurrency.value;

    try {
        const response = await fetch(
            `https://api.frankfurter.app/latest?amount=${value}&from=${from}&to=${to}`
        );

        const data = await response.json();
        const converted = data.rates[to];

        result.textContent =
            `${value} ${from} = ${converted.toFixed(2)} ${to}`;

        const rate = converted / value;

        rateText.textContent =
            `1 ${from} = ${rate.toFixed(4)} ${to}`;

    } catch (error) {
        result.textContent = "Unable to get exchange rate";
        rateText.textContent = "Check your internet connection";
    }
}

convert.addEventListener("click", convertCurrency);

swap.addEventListener("click", () => {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;

    convertCurrency();
});