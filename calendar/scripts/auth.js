console.log('auth.js loaded');


const auth = window.auth;
const createUserWithEmailAndPassword = window.createUserWithEmailAndPassword;
const signInWithEmailAndPassword = window.signInWithEmailAndPassword;
const db = window.db;
const collection = window.collection;
const addDoc = window.addDoc;
const setDoc = window.setDoc;

const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const settingsForm = document.getElementById('settings');

if(registerForm) registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = e.target;

    let instagram = e.target.instagram.value;

    if(!instagram.startsWith('@')) instagram = `@${instagram}`;

    const email = e.target.email.value;
    const password = e.target.password.value;

    showSpinner();


    createUserWithEmailAndPassword(auth, email, password)
        .then(async user => {
            console.log({user});

            const doc = window.doc(db, "users", user.user.uid);

            await setDoc(doc, {instagram, email, id: user.user.uid});
            location.replace(HOME_PAGE_URL);
        })
        .catch(error => {
            console.log({error});
        
            const code = error.code;

            if(code == "auth/email-already-in-use") alert('Email già esistente!');
            else if(code == "auth/network-request-failed") alert('Nessuna connessione ad internet!');
        })
        .finally(() => hideSpinner());

    console.log({ instagram, email, password });
});

if(loginForm) loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    showSpinner();

    signInWithEmailAndPassword(auth, email, password)
        .then(user => {
            console.log({user});
            location.replace(HOME_PAGE_URL);
        })
        .catch(error => {
            console.log({error});

            const code = error.code;

            if(code == "auth/wrong-password") alert('Password errata!');
            else if(code == "auth/user-not-found") alert('Utente non trovato!');
            else if(code == "auth/network-request-failed") alert('Nessuna connessione ad internet!');
        })
        .finally(() => hideSpinner());
});

if(settingsForm) {
    showSpinner();
    getUserInfo().then(user => {
        document.getElementById('instagram-value').value = user.instagram;
        document.getElementById('settings-form-submit').addEventListener('click', (e) => {
            e.preventDefault();
            
            const new_name = document.getElementById('instagram-value').value;

            if(new_name == user.instagram) return;
            if(new_name == '') return alert('Non puoi lasciare il campo vuoto!');
            if(!new_name.startsWith('@')) return alert('Il nome utente deve iniziare con @!');
            if(new_name.length < 3) return alert('Il nome utente è troppo corto!');
            if(new_name.length > 30) return alert('Il nome utente è troppo lungo!');

            user.instagram = new_name;

            showSpinner();
            updateUserInfo(user)
                .catch(e => {
                    console.log({e});
                    alert('Errore durante l\'aggiornamento dei dati!');
                }).finally(() => hideSpinner());

        });
    }).finally(() => hideSpinner());
} 


function logout() {
    window.signOut(window.auth);
    window.location.href = '/calendar/login.html';
}

window.onAuthStateChanged(window.auth, user => {
    if(!user && location.pathname != '/calendar/login.html' && location.pathname != '/calendar/register.html') logout();
    
    if(user) localStorage.setItem('user', JSON.stringify(user));
});

function getUserInfo() {
    return new Promise(async (resolve, reject) => {

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if(!db) db = window.db;
            console.log({user, db, doc: window.doc});
            const ref = window.doc(db, "users", user.uid || user.id);
            const data = await window.getDoc(ref);
            resolve(data.data());
        } catch (error) {
            reject(error);
        }
    });
}

function updateUserInfo(new_user) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const ref = window.doc(db, "users", user.uid);
            await window.setDoc(ref, new_user);
            localStorage.setItem('user', JSON.stringify(new_user));
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}