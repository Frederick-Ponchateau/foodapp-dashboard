import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  
    apiKey: "AIzaSyCyxIQNtmKGURDXMFuvIpv1Klf7rYny6Uw",
    authDomain: "food-app-35e21.firebaseapp.com",
    projectId: "food-app-35e21",
    storageBucket: "food-app-35e21.appspot.com",
    messagingSenderId: "654087375450",
    appId: "1:654087375450:web:c1e46a6dd2760f6e6ae663"
  };


class Firebase {
    constructor(){
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage =app.storage();
    }

    //Inscription
    signupUser = (email, password)=>
    this.auth.createUserWithEmailAndPassword(email, password);

    //Connexion    
    loginUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    //Deconexion
    signoutUser = () => this.auth.signOut()
    //Forget password
    passwordReset = email => this.auth.sendPasswordResetEmail(email);

    //Appel des élément dans le cloud firestore
    user = uid => this.db.doc(`users/${uid}`);
    dataCollection = collection => this.db.collection(collection);

    /********** Gestion des Menus *********/
    menus =() => this.dataCollection("menu").orderBy('position','desc');

    
    queryOneMenu =(id) => this.dataCollection("menu").doc(id);
    queryMenu =() => this.dataCollection("menu");

    /********** Gestion des Produits *********/
    queryOneProduit =(id) => this.dataCollection("produits").doc(id);
    produits = () => this.dataCollection(`produits/`).orderBy('dateAdd','desc');
    queryProduit= () => this.dataCollection("produits");

}

export default Firebase;