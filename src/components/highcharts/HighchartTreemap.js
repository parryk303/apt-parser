/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsData from 'highcharts/modules/data'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsHeatmap from 'highcharts/modules/heatmap'
import HighchartsTreeChart from 'highcharts/modules/treemap'
import HighchartsReact from 'highcharts-react-official'
const HighchartTreemap = (props) => {
  const data = props.value
  const options = {
    chart: {
      height: '100%',
      backgroundColor: '#24252f',
    },
    title: {
      text: '',
    },
    series: [
      {
        type: 'treemap',
        layoutAlgorithm: 'squarified',
        allowDrillToNode: true,
        animation: false,
        dataLabels: {
          enabled: true,
          style: {
            textOutline: 0,
          },
        },
        levelIsConstant: false,
        levels: [
          {
            level: 1,
            layoutAlgorithm: 'squarified',
            dataLabels: {
              format: '{point.name}',
              className: 'datalabel',
              enabled: true,
              align: 'left',
              verticalAlign: 'top',
              style: {
                fontSize: '14px',
                fontWeight: 'bold',
              },
            },
          },
          {
            level: 2,
            layoutAlgorithm: 'squarified',
            dataLabels: {
              format: '{point.name}',
              className: 'datalabel',
              enabled: true,
              style: {
                fontSize: '8px',
                fontWeight: 'normal',
              },
            },
          },
        ],
        data: data,
      },
    ],
  }
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  )
}
export default React.memo(HighchartTreemap)
