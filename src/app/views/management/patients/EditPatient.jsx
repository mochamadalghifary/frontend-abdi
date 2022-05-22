import {
  IconButton,
  Button,
  Grid,
  Icon,
} from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { delPatient, putPatient } from 'app/services/patients'
import { ValidatorForm } from 'react-material-ui-form-validator'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Delete, Save } from '@mui/icons-material';

const EditPatient = (patient) => {
  const [open, setOpen] = React.useState(false)

  function handleClose() {
    setOpen(false)
  }

  const [message, setMessage] = useState('')
  const [editPatient, setPatient] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    date: '',
  })

  const handleClick = (patient) => {
    setOpen(true)
    patient.date = patient.birth
    setPatient(patient)
  }

  const handleChange = ({ target: { name, value } }) => {
    let temp = { ...editPatient }
    temp[name] = value
    setPatient(temp)
  }

  const handleSubmit = async (event) => {
    setOpen(false)
    try {
      await putPatient(editPatient)
      window.location.reload();
    } catch (e) {
      console.log(e)
      setMessage(e.message)
      alert(message)
    }
  }

  const handleDateChange = (date) => {
    setPatient({ ...editPatient, date })
  }

  const handleDelete = async (event) => {
    if (window.confirm('Anda yakin ingin menghapus?'))
      setOpen(false)
    try {
      await delPatient(editPatient.id)
      window.location.reload();
    } catch (e) {
      console.log(e)
      setMessage(e.message)
      alert(e.message)
    }
  }

  return (
    <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
      <IconButton onClick={() => handleClick(patient.patient)}>
        <Icon color="primary">edit</Icon>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{patient.patient.name}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Nama"
                onChange={handleChange}
                type="text"
                name="name"
                value={editPatient.name || ''}
                validators={['required']}
                errorMessages={['this field is required']}
                fullWidth
              // margin='normal'
              />

              <TextField
                multiline="true"
                label="Deskripsi"
                onChange={handleChange}
                type="textarea"
                name="description"
                rows={5}
                value={editPatient.description || ''}
                errorMessages={['this field is required']}
                fullWidth
                margin='normal'
              />

            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextField
                multiline="true"
                label="Alamat"
                onChange={handleChange}
                type="textarea"
                name="address"
                value={editPatient.address || ''}
                errorMessages={['this field is required']}
                fullWidth
              // margin='normal'
              />

              <TextField
                label="Nomor WhatsApp"
                onChange={handleChange}
                type="text"
                name="phone"
                value={editPatient.phone || ''}
                errorMessages={['this field is required']}
                fullWidth
                margin='normal'
              />

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={editPatient.date}
                  onChange={handleDateChange}
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      // variant="Outlined"
                      id="mui-pickers-date"
                      label="Tanggal Lahir"
                      sx={{ mb: 2, width: '100%' }}
                      fullWidth
                      margin='normal'
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <div style={{ margin: "14px" }}>
          <DialogActions>
            <Button
              variant="outlined"
              color="error"
              onClick={handleClose}
            >
              Batal
            </Button>
            <Button
              startIcon={<Delete />}
              onClick={handleDelete}
              color="error"
              variant="contained"
              type="submit"
            >
              Hapus
            </Button>
            <Button
              startIcon={<Save />}
              onClick={handleSubmit}
              color="primary"
              variant="contained"
              type="submit"
            >
              Simpan
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </ValidatorForm>
  )
}

export default EditPatient
