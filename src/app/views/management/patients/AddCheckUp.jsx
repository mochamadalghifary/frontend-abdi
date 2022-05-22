import React, { useState } from 'react'
import {
  Button,
  Icon,
  IconButton,
} from '@mui/material'
import { ValidatorForm } from 'react-material-ui-form-validator'
import { postCheckUp } from 'app/services/check-up'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Save } from '@mui/icons-material'

const AddCheckUp = (patient) => {
  const [open, setOpen] = React.useState(false)
  const [message, setMessage] = useState('')
  const [checkUp, setCheckUp] = useState({
    patientId: patient.patient.id,
    ilness: '',
    description: '',
  })

  function handleClickOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  const handleChange = ({ target: { name, value } }) => {
    let temp = { ...checkUp }
    temp[name] = value
    setCheckUp(temp)
  }

  const handleSubmit = async (event) => {
    setOpen(false)
    try {
      console.log(checkUp)
      await postCheckUp(checkUp)
      alert('Berhasil menambahkan riwayat pemeriksaan', message)
      window.location.reload();
    } catch (e) {
      console.log(e)
      setMessage(e.message)
    }
  }

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <IconButton onClick={handleClickOpen} size="small" color="primary" aria-label="Add">
          <Icon color="success">local_hotel</Icon>
        </IconButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{patient.patient.name}</DialogTitle>
          <DialogContent>
            <TextField
              label="Sakit"
              onChange={handleChange}
              type="text"
              name="ilness"
              value={checkUp.ilness || ''}
              validators={['required']}
              errorMessages={['this field is required']}
              fullWidth
              margin='normal'
            />


            <TextField
              multiline="true"
              label="Deskripsi"
              onChange={handleChange}
              type="textarea"
              name="description"
              rows={4}
              value={checkUp.description || ''}
              errorMessages={['this field is required']}
              fullWidth
            />
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

export default AddCheckUp