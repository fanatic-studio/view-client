import localforage from 'localforage';

const localStore = localforage.createInstance({
	// localforage name
	name: 'view-design',
});

export default localStore;
