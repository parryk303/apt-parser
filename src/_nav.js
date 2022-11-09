import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPuzzle } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  // {
  //   component: CNavGroup,
  //   name: 'Standards',
  //   icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'MITRE Enterprise',
  //       to: '/mitre-enterprise',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'MITRE Mobile',
  //       to: '/mitre-mobile',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'MITRE ICS',
  //       to: '/mitre-ics',
  //     },
  //   ],
  // },
  {
    component: CNavGroup,
    name: 'Securonix Planners',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      // {
      //   component: CNavItem,
      //   name: 'MITRE Planner',
      //   to: '/mitre-planner',
      // },
      // {
      //   component: CNavItem,
      //   name: 'ITP Planner',
      //   to: '/itp-planner',
      // },
      // {
      //   component: CNavItem,
      //   name: 'UBA Planner',
      //   to: '/uba-planner',
      // },
      {
        component: CNavItem,
        name: 'APT Planner',
        to: '/apt-planner',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Securonix Reflectors',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      // {
      //   component: CNavItem,
      //   name: 'MITRE Reflector',
      //   to: '/mitre-reflector',
      // },
      // {
      //   component: CNavItem,
      //   name: 'ITP Reflector',
      //   to: '/itp-reflector',
      // },
      // {
      //   component: CNavItem,
      //   name: 'PCI Reflector',
      //   to: '/pci-reflector',
      // },
      {
        component: CNavItem,
        name: 'APT Reflector',
        to: '/apt-reflector',
      },
    ],
  },
  // {
  //   component: CNavGroup,
  //   name: 'Script Runner',
  //   icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Script Runner',
  //       to: '/script-runner',
  //     },
  //   ],
  // },
]

export default _nav
