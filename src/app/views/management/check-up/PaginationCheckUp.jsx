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
import { delCheckUp, getCheckUps } from 'app/services/check-up'

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

const PaginationCheckUp = () => {
  const [checkUps, setCheckUps] = useState([])
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [page, setPage] = React.useState(0)
  const [search, setSearch] = React.useState('')

  useEffect(() => {
    let mounted = true

    getCheckUps()
      .then(data => {
        if (mounted) {
          setCheckUps(data)
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

  const handleDelete = async (id) => {
    if (window.confirm('Anda yakin ingin menghapus?'))
    try {
      await delCheckUp(id)
      window.location.reload();
    } catch (e) {
      console.log(e)
      alert(e.message)
    }
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
            <TableCell>Sakit</TableCell>
            <TableCell>Deskripsi</TableCell>
            <TableCell>Tgl. Pendaftaran</TableCell>
            <TableCell>Aksi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {checkUps
          .filter(
            checkUp => checkUp.patient.name.toLowerCase().includes(search.toLowerCase()))
          .slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )
          .map((checkUp, index) => (
            <TableRow key={index}>
              <TableCell align="left">{checkUp.patient.name}</TableCell>
              <TableCell align="left">{checkUp.ilness}</TableCell>
              <TableCell align="left">{checkUp.description}</TableCell>
              <TableCell>{checkUp.createdAt.slice(0, 10)}</TableCell>
              <TableCell>
                <IconButton onClick={() =>  handleDelete(checkUp.id)}>
                  <Icon color='error'>delete</Icon>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        rowsPerPageOptions={[5, 10, 25, checkUps.length]}
        component="div"
        count={checkUps.length}
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

export default PaginationCheckUp
