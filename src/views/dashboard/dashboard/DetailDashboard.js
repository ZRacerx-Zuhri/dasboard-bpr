import React, { useState, useEffect } from 'react'

import {
  CCard,
  CCardBody,
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
// import { useFetch } from '../../../action'

const DetailDashboard = () => {
  const [rek, setRek] = useState([])
  // const url = 'https://gw-dev-api.medtransdigital.com/dashboard/get_rek?bpr_id=1001'
  // // useFetch({ url, onSuccess: (data) => setRek(data.data) })

  useEffect(() => {
    fetch('https://gw-dev-api.medtransdigital.com/dashboard/get_rek?bpr_id=1001')
      .then((res) => res.json())
      .then((res) => {
        setRek(res.data)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>BPR Angga</strong>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Nama Rekening</CTableHeaderCell>
                    <CTableHeaderCell>Nomer Rekening</CTableHeaderCell>
                    <CTableHeaderCell>Total Saldo</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {rek.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{item.nama_rek}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.bpr_id}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>Rp. {item.saldo}</div>
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

export default DetailDashboard
