import React, { useState, useEffect, useParams } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  CCard,
  CCardBody,
  CButton,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLoopCircular } from '@coreui/icons'
// import { useFetch } from '../../action'
const moment = require('moment')
moment.locale('id')

const Dashboard = () => {
  const navigate = useNavigate()
  const [bpr, setBpr] = useState([])
  // const url = 'https://gw-dev-api.medtransdigital.com/dashboard/list_bpr'
  // useFetch({ url, onSuccess: (data) => setBpr(data.data) }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const bpr_id = e.target.id
    navigate(`/dashboard/detail/${bpr_id}`, { state: {} })
  }

  useEffect(() => {
    fetch('https://gw-dev-api.medtransdigital.com/dashboard/list_bpr')
      .then((res) => res.json())
      .then((res) => {
        setBpr(res.data)
      })
      .catch((err) => console.error(err))
  }, [])
  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>List BPR</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Nama BPR</CTableHeaderCell>
                    <CTableHeaderCell>Kode BPR</CTableHeaderCell>
                    <CTableHeaderCell>Last Update</CTableHeaderCell>
                    <CTableHeaderCell>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {bpr.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{item.nama_bpr}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.bpr_id}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{moment().format('HH:mm:ss | MMMM Do YYYY')}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.bpr_id === '1001' || item.bpr_id === '0998' ? (
                          <CButton
                            id={item.bpr_id}
                            color="primary"
                            className="me-2"
                            onClick={handleSubmit}
                          >
                            Detail
                          </CButton>
                        ) : (
                          <div></div>
                        )}
                        <CButton component="a" color="primary" role="button">
                          <CIcon icon={cilLoopCircular} className="me-1" />
                          Update
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
