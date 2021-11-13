import Person from "./Person";

import React, { useState } from 'react';

function People(props) {
    const [selectedId, setSelectedId] = useState(null);
    function selectedIdOwnedByUser() {
        const person = props.list.find(p=>p.id === selectedId) || {};
        return props.userId === person.owner;
    }
    return (
        <div>
            <h1>People ({selectedId === null ? 0 : 1}/{props.list.length} selected)</h1>
            {props.list.map(a => <Person
                onRowClick={setSelectedId}
                onPersonFieldChanged={props.onPersonFieldChanged}
                selected={a.id === selectedId}
                key={a.id}
                {...a} />)}
            {selectedId && selectedIdOwnedByUser() && <button type="button" onClick={
                () => {
                    props.onDeletePerson(selectedId);
                    setSelectedId(null);
                }}>
                Delete Selected
            </button>}
            <button type="button" onClick={props.onAddPerson}>
                Add
            </button>
        </div>);
}

export default People;