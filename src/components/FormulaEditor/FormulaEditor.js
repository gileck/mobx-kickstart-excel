import React from 'react';
import PropTypes from 'prop-types';
import s from './FormulaEditor.scss';
import Store from '../../store';
import { computed } from 'mobx';
import { observer } from  'mobx-react';

class InputWithState extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);

        this.state = {
            value: props.value
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({ value: nextProps.value });
        }
    }

    onKeyPress(e) {
        if (e.key === 'Enter') {
            this.props.onChange(this.state.value);
            this.setState({value: ""});
        }
    }

    onChange(e) {
        this.setState({ value: e.target.value });
    }

    setValue(value) {
        this.setState({value: value});
    }

    render() {
        return (
            <input type="text"
                   className={s.formulaInput}
                   onChange={this.onChange}
                   onKeyPress={this.onKeyPress}
                   value={this.state.value}
            />
        )
    }
}

InputWithState.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
};


const FormulaEditor = () => (
    <div className={s.formulaEditor}>
        Formula: <InputWithState
        value={Store.selectedCellValue}
        onChange={(val) => Store.setValue(val)}/>
    </div>

);

export default observer(FormulaEditor);