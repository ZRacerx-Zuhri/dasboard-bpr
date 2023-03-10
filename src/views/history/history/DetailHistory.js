import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import * as XLSX from 'xlsx/xlsx.mjs'
import moment from 'moment'
// import { useFetch } from '../../../action'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CPagination,
  CPaginationItem,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
moment.locale('id')

const DetailHistory = () => {
  let location = useLocation()
  // const [allTrans, setAllTrans] = useState([])
  const [trans, setTrans] = useState([])
  const [bpr, setBpr] = useState([])
  const [rek, setRek] = useState([])
  const [total, setTotal] = useState([])
  const [status, setStatus] = useState('')

  useEffect(() => {
    fetch(
      `https://gw-dev-api.medtransdigital.com/dashboard/get_trans?bpr_id=${location.state.bprChoice}&nosbb=${location.state.transChoice}&status=${location.state.statusChoice}&fr=${location.state.fr}&to=${location.state.to}&page=${location.state.page}`,
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data.length) {
          setTrans(res.data)
          let totalrow = []
          for (let i = 0; i < Math.ceil(parseInt(res.total) / 10); i++) {
            totalrow.push(`${i + 1}`)
          }
          setTotal(totalrow)
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
  }, [
    location.state.bprChoice,
    location.state.fr,
    location.state.statusChoice,
    location.state.to,
    location.state.transChoice,
    location.state.page,
  ])

  const handlePage = (item) => {
    const page = item
    fetch(
      `https://gw-dev-api.medtransdigital.com/dashboard/get_trans?bpr_id=${location.state.bprChoice}&nosbb=${location.state.transChoice}&status=${location.state.statusChoice}&fr=${location.state.fr}&to=${location.state.to}&page=${page}`,
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data.length) {
          setTrans(res.data)
        }
      })
      .catch((err) => console.error(err))
  }

  const getData = async () => {
    await fetch(
      `https://gw-dev-api.medtransdigital.com/dashboard/all_trans?bpr_id=${location.state.bprChoice}&nosbb=${location.state.transChoice}&status=${location.state.statusChoice}&fr=${location.state.fr}&to=${location.state.to}`,
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data.length) {
          handleExport(res.data)
        }
      })
      .catch((err) => console.error(err))
  }

  const handleExport = (data) => {
    // console.log(data)
    var wb = XLSX.utils.book_new()
    var ws = XLSX.utils.json_to_sheet(data)

    XLSX.utils.book_append_sheet(wb, ws, `Sheet1`)

    XLSX.writeFile(wb, `History_Transaction_${moment().format('YYMMDD_HHmmss')}.xlsx`)
  }

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
                    <CTableHeaderCell>No SBB</CTableHeaderCell>
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
                        <div>{item.nosbb}</div>
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
                      <CTableDataCell style={{ textAlign: 'right' }}>
                        <div>{formatRibuan(item.amount_db)}</div>
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: 'right' }}>
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
              <CPagination aria-label="Page navigation example">
                <CPaginationItem aria-label="Previous" disabled>
                  <span aria-hidden="true">&laquo;</span>
                </CPaginationItem>
                {total.map((item, index) => (
                  <CPaginationItem onClick={() => handlePage(item)} value={item} key={index}>
                    {item}
                  </CPaginationItem>
                ))}
                <CPaginationItem aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </CPaginationItem>
              </CPagination>
              <CButton color="success" className="me-2 my-3" onClick={getData}>
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
