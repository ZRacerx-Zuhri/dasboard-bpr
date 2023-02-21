import React, { useState, useEffect } from 'react'
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
  const [statusChoice, setStatusChoice] = useState('')
  const [bpr, setBpr] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    fetch('https://gw-dev-api.medtransdigital.com/dashboard/list_bpr')
      .then((res) => res.json())
      .then((res) => {
        setBpr(res.data)
      })
      .catch((err) => console.error(err))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (bprChoice !== '' && transChoice !== '') {
      navigate(`/history/detail/${bprChoice}/${transChoice}/${statusChoice}`, {
        state: { bprChoice, transChoice, statusChoice },
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
