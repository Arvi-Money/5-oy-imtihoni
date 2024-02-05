// Dark Mode Function
function DarkMode() {
    const darktheme = document.querySelector(".DMode");
    const dark = document.querySelector(".dark");
    const moonIcon = document.querySelector(".moonIcon");

    const savedMode = localStorage.getItem('DMode');

    if (savedMode) {
        document.body.classList.toggle('darkTheme', savedMode === 'dark');
        dark.textContent = savedMode === 'dark' ? 'Light Mode' : 'Dark Mode';
        moonIcon.src = savedMode === 'dark' ? "../img/sun.png" : "../img/moon.png";
    }

    darktheme.addEventListener('click', function (e) {
        e.preventDefault();

        document.body.classList.toggle("darkTheme");

        const isDarkModeActive = document.body.classList.contains('darkTheme');
        localStorage.setItem('DMode', isDarkModeActive ? 'dark' : 'light');

        dark.textContent = isDarkModeActive ? 'Light Mode' : 'Dark Mode';
        moonIcon.src = isDarkModeActive ? "../img/sun.png" : "../img/moon.png";
    });
}


document.addEventListener('DOMContentLoaded', function () {
    const country = document.querySelector('.country'); 
    const button = document.querySelector('.back-button');

    let elId = '';
    const urlIndex = window.location.href.search('id=');
    if (urlIndex > 0) {
        elId = window.location.href.substring(urlIndex + 3);
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
            country.innerHTML = CountryHtml;
        })
        .catch((error) => {
            console.error('Error fetching country data:', error);
        });

    button && button.addEventListener('click', function () {
        const currentUrl = window.location.href;
        const pageIndex = currentUrl.search('/pages');
        const domain = currentUrl.substring(0, pageIndex);
        window.location.assign(`${domain}/index.html`);
    });
});

export { DarkMode }; 


