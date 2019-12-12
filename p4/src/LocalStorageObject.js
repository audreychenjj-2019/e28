export default class LocalStorageObject {
	constructor(thingName) {
		this.key = thingName;
		let existingThing = localStorage.getItem(this.key);
		this.value = existingThing ? JSON.parse(existingThing) : [];
	}
	getValueFromStorage() {
		return this.value;
	}
	setValueToStorage() {
		localStorage.setItem(this.key, JSON.stringify(this.value));
	}
	removeFromStorage() {
		localStorage.removeItem(this.key);
	}
}
