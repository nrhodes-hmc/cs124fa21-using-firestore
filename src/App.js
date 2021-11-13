// noinspection JSIgnoredPromiseFromCall

import './App.css';

import People from './People';
import TabList from './TabList';

import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import firebase from "firebase/compat";
import {  useCollection } from "react-firebase-hooks/firestore";
import {
    useAuthState,
    useCreateUserWithEmailAndPassword,
    useSignInWithEmailAndPassword
} from 'react-firebase-hooks/auth';

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
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

function App(props) {
    const [user, loading, error] = useAuthState(auth);

    function verifyEmail() {
        auth.currentUser.sendEmailVerification();
    }

    if (loading) {
        return <p>Checking...</p>;
    } else if (user) {
        return <div>
            {user.displayName || user.email}
            <SignedInApp {...props} user={user}/>
            <button type="button" onClick={() => auth.signOut()}>Logout</button>
            {!user.emailVerified && <button type="button" onClick={verifyEmail}>Verify email</button>}
        </div>
    } else {
        return <>
            {error && <p>Error App: {error.message}</p>}
            <TabList>
                <SignIn key="Sign In"/>
                <SignUp key="Sign Up"/>
            </TabList>
        </>
    }
}

const FAKE_EMAIL = 'neil@pobox.com';
const FAKE_PASSWORD = 'xyzzyxx';


function SignIn() {
    const [
        signInWithEmailAndPassword,
        userCredential, loading, error
    ] = useSignInWithEmailAndPassword(auth);

    if (userCredential) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading) {
        return <p>Logging in…</p>
    }
    return <div>
        {error && <p>"Error logging in: " {error.message}</p>}
        <button onClick={() =>
            signInWithEmailAndPassword(FAKE_EMAIL, FAKE_PASSWORD)}>Login with test user Email/PW
        </button>
        <button onClick={() =>
            auth.signInWithPopup(googleProvider)}>Login with Google
        </button>
    </div>
}

function SignUp() {
    const [
        createUserWithEmailAndPassword,
        userCredential, loading, error
    ] = useCreateUserWithEmailAndPassword(auth);

    if (userCredential) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading) {
        return <p>Signing up…</p>
    }
    return <div>
        {error && <p>"Error signing up: " {error.message}</p>}
        <button onClick={() =>
            createUserWithEmailAndPassword(FAKE_EMAIL, FAKE_PASSWORD)}>
            Create test user
        </button>

    </div>
}

const collectionName = "People-AuthenticationRequired"

function SignedInApp(props) {
    const query = db.collection(collectionName).where('owner', "==", props.user.uid);
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
            //owner: props.user.uid
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
                           onDeletePerson={handleDeletePerson}
                           onAddPerson={handleAddPerson}
                           onPersonFieldChanged={handlePersonFieldChanged}
        />
        }
    </div>;
}

export default App;
