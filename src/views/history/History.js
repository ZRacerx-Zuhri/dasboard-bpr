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
  const [TO, setTO] = useState(true)
  const UserLogin = useSelector((state) => state.UserLogin)
  const navigate = useNavigate()

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
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (bprChoice !== '' && transChoice !== '' && statusChoice !== '') {
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
                  {/* <option value="01">Januari</option> */}
                  <option value="02">Februari</option>
                  {/* <option value="03">Maret</option>
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
                <CFormSelect id="inputState" onChange={handleChangeDFR}>
                  <option value="">-</option>
                  {/* <option value="01">1</option>
                  <option value="02">2</option>
                  <option value="03">3</option>
                  <option value="04">4</option>
                  <option value="05">5</option>
                  <option value="06">6</option>
                  <option value="07">7</option>
                  <option value="08">8</option>
                  <option value="09">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option> */}
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  {/* <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option> */}
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
                  {/* <option value="01">Januari</option> */}
                  <option value="02">Februari</option>
                  {/* <option value="03">Maret</option>
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
                  {/* <option value="01">1</option>
                  <option value="02">2</option>
                  <option value="03">3</option>
                  <option value="04">4</option>
                  <option value="05">5</option>
                  <option value="06">6</option>
                  <option value="07">7</option>
                  <option value="08">8</option>
                  <option value="09">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option> */}
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  {/* <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option> */}
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
