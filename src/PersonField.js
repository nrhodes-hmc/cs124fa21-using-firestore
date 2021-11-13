import SelectionMaintainingInput from "./SelectionMaintainingInput";

function PersonField(props) {
    return <SelectionMaintainingInput
                  className={props.field}
                  onChange={
                      e => props.onPersonFieldChanged(props.id, props.field, e.target.value)
                  }
                  value={props[props.field]}/>
}

export default PersonField;
