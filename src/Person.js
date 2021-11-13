import './Person.css';

import PersonField from './PersonField.js'
function Person(props) {
    const classes = ["person "];
    if (props.selected) {
        classes.push("selected");
    }

    return <div className={classes.join(" ")}
                key={props.id}
                id={props.id}
                onClick={(e) => {
                    props.onRowClick(e.currentTarget.id);
                }}
        >
        <PersonField key={"name" + props.id} field="name" {...props}/>
        <PersonField key={"email" + props.id} field="email" {...props}/>
        <PersonField key={"phone" + props.id} field="phone" {...props}/>
    </div>
}
export default Person;
