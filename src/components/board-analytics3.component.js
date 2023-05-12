import React, { Component } from 'react'
import AuthService from '../services/auth.service'
import { Navigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
//import { Line } from 'react-chartjs-2'
import { LineChart, XAxis1, YAxis1, Line } from 'recharts'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import {
  LineChart as MyLineChart,
  Line as MyLine,
  XAxis as MyXAxis,
  YAxis as MyYAxis,
  CartesianGrid as MyCartesianGrid,
  Tooltip as MyToolTip,
  Legend as MyLegend,
} from 'recharts'

const weeks = [
  { label: 'Week 1', start: '2022-01-01', end: '2022-01-07' },
  { label: 'Week 2', start: '2022-01-08', end: '2022-01-14' },
  { label: 'Week 3', start: '2022-01-15', end: '2022-01-21' },
  { label: 'Week 4', start: '2022-01-22', end: '2022-01-28' },
]

export default class Analytics extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chartData: {},
      redirect: null,
      content: '',
      // selectedWeek: [],
      selectedWeek: moment(),
      selectedRange: 'day',
      data: [
        { name: 'Mon', hours: 2.5 },
        { name: 'Tue', hours: 3 },
        { name: 'Wed', hours: 2 },
        { name: 'Thu', hours: 3.5 },
        { name: 'Fri', hours: 1.5 },
        { name: 'Sat', hours: 2.5 },
        { name: 'Sun', hours: 1 },
      ],
    }
  }

  handleWeekChange = (direction) => {
    const { selectedWeek } = this.state
    const newWeek = selectedWeek.clone().add(direction, 'week')
    this.setState({ selectedWeek: newWeek })
  }

  handleDateChange = (date) => {
    this.setState({ selectedWeek: moment(date) })
  }
  handleRangeChange = (range) => {
    this.setState({ selectedRange: range })
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser()
    if (!currentUser) {
      this.setState({ redirect: '/home' })
      return
    }
    // this.fetchAnalyticsData()
    this.getChartData()
  }

  getChartData() {
    // Fetch data from the API or use the JSON data structure provided
    const data = {
      'New York City': {
        visitorsByHour: {
          weekdays: [
            { hour: 0, visitors: 200 },
            { hour: 1, visitors: 150 },
            { hour: 23, visitors: 300 },
          ],
          weekends: [
            { hour: 0, visitors: 300 },
            { hour: 1, visitors: 250 },
            { hour: 23, visitors: 400 },
          ],
        },
      },
      'Los Angeles': {
        visitorsByHour: {
          weekdays: [
            { hour: 0, visitors: 100 },
            { hour: 1, visitors: 75 },
            { hour: 23, visitors: 150 },
          ],
          weekends: [
            { hour: 0, visitors: 150 },
            { hour: 1, visitors: 125 },
            { hour: 23, visitors: 200 },
          ],
        },
      },
    }

    const MyLineChart = ({ data }) => (
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis
          dataKey="hour"
          label={{
            value: 'Hour of Day',
            position: 'insideBottomRight',
            offset: -10,
          }}
        />
        <YAxis />
        <Line dataKey="visitors" />
      </LineChart>
    )

    const chartData = {
      labels: data['New York City'].visitorsByHour.weekdays.map(
        (item) => item.hour,
      ),
      datasets: [
        {
          label: 'Weekdays',
          data: data['New York City'].visitorsByHour.weekdays.map(
            (item) => item.visitors,
          ),
        },
        {
          label: 'Weekends',
          data: data['New York City'].visitorsByHour.weekends.map(
            (item) => item.visitors,
          ),
        },
      ],
    }

    this.setState({ chartData })
  }
  getData = (selectedData) => {
    const { selectedRange, selectedWeek } = this.state
    const weekStart = selectedWeek.clone().startOf('week')
    const weekEnd = selectedWeek.clone().endOf('week')

    const data = [
      { date: weekStart.clone().add(0, 'day'), classes: 15, enrollments: 30 },
      { date: weekStart.clone().add(1, 'day'), classes: 4, enrollments: 20 },
      { date: weekStart.clone().add(2, 'day'), classes: 16, enrollments: 35 },
      { date: weekStart.clone().add(3, 'day'), classes: 3, enrollments: 15 },
      { date: weekStart.clone().add(4, 'day'), classes: 7, enrollments: 40 },
      { date: weekStart.clone().add(5, 'day'), classes: 2, enrollments: 10 },
      { date: weekStart.clone().add(6, 'day'), classes: 1, enrollments: 5 },
    ]

    switch (selectedData) {
      case 'data1':
        return [
          {
            date: weekStart.clone().add(0, 'day'),
            classes: 1,
            enrollments: 30,
          },
          {
            date: weekStart.clone().add(1, 'day'),
            classes: 3,
            enrollments: 20,
          },
          {
            date: weekStart.clone().add(2, 'day'),
            classes: 5,
            enrollments: 35,
          },
          {
            date: weekStart.clone().add(3, 'day'),
            classes: 7,
            enrollments: 15,
          },
          {
            date: weekStart.clone().add(4, 'day'),
            classes: 9,
            enrollments: 40,
          },
          {
            date: weekStart.clone().add(5, 'day'),
            classes: 11,
            enrollments: 10,
          },
          {
            date: weekStart.clone().add(6, 'day'),
            classes: 13,
            enrollments: 5,
          },
        ]
      case 'data2':
        return [
          {
            date: weekStart.clone().add(0, 'day'),
            classes: 2,
            enrollments: 30,
          },
          {
            date: weekStart.clone().add(1, 'day'),
            classes: 4,
            enrollments: 20,
          },
          {
            date: weekStart.clone().add(2, 'day'),
            classes: 6,
            enrollments: 35,
          },
          {
            date: weekStart.clone().add(3, 'day'),
            classes: 8,
            enrollments: 15,
          },
          {
            date: weekStart.clone().add(4, 'day'),
            classes: 10,
            enrollments: 40,
          },
          {
            date: weekStart.clone().add(5, 'day'),
            classes: 12,
            enrollments: 10,
          },
          {
            date: weekStart.clone().add(6, 'day'),
            classes: 14,
            enrollments: 5,
          },
        ]
      default:
        return []
    }
  }
  handleDataChange = (event) => {
    this.setState({ selectedData: event.target.value })
  }

  render() {
    const { chartData, selectedData } = this.state

    // const { loactiondata } = this.state

    let data2 = this.getData(selectedData)
    // console.log(loactiondata)

    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }
    const { selectedRange, selectedWeek } = this.state
    let xAxisLabel = ''
    switch (selectedRange) {
      case 'day':
        xAxisLabel = 'Days'
        break
      case 'week':
        xAxisLabel = 'Hours spent in the gym by day'
        break
      case 'month':
        xAxisLabel = 'Hours spent in the gym by week'
        break
      default:
        xAxisLabel = 'Hours spent in the gym'
        break
    }

    const weekStart = selectedWeek.clone().startOf('week')
    const weekEnd = selectedWeek.clone().endOf('week')

    const data = [
      { date: weekStart.clone().add(0, 'day'), classes: 5, enrollments: 30 },
      { date: weekStart.clone().add(1, 'day'), classes: 4, enrollments: 35 },
      { date: weekStart.clone().add(2, 'day'), classes: 6, enrollments: 5 },
      { date: weekStart.clone().add(3, 'day'), classes: 3, enrollments: 15 },
      { date: weekStart.clone().add(4, 'day'), classes: 7, enrollments: 20 },
      { date: weekStart.clone().add(5, 'day'), classes: 2, enrollments: 10 },
      { date: weekStart.clone().add(6, 'day'), classes: 1, enrollments: 40 },
    ]

    const Mydata = [
      { name: 'Mon', hours: 2.5 },
      { name: 'Tue', hours: 3 },
      { name: 'Wed', hours: 2 },
      { name: 'Thu', hours: 3.5 },
      { name: 'Fri', hours: 1.5 },
      { name: 'Sat', hours: 2.5 },
      { name: 'Sun', hours: 1 },
    ]

    const loactiondata = [
      { location: 'New York', activity: 1500 },
      { location: 'Los Angeles', activity: 1200 },
      { location: 'Chicago', activity: 900 },
      { location: 'Miami', activity: 700 },
      { location: 'San Francisco', activity: 500 },
    ]
    const data1 = {
      'New York City': {
        visitorsByHour: {
          weekdays: [
            { hour: 1, visitors: 200 },
            { hour: 2, visitors: 150 },
            { hour: 3, visitors: 150 },
            { hour: 4, visitors: 150 },
            { hour: 5, visitors: 150 },
            { hour: 6, visitors: 150 },
            { hour: 7, visitors: 150 },
            { hour: 8, visitors: 150 },
            { hour: 9, visitors: 300 },
            { hour: 10, visitors: 100 },
            { hour: 11, visitors: 200 },
            { hour: 12, visitors: 103 },
            { hour: 13, visitors: 100 },
            { hour: 14, visitors: 300 },
            { hour: 15, visitors: 30 },
            { hour: 16, visitors: 40 },
            { hour: 17, visitors: 70 },
          ],
          weekends: [
            { hour: 0, visitors: 300 },
            { hour: 1, visitors: 250 },
            { hour: 23, visitors: 400 },
          ],
        },
      },
      'Los Angeles': {
        visitorsByHour: {
          weekdays: [
            { hour: 0, visitors: 100 },
            { hour: 1, visitors: 75 },
            { hour: 23, visitors: 150 },
          ],
          weekends: [
            { hour: 0, visitors: 150 },
            { hour: 1, visitors: 125 },
            { hour: 23, visitors: 200 },
          ],
        },
      },
    }

    if (selectedData == undefined) {
      data2 = data
    }
    const filteredData = data2.filter((item) => {
      const itemDate = moment(item.date)
      return itemDate.isBetween(weekStart, weekEnd, null, '[]')
    })
    if (selectedWeek.isAfter(moment().endOf('week'))) {
      // If selected week is in the future, set all values to 0
      data.forEach((item) => {
        item.classes = 0
        item.enrollments = 0
      })
    }
    const xAxisData = []
    for (let i = 0; i < 7; i++) {
      const date = weekStart.clone().add(i, 'day')
      xAxisData.push(date.format('MM/DD/YYYY'))
    }
    console.log('location', loactiondata)
    const filteredData2 = loactiondata.filter((data) => {
      // Define the filter condition - only include data points with activity greater than 200
      return data.activity > 200
    })

    return (
      <div class="chart-container">
        <div>
          <h2>New York Analytics Data</h2>
        </div>
        {/*   <div class="chart">
          {' '}
          <h1>User Activity Based on location</h1>
          <BarChart
            width={500}
            height={300}
            data={filteredData2}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" /> */}

        {/*   <XAxis
            dataKey="date"
            tickFormatter={(date) => moment(date).format('dddd')}
            type="category"
            interval={0}
            ticks={xAxisData}
          /> */}
        {/*   <YAxis />
            <Tooltip
              content={({ payload, label, active }) => {
                if (active && payload && payload.length) {
                  const dataPoint = payload[0].payload
                  const location = dataPoint.location
                  const activity = dataPoint.activity
                  return (
                    <div
                      style={{
                        background: '#eee',
                        border: '1px solid #ccc',
                        padding: '10px',
                      }}
                    >
                      <p>{location}</p>
                      <p>Activity: {activity}</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Legend /> */}
        {/*  <Bar
              dataKey="location"
              fill="#8884d8"
              background={{ fill: '#eee' }}
            /> */}
        {/*   <Bar dataKey="activity" fill="#82ca9d" />
          </BarChart>
        </div> */}

        <div class="chart">
          <h1>Weekly Data</h1>
          <div>
            <button onClick={() => this.handleWeekChange(-1)}>Prev Week</button>
            <DatePicker
              selected={selectedWeek.toDate()}
              onChange={this.handleDateChange}
              dateFormat="MM/dd/yyyy"
            />
            <button onClick={() => this.handleWeekChange(1)}>Next Week</button>
          </div>

          {/*  <div>
            <select value={selectedData} onChange={this.handleDataChange}>
              <option value="data1">Data Set 1</option>
              <option value="data2">Data Set 2</option>
            </select>
          </div> */}

          <BarChart
            width={500}
            height={300}
            data={filteredData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            {/*   <XAxis
            dataKey="date"
            tickFormatter={(date) => moment(date).format('dddd')}
            type="category"
            interval={0}
            ticks={xAxisData}
          /> */}

            <YAxis />
            <Tooltip
              content={({ payload, label, active }) => {
                if (active && payload && payload.length) {
                  const dataPoint = payload[0].payload
                  const date = moment(dataPoint.date).format('MM/DD/YYYY')
                  const classes = dataPoint.classes
                  const enrollments = dataPoint.enrollments
                  return (
                    <div
                      style={{
                        background: '#eee',
                        border: '1px solid #ccc',
                        padding: '10px',
                      }}
                    >
                      <p>{date}</p>
                      <p>Classes: {classes}</p>
                      <p>Enrollments: {enrollments}</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Legend />
            <Bar
              dataKey="classes"
              fill="#f1c40f"
              background={{ fill: '#eee' }}
            />
            <Bar dataKey="enrollments" fill="#3498db" />
          </BarChart>
        </div>

        <div class="chart">
          <h1>Gym Hours</h1>
          <div>
            <button onClick={() => this.handleWeekChange(-1)}>Prev Week</button>
            <DatePicker
              selected={selectedWeek.toDate()}
              onChange={this.handleDateChange}
              dateFormat="MM/dd/yyyy"
            />
            <button onClick={() => this.handleWeekChange(1)}>Next Week</button>
          </div>
          <MyLineChart
            width={500}
            height={300}
            data={Mydata}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <MyXAxis
              dataKey="name"
              label={{
                value: xAxisLabel,
                position: 'insideBottomRight',
                offset: -10,
              }}
            />
            <MyYAxis
              label={{ value: 'Hours', angle: -90, position: 'insideLeft' }}
            />
            <MyCartesianGrid strokeDasharray="3 3" />
            <MyToolTip />
            <MyLegend />
            <MyLine
              type="monotone"
              dataKey="hours"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </MyLineChart>
        </div>

        <div class="chart">
          <h1>Visitors </h1>

          <BarChart
            width={500}
            height={300}
            data={data1['New York City'].visitorsByHour.weekdays}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="hour"
              label={{
                value: 'Hour of Day',
                position: 'insideBottomRight',
                offset: -10,
              }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="visitors" fill="#3498db" />
            {/*   <Bar dataKey="" fill="#f5f5f5" />
            <Bar dataKey="" fill="#f5f5f5" /> */}
          </BarChart>
        </div>

        <div class="chart">
          <MyLineChart
            width={500}
            height={300}
            data={data1['New York City'].visitorsByHour.weekdays}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <MyXAxis
              dataKey="hour"
              label={{
                value: 'Hour of Day',
                position: 'insideBottomRight',
                offset: -10,
              }}
            />
            <MyYAxis
              label={{
                value: 'Number of Visitors',
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <Tooltip />
            <MyLegend />
            <MyCartesianGrid strokeDasharray="3 3" />
            <MyLine
              type="monotone"
              dataKey="visitors"
              stroke="#8884d8"
              strokeDasharray=""
              name="Weekdays"
            />
            <MyLine
              type="monotone"
              dataKey="visitors"
              stroke="#82ca9d"
              name="Weekends"
              data={data1['New York City'].visitorsByHour.weekends}
            />
          </MyLineChart>
        </div>
      </div>
    )
  }
}
