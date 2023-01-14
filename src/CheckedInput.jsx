export default function CheckedInput(props) {

    return (
        <div className={"checkedInput " + (props.checked ? 'checkedInputOn': '')}>
        
            <div className="input" onClick={props.onChange}>
                <div className="mark" style={{
                width: props.width ? props.width : '',
                height: props.height ? props.height : ''
            }}></div>
            </div>

            <div className="label" onClick={props.onChange}>{props.label}</div>
        </div>
    );
}