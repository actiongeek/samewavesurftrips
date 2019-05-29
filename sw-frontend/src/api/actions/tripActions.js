import StoreDefinitions from 'api/store/storeDefinitions'

export function tripActions (dispatch) {
  return {
    createTrip: trip => {
      return {
        type: StoreDefinitions.TRIP.CREATE,
        payload: trip
      }
    },
    deleteTrip: data => {
      dispatch({
        type: StoreDefinitions.TRIP.DELETE,
        payload: data
      })
    },
    fetchTrip: id => {
      return {
        type: StoreDefinitions.TRIP.FETCH,
        payload: id
      }
    },
    fetchAllTrips: data => {
      return {
        type: StoreDefinitions.TRIP.FETCH_ALL,
        payload: data
      }
    },
    fetchOwnTrips: data => {
      return {
        type: StoreDefinitions.TRIP.FETCH_OWN,
        payload: data
      }
    },
    fetchUserTrips: data => {
      return {
        type: StoreDefinitions.TRIP.FETCH_USER,
        payload: data
      }
    },
    filterTrips: (data, query) => {
      return {
        type: StoreDefinitions.TRIP.FILTER,
        payload: { data, filter: query }
      }
    },
    setCurrentTrip: trip => {
      return {
        type: StoreDefinitions.TRIP.SET_CURRENT,
        payload: trip
      }
    },
    joinTrip: trip => {
      return {
        type: StoreDefinitions.TRIP.JOIN,
        payload: trip
      }
    },
    leaveTrip: trip => {
      return {
        type: StoreDefinitions.TRIP.LEAVE,
        payload: trip
      }
    }
  }
}
