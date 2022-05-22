import React, { useState } from 'react'
import {
  Button,
  Grid,
  Icon,
  IconButton,
} from '@mui/material'
import { ValidatorForm } from 'react-material-ui-form-validator'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import { postPatients } from 'app/services/patients'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Save } from '@mui/icons-material'

const AddPatient = () => {
  const [open, setOpen] = React.useState(false)
  const [message, setMessage] = useState('')
  const [patient, setPatient] = useState({
    firstName: '',
    description: '',
    address: '',
    phone: '',
    date: new Date(),
  })

  function handleClickOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  const handleChange = ({ target: { name, value } }) => {
    let temp = { ...patient }
    temp[name] = value
    setPatient(temp)
  }

  const handleSubmit = async (event) => {
    setOpen(false)
    try {
      await postPatients(patient)
      alert('Berhasil menambahkan pasien', message)
      window.location.reload();
    } catch (e) {
      console.log(e)
      setMessage(e.message)
    }
  }

  const handleDateChange = (date) => {
    setPatient({ ...patient, date })
  }

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
      <Button
        onClick={handleClickOpen}
      >
        <IconButton size="small" color="primary" aria-label="Add">
          <Icon>add_circle</Icon>
        </IconButton>
        Tambah Pasien
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Tambah Pasien</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Nama"
                onChange={handleChange}
                type="text"
                name="firstName"
                value={patient.firstName || ''}
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
                value={patient.description || ''}
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
                value={patient.address || ''}
                errorMessages={['this field is required']}
                fullWidth
                // margin='normal'
              />

              <TextField
                label="Nomor WhatsApp"
                onChange={handleChange}
                type="text"
                name="phone"
                value={patient.phone || ''}
                errorMessages={['this field is required']}
                fullWidth
                margin='normal'
              />

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={patient.date}
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
        <div style={{margin: "14px"}}>
          <DialogActions>
            <Button
              variant="outlined"
              color="error"
              onClick={handleClose}
            >
              Batal
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
    </div>
  )
}

export default AddPatient