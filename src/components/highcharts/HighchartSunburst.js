/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsSunburst from 'highcharts/modules/sunburst'
if (typeof Highcharts === 'object') {
  HighchartsSunburst(Highcharts)
}
const HighchartSunburst = (props) => {
  const data = props.value
  const options = {
    chart: {
      height: '100%',
      backgroundColor: '#24252f',
    },
    title: {
      text: '',
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        groupPadding: 0.05,
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          crop: true,
          overflow: 'none',
          style: {
            color: 'white',
          },
        },
        point: {
          events: {},
        },
      },
    },
    series: [
      {
        type: 'sunburst',
        data: data,
        allowDrillToNode: true,
        cursor: 'pointer',
        dataLabels: {
          format: '{point.name}',
          style: {
            textOutline: 0,
          },
        },
        levels: [
          {
            level: 1,
            levelIsConstant: false,
          },
          {
            level: 2,
            colorByPoint: true,
          },
          // {
          //   level: 3,
          //   colorVariation: {
          //     key: 'brightness',
          //     to: -0.5,
          //   },
          // },
          // {
          //   level: 4,
          //   colorVariation: {
          //     key: 'brightness',
          //     to: 0.5,
          //   },
          // },
        ],
      },
    ],
  }
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  )
}
export default React.memo(HighchartSunburst)
