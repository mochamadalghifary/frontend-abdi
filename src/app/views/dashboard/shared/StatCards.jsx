import React, { useEffect, useState } from 'react'
import { Grid, Card, Icon, } from '@mui/material'
import { Box, styled } from '@mui/system'
import { H1, Small } from 'app/components/Typography'
import { getPatients } from 'app/services/patients'
import { getCheckUps } from 'app/services/check-up'

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: {
    padding: '16px !important',
  },
}))

const ContentBox = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': {
    color: theme.palette.text.secondary,
  },
  '& .icon': {
    fontSize: '44px',
    color: theme.palette.primary.main,
  },
}))

const StatCards = () => {
  const [patients, setPatients] = useState([])
  const [checkUps, setCheckUps] = useState([])

  useEffect(() => {
    let mounted = true

    getPatients()
      .then(data => {
        if (mounted) {
          setPatients(data)
        }
      })

    getCheckUps()
    .then(data => {
      if (mounted) {
        setCheckUps(data)
      }
    })

    return () => mounted = false
  }, [])

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      <Grid item xs={12} md={6}>
        <StyledCard elevation={6}>
          <ContentBox>
            <Icon className="icon">group</Icon>
            <Box ml="12px">
              <Small>Pasien</Small>
              <H1>{patients.length}</H1>
            </Box>
          </ContentBox>
          {/* <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip> */}
        </StyledCard>
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledCard elevation={6}>
          <ContentBox>
            <Icon className="icon">local_hotel</Icon>
            <Box ml="12px">
              <Small sx={{ lineHeight: 1 }}>
                Pasien Periksa
              </Small>
              <H1>{checkUps.length}</H1>
            </Box>
          </ContentBox>
          {/* <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip> */}
        </StyledCard>
      </Grid>
    </Grid>
  )
}

export default StatCards
