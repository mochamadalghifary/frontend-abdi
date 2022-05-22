import React from 'react'
import PaginationPatients from './PaginationPatients'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
import AddPatient from './AddPatient'

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: {
    margin: '16px',
  },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '16px',
    },
  },
}))

const Patients = () => {
  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Manajemen', path: '/manajemen' },
            { name: 'Pasien' },
          ]}
        />
      </div>
      <AddPatient />
      <Box py="12px" />
      <SimpleCard title="Pasien">
        <PaginationPatients />
      </SimpleCard>
    </Container>
  )
}

export default Patients
