/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { CSmartTable, CButton } from '@coreui/react-pro'

const SimpleDataTable = (props) => {
  const [currentItems, setCurrentItems] = useState(props.tableData ? props.tableData : [])
  const columns = props.columns ? props.columns : []
  const tableData = props.tableData ? props.tableData : []
  let csvContent = currentItems
    .map((item) => {
      const keys = Object.keys(item)
      const difference = keys.filter((x) => !columns.includes(x))
      difference.forEach((e) => delete item[e])
      return Object.values(item)
        .map((i) => (Array.isArray(i) ? i.join(' | ') : i))
        .join(',')
    })
    .join('\n')
  csvContent = columns.join(',') + '\n' + csvContent
  const csvCode = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent)
  return (
    <>
      <CButton
        color="primary"
        className="mb-2"
        href={csvCode}
        download="securonix-table-data.csv"
        target="_blank"
      >
        Download current items (.csv)
      </CButton>
      <CSmartTable
        columns={columns}
        items={tableData}
        columnFilter
        columnSorter
        onFilteredItemsChange={setCurrentItems}
        pagination
        tableProps={{
          hover: true,
        }}
      />
    </>
  )
}

export default React.memo(SimpleDataTable)
