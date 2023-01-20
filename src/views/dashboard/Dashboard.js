import React, { useState } from 'react'

import {
  CCard,
  CCardBody,
  CButton,
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
import CIcon from '@coreui/icons-react'
import { cilLoopCircular } from '@coreui/icons'
import { useFetch } from '../../action'

const Dashboard = () => {
  const [bpr, setBpr] = useState([])
  const url = 'https://gw-dev-api.medtransdigital.com/dashboard/list_bpr'
  useFetch({ url, onSuccess: (data) => setBpr(data.data) })

  // useEffect(() => {
  //   console.log(data)
  //   if (data == bpr) {
  //     fetch()
  //       .then((response) => response.json())
  //       .then((data) => setBpr(data.data))
  //   }
  // }, bpr)

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>List BPR</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Nama BPR</CTableHeaderCell>
                    <CTableHeaderCell>Kode BPR</CTableHeaderCell>
                    <CTableHeaderCell>Total Saldo</CTableHeaderCell>
                    <CTableHeaderCell>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {bpr.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{item.nama_bpr}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.bpr_id}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>Rp. {item.saldo}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        { item.bpr_id === "1001" ? (
                          <CButton
                            component="a"
                            color="primary"
                            href="#/dashboard/detail"
                            role="button"
                            className="me-2"
                          >
                            Detail
                          </CButton>
                        ) : (
                          <div></div>
                        )}
                        <CButton component="a" color="primary" role="button">
                          <CIcon icon={cilLoopCircular} className="me-1" />
                          Update
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard