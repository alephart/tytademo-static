import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import entTranslation from './en.json';
import estTranslation from './es.json';

const resources = {
    en:{
        translation: entTranslation,
    },
    es:{
        translation: estTranslation,
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'es',
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        },
    });
export default i18n;