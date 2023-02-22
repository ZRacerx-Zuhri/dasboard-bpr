import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'

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

const DetailKonsolidasi = () => {
  const [TarTun, setTarTun] = useState([])
  const [Transfer, setTransfer] = useState([])
  const [PPOB, setPPOB] = useState([])
  const [totalDb1, setTotalDb1] = useState(0)
  const [totalCr1, setTotalCr1] = useState(0)
  const [totalDif1, setTotalDif1] = useState(0)
  const [totalDb2, setTotalDb2] = useState(0)
  const [totalCr2, setTotalCr2] = useState(0)
  const [totalDif2, setTotalDif2] = useState(0)
  const [totalDb3, setTotalDb3] = useState(0)
  const [totalCr3, setTotalCr3] = useState(0)
  const [totalDif3, setTotalDif3] = useState(0)
  const [bpr, setBpr] = useState('')
  // let { bpr_id } = useParams()

  useEffect(() => {
    const fetchTartun = async () => {
      await fetch(`https://gw-dev-api.medtransdigital.com/dashboard/get_konsol?trx=tariktunai`)
        .then((res) => res.json())
        .then((res) => {
          let totalAmountDb = 0
          for (let i = 0; i < res.data.length; i++) {
            totalAmountDb = totalAmountDb + parseInt(res.data[i].total_db)
          }
          let totalAmountCr = 0
          for (let i = 0; i < res.data.length; i++) {
            totalAmountCr = totalAmountCr + parseInt(res.data[i].total_cr)
          }
          let totalAmountDif = 0
          for (let i = 0; i < res.data.length; i++) {
            totalAmountDif = totalAmountDif + parseInt(res.data[i].total_selisih)
          }
          setTotalDb1(totalAmountDb)
          setTotalCr1(totalAmountCr)
          setTotalDif1(totalAmountDif)
          setTarTun(res.data)
          setBpr(res.bpr)
        })
        .catch((err) => console.error(err))
    }
    const fetchTransfer = async () => {
      await fetch(`https://gw-dev-api.medtransdigital.com/dashboard/get_konsol?trx=transfer`)
        .then((res) => res.json())
        .then((res) => {
          let totalAmountDb = 0
          for (let i = 0; i < res.data.length; i++) {
            totalAmountDb = totalAmountDb + parseInt(res.data[i].total_db)
          }
          let totalAmountCr = 0
          for (let i = 0; i < res.data.length; i++) {
            totalAmountCr = totalAmountCr + parseInt(res.data[i].total_cr)
          }
          let totalAmountDif = 0
          for (let i = 0; i < res.data.length; i++) {
            totalAmountDif = totalAmountDif + parseInt(res.data[i].total_selisih)
          }
          setTotalDb2(totalAmountDb)
          setTotalCr2(totalAmountCr)
          setTotalDif2(totalAmountDif)
          setTransfer(res.data)
        })
        .catch((err) => console.error(err))
    }
    const fetchPpob = async () => {
      await fetch(`https://gw-dev-api.medtransdigital.com/dashboard/get_konsol?trx=ppob`)
        .then((res) => res.json())
        .then((res) => {
          let totalAmountDb = 0
          for (let i = 0; i < res.data.length; i++) {
            totalAmountDb = totalAmountDb + parseInt(res.data[i].total_db)
          }
          let totalAmountCr = 0
          for (let i = 0; i < res.data.length; i++) {
            totalAmountCr = totalAmountCr + parseInt(res.data[i].total_cr)
          }
          let totalAmountDif = 0
          for (let i = 0; i < res.data.length; i++) {
            totalAmountDif = totalAmountDif + parseInt(res.data[i].total_selisih)
          }
          setTotalDb3(totalAmountDb)
          setTotalCr3(totalAmountCr)
          setTotalDif3(totalAmountDif)
          setPPOB(res.data)
        })
        .catch((err) => console.error(err))
    }
    fetchTartun()
    fetchTransfer()
    fetchPpob()
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
                    <CTableHeaderCell>Nama Rekening</CTableHeaderCell>
                    <CTableHeaderCell style={{ textAlign: 'right' }}>Debit Rp.</CTableHeaderCell>
                    <CTableHeaderCell style={{ textAlign: 'right' }}>Kredit Rp.</CTableHeaderCell>
                    <CTableHeaderCell style={{ textAlign: 'right' }}>Selisih Rp.</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {TarTun.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{item.keterangan}</div>
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: 'right' }}>
                        <div>{formatRibuan(parseInt(item.total_db))}</div>
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: 'right' }}>
                        <div>{formatRibuan(parseInt(item.total_cr))}</div>
                      </CTableDataCell>
                      {item.total_selisih >= 0 ? (
                        <CTableDataCell style={{ textAlign: 'right', color: 'green' }}>
                          <div>{formatRibuan(parseInt(item.total_selisih))}</div>
                        </CTableDataCell>
                      ) : (
                        <CTableDataCell style={{ textAlign: 'right', color: 'red' }}>
                          <div>{formatRibuan(parseInt(item.total_selisih))}</div>
                        </CTableDataCell>
                      )}
                    </CTableRow>
                  ))}
                  <CTableRow>
                    <CTableDataCell>
                      <div>Total Saldo</div>
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'right' }}>
                      <div>{formatRibuan(totalDb1)}</div>
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'right' }}>
                      <div>{formatRibuan(totalCr1)}</div>
                    </CTableDataCell>
                    {totalDif1 >= 0 ? (
                      <CTableDataCell style={{ textAlign: 'right', color: 'green' }}>
                        <div>{formatRibuan(totalDif1)}</div>
                      </CTableDataCell>
                    ) : (
                      <CTableDataCell style={{ textAlign: 'right', color: 'red' }}>
                        <div>{formatRibuan(totalDif1)}</div>
                      </CTableDataCell>
                    )}
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
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
                    <CTableHeaderCell>Nama Rekening</CTableHeaderCell>
                    <CTableHeaderCell style={{ textAlign: 'right' }}>Debit Rp.</CTableHeaderCell>
                    <CTableHeaderCell style={{ textAlign: 'right' }}>Kredit Rp.</CTableHeaderCell>
                    <CTableHeaderCell style={{ textAlign: 'right' }}>Selisih Rp.</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {Transfer.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{item.keterangan}</div>
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: 'right' }}>
                        <div>{formatRibuan(parseInt(item.total_db))}</div>
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: 'right' }}>
                        <div>{formatRibuan(parseInt(item.total_cr))}</div>
                      </CTableDataCell>
                      {item.total_selisih >= 0 ? (
                        <CTableDataCell style={{ textAlign: 'right', color: 'green' }}>
                          <div>{formatRibuan(parseInt(item.total_selisih))}</div>
                        </CTableDataCell>
                      ) : (
                        <CTableDataCell style={{ textAlign: 'right', color: 'red' }}>
                          <div>{formatRibuan(parseInt(item.total_selisih))}</div>
                        </CTableDataCell>
                      )}
                    </CTableRow>
                  ))}
                  <CTableRow>
                    <CTableDataCell>
                      <div>Total Saldo</div>
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'right' }}>
                      <div>{formatRibuan(totalDb2)}</div>
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'right' }}>
                      <div>{formatRibuan(totalCr2)}</div>
                    </CTableDataCell>
                    {totalDif2 >= 0 ? (
                      <CTableDataCell style={{ textAlign: 'right', color: 'green' }}>
                        <div>{formatRibuan(totalDif2)}</div>
                      </CTableDataCell>
                    ) : (
                      <CTableDataCell style={{ textAlign: 'right', color: 'red' }}>
                        <div>{formatRibuan(totalDif2)}</div>
                      </CTableDataCell>
                    )}
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
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
                    <CTableHeaderCell>Nama Rekening</CTableHeaderCell>
                    <CTableHeaderCell style={{ textAlign: 'right' }}>Debit Rp.</CTableHeaderCell>
                    <CTableHeaderCell style={{ textAlign: 'right' }}>Kredit Rp.</CTableHeaderCell>
                    <CTableHeaderCell style={{ textAlign: 'right' }}>Selisih Rp.</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {PPOB.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{item.keterangan}</div>
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: 'right' }}>
                        <div>{formatRibuan(parseInt(item.total_db))}</div>
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: 'right' }}>
                        <div>{formatRibuan(parseInt(item.total_cr))}</div>
                      </CTableDataCell>
                      {item.total_selisih >= 0 ? (
                        <CTableDataCell style={{ textAlign: 'right', color: 'green' }}>
                          <div>{formatRibuan(parseInt(item.total_selisih))}</div>
                        </CTableDataCell>
                      ) : (
                        <CTableDataCell style={{ textAlign: 'right', color: 'red' }}>
                          <div>{formatRibuan(parseInt(item.total_selisih))}</div>
                        </CTableDataCell>
                      )}
                    </CTableRow>
                  ))}
                  <CTableRow>
                    <CTableDataCell>
                      <div>Total Saldo</div>
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'right' }}>
                      <div>{formatRibuan(totalDb3)}</div>
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'right' }}>
                      <div>{formatRibuan(totalCr3)}</div>
                    </CTableDataCell>
                    {totalDif3 >= 0 ? (
                      <CTableDataCell style={{ textAlign: 'right', color: 'green' }}>
                        <div>{formatRibuan(totalDif3)}</div>
                      </CTableDataCell>
                    ) : (
                      <CTableDataCell style={{ textAlign: 'right', color: 'red' }}>
                        <div>{formatRibuan(totalDif3)}</div>
                      </CTableDataCell>
                    )}
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

export default DetailKonsolidasi
