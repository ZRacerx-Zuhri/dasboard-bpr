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

const DetailHistory = () => {
  let location = useLocation()
  const [trans, setTrans] = useState([])
  const [bpr, setBpr] = useState([])
  const [rek, setRek] = useState([])
  const [status, setStatus] = useState('')

  useEffect(() => {
    fetch(
      `https://gw-dev-api.medtransdigital.com/dashboard/get_trans?bpr_id=${location.state.bprChoice}&nosbb=${location.state.transChoice}&status=${location.state.statusChoice}`,
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data)
        if (res.data.length) {
          setTrans(res.data)
        }
        if (location.state.statusChoice === 'all') {
          setStatus('All')
        } else if (location.state.statusChoice === '1') {
          setStatus('Approved')
        } else if (location.state.statusChoice === 'R') {
          setStatus('Reversed')
        }
        setBpr(res.bpr)
        setRek(res.rek)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              {bpr} - {rek} - {status}
            </CCardHeader>
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
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Rcode</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {trans.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{item.tgl_trans}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.trx_code === '1000' || item.trx_code === '1100' ? (
                          <div>Tarik Tunai</div>
                        ) : item.trx_code === '5000' ? (
                          <div>PPOB</div>
                        ) : (
                          <div>Transfer</div>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.ket_trans}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.data_trans}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>Rp. {item.amount_db}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>Rp. {item.amount_cr}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.rrn}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.status === '1' ? (
                          <div>Approve</div>
                        ) : item.status === '0' ? (
                          <div>Rejected</div>
                        ) : (
                          <div>Reversed</div>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.rcode}</div>
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

export default DetailHistory
