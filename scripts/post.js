import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getDatabase, ref, get, set, update, query, orderByChild , serverTimestamp,limitToLast} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js"

const firebaseConfig = {
  apiKey: "AIzaSyAMrwgnWNTAfzuhL7rE4lUwzvckZ6MDQig",
  authDomain: "spottedabafg-spot.firebaseapp.com",
  databaseURL: "https://spottedabafg-spot-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "spottedabafg-spot",
  storageBucket: "spottedabafg-spot.appspot.com",
  messagingSenderId: "871228081888",
  appId: "1:871228081888:web:2f9abcd07814e62c9cb285",
  measurementId: "G-FP8ZTYG0VV"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const addMessage=async({message,timestamp})=>{
  get(ref(database,`/${message}`))
  .then(async (snapshot)=>{
    if(!snapshot.exists()){
      return await set(ref(database,`/${message}`),{message,timestamp:serverTimestamp(),like:0})
    }
  })
}
const addLike=async({message})=>{
  get(ref(database,`/${message}`))
  .then(async (snapshot)=>{
    if(snapshot.exists()){
      let data=snapshot.val();
      return await update(ref(database,`/${message}`),{like:data.like+1})
    }
  })
  // return await update(ref(database,`/${message}`),{message,timestamp:timestamp.toLocaleString(),like:0})
}

// Cattura l'elemento del form di pubblicazione
const form = document.querySelector('#publish-form');

// Cattura l'elemento del container dei post
const postContainer = document.querySelector('#post-container');

// Aggiungi un ascoltatore dell'evento di submit al form
form.addEventListener('submit', async(e) => {
  // Previene il comportamento predefinito del form
  e.preventDefault();

  // Cattura i valori dei campi di input del form
  const message = document.querySelector('#message').value.trim();

  // Se il campo di messaggio è vuoto, non fare nulla
  if (!message) {
    return;
  }

  // Crea un nuovo elemento div per il post
  const post = document.createElement('div');
  post.classList.add('post');

  // Aggiungi il messaggio del post come un elemento p
  const messageElement = document.createElement('p');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  post.appendChild(messageElement);

  // Crea un nuovo elemento div per i metadati del post
  const metaDiv = document.createElement('div');
  metaDiv.classList.add('meta');

  // Crea un nuovo elemento div per il like container
  const likeContainer = document.createElement('div');
  likeContainer.classList.add('like-container');

  // Aggiungi un pulsante per i like
  const likeButton = document.createElement('button');
  likeButton.innerHTML = `Mi piace`;
  likeButton.classList.add('like-button');
  likeContainer.appendChild(likeButton);

  // Aggiungi il contatore dei like come un elemento p, inizialmente nascosto se il numero di like è 0
  const likeCountElement = document.createElement('p');
  likeCountElement.innerText = '0';
  likeCountElement.classList.add('like-count');
  if (likeCountElement.innerText === '0') {
    likeCountElement.style.display = 'none';
  }
  likeContainer.appendChild(likeCountElement);

  // Aggiungi il like-container ai metadati del post
  metaDiv.appendChild(likeContainer);

  // Aggiungi un ascoltatore dell'evento di click ai pulsanti Like
  likeButton.addEventListener('click', (event) => {
    // Aggiorna il contatore dei like
    const currentLikes = parseInt(likeCountElement.innerText);

    // var parentDiv = event.target.closest('.post');
    // const messageTag=parentDiv.querySelector(".message")
    // const message=messageTag.innerHTML

    const newLikes = currentLikes + 1;
    likeCountElement.innerText = `${newLikes}`;

    // Mostra il contatore dei like se il numero di like è diverso da 0
    if (newLikes !== 0) {
      likeCountElement.style.display = 'block';
    }

    // Disabilita il pulsante Like
    likeButton.disabled = true;
    addLike({message});
  });

  // Aggiungi la data e l'ora di pubblicazione come un elemento p
  const timestamp = new Date();
  const timestampElement = document.createElement('p');
  timestampElement.innerText = `Spottato il ${timestamp.toLocaleString()}`;
  timestampElement.classList.add('timestamp');
  metaDiv.appendChild(timestampElement);

  // Aggiungi i metadati del post al post
  post.appendChild(metaDiv);

  // Aggiungi il post al container dei post come primo figlio
  postContainer.prepend(post);
  await addMessage({
    message,
    timestamp,
  });
  // Resettare il form
  form.reset();
});


const displayPosts = async () => {
  const postContainer = document.querySelector('#post-container');
  const messagesRef = ref(database);
  // const orderedMessagesRef = orderByChild(`${"/"}`,`timestamp`);

  const messageQuery=query(ref(database), orderByChild('timestamp'),limitToLast(1000))

  get(messageQuery).then((snapshot) => {
    let messages=[]
    snapshot.forEach((childSnapshot) => {
      messages.push(childSnapshot.val());
    });
    messages.reverse().forEach((data)=>{
      const childData = data;
      const post = document.createElement('div');
      post.classList.add('post');
      
      const messageElement = document.createElement('p');
      messageElement.innerText = childData.message;
      messageElement.classList.add('message');
      post.appendChild(messageElement);

      const metaDiv = document.createElement('div');
      metaDiv.classList.add('meta');

      const likeContainer = document.createElement('div');
      likeContainer.classList.add('like-container');

      const likeButton = document.createElement('button');
      likeButton.innerHTML = `Mi piace`;
      likeButton.classList.add('like-button');
      likeContainer.appendChild(likeButton);

      const likeCountElement = document.createElement('p');
      likeCountElement.innerText = childData.like;
      likeCountElement.classList.add('like-count');
      if (likeCountElement.innerText === '0') {
        likeCountElement.style.display = 'none';
      }
      likeContainer.appendChild(likeCountElement);

      metaDiv.appendChild(likeContainer);
      // let data=new Date(childData.timestamp)
      let date = new Date(childData.timestamp);
      const timezoneOffset = date.getTimezoneOffset();
      const localTimestamp = childData.timestamp - (timezoneOffset * 60 * 1000);
      const localDate = new Date(localTimestamp);
      date=localDate.toISOString()
      date=date.replace("T"," ").slice(0,19)

      const timestampElement = document.createElement('p');
      timestampElement.innerText = `Spottato il ${date}`;
      timestampElement.classList.add('timestamp');
      metaDiv.appendChild(timestampElement);

      post.appendChild(metaDiv);

      postContainer.appendChild(post);

      likeButton.addEventListener('click', (event) => {
        const currentLikes = parseInt(likeCountElement.innerText);
        const newLikes = currentLikes + 1;
        likeCountElement.innerText = `${newLikes}`;

        if (newLikes !== 0) {
          likeCountElement.style.display = 'block';
        }

        likeButton.disabled = true;
        addLike({ message: childData.message });
      });
    })
  });
}

displayPosts();