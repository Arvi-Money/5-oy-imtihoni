import { DarkMode } from "./functions.js";

const countries = document.querySelector(".countries");
const searchInput = document.querySelector("#search");
const searchIcon = document.querySelector(".searchImg");
const select = document.querySelector("#select");

window.addEventListener("load", function () {
    const loader = document.querySelector(".loader");
    loader.className += " hidden";
});

DarkMode();

function createCountry(country) {
    return `<div class="country"><img src="${country.flags.svg}" alt="">
                <div class="text">
                    <h3 data-id="${country.name.slug}">${country.name.common}</h3>
                    <p>Population: <span>${country.population.toLocaleString(('en-uz'))}</span></p>
                    <p class="regionName">Region: <span>${country.continents[0]}</span></p>
                    <p>Capital: <span>${country.capital[0]}</span></p>
                </div>
            </div>`;
}

document.addEventListener('DOMContentLoaded', function () {
    fetch('https://frontend-mentor-apis-6efy.onrender.com/countries')
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            data.data.forEach((value) => {
                let countryHtml = createCountry(value);
                countries.innerHTML += countryHtml;

                const countryElement = document.querySelector('.country');
                countryElement.addEventListener('click', function () {
                    const id = this.querySelector('h3').getAttribute('data-id');
                    if (id) {
                        const domain = window.location.href.substring(0, window.location.href.search('index'));
                        window.location.assign(`${domain}pages/detail.html?id=${id}`);
                    }
                });
            });
        })
        .catch((err) => {
            console.error('Fetch error:', err);
        });

    searchIcon && searchIcon.addEventListener('click', function (e) {
        e.preventDefault();
        const countryName = searchInput.value.toLowerCase().trim().split(/\s+/).join("-");
        fetch(`https://frontend-mentor-apis-6efy.onrender.com/countries/${countryName}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                if (data) {
                    const searchedCountry = createCountry(data);
                    countries.innerHTML = searchedCountry;
                    const countryElement = document.querySelector('.country');
                    countryElement.addEventListener('click', function () {
                        const id = this.querySelector('h3').getAttribute('data-id');
                        if (id) {
                            const domain = window.location.href.substring(0, window.location.href.search('index'));
                            window.location.assign(`${domain}pages/about.html?id=${id}`);
                        }
                    });
                } else {
                    alert('No results found');
                }
            })
            .catch((err) => {
                console.error('Fetch error:', err);
            });
    });

    select.addEventListener('change', function () {
        const continentName = this.options[this.selectedIndex].text;
        if (continentName === "Filter by Region") {
            alert("Choose type of continent");
        } else {
            fetch(`https://frontend-mentor-apis-6efy.onrender.com/countries?region=${continentName}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! Status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => {
                    data.data.forEach((country) => {
                        console.log(country);
                      
                    });
                })
                .catch((err) => {
                    console.error('Fetch error:', err);
                });
        }
    });
});
