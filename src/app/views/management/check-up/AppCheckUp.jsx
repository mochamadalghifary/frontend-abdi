import React from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
import PaginationCheckUp from './PaginationCheckUp'

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

const AppCheckUp = () => {
  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Manajemen', path: '/manajemen' },
            { name: 'Riwayat Pemeriksaan' },
          ]}
        />
      </div>
      <Box py="12px" />
      <SimpleCard title="Riwayat Pemeriksaan">
        <PaginationCheckUp />
      </SimpleCard>
    </Container>
  )
}

export default AppCheckUp
