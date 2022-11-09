/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useRef } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CCardHeader,
  CLoadingButton,
  CTooltip,
  CButton,
  CAlert,
  CAlertLink,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilInfo } from '@coreui/icons'
import { FileUploader } from 'react-drag-drop-files'
import policy from '../../../data/policy.json'
import ITPFunc from '../../../data/ITPFunc'
// import HighchartTreemap from '../../../components/HighchartTreemap'
import PlotlyTreemap from '../../../components/plotly/PlotlyTreemap'
import { execGenSlidesFuncs } from '../../../modules/ppt/ppt'
import * as htmlToImage from 'html-to-image'
import Helpers from '../../../lib/helper'
import * as dfd from 'danfojs'
import { useSelector, useDispatch } from 'react-redux'
import { appliedReport } from '../../../redux'
import PlotlySunBurst from '../../../components/plotly/PlotlySunBurst'
const fileTypes = ['XLSX', 'XLS']
const APTReflector = () => {
  const dispatch = useDispatch()
  // const enterprise = useSelector((state) => state.miter.enterprise)
  const appliedReportData = useSelector((state) => state.miter.appliedReport)
  const [itpPolices, setItpPolices] = useState([])
  const [file, setFile] = useState(null)
  const [gaps, setGaps] = useState([])
  const [tableData, setTableData] = useState([])
  const [priorities, setPriorities] = useState(['P1', 'P2', 'P3'])
  const [accordionActive, setaccordionActive] = useState(1)
  const [state, setState] = useState(false)
  const refDiv1 = useRef()
  const refDiv2 = useRef()
  const refArray = React.useRef([])
  const [report, setReport] = useState([])
  const [fullFunctionality, setFullFunctionality] = useState({
    ids: [],
    labels: [],
    parents: [],
    values: [],
  })
  const [customFunc, setCustomFunc] = useState({
    func: 0,
    weight: 0,
  })
  //   const gaps = useSelector((state) => state.miter.gaps)
  useEffect(() => {
    ;(async () => {
      if(appliedReportData !== null)setReport(appliedReportData)
      let itpFunctionality = []
      let oobITPF = {}
      for await (const p of priorities) {
        oobITPF[p] = []
      }
      for await (const f of ITPFunc) {
        itpFunctionality.push(f.functionality)
        oobITPF[f.itp].push(f.functionality)
      }
      let array = {}
      let rowArray = {}
      for await (const pre of priorities) {
        array[pre] = {
          labels: [],
          parents: [],
          values: [],
        }
        rowArray[pre] = []
        for await (const f of oobITPF[pre]) {
          array[pre].labels.push(f)
          array[pre].parents.push('')
          array[pre].values.push(1)
          let itpP = policy.filter((p) => p.functionality === f)
          let riskname = []
          for await (const d of itpP) {
            riskname = [...riskname, d.riskThreatName].filter(Helpers.onlyUnique)
          }
          for await (const r of riskname) {
            let pf = policy.filter((p) => {
              return p.riskThreatName === r && p.functionality === f
            })
            array[pre].labels.push(r)
            array[pre].parents.push(f)
            array[pre].values.push(pf.length)
            rowArray[pre].push([{ text: f }, { text: r }])
          }
        }
      }
      let itpP = policy.filter((p) => itpFunctionality.includes(p.functionality))
      setItpPolices(itpP)
      setGaps(array)
      setTableData(rowArray)
      // console.log(array)
    })()
  }, [])
  useEffect(() => {
    if (report.length > 0) {
      verifythevalue()
    }
  }, [report])
  const verifythevalue = async () => {
    const df_ITPFunc = new dfd.DataFrame(ITPFunc)
    const itp_functionality = await df_ITPFunc['functionality'].values
    const filtered_df_itp = await report.filter((i) => itp_functionality.includes(i.functionality))
    const filterFunc = await filtered_df_itp.map((i) => i.functionality).filter(Helpers.onlyUnique)
    const funcWiseC = await functionalityWiseCentric(filterFunc)
    const itpReadiness = await ITPFunc.filter((i) => filterFunc.includes(i.functionality))
      .map((i) => i.weight)
      .reduce((partialSum, a) => partialSum + a, 0)
    setFullFunctionality(funcWiseC)
    setCustomFunc({
      func: filterFunc.length,
      weight: itpReadiness,
    })
  }
  const functionalityWiseCentric = async (functional) => {
    let sunb = {
      ids: [],
      labels: [],
      parents: [],
    }
    let newArr = []
    let arrRows = []
    let newTable = []
    let i = 0
    for await (const f of functional) {
      // newArr.push({
      //   id: i.toString(),
      //   parent: '',
      //   name: f,
      // })
      //-----------------
      sunb.ids.push(i.toString())
      sunb.labels.push(f)
      sunb.parents.push('')
      //------------------
      let pf = report.filter((p) => p.functionality === f)
      // console.log(pf)
      let riskname = []
      for await (const d of pf) {
        riskname = [...riskname, d.riskThreatName].filter(Helpers.onlyUnique)
      }
      // console.log(riskname)
      let j = 0
      for await (const r of riskname) {
        // newArr.push({
        //   id: i.toString() + '-' + j.toString(),
        //   parent: i.toString(),
        //   name: r,
        // })
        //-----------------
        sunb.ids.push(i.toString() + '-' + j.toString())
        sunb.labels.push(r)
        sunb.parents.push(i.toString())
        //------------------
        let rn = report.filter((p) => {
          return p.riskThreatName === r && p.functionality === f
        })
        let policyname = []
        for await (const d of rn) {
          policyname = [...policyname, d.name].filter(Helpers.onlyUnique)
        }
        let k = 0
        for await (const pn of policyname) {
          // let pf = report.filter((p) => {
          //   return p.name === pn && p.riskThreatName === r && p.functionality === f
          // })
          // arrRows.push([{ text: f }, { text: r }, { text: pn }])
          newTable.push([f, r, pn])
          // newArr.push({
          //   id: i.toString() + '-' + j.toString() + '-' + k.toString(),
          //   parent: i.toString() + '-' + j.toString(),
          //   name: pn,
          //   value: pf.length,
          // })
          //-----------------
          sunb.ids.push(i.toString() + '-' + j.toString() + '-' + k.toString())
          sunb.labels.push(pn)
          sunb.parents.push(i.toString() + '-' + j.toString())
          //------------------
          k++
        }
        j++
      }
      i++
    }
    return sunb
  }
  const handleChange = async (f) => {
    setFile(f)
    let reports = []
    dfd.readExcel(f).then(async (df) => {
      const df_Applied = dfd.toJSON(df)
      for await (const value of df_Applied) {
        // console.log(value)
        let arr = value['Risk Threat indicator'].split(':')
        let riskThreatName
        if (arr[1]) {
          riskThreatName = arr[1].trim()
        } else {
          riskThreatName = arr[0].trim()
        }
        reports.push({
          name: value['Rule Name'],
          policyName: value['Rule Name'],
          functionality: value['Functionality'],
          riskThreatName: riskThreatName,
        })
      }
      dispatch(appliedReport(reports))
      setReport(reports)
    })
  }
  const downloadImage = async () => {
    setaccordionActive(1)
    setState(!state)
    let promise = await Promise.all([
      htmlToImage.toPng(refDiv1.current),
      htmlToImage.toPng(refDiv2.current),
      htmlToImage.toPng(refArray.current[0]),
      htmlToImage.toPng(refArray.current[1]),
      htmlToImage.toPng(refArray.current[2]),
    ])
    let slideDetails = {
      image1: promise[0],
      image2: promise[1],
      image3: promise[2],
      image4: promise[3],
      image5: promise[4],
      table1: [],
      table2: [],
      table3: [],
      data: [],
      title: `Insider Threat Coverage`,
      fileName: `Securonix-Insider-Threat-Coverage`,
    }
    slideDetails.table1 = [
      [
        { text: 'Functionality', options: { fill: '0088cc', color: 'ffffff', valign: 'middle' } },
        {
          text: 'Risk Threat name',
          options: { fill: '0088cc', color: 'ffffff', valign: 'middle' },
        },
      ],
      ...tableData.P1,
    ]
    slideDetails.table2 = [
      [
        { text: 'Functionality', options: { fill: '0088cc', color: 'ffffff', valign: 'middle' } },
        {
          text: 'Risk Threat name',
          options: { fill: '0088cc', color: 'ffffff', valign: 'middle' },
        },
      ],
      ...tableData.P2,
    ]
    slideDetails.table3 = [
      [
        { text: 'Functionality', options: { fill: '0088cc', color: 'ffffff', valign: 'middle' } },
        {
          text: 'Risk Threat name',
          options: { fill: '0088cc', color: 'ffffff', valign: 'middle' },
        },
      ],
      ...tableData.P3,
    ]
    console.log('downloading image')
    execGenSlidesFuncs(slideDetails, 'insider')
    setState(false)
    // setaccordionActive(0)
  }
  return (
    <>
      <div className="heading-miter mb-4">
        <span className="display-6">ITP Reflector </span>
        <CTooltip
          content="ITP (Insider Threat Program) are threat mitigation programs designed to help organizations intervene before an individual with privileged access or an understanding of the organization makes a mistake or commits a harmful or hostile act. The ITP Reflector will display the current ITP coverage a customer has based on data sources, functionalities, and resources onboarded."
          placement="right"
          visible={true}
        >
          <CButton color="info" className="infoBtn">
            <CIcon icon={cilInfo} size="sm" className="infoicon" />
          </CButton>
        </CTooltip>
      </div>
      <CRow className="mb-2">
        <CCol md={12}>
          <CAccordion activeItemKey={1}>
            <CAccordionItem itemKey={1}>
              <CAccordionHeader>Upload Report</CAccordionHeader>
              <CAccordionBody>
                <CCard>
                  <CCardBody>
                    <CAlert color="info">
                      Please upload applied report, Reffer these steps to download the applied
                      report{' '}
                      <CAlertLink href="https://securonix.atlassian.net/wiki/spaces/SET/pages/3032285198/Reflectors+Report">
                        {' '}
                        check here
                      </CAlertLink>
                      .
                    </CAlert>
                    <div className="dragAndDropForm">
                      <div className="dragAndDropDiv">
                        <FileUploader
                          multiple={false}
                          handleChange={handleChange}
                          name="file"
                          types={fileTypes}
                          classes={'dragAndDropFile'}
                        />
                        <p>
                          {file ? `File name: ${file.name}` : 'No Applied Report file uploaded yet'}
                        </p>
                      </div>
                    </div>
                  </CCardBody>
                </CCard>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        </CCol>
      </CRow>
      {/* <div ref={refDiv1}>
        <CRow className="row-card-tactics">
          <CCol md={12} className="mb-1">
            <CCard>
              <CCardHeader className="text-center" component="h5">
                Out of the Box
              </CCardHeader>
            </CCard>
          </CCol>
        </CRow>
        <CRow className="row-card-tactics">
          <CCol className="mb-4">
            <CCard>
              <CCardHeader className="text-center">ALL Functionalities</CCardHeader>
              <CCardBody>
                <p className="para-value">{functionality.length}</p>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol className="mb-4">
            <CCard>
              <CCardHeader className="text-center">ITP Functionalities</CCardHeader>
              <CCardBody>
                <p className="para-value">{ITPFunc.length}</p>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol className="mb-4">
            <CCard>
              <CCardHeader className="text-center">All Policies</CCardHeader>
              <CCardBody>
                <p className="para-value">{policy.length}</p>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol className="mb-4">
            <CCard>
              <CCardHeader className="text-center">ITP Policies</CCardHeader>
              <CCardBody>
                <p className="para-value">{itpPolices.length}</p>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol className="mb-4">
            <CCard>
              <CCardHeader className="text-center">Custome</CCardHeader>
              <CCardBody>
                <p className="para-value">{priorities.length}</p>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol className="mb-4">
            <CCard>
              <CCardHeader className="text-center">Skipped OOB</CCardHeader>
              <CCardBody>
                <p className="para-value">{priorities.length}</p>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol className="mb-4">
            <CCard>
              <CCardHeader className="text-center">ITP Priorities</CCardHeader>
              <CCardBody>
                <p className="para-value">{priorities.length}</p>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
      */}
      <div ref={refDiv1}>
        <CRow className="row-card-tactics mb-4">
          <CCol className="mb-1">
            <CCard>
              <CCardHeader className="text-center" component="h5">
                Customer Functionalities
              </CCardHeader>
              <CCardBody>
                <p className="dyn-value">{customFunc.func}</p>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol className="mb-1">
            <CCard>
              <CCardHeader className="text-center" component="h5">
                ITP Readiness
              </CCardHeader>
              <CCardBody>
                <p className="dyn-value">{customFunc.weight}%</p>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
      <CRow className="mb-4">
        <CCol>
          <CAccordion activeItemKey={1}>
            <CAccordionItem itemKey={1}>
              <CAccordionHeader>MITRE Coverage - Functionality Centric</CAccordionHeader>
              <CAccordionBody>
                <CCard>
                  <CCardBody>
                    <div style={{ textAlign: 'center' }} ref={refDiv2}>
                      {fullFunctionality.labels.length > 0 && (
                        <PlotlySunBurst value={fullFunctionality} />
                      )}
                    </div>
                  </CCardBody>
                </CCard>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        </CCol>
      </CRow>
      {gaps['P1'] &&
        Object.keys(gaps).map((item, i) => (
          <CRow className="mb-4" key={i}>
            <CCol>
              <CAccordion activeItemKey={accordionActive}>
                <CAccordionItem itemKey={1}>
                  <CAccordionHeader>Gap In Functionalities - {item}</CAccordionHeader>
                  <CAccordionBody>
                    <CCard>
                      <CCardBody style={{ overflowX: 'scroll' }}>
                        <div
                          style={{ textAlign: 'center' }}
                          ref={(ref) => {
                            refArray.current[i] = ref
                          }}
                        >
                          <PlotlyTreemap value={gaps[item]} />
                        </div>
                      </CCardBody>
                    </CCard>
                  </CAccordionBody>
                </CAccordionItem>
              </CAccordion>
            </CCol>
          </CRow>
        ))}
      <CRow>
        <CCol className="mb-4">
          <CLoadingButton style={{ float: 'right' }} loading={state} onClick={downloadImage}>
            Generate PPT
          </CLoadingButton>
        </CCol>
      </CRow>
    </>
  )
}

export default APTReflector
