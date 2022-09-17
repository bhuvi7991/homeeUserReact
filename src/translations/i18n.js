import i18next from 'i18next';
import english from './english.json';
import tamil from './tamil.json';
import telugu from './telugu.json';
import malayalam from './malayalam.json';
import kannada from './kannada.json';
import hindi from './hindi.json';
import {initReactI18next} from 'react-i18next';

i18next.use(initReactI18next).init({
  lng: 'english',
  resources: {
    english: english,
    tamil: tamil,
    malayalam: malayalam,
    kannada: kannada,
    telugu: telugu,
    hindi: hindi,
  },
  react: {
    useSuspense: false,
  },
});
export default i18next;
