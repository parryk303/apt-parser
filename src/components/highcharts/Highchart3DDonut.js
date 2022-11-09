/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highcharts3d from 'highcharts/highcharts-3d'
highcharts3d(Highcharts)
const Highchart3DDonut = (props) => {
  const data = props.values
  //   console.log(data)
  const options = {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45,
      },
      backgroundColor: '#24252f',
    },
    title: {
      text: '',
    },
    plotOptions: {
      pie: {
        innerSize: 100,
        depth: 45,
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            color: 'white',
          },
        },
      },
    },
    series: [
      {
        name: 'Delivered amount',
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
export default React.memo(Highchart3DDonut)
