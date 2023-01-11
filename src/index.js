import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';



const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchInput.addEventListener('input', debounce(onCountrySearch, DEBOUNCE_DELAY));

function onCountrySearch() {
    const countryName = searchInput.value.trim();
    if (!countryName) {
        countryInfo.innerHTML = '';
        countryList.innerHTML = '';
        return;
    }

    fetchCountries(countryName)
        .then(countries => {
            if (countries.length > 10) {
                Notify.info('Too many matches found. Please enter a more specific name.');
                countryInfo.innerHTML = '';
                countryList.innerHTML = '';
                return;
            }
            if (countries.length >= 2) {
                const countryListMarkup = countries.map(country => createMarkupCountryList(country));
                countryList.innerHTML = countryListMarkup.join("");
                countryInfo.innerHTML = '';
            }
            if (countries.length === 1) {
                const countryInfoMarkup = countries.map(country => createMarkupCountryInfo(country));
                countryInfo.innerHTML = countryInfoMarkup.join("");
                countryList.innerHTML = '';
            }
        })
        .catch(error => {
            Notify.failure('Oops, there is no country with that name');
            countryInfo.innerHTML = '';
            countryList.innerHTML = '';
            return error;
        });
}

function createMarkupCountryList({ flags, country }) {
    return `<li class='list-item'>
  <img class='img-item' src='${flags.svg}' alt='${country.official}' width='30' />
  <span>${country.official}</span>
</li>`;  
}

function createMarkupCountryInfo({ flags, name, capital, population, languages }) {
    return `<div class="country-info__box">
        <img class="country-info__img" src="${flags.svg}" alt="${name.official}" width='30'>
        <h2 class="country-info__name">${name.official}</h2>
        <p class="country-info__desc">
          <span>Capital: ${capital}</span>
        </p>
        <p class="country-info__desc">
          <span>Population: ${population}</span>
        </p>
        <p class="country-info__desc">
          <span>Languages: ${languages}</span>
        </p>
      </div>`
}