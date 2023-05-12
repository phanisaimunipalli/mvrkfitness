import React from 'react'
import SingleTable from '../Table/SingleTable'

const Table = () => {
  const morningSchedule = [
    {
      id: 1,
      time: '07:00 AM',
      data: [
        'CrossFit',
        'CrossFit',
        'CrossFit',
        'CrossFit',
        'CrossFit',
        '',
        '',
      ],
    },
    {
      id: 2,
      time: '08:00 AM',
      data: [
        '',
        '',
        'Mobilizer',
        'Mobilizer',
        'Mobilizer',
        'Mobilizer',
        'Mobilizer',
      ],
    },
    {
      id: 3,
      time: '09:00 AM',
      data: [
        'CrossFit',
        'CrossFit',
        'CrossFit',
        'CrossFit',
        'CrossFit',
        '',
        '',
      ],
    },
    {
      id: 4,
      time: '11:30 AM',
      data: ['', 'CrossFit', 'CrossFit', 'CrossFit', 'CrossFit', '', ''],
    },
  ]
  return (
    <div className="mid-container mx-auto">
      <h1 className="md:text-4xl text-3xl font-bold text-primary mb-6 ">
        Class Schedule
      </h1>
      <SingleTable tableData={morningSchedule} />
    </div>
  )
}

export default Table
