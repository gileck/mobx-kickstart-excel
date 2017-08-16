import React from 'react';
import PropTypes from 'prop-types';
import s from './Cell.scss';
import Store from '../../store';
import { observer } from  'mobx-react';
import { computed } from 'mobx';

const convert = function (rowIndex, cellIndex) {
    return 'ABCDEFGHIJ'.charAt(cellIndex) + "" + (rowIndex + 1);
};


class Cell extends React.Component {
    constructor() {
        super();
        this.isSelected = computed(() => {
            return Store.selectedCell.cellIndex === this.props.cellIndex && Store.selectedCell.rowIndex === this.props.rowIndex;
        });
        
    }

    render() {
        const rowIndex = this.props.rowIndex;
        const cellIndex = this.props.cellIndex;

        let styleObj = {padding: "5px","fontSize": "20px","outline": 0};
        if (this.isSelected.get()) {
            styleObj.border = "1px solid blue";
        } else {
            styleObj.border = "0px ";
        }

        return (<td className={s.cell}>
            <input style={styleObj}
                   value={Store.getValue(this.props.rowIndex, this.props.cellIndex)}
                   onChange={(e) => Store.setValue(Number(e.target.value))}
                   onClick={(e) => Store.setSelectedCell(rowIndex, cellIndex)}/>
        </td>)
    }
}


Cell.propTypes = {
    rowIndex: PropTypes.number.isRequired,
    cellIndex: PropTypes.number.isRequired
};


export default observer(Cell);