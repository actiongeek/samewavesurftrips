import axios from 'axios'
import { General as config } from 'config'
import store from '../store'

export const executeQuery = async (
  endpoint,
  payload,
  type = 'POST',
  processData = true
) => {
  let response = null
  try {
    const bearerToken = 'Bearer ' + store.getState().user.accessToken
    response = await axios({
      method: type,
      url: endpoint,
      data: payload ? payload : null,
      processData: processData,
      headers: { Authorization: bearerToken },
      validateStatus: status => {
        return true
      },
      timeout: config.APITimeout
    })
    switch (response.status) {
      case 401:
        console.log('USE REFRESH TOKEN_')
        // eslint-disable-next-line no-throw-literal
        throw { status: 401 }
        case 400:
          console.log('case 2=',response)
          // eslint-disable-next-line no-throw-literal
          throw { status: 400,response:response }
      default:
        //
        break
    }
  } catch (error) {
    throw error
  }

  return response
}

export const refreshToken = async () => {
  try {
    const bearerToken = 'Bearer ' + store.getState().user.accessToken
    const response = await axios({
      method: 'POST',
      url: config.EndPoints.refresh,
      data: {
        refreshToken: store.getState().user.refreshToken
      },
      headers: { Authorization: bearerToken },
      validateStatus: status => {
        return true
      },
      timeout: config.APITimeout
    })

    switch (response.status) {
      case 200:
        return response
      default:
        return false
    }
  } catch (error) {}
}
