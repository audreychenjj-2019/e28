export { default as Cart } from "./Cart.js";

export const axios = require("axios");

export const config = {
	api: "http://my-json-server.typicode.com/audreychenjj-2019/zfa/"
};

export let store = {
	cartCount: 0
};
