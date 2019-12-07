export { default as Cart } from './Cart';

export const axios = require('axios');

export const config = {
    api: 'https://e28-zipfoods-fall19.firebaseio.com/',
}

export let store = {
    cartCount: 0
}