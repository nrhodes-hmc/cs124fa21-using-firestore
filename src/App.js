import './App.css';

import People from './People';

import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import firebase from "firebase/compat";
import {useCollection} from "react-firebase-hooks/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCcQ6XCOvMIA7pHME4bWBgy_7OVy_7XErA",
    authDomain: "cs124-fall2021.firebaseapp.com",
    projectId: "cs124-fall2021",
    storageBucket: "cs124-fall2021.appspot.com",
    messagingSenderId: "264318304667",
    appId: "1:264318304667:web:4be8d27a02811b1ccd613e"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const collectionName = "People-XXX"
function App() {
    const query = db.collection(collectionName);
    const [value, loading, error] = useCollection(query);

    let people = null;
    if (value) {
        people = value.docs.map((doc) => {
             return {...doc.data()}});
    }

    function handleDeletePerson(personId) {
        db.collection(collectionName).doc(personId).delete();
    }

    function handleAddPerson() {
        const newId = generateUniqueID();
        db.collection(collectionName).doc(newId).set({
            id: newId,
            title: "",
        })
    }

    function handlePersonFieldChanged(personId, field, value) {
        const doc = db.collection(collectionName).doc(personId);
        doc.update({
            [field]: value,
        })
    }

    return <div>
        {loading && <h1>Loading</h1>}
        {people && <People list={people}
                          onDeletePerson={handleDeletePerson}
                          onAddPerson={handleAddPerson}
                          onPersonFieldChanged={handlePersonFieldChanged}
        />
        }
    </div>;
}

export default App;
