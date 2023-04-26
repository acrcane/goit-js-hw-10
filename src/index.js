import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { getCollection } from './js/restCountries';
import { createMarkup } from './js/createMarkupInfoSearch';
import { createMarkupFinal } from './js/createMarkupInfoCountry';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';



const DEBOUNCE_DELAY = 300;

const collection = getCollection()

Notify.init({
    width: '300px',
    position: 'right-top',
    fontSize: '16px',
    closeButton: false,
    timeout: 3000,
    cssAnimation: true,
    cssAnimationDuration: 400,
    cssAnimationStyle: 'fade',
    failure: {
        background: '#ff5549',
        textColor: '#fff',
        childClassName: 'notiflix-notify-failure',
        notiflixIconColor: 'rgba(0,0,0,0.2)',
        fontAwesomeClassName: 'fas fa-times-circle',
        fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
        backOverlayColor: 'rgba(255,85,73,0.2)',
    },
    info: {
        background: '#26c0d3',
        textColor: '#fff',
        childClassName: 'notiflix-notify-info',
        notiflixIconColor: 'rgba(0,0,0,0.2)',
        fontAwesomeClassName: 'fas fa-info-circle',
        fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
        backOverlayColor: 'rgba(38,192,211,0.2)',
    },
});

collection.searchField.addEventListener('input', debounce(checkAndClear ,DEBOUNCE_DELAY))

function checkAndClear(elem){
    if(elem.target.value === ''){
        clearAll();
        return;
    }

    fetchCountries(elem.target.value.trim())
    .then(country => {
        if(country.length > 10){
            onNotification('info');
            return;
        }
        if (country.length === 1) {
            renderMarkupFinal(country);
            return;
        }
        createMarkup(country);
        renderMarkup(); 
    })
    .catch(() => {
        onNotification('failure');
    });
};




function renderMarkupFinal(country){
    clearMarkupFinal()
    collection.infoItem.innerHTML = createMarkupFinal(country)
};

function renderMarkup(country){
    clearMarkup()
    collection.countryList.innerHTML = createMarkup(country)
};

function clearMarkup(){
    collection.countryList.innerHTML = '';
};

function clearMarkupFinal(){
    collection.infoItem.innerHTML = '';
};

function clearAll(){
    clearMarkup();
    clearMarkupFinal()
}

function onNotification(error) {
    clearAll();

    switch (error) {
        case 'info':
            Notify.info('Too many matches found. Please enter a more specific name.');
        break;
  
        case 'failure':
            Notify.failure('Oops, there is no country with that name');
        break;
    }
}