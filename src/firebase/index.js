import {firebase} from "@firebase/app";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/analytics'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAG4K5g2g-bKwESmZhYUMTnklbk9xaofl0",
    authDomain: "minmiracle-ebc7d.firebaseapp.com",
    databaseURL: "https://minmiracle-ebc7d.firebaseio.com",
    projectId: "minmiracle-ebc7d",
    storageBucket: "minmiracle-ebc7d.appspot.com",
    messagingSenderId: "699335293692",
    appId: "1:699335293692:web:87e14960623d942abc7579"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const firestore = firebase.firestore()
const analytics = firebase.analytics()

const usersCollection = firestore.collection('vusers')
const miraclesCollection = firestore.collection('vmiracles')
const postCollection = firestore.collectionGroup('vposts')
const googleProvider = new firebase.auth.GoogleAuthProvider()
const fieldPath = firebase.firestore.FieldPath
const storage = firebase.storage()
const usersStorage = storage.ref('vusers/')

export {
    auth,
    googleProvider,
    firestore,
    usersCollection,
    miraclesCollection,
    postCollection,
    fieldPath,
    storage,
    usersStorage,
    analytics
}
