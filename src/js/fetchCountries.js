export function fetchCountries(name) {
    const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
    return fetch(url)
            .then(request => {
                if (request.ok) {
                    return request.json();
                }

                throw new Error(request.status);
            });
}