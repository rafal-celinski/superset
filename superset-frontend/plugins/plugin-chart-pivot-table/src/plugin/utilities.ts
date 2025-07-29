import { QueryFormColumn } from '@superset-ui/core';
import { MetricsLayoutEnum, OwnState, PivotTableQueryFormData } from '../types';

export default function buildGroupbyCombinations(formData: PivotTableQueryFormData, ownState?: OwnState) {
    // const selectedGroupbyColumns = ownState.selectedGroupbyColumns ?? groupbyColumns;
    let columns = formData.groupbyColumns;
    let rows = ownState?.selectedGroupbyRows ?? formData.groupbyRows;

    [rows, columns] = formData.transposePivot ? [columns, rows] : [rows, columns];

    const rows_combinations: Array<QueryFormColumn[]> = [];
    for (let i = 0; i <= rows.length; i++) {
        rows_combinations.push(rows.slice(0, i));
    }

    const cols_combinations: Array<QueryFormColumn[]> = [];
    for (let i = 0; i <= columns.length; i++) {
        cols_combinations.push(columns.slice(0, i));
    }

    let groupbyCombinations = 
        rows_combinations.flatMap(row =>
            cols_combinations.map(col => ({ rows: row, columns: col }))
    );

    if (formData.combineMetric) {
        if (formData.metricsLayout === MetricsLayoutEnum.ROWS){
            groupbyCombinations = groupbyCombinations.filter(combination => combination.rows.length === rows.length)
        }
        else {
            groupbyCombinations = groupbyCombinations.filter(combination => combination.columns.length === columns.length)
        }
    }

    return groupbyCombinations;
}