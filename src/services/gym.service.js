import axios from 'axios'
import authHeader from './auth-header'
import { API_URL } from '../common/const'

class GymService {
  constructor() {
    // Supported Method: REST.GET
    this.gymClassSchedule_url = API_URL + '/allClasses'
    this.getClassesBasedOnGymLocation = API_URL + '/gyms'
    this.addClass_url = API_URL + '/addClassByAdmin'
  }

  getClasses() {
    return axios.get(this.gymClassSchedule_url, { headers: authHeader() })
  }
  getClassScheduleBasedOnGymLocation(gymId) {
    const headers = authHeader()
    return axios.get(
      this.getClassesBasedOnGymLocation + '/' + gymId + '/schedules',
      {
        headers,
      },
    )
  }

  addClass(name, startTime, endTime, days, gymId) {
    console.log('gymID..', gymId)
    const headers = authHeader()
    const data = { name, startTime, endTime, days, gymId }
    console.log(data)
    return axios.post(this.addClass_url, data, {
      headers,
    })
  }
}
export default new GymService()
