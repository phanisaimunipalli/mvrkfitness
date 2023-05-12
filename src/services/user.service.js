import axios from 'axios'
import authHeader from './auth-header'
import { API_URL } from '../common/const'

class UserService {
  constructor() {
    this.public_content_url = API_URL + '/all'
    // Supported Method: REST.GET
    this.admin_dashboard_url = API_URL + '/allmembers/admin'
    // Supported Method: REST.POST
    this.saveCheckInTimeOfMembers_url = API_URL + '/checkin/'
    this.saveCheckOutTimeOfMembers_url = API_URL + '/checkout'
    this.fetchClassSchedule_Url = API_URL
    this.fetchPastActivities_Url = API_URL
    this.logActivity_url = API_URL + '/activity'
    this.getCheckInTimeOfMember_url = API_URL + '/logtimes/checkin'
  }

  getPublicContent() {
    return axios.get(this.public_content_url)
  }

  getUserBoard() {
    // return axios.get(this.user_board_url, { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(this.admin_dashboard_url, { headers: authHeader() })
    /* try {
      const response = axios.get(this.admin_dashboard_url, {
        headers: authHeader(),
      })
      console.log('response from axios: ', response)
      return response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error: ', error.message)
      } else {
        console.error('some error: ', error.message)
      }
      throw error
    } */
  }

  deleteFile(fileId) {
    return axios.delete(this.file_delete_url + fileId, {
      headers: authHeader(),
    })
  }

  saveCheckInTimeOfMember(memberId) {
    const headers = authHeader()
    return axios.post(this.saveCheckInTimeOfMembers_url + memberId, null, {
      headers,
    })
  }

  /* saveCheckOutTimeOfMember(memberId) {
    // console.log(checkOutTime)
    console.log(memberId)
    const headers = authHeader()
    // const data = { checkOutTime }
    return axios.post(
      this.saveCheckOutTimeOfMembers_url + '/' + memberId,
      // data,
      {
        headers,
      },
    )
  } */

  saveCheckOutTimeOfMember(memberId) {
    const headers = authHeader()
    return axios.put(
      this.saveCheckOutTimeOfMembers_url + '/' + memberId,
      null,
      {
        headers,
      },
    )
  }

  getClassSchedule(memberId) {
    console.log(memberId)
    return axios.get(
      this.fetchClassSchedule_Url + '/' + memberId + '/schedule',
      {
        headers: authHeader(),
      },
    )
  }

  // Past activities
  getPastActivities(memberId, value) {
    console.log('past activities for userId', memberId)
    console.log('value is:', value)
    const headers = authHeader()
    return axios.get(
      this.fetchPastActivities_Url + '/' + memberId + '/' + value,
      {
        headers,
      },
    )
  }

  logActivity(memberId, activityName, duration, date) {
    const headers = authHeader()
    const data = { activityName, duration, date }
    console.log(data)
    return axios.post(this.logActivity_url + '/' + memberId, data, {
      headers,
    })
  }

  /*  getCheckInTimeOfMember(memberId) {
    const headers = authHeader()
    return axios.get(this.getCheckInTimeOfMember_url + '/' + memberId, {
      headers,
    })
  } */
}

export default new UserService()
