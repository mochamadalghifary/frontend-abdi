import {
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Icon,
  Paper,
  InputBase,
} from '@mui/material'
import React from 'react'
import { useEffect, useState } from 'react';
import { Box, styled } from '@mui/system'
import { getPatients } from 'app/services/patients'
import AddCheckUp from './AddCheckUp';
import EditPatient from './EditPatient';

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': {
      '& th': {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
  },
  '& tbody': {
    '& tr': {
      '& td': {
        paddingLeft: 0,
        textTransform: 'capitalize',
      },
    },
  },
}))

const PaginationPatients = () => {
  const [patients, setPatients] = useState([])
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [page, setPage] = React.useState(0)
  const [search, setSearch] = React.useState('')

  useEffect(() => {
    let mounted = true

    getPatients()
      .then(data => {
        if (mounted) {
          setPatients(data)
        }
      })

    return () => mounted = false
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Box width="100%" overflow="auto">
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Cari berdasarkan nama"
          inputProps={{ 'aria-label': 'Cari berdasarkan nama' }}
          onChange={e => setSearch(e.target.value)}
        />
        <IconButton sx={{ p: '10px' }} aria-label="search" fullWidth>
          <Icon >search</Icon>
        </IconButton>
      </Paper>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>Nama</TableCell>
            <TableCell>Deskripsi</TableCell>
            <TableCell>Tgl. Lahir</TableCell>
            <TableCell>Alamat</TableCell>
            <TableCell>WhatsApp</TableCell>
            <TableCell>Tgl. Pendaftaran</TableCell>
            <TableCell>Aksi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients
          .filter(
            patient => patient.name.toLowerCase().includes(search.toLowerCase()))
          .slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )
          .map((patient, index) => (
            <TableRow key={index}>
              <TableCell align="left">{patient.name}</TableCell>
              <TableCell align="left">{patient.description}</TableCell>
              <TableCell align="left">{patient.birth.slice(0, 10)}</TableCell>
              <TableCell>{patient.address}</TableCell>
              <TableCell>{patient.phone}</TableCell>
              <TableCell>{patient.createdAt.slice(0, 10)}</TableCell>
              <TableCell>
                <AddCheckUp patient={patient} />
                <EditPatient patient={patient} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        rowsPerPageOptions={[5, 10, 25, patients.length]}
        component="div"
        count={patients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  )
}

export default PaginationPatients
