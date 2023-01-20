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
  const [userChoice, setUserChoice] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (userChoice !== '') {
      navigate('/history/detail', { state: { userChoice } })
    }
  }

  const handleChange = (e) => {
    console.log(e.target.value)
    setUserChoice(e.target.value)
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
                <CFormSelect id="inputState">
                  <option>BPR Angga</option>
                  {/* <option>BPR Garut</option> */}
                </CFormSelect>
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="inputState">Jenis Transaksi</CFormLabel>
                <CFormSelect id="inputState" onChange={handleChange}>
                  <option value=""></option>
                  <option value="1%">Tarik Tunai</option>
                  <option value="5%">PPOB</option>
                  <option value="2%">Transfer</option>
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
              <CButton
                type="submit"
                className="mt-4"
                href="#/detail/history"
                onClick={handleSubmit}
              >
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
