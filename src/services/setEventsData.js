import lockedData from './events.json';

export default {
  setDataToStorage() {
    localStorage.setItem('events', JSON.stringify(lockedData));
  },
};
