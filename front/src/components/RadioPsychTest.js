import React, {Component} from 'react';
import RadioGroup from "@material-ui/core/es/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/es/Radio/Radio";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import FormLabel from "@material-ui/core/es/FormLabel/FormLabel";


class RadioPsychTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curValue: null
        }
    }

    onChange(ev) {
        this.props.onChange(ev.target.value);
    }

    render() {
        return (
            <FormControl component="fieldset" style={{flex: true, flexDirection: "row"}}>
                <FormLabel component="legend" classes={{root: 'title-label'}}><i>{this.props.name}</i></FormLabel>
                <RadioGroup aria-label={this.props.name} onChange={this.onChange.bind(this)} value={this.props.value} style={{flex: true, flexDirection: "row"}}>
                    <FormControlLabel value={"sd"} control={<Radio color={"primary"}/>} label={"Strongly Disagree"} classes={{label: 'radio-label'}}/>
                    <FormControlLabel value={"d"} control={<Radio color={"primary"}/>} label={"Disagree"} classes={{label: 'radio-label'}}/>
                    <FormControlLabel value={"n"} control={<Radio color={"primary"}/>} label={"Neutral"} classes={{label: 'radio-label'}}/>
                    <FormControlLabel value={"a"} control={<Radio color={"primary"}/>} label={"Agree"} classes={{label: 'radio-label'}}/>
                    <FormControlLabel value={"sa"} control={<Radio color={"primary"}/>} label={"Strongly Agree"} classes={{label: 'radio-label'}}/>
                </RadioGroup>
            </FormControl>
        )
    }
}

export default RadioPsychTest;