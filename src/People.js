import Person from "./Person";

import {useDispatch, useSelector} from "react-redux";

function People() {
    const [selectedId, list] = useSelector(state => [state.selectedPersonId, state.people]);
    const dispatch = useDispatch();
    return (
        <div>
            <h1>People ({selectedId === null ? 0 : 1}/{list.length} selected)</h1>
            {list.map(a => <Person
                onRowClick={()=>dispatch({type: "SELECT_PERSON", id: a.id})
                }
                selected={a.id === selectedId}
                key={a.id}
                {...a} />)}
            {selectedId && <button type="button" onClick={
                () => dispatch({type: "DELETE_PERSON", id: selectedId})
            }>
                Delete Selected
            </button>}
            <button type="button" onClick={() => dispatch({type: "ADD_PERSON"})}>
                Add
            </button>
        </div>);
}

export default People;