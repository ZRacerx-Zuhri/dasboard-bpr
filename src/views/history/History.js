import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormLabel,
  CFormSelect,
  CRow,
  // CFormCheck,
  // CFormInput,
  // CInputGroup,
  // CInputGroupText,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const History = () => {
  const [bprChoice, setBprChoice] = useState('')
  const [transChoice, setTransChoice] = useState('')
  const [statusChoice, setStatusChoice] = useState('')
  const [bpr, setBpr] = useState([])
  const [YFR, setYFR] = useState('')
  const [MFR, setMFR] = useState('')
  const [DFR, setDFR] = useState('')
  const [YTO, setYTO] = useState('')
  const [MTO, setMTO] = useState('')
  const [DTO, setDTO] = useState('')
  const [SDFR, setSDFR] = useState([])
  const [SDTO, setSDTO] = useState([])
  const [SMTO, setSMTO] = useState([])
  const [TO, setTO] = useState(true)
  const UserLogin = useSelector((state) => state.UserLogin)
  const navigate = useNavigate()

  const month = [
    {
      id: '01',
      text: 'Januari',
    },
    {
      id: '02',
      text: 'Februari',
    },
    {
      id: '03',
      text: 'Maret',
    },
    {
      id: '04',
      text: 'April',
    },
    {
      id: '05',
      text: 'Mei',
    },
    {
      id: '06',
      text: 'Juni',
    },
    {
      id: '07',
      text: 'Juli',
    },
    {
      id: '08',
      text: 'Agustus',
    },
    {
      id: '09',
      text: 'September',
    },
    {
      id: '10',
      text: 'Oktober',
    },
    {
      id: '11',
      text: 'November',
    },
    {
      id: '12',
      text: 'Desember',
    },
  ]

  useEffect(() => {
    if (UserLogin.success) {
      fetch('https://gw-dev-api.medtransdigital.com/dashboard/list_bpr')
        .then((res) => res.json())
        .then((res) => {
          setBpr(res.data)
        })
        .catch((err) => console.error(err))
    } else {
      navigate(`/login`, {})
    }
  }, [UserLogin.success, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (bprChoice !== '' && transChoice !== '' && statusChoice !== '') {
      let dateFR, dateTO
      dateFR = parseInt(YFR) * 2000 * 30 * 4 + parseInt(MFR) * 30 + parseInt(DFR)
      dateTO = parseInt(YTO) * 2000 * 30 * 4 + parseInt(MTO) * 30 + parseInt(DTO)
      console.log(dateFR)
      console.log(dateTO)
      if (dateTO - dateFR > 30) {
        alert('Tanggal Melebihi Range 30 Hari')
      } else {
        navigate(`/history/detail/${bprChoice}/${transChoice}/${statusChoice}/1`, {
          state: {
            bprChoice,
            transChoice,
            statusChoice,
            fr: `20${YFR}-${MFR}-${DFR} 00:00:00`,
            to: `20${YTO}-${MTO}-${DTO} 23:59:59`,
            page: 1,
          },
        })
      }
    }
  }

  const handleChange1 = (e) => {
    setBprChoice(e.target.value)
  }

  const handleChange2 = (e) => {
    setTransChoice(e.target.value)
  }

  const handleChange3 = (e) => {
    setStatusChoice(e.target.value)
  }

  const handleChangeMFR = (e) => {
    setMFR(e.target.value)
    if (
      e.target.value === '01' ||
      e.target.value === '03' ||
      e.target.value === '05' ||
      e.target.value === '07' ||
      e.target.value === '08' ||
      e.target.value === '10' ||
      e.target.value === '12'
    ) {
      let day = []
      for (let i = 0; i < 31; i++) {
        if (i < 9) {
          day.push(`0${i + 1}`)
        } else {
          day.push(i + 1)
        }
      }
      setSDFR(day)
    } else if (
      e.target.value === '04' ||
      e.target.value === '06' ||
      e.target.value === '09' ||
      e.target.value === '11'
    ) {
      let day = []
      for (let i = 0; i < 30; i++) {
        if (i < 9) {
          day.push(`0${i + 1}`)
        } else {
          day.push(i + 1)
        }
      }
      setSDFR(day)
    } else {
      let day = []
      for (let i = 0; i < 28; i++) {
        if (i < 9) {
          day.push(`0${i + 1}`)
        } else {
          day.push(i + 1)
        }
      }
      setSDFR(day)
    }
    let newMonth = []
    for (let i = 0; i < month.length; i++) {
      if (i + 1 >= parseInt(e.target.value)) {
        console.log(month[i])
        newMonth.push(month[i])
      }
    }
    setSMTO(newMonth)
    if (e.target.value !== '' && DFR !== '' && YFR !== '') {
      setTO(false)
    } else {
      setTO(true)
    }
  }

  const handleChangeDFR = (e) => {
    setDFR(e.target.value)
    if (MFR !== '' && e.target.value !== '' && YFR !== '') {
      setTO(false)
    } else {
      setTO(true)
    }
  }

  const handleChangeYFR = (e) => {
    setYFR(e.target.value)
    if (MFR !== '' && DFR !== '' && e.target.value !== '') {
      setTO(false)
    } else {
      setTO(true)
    }
  }

  const handleChangeMTO = (e) => {
    setMTO(e.target.value)
    if (
      e.target.value === '01' ||
      e.target.value === '03' ||
      e.target.value === '05' ||
      e.target.value === '07' ||
      e.target.value === '08' ||
      e.target.value === '10' ||
      e.target.value === '12'
    ) {
      let day = []
      if (e.target.value === MFR) {
        for (let i = parseInt(DFR) - 1; i < 31; i++) {
          if (i < 9) {
            day.push(`0${i + 1}`)
          } else {
            day.push(i + 1)
          }
        }
      } else {
        for (let i = 0; i < 31; i++) {
          if (i < 9) {
            day.push(`0${i + 1}`)
          } else {
            day.push(i + 1)
          }
        }
      }
      setSDTO(day)
    } else if (
      e.target.value === '04' ||
      e.target.value === '06' ||
      e.target.value === '09' ||
      e.target.value === '11'
    ) {
      let day = []
      if (e.target.value === MFR) {
        for (let i = parseInt(DFR) - 1; i < 30; i++) {
          if (i < 9) {
            day.push(`0${i + 1}`)
          } else {
            day.push(i + 1)
          }
        }
      } else {
        for (let i = 0; i < 30; i++) {
          if (i < 9) {
            day.push(`0${i + 1}`)
          } else {
            day.push(i + 1)
          }
        }
      }
      setSDTO(day)
    } else {
      let day = []
      if (e.target.value === MFR) {
        for (let i = parseInt(DFR) - 1; i < 28; i++) {
          if (i < 9) {
            day.push(`0${i + 1}`)
          } else {
            day.push(i + 1)
          }
        }
      } else {
        for (let i = 0; i < 28; i++) {
          if (i < 9) {
            day.push(`0${i + 1}`)
          } else {
            day.push(i + 1)
          }
        }
      }
      setSDTO(day)
    }
  }

  const handleChangeDTO = (e) => {
    setDTO(e.target.value)
  }

  const handleChangeYTO = (e) => {
    setYTO(e.target.value)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Transaction History</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
              <CCol xs={12}>
                <CFormLabel htmlFor="inputState">Pilih BPR</CFormLabel>
                <CFormSelect id="inputState" onChange={handleChange1}>
                  <option value="">-</option>
                  {bpr.map((item, index) => (
                    <option value={item.bpr_id} key={index}>
                      {item.bpr_id} - {item.nama_bpr}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="inputState">Rekening</CFormLabel>
                <CFormSelect id="inputState" onChange={handleChange2}>
                  <option value="">-</option>
                  <option value="all">All</option>
                  <option value="100204">100204 PENAMPUNGAN TUNAI</option>
                  <option value="100205">100205 PENAMPUNGAN FEE TUNAI</option>
                  <option value="101206">100206 REK OY ATM</option>
                  <option value="101207">100207 REK OY FEE TUNAI</option>
                  <option value="101208">100208 TAGIHAN TUNAI ANTAR BANK</option>
                  <option value="101209">100209 KEWAJIBAN TUNAI ANTAR BANK</option>
                  <option value="210201">210201 PENAMPUNG OY TRANSFER</option>
                  <option value="210202">210202 PENAMPUNG OY FEE TRANSFER</option>
                  <option value="220203">220203 TAGIHAN OY TRF CR</option>
                  <option value="500201">500201 PENAMPUNG OY PPOB</option>
                  <option value="500202">500202 PENAMPUNG OY PPOB FEE</option>
                </CFormSelect>
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="inputState">Status</CFormLabel>
                <CFormSelect id="inputState" onChange={handleChange3}>
                  <option value="">-</option>
                  <option value="all">All</option>
                  <option value="1">Approved</option>
                  <option value="R">Reversed</option>
                </CFormSelect>
              </CCol>
              <hr></hr>
              <strong className="my-0">Dari</strong>
              <CCol md={4}>
                <CFormLabel htmlFor="inputState">Bulan</CFormLabel>
                <CFormSelect id="inputState" onChange={handleChangeMFR}>
                  <option value="">-</option>
                  <option value="01">Januari</option>
                  <option value="02">Februari</option>
                  <option value="03">Maret</option>
                  <option value="04">April</option>
                  <option value="05">Mei</option>
                  <option value="06">Juni</option>
                  <option value="07">Juli</option>
                  <option value="08">Agustus</option>
                  <option value="09">September</option>
                  <option value="10">Oktober</option>
                  <option value="11">November</option>
                  <option value="12">Desember</option>
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="inputState">Tanggal</CFormLabel>
                <CFormSelect id="inputState" onChange={handleChangeDFR}>
                  <option value="">-</option>
                  {SDFR.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="inputState">Tahun</CFormLabel>
                <CFormSelect id="inputState" onChange={handleChangeYFR}>
                  <option value="">-</option>
                  <option value="23">2023</option>
                </CFormSelect>
              </CCol>
              <hr></hr>
              <strong className="my-0">Sampai</strong>
              <CCol md={4}>
                <CFormLabel htmlFor="inputState">Bulan</CFormLabel>
                <CFormSelect id="inputState" disabled={TO} onChange={handleChangeMTO}>
                  <option value="">-</option>
                  {SMTO.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.text}
                    </option>
                  ))}
                  {/* <option value="01">Januari</option>
                  <option value="02">Februari</option>
                  <option value="03">Maret</option>
                  <option value="04">April</option>
                  <option value="05">Mei</option>
                  <option value="06">Juni</option>
                  <option value="07">Juli</option>
                  <option value="08">Agustus</option>
                  <option value="09">September</option>
                  <option value="10">Oktober</option>
                  <option value="11">November</option>
                  <option value="12">Desember</option> */}
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="inputState">Tanggal</CFormLabel>
                <CFormSelect id="inputState" disabled={TO} onChange={handleChangeDTO}>
                  <option value="">-</option>
                  {SDTO.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="inputState">Tahun</CFormLabel>
                <CFormSelect id="inputState" disabled={TO} onChange={handleChangeYTO}>
                  <option value="">-</option>
                  <option value="23">2023</option>
                </CFormSelect>
              </CCol>
              <CButton type="submit" className="mt-4" onClick={handleSubmit}>
                Search
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default History
