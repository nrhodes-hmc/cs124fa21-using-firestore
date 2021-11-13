// noinspection JSIgnoredPromiseFromCall

import './App.css';

import People from './People';

import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import firebase from "firebase/compat";
import {  useCollection } from "react-firebase-hooks/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCcQ6XCOvMIA7pHME4bWBgy_7OVy_7XErA",
    authDomain: "cs124-fall2021.firebaseapp.com",
    projectId: "cs124-fall2021",
    storageBucket: "cs124-fall2021.appspot.com",
    messagingSenderId: "264318304667",
    appId: "1:264318304667:web:81528b78246f82b1cd613e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const collectionName = "People-NoAuthenticationNeeded"

function App(props) {
    const query = db.collection(collectionName);
    const [value, loading, error] = useCollection(query);

    function handleDeletePerson(personId) {
        db.collection(collectionName).doc(personId).delete().catch((error) => {
            console.error("Error deleting document: ", error);
        });
    }

    function handleAddPerson() {
        const newId = generateUniqueID();
        db.collection(collectionName).doc(newId).set({
            id: newId,
            name: "",
            email: "",
            phone: "",
        }).catch((error) => {
            console.error("Error writing document: ", error);
        })
    }

    function handlePersonFieldChanged (personId, field, value) {
        const person = people.find(p => p.id === personId);
        if (person) {
            person[field] = value;
        }
        const doc = db.collection(collectionName).doc(personId);
        doc.update({
            [field]: value,
        }).catch((error) => {
            console.error("Error updating document: ", error);
        })
    }

    let people = null;
    if (error) {
        return <p>error useCollection: {error.message}</p>
    }
    if (value) {
        people = value.docs.map((doc) => {
            return {...doc.data()}
        });
    }

    return <div>
        {loading && <h1>Loading</h1>}
        {people && <People list={people}
                           userId={props.user.uid}
                           onDeletePerson={handleDeletePerson}
                           onAddPerson={handleAddPerson}
                           onPersonFieldChanged={handlePersonFieldChanged}
        />
        }
    </div>;
}

export default App;
