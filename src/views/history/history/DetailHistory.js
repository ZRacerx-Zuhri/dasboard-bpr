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
      `https://gw-dev-api.medtransdigital.com/dashboard/get_trans?bpr_id=${location.state.bprChoice}&nosbb=${location.state.transChoice}&status=${location.state.statusChoice}&fr=${location.state.fr}&to=${location.state.to}`,
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

  const formatRibuan = (angka) => {
    var number_string = angka.toString().replace(/[^,\d]/g, ''),
      split = number_string.split(','),
      sisa = split[0].length % 3,
      angka_hasil = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi)

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      let separator = sisa ? '.' : ''
      angka_hasil += separator + ribuan.join('.')
    }

    angka_hasil = split[1] !== undefined ? angka_hasil + ',' + split[1] : angka_hasil
    return angka_hasil
  }

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
                    <CTableHeaderCell>Debit Rp.</CTableHeaderCell>
                    <CTableHeaderCell>Kredit Rp.</CTableHeaderCell>
                    <CTableHeaderCell>RRN</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Rcode</CTableHeaderCell>
                    <CTableHeaderCell>No Reff</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {trans.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{item.tgl_trans}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.trx_code === '1000' ? (
                          <div>Token</div>
                        ) : item.trx_code === '1100' ? (
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
                        <div>{formatRibuan(item.amount_db)}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{formatRibuan(item.amount_cr)}</div>
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
                      <CTableDataCell>
                        <div>{item.noreff}</div>
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
