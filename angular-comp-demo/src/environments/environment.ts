// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
	production: true,
	empresa: "",
	isMockEnabled: false, // You have to switch this, when your real back-end is done
	authTokenKey: "xxx",
	apiGlobalSecurity:'xxx',
	apiGlobalSecurityKey:'xxx',
	softwareProductId:1,
	sideMenuModule:' ',
	headMenuModule:'',

	api: 'https://demo/web-api/api/',

	apiAgrilytics: 'xxx',
	apiAgrilytics_key:'xxx',
	apiAgrilytics_rootpathmethods:'zzz',

	urlImgCierreLote: "zzz",
	urlCharlaDiariaDocumentos: "xxx",
	urlCharlaDiariaEvidencias: "",
	emailFirestore: "",
	passFirestore: "",
	
	firebaseProjectHFPE: {
		apiKey: "",
		authDomain: "",
		databaseURL: "",
		projectId: "",
		storageBucket: "",
		messagingSenderId: "",
	},
	firebaseProjectHFEB: {
		apiKey: '',
		authDomain: '',
		projectId: '',
		storageBucket: '',
		messagingSenderId: '',
		appId: '',
		measurementId: '',
	},
	firebaseProjectHFCH: {
		apiKey: "",
		authDomain: "",
		projectId: "",
		storageBucket: "",
		messagingSenderId: "",
		appId: "",
		measurementId: ""
	},
	firebaseProjectHFMX: {
		apiKey: "",
		authDomain: "",
		projectId: "",
		storageBucket: "",
		messagingSenderId: "",
		appId: "",
		measurementId: ""
	},
};
