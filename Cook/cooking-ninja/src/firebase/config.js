import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs} from 'firebase/firestore/lite';



const firebaseConfig = {
    apiKey: "AIzaSyCiDIOaTkDTgnS3lg0CDk89PiYD-fTfqoI",
    authDomain: "cooking-ninja-c36f6.firebaseapp.com",
    projectId: "cooking-ninja-c36f6",
    storageBucket: "cooking-ninja-c36f6.appspot.com",
    messagingSenderId: "820069209213",
    appId: "1:820069209213:web:6d7c45db086dadaaa40d14"
  };


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getRecipes() {
  const recipes = collection(db, 'recipes');
  const snapshot = await getDocs(recipes);
  const recipeList = snapshot.docs.map(doc => {
    return { ...doc.data(), id: doc.id }
  })

  return recipeList
}

export { getFirestore, collection, getDocs }