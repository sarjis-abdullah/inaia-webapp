import en from './lang/en/en';
import de from './lang/de/de';
import fr from './lang/fr/fr';
import gggen from './lang/en/gggen';
import gggde from './lang/de/gggde';
import gggfr from './lang/fr/gggfr';
import { appNames } from './lib/appNames';

let selectedEnglish = en;
let selectedFrench = fr;
let selectedGerman = de;
if (process.env.CURRENT_APP) {
  if (process.env.CURRENT_APP == appNames.getGreenGold) {
    selectedEnglish = gggen;
    selectedFrench = gggfr;
    selectedGerman = gggde;
  }
}
export default defineI18nConfig(() => ({
    fallbackLocale: 'en',
    legacy: false,
    locale: 'en',
    messages: {
      de: selectedGerman,
      en: selectedEnglish,
      fr: selectedFrench
    }
  }))