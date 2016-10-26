import {
  get
}
from 'lodash';
import address from './en/address.json';
import user from './en/user.json';

const messages = {
  en: {
    address,
    user
  }
};

const i18n = {
  get(key) {
    return get(messages['en'], key);
  }
};

export default i18n;