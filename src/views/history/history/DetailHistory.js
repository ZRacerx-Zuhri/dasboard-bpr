import React, {
  // useState,
  useEffect,
} from 'react'
// import { useLocation } from 'react-router-dom'
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
  // const [trans, setTrans] = useState([])
  // const url = `https://gw-dev-api.medtransdigital.com/dashboard/get_trans?bpr_id=2640&tcode=${location.state.userChoice}`
  // useFetch({ url, onSuccess: (data) => setTrans(data.data) })

  const data = [
    {
      date: '08:56:50 | January 27th 2023',
      jenis_transaksi: 'Transfer',
      keterangan_transaksi: 'Transfer ke BPR Indra',
      data_transaksi: 'John Doe 1234567890',
      status: '1',
      debit: 50000,
      kredit: 0,
      rrn: '000035',
    },
    {
      date: '08:56:50 | January 27th 2023',
      jenis_transaksi: 'Transfer',
      keterangan_transaksi: 'Transfer dari BPR Tegal',
      data_transaksi: 'John Pantau 1001002003004',
      status: '1',
      debit: 0,
      kredit: 100000,
      rrn: '000028',
    },
    {
      date: '08:56:50 | January 27th 2023',
      jenis_transaksi: 'Bayar/Top-Up',
      keterangan_transaksi: 'Pembayaran Telkomsel Prepaid',
      data_transaksi: '081234567890',
      status: '1',
      debit: 72500,
      kredit: 0,
      rrn: '000002',
    },
    {
      date: '08:56:50 | January 27th 2023',
      jenis_transaksi: 'Biaya',
      keterangan_transaksi: 'Pembayaran Telkomsel Prepaid',
      data_transaksi: '081234567890',
      status: '1',
      debit: 1500,
      kredit: 0,
      rrn: '000002',
    },
    {
      date: '08:56:50 | January 26th 2023',
      jenis_transaksi: 'Transfer',
      keterangan_transaksi: 'Transfeer ke BPR Indra',
      data_transaksi: 'John Doe 1234567890',
      status: '1',
      debit: 50000,
      kredit: 0,
      rrn: '000001',
    },
    {
      date: '08:56:50 | January 27th 2023',
      jenis_transaksi: 'Tarik Tunai',
      keterangan_transaksi: 'Penarikan tunai di ATM Pusat',
      data_transaksi: 'S1GPMK10RA',
      status: '1',
      debit: 300000,
      kredit: 0,
      rrn: '000013',
    },
    {
      date: '08:56:50 | January 27th 2023',
      jenis_transaksi: 'Transfer',
      keterangan_transaksi: 'Transfeer dari Bank Mandiri',
      data_transaksi: 'John Doe 12700012312345',
      status: '0',
      debit: 0,
      kredit: 150000,
      rrn: '000001',
    },
  ]

  useEffect(() => {
    // fetch(
    //   `https://gw-dev-api.medtransdigital.com/dashboard/get_trans?bpr_id=${location.state.bprChoice}&tcode=${location.state.transChoice}`,
    // )
    //   .then((res) => res.json())
    //   .then((res) => {
    //     setTrans(res.data)
    //   })
    //   .catch((err) => console.error(err))
  },[])

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
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Debit</CTableHeaderCell>
                    <CTableHeaderCell>Kredit</CTableHeaderCell>
                    <CTableHeaderCell>RRN</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{item.date}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.jenis_transaksi}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.keterangan_transaksi}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.data_transaksi}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.status === '1' ? <div>Approve</div> : <div>Rejected</div>}
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>Rp. {item.debit}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>Rp. {item.kredit}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.rrn}</div>
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
