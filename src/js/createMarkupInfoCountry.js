export function createMarkupFinal(country){
    return country.map(elem => {
        return `<h2 country-title__item>
                    <img src="${elem.flags.svg}" alt="${elem.flags.alt}">
                    ${elem.name.official}
                </h2>
                <ul class="country-info__list">
                    <li class="country-info__item">
                        <span> Capital: ${elem.capital} </span>
                    </li>
                    <li class="country-info__item">
                        <span> Population: ${elem.population} </span>
                    </li>
                    ${Object.values(elem.languages)
                        .map(elem => {
                          return `<li class='country-info__item'>
                                    <span> Languages: ${elem} </span>
                          </li>`;
                    }).join('')}
                </ul>`
    }).join('')
};