import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  // CContainer,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
const moment = require('moment')
moment.locale('id')

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [notel, setNotel] = useState('')
  const [bday, setBday] = useState('')
  const [gender, setGender] = useState('')
  const [YFR, setYFR] = useState('')
  const [MFR, setMFR] = useState('')
  const [DFR, setDFR] = useState('')
  const [SDFR, setSDFR] = useState([])
  const [SYFR, setSYFR] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const UserLogin = useSelector((state) => state.UserLogin)

  // useEffect(() => {
  //   if (UserLogin.success) {
  //     console.log('Test', UserLogin)
  //     navigate(`/`, {})
  //   }
  // }, [UserLogin.success, UserLogin, navigate])

  const handlerRegister = (e) => {
    let data = {
      token: "715f8ab555438f985b579844ea998866",
      nama,
      email,
      notel,
      bday: `${YFR}-${MFR}-${DFR}`,
      gender,
      username,
      password,
    }
    console.log(data)
    // fetch('https://gw-dev-api.medtransdigital.com/dashboard/list_bpr')
    //   .then((res) => res.json())
    //   .then((res) => {
    //     // setBpr(res.data)
    //   })
    //   .catch((err) => console.error(err))
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
    // let newMonth = []
    // for (let i = 0; i < month.length; i++) {
    //   if (i + 1 >= parseInt(e.target.value)) {
    //     console.log(month[i])
    //     newMonth.push(month[i])
    //   }
    // }
    // setSMTO(newMonth)
    // if (e.target.value !== '' && DFR !== '' && YFR !== '') {
    //   setTO(false)
    // } else {
    //   setTO(true)
    // }
  }

  const handleChangeDFR = (e) => {
    setDFR(e.target.value)
    let year = []
    for (let i = 1900; i < 2024; i++) {
      year.push(i)
    }
    setSYFR(year)
  }

  const handleChangeYFR = (e) => {
    setYFR(e.target.value)
    // if (MFR !== '' && DFR !== '' && e.target.value !== '') {
    //   setTO(false)
    // } else {
    //   setTO(true)
    // }
  }

  return (
    <>
      <CRow className="justify-content-center">
        <CCol md={9} lg={7} xl={6}>
          <CCard className="mx-4">
            <CCardBody className="p-4">
              <CForm>
                {/* "token": "715f8ab555438f985b579844ea998866",
  "nama_lengkap": "Edi Kurniawan",
  "nomor_ponsel": "085642990880",
  "email": "edi.cybereye@gmail.com",
  "tgl_lahir": "1989-07-22",
  "jk": "L",
  "username": "edicybereye",
  "password": "cobaaja@123" */}
                <h1>Register</h1>
                <p className="text-medium-emphasis">Create your account</p>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Nama Lengkap"
                    onChange={(e) => {
                      setNama(e.target.value)
                    }}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Nomor Handphone"
                    onChange={(e) => {
                      setNotel(e.target.value)
                    }}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Email"
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  {/* <CFormInput
                    placeholder="Tanggal Lahir"
                    onChange={(e) => {
                      setBday(e.target.value)
                    }}
                  /> */}
                  <CCol md={4}>
                    <CFormLabel htmlFor="inputState">Tanggal Lahir</CFormLabel>
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
                    <CFormLabel htmlFor="inputState"></CFormLabel>
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
                    <CFormLabel htmlFor="inputState"></CFormLabel>
                    <CFormSelect id="inputState" onChange={handleChangeYFR}>
                      <option value="">-</option>
                      {SYFR.map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormCheck
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    label="Laki-laki"
                    onClick={() => {
                      setGender('Laki-laki')
                    }}
                  />
                  <CFormCheck
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    label="Perempuan"
                    onClick={() => {
                      setGender('Perempuan')
                    }}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Username"
                    onChange={(e) => {
                      setUsername(e.target.value)
                    }}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                  />
                </CInputGroup>
                <div className="d-grid">
                  <CButton color="success" onClick={() => handlerRegister()}>
                    Create Account
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Register
