export function createMarkup(country){
    return country.map(elem => {
        return `<li>
                    <img src="${elem.flags.png}" alt="${elem.flags.alt}" >
                    <span> ${elem.name.official} </span>
                </li>`
    }).join('')
};