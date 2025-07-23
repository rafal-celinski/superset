import { QueryFormColumn } from '@superset-ui/core';
import { Combination } from '../types';

export default function getRowsColumnsCombinations(groupbyRows: QueryFormColumn[], groupbyColumns: QueryFormColumn[]) {
    const rows_combinations: Array<QueryFormColumn[]> = [];
    for (let i = 0; i <= groupbyRows.length; i++) {
        rows_combinations.push(groupbyRows.slice(0, i));
    }

    const cols_combinations: Array<QueryFormColumn[]> = [];
    for (let i = 0; i <= groupbyColumns.length; i++) {
        cols_combinations.push(groupbyColumns.slice(0, i));
    }

    let rowsColumnsCombinations: Combination[] = [];

    rows_combinations.forEach(rows => {
        cols_combinations.forEach(cols => {
        rowsColumnsCombinations.push({rows: rows, columns: cols})
        })
    })

    return rowsColumnsCombinations;
}