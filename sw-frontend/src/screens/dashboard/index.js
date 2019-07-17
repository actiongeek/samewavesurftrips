import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Colors } from 'config'
// import { Card, Button } from 'components'

// import { Button } from 'reactstrap';
import { useSpring, animated } from 'react-spring'

import { userActions, tripActions, mapDispatchToProps } from 'api/actions'
import { withRouter } from 'react-router-dom'
import { dispatch } from 'api/store'
import { apiQuery } from 'api/thunks/general'
import { General as config } from 'config'
import { Tools } from 'utils'
// import { Routes } from 'config';
import { Button, Fab, Map, Toggle, TripList, Header, MapCard, ScrollContainer, Search, Footer } from 'components'
import { Dashboard, MapTripDetail, ButtonContainer } from './styles'

const DashboardScreen = props => {
  const [loading, setLoading] = useState(false)
  const [searchVisible, setSearchVisible] = useState(true)
  const [activeTab, setActiveTab] = useState('list')
  const [initalDisplay, setInitialDisplay] = useState(false)
  let mounted = true

  useEffect(() => { return () => { mounted = false } }, [])

  useEffect(() => { fetchTrips() }, [])

  useEffect(() => { onMapCardPress() }, [props.trips.current.id])

  const fetchTrips = () => {
    mounted && setLoading(true)
    mounted && setInitialDisplay(true)
    const searchParams = props.trips.filter
    dispatch(
      apiQuery(null, props.fetchAllTrips, config.EndPoints.search + searchParams, onFetchResult, 'get', searchParams)
    )
  }

  const onFetchResult = error => {
    if (error.status !== 200) {
      console.log('what error', error)
    }
    setLoading(false)
  }

  const onTogglePress = activeName => {
    mounted && setActiveTab(activeName)
    if (activeName === 'map') {
      mounted && setInitialDisplay(true)
    }
  }

  const onSearchPress = () => {
    console.log("props ara",props);
    if (!searchVisible) { onMapCardPress() }
    console.log("searchVisible=", searchVisible);
    mounted && setSearchVisible(!searchVisible)
  }

  const onFilterPress = () => {
    if(!searchVisible){
      // Map.lyTo={
      //   center:  [props.trips.search.lng,props.trips.search.lat],
      //     zoom:  15,
      //     speed:  2
      // }
      // Map.flyTo({
      //   center:  [props.trips.search.lng,props.trips.search.lat],
      //   zoom:  15,
      //   speed:  2
      // })
    }
    onSearchPress()
  }
  const onFilterhResult = error => {
    if (error.status !== 200) {
      console.log('what error', error)
    }
    // setLoading(false)
    props.onFilter()
  }
const onReasearchPress = () => {
  let searchParams = ''
  if (props.trips.search.dateDeparture!='') {
    searchParams += `&departure_date_time=${props.trips.search.dateDeparture}`;
  }
  if (props.trips.search.dateReturn!='') {
    searchParams += `&return_date_time=${props.trips.search.dateReturn}`;
  }
  if (props.trips.search.lat!='')
    searchParams += `&lng=${props.trips.search.lng}&lat=${props.trips.search.lat}`
  if (props.trips.search.gender!='') searchParams += `&gender=${props.trips.search.gender}`
  if (props.trips.search.modality!='')
    searchParams += `&surf_modality=${props.trips.search.modality}`
  if (props.trips.search.Level!='') searchParams += `&surf_level=${props.trips.search.Level}`

  searchParams = `?${searchParams}`
  dispatch(
    apiQuery(null, props.filterTrips, config.EndPoints.search + searchParams, onFilterhResult,'get',searchParams)
  )
}
  const onMapCardPress = () => {
    console.log("map mcard press 1=", JSON.stringify(props.trips.current));
    console.log("map mcard press 22=", props.trips.current._id);
    mounted && setInitialDisplay(false)
  }

  const { current } = props.trips
  const startSpring = {
    opacity: 0,
    transform: 'translate3d(0,200px,0) scale(0.9)'
  }
  const springProps = useSpring({
    from: startSpring,
    to: initalDisplay
      ? startSpring : { opacity: 1, transform: 'translate3d(0,0,0) scale(1)' },
    reset: true
  })

  return (
    <Dashboard>
      <ScrollContainer height={'55'}>

        <Header
          title='Search Trips' rightIcon={Tools.renderIcon(searchVisible ? 'search' : 'close')} rightAction={onSearchPress} />
        {/* {activeTab ==='map' && (

        )} */}

        {activeTab === 'map' ? (<Map trips={props.trips.allTrips} />) :
          (<TripList trips={props.trips.allTrips} loading={loading} paddingTop={140} paddingSide />)}
        <div className={'dashboard__switch'}>
          <Toggle onPress={onTogglePress} items={['map', 'list']} active={activeTab} />

        </div>

        <Fab />

        {activeTab === 'map' && (

          <MapTripDetail>
            
            <ButtonContainer>
              {/* <Button primary title={'FILTER'} onPress={onFilterPress}/> */}
              <Button primary title={'Re-Search'} onPress={onReasearchPress}/>
            </ButtonContainer>
            <animated.div style={springProps}>
              <MapCard
                id={current._id}
                owner_id={current.owner_id}
                owner_details={current.owner_details}
                attendees={current.attendees}
                date_times={current.date_times}
                departing={current.departing}
                destination={current.destination}
                title={current.title}
                number_of_surfers={current.number_of_surfers}
                gender={current.gender}
                surf_modality={current.surf_modality}
                surf_level={current.surf_level} />
            </animated.div>

          </MapTripDetail>
        )}
        <Search visible={searchVisible} onFilter={onFilterPress} />
      </ScrollContainer>
      {activeTab === 'list' && <Footer />}

    </Dashboard>
  )
}

DashboardScreen.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  onFilter: PropTypes.func
}

DashboardScreen.defaultProps = {
  history: {},
  location: '',
  onFilter: () => {}
}

const mapStateToProps = state => ({
  user: state.user,
  trips: state.trips
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [userActions, tripActions])
)(withRouter(DashboardScreen))
