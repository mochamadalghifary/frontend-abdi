import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const AppPatients = Loadable(lazy(() => import("./patients/AppPatients")));
const AppCheckUp = Loadable(lazy(() => import("./check-up/AppCheckUp")));

const managementRoutes = [
  {
    path: '/manajemen/patients',
    element: <AppPatients />,
  },
  {
    path: '/manajemen/check-up',
    element: <AppCheckUp />,
  },
]

export default managementRoutes
