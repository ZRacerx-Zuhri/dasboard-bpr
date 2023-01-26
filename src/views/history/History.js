import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

const History = () => {
  const [bprChoice, setBprChoice] = useState('')
  const [transChoice, setTransChoice] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (bprChoice !== '' && transChoice !== '') {
      navigate(`/history/detail/${bprChoice}/${transChoice}`, { state: { bprChoice, transChoice } })
    }
  }

  const handleChange1 = (e) => {
    setBprChoice(e.target.value)
  }

  const handleChange2 = (e) => {
    setTransChoice(e.target.value)
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
                  <option value="2640">BPR Angga</option>
                  {/* <option value="0931">BPR Indra</option> */}
                  {/* <option>BPR Garut</option> */}
                </CFormSelect>
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="inputState">Rekening</CFormLabel>
                <CFormSelect id="inputState" onChange={handleChange2}>
                  <option value="">-</option>
                  <option value="100204">100204</option>
                  <option value="100205">100205</option>
                  <option value="100206">100206</option>
                  <option value="100207">100207</option>
                  <option value="100208">100208</option>
                </CFormSelect>
              </CCol>
              <hr></hr>
              <strong className="my-0">From</strong>
              <CCol md={4}>
                <CFormLabel htmlFor="inputState">Bulan</CFormLabel>
                <CFormSelect id="inputState">
                  <option>Januari</option>
                  <option>Februari</option>
                  <option>Maret</option>
                  <option>April</option>
                  <option>Mei</option>
                  <option>Juni</option>
                  <option>Juli</option>
                  <option>Agustus</option>
                  <option>September</option>
                  <option>Oktober</option>
                  <option>November</option>
                  <option>Desember</option>
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="inputState">Tanggal</CFormLabel>
                <CFormSelect id="inputState">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                  <option>13</option>
                  <option>14</option>
                  <option>15</option>
                  <option>16</option>
                  <option>17</option>
                  <option>18</option>
                  <option>19</option>
                  <option>20</option>
                  <option>21</option>
                  <option>22</option>
                  <option>23</option>
                  <option>24</option>
                  <option>25</option>
                  <option>26</option>
                  <option>27</option>
                  <option>28</option>
                  <option>29</option>
                  <option>30</option>
                  <option>31</option>
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="inputState">Tahun</CFormLabel>
                <CFormSelect id="inputState">
                  <option>2020</option>
                  <option>2021</option>
                  <option>2022</option>
                  <option>2023</option>
                </CFormSelect>
              </CCol>
              <hr></hr>
              <strong className="my-0">To</strong>
              <CCol md={4}>
                <CFormLabel htmlFor="inputState">Bulan</CFormLabel>
                <CFormSelect id="inputState">
                  <option>Januari</option>
                  <option>Februari</option>
                  <option>Maret</option>
                  <option>April</option>
                  <option>Mei</option>
                  <option>Juni</option>
                  <option>Juli</option>
                  <option>Agustus</option>
                  <option>September</option>
                  <option>Oktober</option>
                  <option>November</option>
                  <option>Desember</option>
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="inputState">Tanggal</CFormLabel>
                <CFormSelect id="inputState">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                  <option>13</option>
                  <option>14</option>
                  <option>15</option>
                  <option>16</option>
                  <option>17</option>
                  <option>18</option>
                  <option>19</option>
                  <option>20</option>
                  <option>21</option>
                  <option>22</option>
                  <option>23</option>
                  <option>24</option>
                  <option>25</option>
                  <option>26</option>
                  <option>27</option>
                  <option>28</option>
                  <option>29</option>
                  <option>30</option>
                  <option>31</option>
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="inputState">Tahun</CFormLabel>
                <CFormSelect id="inputState">
                  <option>2020</option>
                  <option>2021</option>
                  <option>2022</option>
                  <option>2023</option>
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
