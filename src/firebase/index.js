import {firebase} from "@firebase/app";
import 'firebase/auth'
import 'firebase/firestore'

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

const usersCollection = firestore.collection('users')
const miraclesCollection = firestore.collection('miracles')
const postCollection = firestore.collectionGroup('posts')
const googleProvider = new firebase.auth.GoogleAuthProvider()
const fieldPath = firebase.firestore.FieldPath

export {
    auth,
    googleProvider,
    firestore,
    usersCollection,
    miraclesCollection,
    postCollection,
    fieldPath
}
