/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { userActions, tripActions, mapDispatchToProps } from 'api/actions'
import { connect } from 'react-redux'
import { dispatch } from 'api/store'
import { apiQuery } from 'api/thunks/general'
import { useSpring, animated } from 'react-spring'
import { General as config, Colors, Types } from 'config'
import { Tools } from 'utils'
import { Button, Container, ScrollContainer, Select, Places } from 'components'
import {
  SearchContainer,
  SearchContent,
  Label,
  FilterButton,
  DateInput,
  ContentContainer,
  Row,
  Column,
  PlaceInput,
  Dates,
  DateIcon
} from './styles'

const SearchComponent = props => {
  const dateDepart = useRef(null)
  const dateDestination = useRef(null)
  const [ loading, setLoading ] = useState(false)
  const [ selectGender, setSelectGender ] = useState(null)
  const [ selectModality, setSelectModality ] = useState(null)
  const [ selectLevel, setSelectLevel ] = useState(null)
  const [ dateDeparture, setDateDeparture ] = useState(null)
  const [ dateReturn, setDateReturn ] = useState(null)
  const [ locationDeparture, setLocationDeparture ] = useState({
    name: 'departing point'
  })
  const [ locationReturn, setLocationReturn ] = useState({
    name: 'surf destination'
  })

  useEffect(() => {
    const dateStart = window.M.Datepicker.init(dateDepart.current, {
      onSelect: onDatePickDepart
    })
    const dateEnd = window.M.Datepicker.init(dateDestination.current, {
      onSelect: onDatePickDestination
    })
  }, [])

  const onClearPress = () => {
    setDateDeparture(null)
    setDateReturn(null)
    setLocationDeparture({
      name: ''
    })
    locationReturn.name = ''
    setLocationReturn({
      name: ''
    })
    setSelectGender(null)
    setSelectModality(null)
    setSelectLevel(null)
    onSearchPress()
  }

  const onFilterPress = () => {
    props.onFilter()
  }

  const onSearchPress = () => {
    let searchParams = ''
    let params = {
      dateDeparture: dateDeparture ? dateDeparture.toString() : '',
      dateReturn: dateReturn ? dateReturn.toString() : '',
      locationDeparture: {
        lat: locationDeparture.lat || '',
        lng: locationDeparture.lng || ''
      },
      locationReturn: {
        lat: locationReturn.lat || '',
        lng: locationReturn.lng || ''
      },
      lng: locationReturn.lng || '',
      lat: locationReturn.lat || '',
      gender: selectGender || '',
      modality: selectModality || '',
      Level: selectLevel || ''
    }
    if (dateDeparture) {
      searchParams += `&departure_date_time=${dateDeparture}`
    }
    if (dateReturn) {
      searchParams += `&return_date_time=${dateReturn}`
    }
    if (locationDeparture.lat)
      searchParams += `&d_lng=${locationDeparture.lng}&d_lat=${locationDeparture.lat}&d_radius=20`
    if (locationReturn.lat)
      searchParams += `&lng=${locationReturn.lng}&lat=${locationReturn.lat}&radius=20`
    if (!isEmpty(selectGender)) searchParams += `&gender=${selectGender}`
    if (!isEmpty(selectModality))
      searchParams += `&surf_modality=${selectModality}`
    if (!isEmpty(selectLevel)) searchParams += `&surf_level=${selectLevel}`

    searchParams = `?${searchParams}`
    setLoading(true)
    // debugger
    dispatch(props.searchDetails({ ...params }))
    dispatch(
      apiQuery(
        null,
        props.filterTrips,
        config.EndPoints.search + searchParams,
        onFilterhResult,
        'get',
        searchParams,
      )
    )
  }

  const isEmpty = value => {
    if (value === null || value === '' || value === 'Any') {
      return true
    }
  }

  const onFilterhResult = error => {
    if (error.status !== 200) {
      console.log('what error', error)
    }
    setLoading(false)
  }

  const handleDateChange = (date, type) => {
    if (type === 'departing') {
      setDateDeparture(date)
    } else {
      setDateReturn(date)
    }
  }

  const onSetLocation = (location, type) => {
    if (type === 'departing') {
      setLocationDeparture(location)
    } else {
      setLocationReturn(location)
    }
  }

  const startSpring = {
    transform: 'translate3d(0, -0% ,0)'
  }
  const springProps = useSpring({
    from: startSpring,
    to: props.visible
      ? startSpring
      : { opacity: 1, transform: 'translate3d(0,0,0)' },
    config: { mass: 0.2, tension: 170, friction: 13 }
  })

  const onDatePickDepart = date => {
    handleDateChange(date, 'departing')
  }

  const onDatePickDestination = date => {
    handleDateChange(date, 'destination')
  }

  return (
    <SearchContainer interactive={props.visible}>
      <animated.div className={'search__slider'} style={springProps}>
        <SearchContent>
          {' '}
          <ScrollContainer navbar={false} color='none'>
            <ContentContainer>
              <Container>
                <div className={'inner__content'}>
                  <Label>Location </Label>
                  <Column>
                    <PlaceInput>
                      <Places
                        label='Departure'
                        onChange={location =>
                          onSetLocation(location, 'departing')}
                        value={locationDeparture.name}
                      />
                    </PlaceInput>
                    <PlaceInput>
                      <Places
                        label='Destination'
                        onChange={location =>
                          onSetLocation(location, 'destination')}
                        value={locationReturn.name}
                      />
                    </PlaceInput>
                  </Column>
                  <Dates>
                    <Label>Dates </Label>
                    <Row>
                      <DateInput>
                        <input
                          ref={dateDepart}
                          type='text'
                          className='datepicker'
                        />
                        <DateIcon>{Tools.renderIcon('calendar')}</DateIcon>
                      </DateInput>
                      <DateInput>
                        <input
                          ref={dateDestination}
                          type='text'
                          className='datepicker'
                        />
                        <DateIcon>{Tools.renderIcon('calendar')}</DateIcon>
                      </DateInput>
                    </Row>
                  </Dates>
                  <FilterButton>
                    <Button
                      title={'CLEAR'}
                      onPress={onClearPress}
                      outlineDark
                    />
                    <Button primary title={'FILTER'} onPress={onFilterPress} />
                    <Button primary title={'SEARCH'} onPress={onSearchPress} />
                  </FilterButton>
                </div>
              </Container>
            </ContentContainer>
          </ScrollContainer>
        </SearchContent>
      </animated.div>
    </SearchContainer>
  )
}

SearchComponent.propTypes = {
  visible: PropTypes.bool,
  onFilter: PropTypes.func
  // fontSize: PropTypes.string,
  // color: PropTypes.string,
}

SearchComponent.defaultProps = {
  visible: true,
  onFilter: () => {}
  // fontSize: Spacings.FONT.BODY,
  // color: Colors.GREY_BASE
}

const mapStateToProps = state => ({ user: state.user, trips: state.trips })

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ userActions, tripActions ])
)(SearchComponent)
