import {useDispatch} from "react-redux";

function PersonField(props) {
    const dispatch = useDispatch();
    return <input type="text"
                  className={props.field}
                  onChange={
                      event => dispatch({
                          type: "MODIFY_PERSON",
                          id: props.id,
                          field: props.field,
                          value: event.target.value
                      })
                  }
                  value={props[props.field]}/>
}

export default PersonField;
