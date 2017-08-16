import { observable, action, autorun, computed} from 'mobx';
import { observer } from  'mobx-react';

const _cells = observable.map({});
const _computedCells = observable.map({});

const convert = function (rowIndex, cellIndex) {
    return 'ABCDEFGHIJ'.charAt(cellIndex) + "" + (rowIndex + 1);
};

function calc(id) {
    if (!Store.cells.has(id)) return "";
    const value = Store.cells.get(id).value;
    if (value[0] !== "=") return value;
    const formula = value;

    const parsedFormula = (formula.replace(/[A-Z][0-9]/g,(match) => {
        if (!_cells.has(match)) return "";
        const cell = _cells.get(match);
        return cell.computedFunction;
    }));
    const evaledFormula = eval(parsedFormula.substring(1));
    return evaledFormula;
}


const Store = observable({
    cells: _cells,
    selectedCell: {rowIndex: 0, cellIndex: 0},

    setSelectedCell: action(function (rowIndex, cellIndex) {
        this.selectedCell = {rowIndex, cellIndex};
    }),
    setValue: action(function(value) {
        const cell = {rowIndex: this.selectedCell.rowIndex , cellIndex: this.selectedCell.cellIndex};
        this.cells.set(convert(this.selectedCell.rowIndex , this.selectedCell.cellIndex),{value: value, get computedFunction(){
                return calc(convert(cell.rowIndex , cell.cellIndex))
            }
        });
    }),
    get selectedCellValue() {
        const cell = this.cells.get(convert(this.selectedCell.rowIndex , this.selectedCell.cellIndex));
        if (cell) return cell.value;
        return "";
    },
    getValue(rowIndex , cellIndex) {
        const id = convert(rowIndex , cellIndex);
        if (!this.cells.has(id)) return "";
        const cell = this.cells.get(id);
        console.log(cell);
        return cell.computedFunction;
    }

});

export default Store;
