import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore} from "redux";
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

const initialState = {
        people: [
            {
                id: "1276",
                name: "Neil Rhodes",
                email: "rhodes@hmc.edu",
                phone: "(909) 555-1212"
            },
            {
                id: "787",
                name: "Barack Obama",
                email: "ex-prez@whitehouse.gov",
                phone: "(312) 555-1212"
            }
        ],
        selectedPersonId: null
    }
;

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_PERSON":
            return {
                ...state,
                people: [...state.people, {
                    id: generateUniqueID(),
                    name: "",
                    email: "",
                    phone: ""
                }]
            };
        case "DELETE_PERSON":
            return {
                ...state,
                people: state.people.filter(person => person.id !== action.id)
            };
        case "MODIFY_PERSON":
            return {
                ...state,
                people: state.people.map(
                    person => person.id !== action.id
                        ? person
                        : {...person, [action.field]: action.value})
            }
        case "SELECT_PERSON":
            return {
                ...state,
                selectedPersonId: action.id
            };
        default:
            return state;
    }
}

const store = createStore(rootReducer, initialState)
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
