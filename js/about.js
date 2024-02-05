import {DarkMode } from "./functions.js";

// Dark mode 
DarkMode();

const country = document.querySelector(".country")
const button = document.querySelector(".btn")


function createCountry(data) {
    return `<div class="country">
        <div class="left"><img src="${data.flags.svg}" alt=""></div>
        <div class="right">
            <h1>${data.name.common}</h1>
            <div class="content">
                <div class="leftContent">
                    <p>Native Name: <span>${data.name.nativeName}</span></p>
                    <p>Population: <span>${data.population.toLocaleString(('en-uz'))}</span></p>
                    <p>Region: <span>${data.region}</span></p>
                    <p>Sub Region: <span>${data.subregion}</span></p>
                    <p>Capital: <span>${data.capital[0]}</span></p>
                </div>
                <div class="rightContent">
                    <p>Top Level Domain: <span>${data.flags.svg.substring(20, data.flags.svg.search('.svg'))}</span></p>
                    <p>Currencies: <span>${data.currencies.join(", ")}</span></p>
                    <p>Languages: <span>${data.languages.join(", ")}</span></p>
                </div>
            </div>
            <div class="borderCountry">
                <p>Border Countries:</p>
                <div class="btns">
                    <span>${data.borders.map(border => border.common).join(", ")}</span>


                </div>
            </div>

        </div>
    </div>`
}

console.log(createCountry);

let elId
document.addEventListener('DOMContentLoaded', function () {
    let urlIndex = window.location.href.search('id=')
    if (urlIndex > 0) {
        elId = window.location.href.substring(urlIndex + 3)
    }

    fetch(`https://frontend-mentor-apis-6efy.onrender.com/countries/${elId}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            const CountryHtml = createCountry(data);
            country.innerHTML = CountryHtml
        })
})

// back button
button && button.addEventListener('click', function () {
    let currentUrl = window.location.href
    let pageIndex = currentUrl.search('/pages')
    const domain = currentUrl.substring(0, pageIndex)
    window.location.assign(`${domain}/index.html`)
})