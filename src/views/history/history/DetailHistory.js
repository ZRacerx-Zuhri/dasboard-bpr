import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
// import { useFetch } from '../../../action'

import {
  CButton,
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

const DetailPpob = () => {
  const location = useLocation()
  const [trans, setTrans] = useState([])
  // const url = `https://gw-dev-api.medtransdigital.com/dashboard/get_trans?bpr_id=2640&tcode=${location.state.userChoice}`
  // useFetch({ url, onSuccess: (data) => setTrans(data.data) })
  useEffect(() => {
    // fetch(
    //   `https://gw-dev-api.medtransdigital.com/dashboard/get_trans?bpr_id=${location.state.bprChoice}&tcode=${location.state.transChoice}`,
    // )
    //   .then((res) => res.json())
    //   .then((res) => {
    //     setTrans(res.data)
    //   })
    //   .catch((err) => console.error(err))
  })

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>BPR Angga - History</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Date</CTableHeaderCell>
                    <CTableHeaderCell>Jenis Transaksi</CTableHeaderCell>
                    <CTableHeaderCell>Keterangan Transaksi</CTableHeaderCell>
                    <CTableHeaderCell>Data Transaksi</CTableHeaderCell>
                    <CTableHeaderCell>Debit</CTableHeaderCell>
                    <CTableHeaderCell>Kredit</CTableHeaderCell>
                    <CTableHeaderCell>RRN</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {trans.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{item.tgl_trans}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.no_hp}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.rrn}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.status_rek === '1' ? <div>Approve</div> : <div>Rejected</div>}
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.ket_trans}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>Rp. {item.amount}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>Rp. {item.admin_fee}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <CButton color="success" className="me-2 my-3">
                Download Excel
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default DetailPpob
