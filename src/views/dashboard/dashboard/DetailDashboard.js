import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

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
  const [total, setTotal] = useState(0)
  const [bpr, setBpr] = useState('')
  let { bpr_id } = useParams()

  useEffect(() => {
    fetch(`https://gw-dev-api.medtransdigital.com/dashboard/get_gl?bpr_id=${bpr_id}`)
      .then((res) => res.json())
      .then((res) => {
        let totalAmount = 0
        for (let i = 0; i < res.data.length; i++) {
          totalAmount = totalAmount + parseInt(res.data[i].saldoakhir)
        }
        setRek(res.data)
        setTotal(totalAmount)
        setBpr(res.nama)
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
      var separator = sisa ? '.' : ''
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
              <strong>{bpr}</strong>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">Nama Rekening</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Nomer Rekening</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Total Saldo</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {rek.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{item.nama_rek}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.no_rek}</div>
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: 'right' }}>
                        <div>Rp. {formatRibuan(parseInt(item.saldoakhir))}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                  <CTableRow>
                    <CTableDataCell colSpan={2}>
                      <div>Total Saldo</div>
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'right' }}>
                      <div>Rp. {formatRibuan(total)}</div>
                    </CTableDataCell>
                  </CTableRow>
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
