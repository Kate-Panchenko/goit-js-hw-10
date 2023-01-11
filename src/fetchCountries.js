export function fetchCountries(name) {
    const baseUrl = 'https://restcountries.com/v3.1/name/';
    const filter = 'fields=name,capital,population,flags,languages';

    return fetch(`${baseUrl}${name}?${filter}`).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
}