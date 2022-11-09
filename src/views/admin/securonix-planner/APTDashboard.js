/* eslint-disable prettier/prettier */
// noprotect
import React, { useEffect, useState, useRef } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CLink,
  CRow,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CCardHeader,
  CTooltip,
  CButton,
  CSmartTable,
  CBadge,
  CCollapse,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilInfo } from '@coreui/icons'
import apts from '../../../components/apts'

import MultiSelect from '../../../components/MultiSelect'
import Highchart3DDonut from '../../../components/highcharts/Highchart3DDonut'
import SimpleDataTable from '../../../components/SimpleDataTable'
import { execGenSlidesFuncs } from '../../../modules/ppt/ppt'
import Helpers from '../../../lib/helper'

const APTDashboard = () => {

  const [details, setDetails] = useState([])
  const [s_details, setSDetails] = useState([])
  const [t_details, setTDetails] = useState([])
  const [clicked, setClicked] = useState(false)

  const columns = [
    {
      key: 'APT_Name',
      _style: { width: '5%' },
      _props: { color: 'dark', className: 'fw-semibold' },
    },
    // { key: 'Synopsis', filter: false, sorter: false, _style: { width: '12%' } },
    { key: 'First_Noticed', _style: { width: '5%' } },
    { key: 'Associated Groups', _style: { width: '17%' } },
    { key: 'APT_Origin', _style: { width: '17%' } },
    { key: 'Targeted_Sectors', _style: { width: '17%' } },
    { key: 'Targeted Regions', _style: { width: '17%' } },
    { key: 'Targeted Countries', _style: { width: '17%' } },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
      _props: { color: 'dark', className: 'fw-semibold' },
    },
  ]

  const software_columns = [
    {
      key: 'name',
      _style: { width: '10vw' },
      _props: { color: 'primary', className: 'fw-semibold' },
    },
    // { key: 'techniques', _style: { width: '60vw' } },
    // { key: 'references', _style: { width: '40%' } },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
      _props: { color: 'dark', className: 'fw-semibold' },
    },
  ]

  const technique_columns = [
    {
      key: 'technique name',
      _style: { width: '10vw' },
      _props: { color: 'primary', className: 'fw-semibold' },
    },
    // { key: 'id', _style: { width: '60vw' } },
    { key: 'use', _style: { width: '60vw' } },
    // { key: 'references', _style: { width: '40%' } },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
      _props: { color: 'dark', className: 'fw-semibold' },
    },
  ]

  // const usersData = [
  //   { id: 0, name: 'John Doe', registered: '2022/01/01', role: 'Guest', status: 'Pending' },
  //   {
  //     id: 1,
  //     name: 'Samppa Nori',
  //     registered: '2022/01/01',
  //     role: 'Member',
  //     status: 'Active',
  //     _props: { color: 'primary', align: 'middle' },
  //   },
  //   {
  //     id: 2,
  //     name: 'Estavan Lykos',
  //     registered: '2022/02/07',
  //     role: 'Staff',
  //     status: 'Banned',
  //     _cellProps: { all: { className: 'fw-semibold' }, name: { color: 'info' } },
  //   },
  //   { id: 3, name: 'Chetan Mohamed', registered: '2022/02/07', role: 'Admin', status: 'Inactive' },
  //   {
  //     id: 4,
  //     name: 'Derick Maximinus',
  //     registered: '2022/03/19',
  //     role: 'Member',
  //     status: 'Pending',
  //   },
  //   { id: 5, name: 'Friderik Dávid', registered: '2022/01/21', role: 'Staff', status: 'Active' },
  //   { id: 6, name: 'Yiorgos Avraamu', registered: '2022/01/01', role: 'Member', status: 'Active' },
  //   {
  //     id: 7,
  //     name: 'Avram Tarasios',
  //     registered: '2022/02/07',
  //     role: 'Staff',
  //     status: 'Banned',
  //     _props: { color: 'warning', align: 'middle' },
  //   },
  //   { id: 8, name: 'Quintin Ed', registered: '2022/02/07', role: 'Admin', status: 'Inactive' },
  //   { id: 9, name: 'Enéas Kwadwo', registered: '2022/03/19', role: 'Member', status: 'Pending' },
  //   { id: 10, name: 'Agapetus Tadeáš', registered: '2022/01/21', role: 'Staff', status: 'Active' },
  //   { id: 11, name: 'Carwyn Fachtna', registered: '2022/01/01', role: 'Member', status: 'Active' },
  //   { id: 12, name: 'Nehemiah Tatius', registered: '2022/02/07', role: 'Staff', status: 'Banned' },
  //   { id: 13, name: 'Ebbe Gemariah', registered: '2022/02/07', role: 'Admin', status: 'Inactive' },
  //   {
  //     id: 14,
  //     name: 'Eustorgios Amulius',
  //     registered: '2022/03/19',
  //     role: 'Member',
  //     status: 'Pending',
  //   },
  //   { id: 15, name: 'Leopold Gáspár', registered: '2022/01/21', role: 'Staff', status: 'Active' },
  //   { id: 16, name: 'Pompeius René', registered: '2022/01/01', role: 'Member', status: 'Active' },
  //   { id: 17, name: 'Paĉjo Jadon', registered: '2022/02/07', role: 'Staff', status: 'Banned' },
  //   {
  //     id: 18,
  //     name: 'Micheal Mercurius',
  //     registered: '2022/02/07',
  //     role: 'Admin',
  //     status: 'Inactive',
  //   },
  //   {
  //     id: 19,
  //     name: 'Ganesha Dubhghall',
  //     registered: '2022/03/19',
  //     role: 'Member',
  //     status: 'Pending',
  //   },
  //   { id: 20, name: 'Hiroto Šimun', registered: '2022/01/21', role: 'Staff', status: 'Active' },
  //   { id: 21, name: 'Vishnu Serghei', registered: '2022/01/01', role: 'Member', status: 'Active' },
  //   { id: 22, name: 'Zbyněk Phoibos', registered: '2022/02/07', role: 'Staff', status: 'Banned' },
  //   { id: 23, name: 'Aulus Agmundr', registered: '2022/01/01', role: 'Member', status: 'Pending' },
  //   {
  //     id: 42,
  //     name: 'Ford Prefect',
  //     registered: '2001/05/25',
  //     role: 'Alien',
  //     status: "Don't panic!",
  //   },
  // ]

  const usersData = apts

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  const toggleClicked = () => {
    setClicked(!clicked)
  }

  const softwareDetails = (index) => {
    const position = s_details.indexOf(index)
    let newDetails = s_details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...s_details, index]
    }
    setSDetails(newDetails)
  }

  const techniqueDetails = (index) => {
    const position = t_details.indexOf(index)
    let newDetails = t_details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...t_details, index]
    }
    setTDetails(newDetails)
  }

  return (
    <>
      <div className="heading-miter mb-4">
        <span className="display-6">APT Planner</span>
      </div>
      <CSmartTable
        activePage={3}
        cleaner
        clickableRows
        columns={columns}
        columnFilter
        columnSorter
        items={apts}
        scopedColumns={{
          show_details: (item) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => {
                    toggleDetails(item.APT_Name)
                  }}
                >
                  {details.includes(item.APT_Name) ? 'Hide' : 'Show'}
                </CButton>
              </td>
            )
          },
          details: (item) => {
            return (
              <CCollapse visible={details.includes(item.APT_Name)}>
                <CCardBody>
                  <h4>{item.APT_Name}</h4>
                  <p className="text-muted">{item.Synopsis}</p>

                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => {
                      toggleClicked()
                    }}
                  >
                    <h5>Software Used</h5>
                  </CButton>
                  {clicked &&
                    <CSmartTable
                      activePage={3}
                      // cleaner
                      clickableRows
                      columns={software_columns}
                      // columnFilter
                      columnSorter
                      items={Object.values(item.Software)}


                      sorterValue={{ column: 'name', state: 'asc' }}
                      tableFilter

                      scopedColumns={{
                        show_details: (item) => {
                          return (
                            <td className="py-2">
                              <CButton
                                color="primary"
                                variant="outline"
                                shape="square"
                                size="sm"
                                onClick={() => {
                                  softwareDetails(item.name)
                                }}
                              >
                                {s_details.includes(item.name) ? 'Hide' : 'Techniques Used'}
                              </CButton>
                            </td>
                          )
                        },
                        details: (item) => {
                          return (
                            <CCollapse visible={s_details.includes(item.name)}>
                              <CCardBody>
                                <div className="container">
                                  <h4>Techniques Used</h4>
                                  <div className="row">

                                    {item.techniques && item.techniques.map((technique, i) => {
                                      return (
                                        <div key={i} className="col">
                                          <p className="text">{technique}</p>
                                        </div>
                                      )
                                    })
                                    }

                                  </div>
                                </div>
                              </CCardBody>
                            </CCollapse>
                          )
                        },
                      }}
                      tableProps={{
                        striped: true,
                        hover: true,
                      }}
                    />
                  }
                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => {
                      toggleClicked()
                    }}
                  >
                    <h5>Techniques Used</h5>
                  </CButton>
                  {clicked &&
                    <CSmartTable
                      activePage={3}
                      // cleaner
                      clickableRows
                      columns={technique_columns}
                      // columnFilter
                      columnSorter
                      items={Object.values(item.TechniquesUsed)}

                      sorterValue={{ column: 'name', state: 'asc' }}
                      tableFilter
                      itemsPerPageSelect
                      itemsPerPage={15}
                      pagination
                      scopedColumns={{
                        show_details: (item) => {
                          return (
                            <td className="py-2">
                              {item.articles.length > 0 &&
                                <CButton
                                  color="primary"
                                  variant="outline"
                                  shape="square"
                                  size="sm"
                                  onClick={() => {
                                    techniqueDetails(item['technique name'])
                                  }}
                                >
                                  {t_details.includes(item['technique name']) ? 'Hide' : 'Articles'}
                                </CButton>
                              }
                            </td>
                          )
                        },
                        details: (item) => {
                          return (
                            <CCollapse visible={t_details.includes(item['technique name'])}>
                              <CCardBody>

                                <div className="container">
                                  <h4>Referenced Articles</h4>
                                  <div className="row">

                                    {item.articles && item.articles.map((article, i) => {
                                      return (
                                        <CLink key={i}
                                          className="col"
                                          href={article.link}
                                          target="_blank"
                                        >
                                          <p className="text">{article.reference}</p>
                                        </CLink>
                                      )
                                    })
                                    }

                                  </div>
                                </div>

                              </CCardBody>
                            </CCollapse>
                          )
                        },
                      }}

                      tableProps={{
                        striped: true,
                        hover: true,
                      }}
                    />
                  }
                </CCardBody>
              </CCollapse>
            )
          },
        }}
        selectable
        sorterValue={{ column: 'name', state: 'asc' }}
        // tableFilter
        tableHeadProps={{
          color: 'dark',
        }}
        tableProps={{
          striped: true,
          hover: true,
        }}
      />

    </>
  )
}

export default APTDashboard
