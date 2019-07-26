import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import uuid from 'uuid'
import { dispatch } from 'api/store'
import { apiQuery } from 'api/thunks/general'
import { General as config, Routes, Colors } from 'config'
import { userActions, tripActions, mapDispatchToProps } from 'api/actions'
import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  Container,
  Fab,
  Footer,
  Header,
  MastHead,
  Tabs,
  ScrollContainer,
  FootItem,
  TripList,
  ProfileStat,
  Preloader
} from 'components'
import { Tools, PickIcon } from 'utils'
import {
  Profile,
  Center,
  ContentContainer,
  Stats,
  StatDivide,
  Interest,
  PreloadContainer,
  TabContainer,
  SurfIcons,
  SurfStat,
  Label,
  TripsType
} from './styles'

const ProfileScreen = props => {
  const [ loading, setLoading ] = useState(true)
  const [ activeTab, setActiveTab ] = useState('about')
  const [ tabTitles ] = useState([ 'About', 'Surf Trips' ])
  const [ userId ] = useState(props.match.params.userId)
  const [ following, setFollowing ] = useState(false)
  const [ followers, setFollowers ] = useState([])
  const [ tripsType, setTripsType ] = useState(0)
  const user = userId ? props.user.surfer : props.user
  let mounted = true

  useEffect(() => {
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    fetchTrips()
    fetchUserDetails()
    onGetFollowers()
  }, [])

  const fetchTrips = () => {
    setLoading(true)
    dispatch(
      apiQuery(
        null,
        props.fetchOwnTrips,
        config.EndPoints.trips + `/${userId ? userId : props.user.id}`,
        onFetchResult,
        'GET'
      )
    )
  }

  const fetchUserDetails = () => {
    mounted && setLoading(true)
    dispatch(
      apiQuery(
        null,
        userId ? props.surferDetails : props.userDetails,
        config.EndPoints.user + `/${userId ? userId : props.user.id}`,
        onFetchResult,
        'GET'
      )
    )
  }

  const onFetchResult = res => {
    if (res.status !== 200) {
      console.log('what error', res)
    }
    mounted && setLoading(false)
  }

  const onTabPress = value => {
    setActiveTab(tabTitles[value].toLowerCase())
  }

  const onEditPress = () => {
    props.history.push('/' + Routes.EDIT_PROFILE)
  }

  const activeTrips = () => {
    const active = []
    const old = []
    props.trips.yourTrips.forEach(trip => {
      if (new Date(trip.date_times.return_date_time) >= new Date()) {
        active.push(trip)
      } else {
        old.push(trip)
      }
    })

    switch (tripsType) {
      case 0:
        return active
      case 1:
        return old
      default:
        return props.trips.yourTrips
    }
  }

  const onGetFollowers = () => {
    const endpoint = `${config.EndPoints.user}/${userId ||
      props.user.id}/followers`
    dispatch(
      apiQuery(null, props.userFollow, endpoint, onGetFollowersResult, 'GET')
    )
  }

  const onFollow = () => {
    const endpoint = `${config.EndPoints.user}/${userId ||
      props.user.id}/${!following ? 'follow' : 'unfollow'}`
    dispatch(
      apiQuery(null, props.userFollow, endpoint, onFollowersResult, 'GET')
    )
  }

  const onMessage = user => {
    props.history.push(`/${Routes.MESSAGE}/${uuid()}`, {
      recipient_id: user.id
    })
  }

  const onGetFollowersResult = res => {
    if (res.status !== 200) {
      console.log('follow user error', res)
    } else {
      const cleanFollows = []
      res.data.forEach(user => {
        if (!cleanFollows.includes(user.follower_id)) {
          cleanFollows.push(user.follower_id)
        }
      })
      if (cleanFollows.includes(props.user.id)) {
        setFollowing(true)
        mounted && setFollowers(cleanFollows)
      } else {
        setFollowing(false)
        mounted && setFollowers(cleanFollows)
      }
    }
  }

  const onFollowersResult = res => {
    if (res.status !== 200) {
      console.log('follow user error', res)
    } else {
      mounted && setFollowing(following)
      onGetFollowers()
    }
  }

  const userAvatar = () => {
    const avatar = null
    if (user && user.avatar) {
      if (user.avatar.includes('https://')) return user.avatar
      return config.EndPoints.digitalOcean + user.avatar
    }
    return avatar
  }

  const onTripTypeFilter = value => {
    setTripsType(value)
  }

  return (
    <Profile>
      <ScrollContainer height={'55px'}>
        <Header
          title={userId ? '' : 'Profile'}
          // rightIcon={!userId && Tools.renderIcon('pencil')}
          rightAction={onEditPress}
          backButton={userId && true}
          homeButton={!userId}
        />

        {loading ? (
          <PreloadContainer>
            <Preloader />
          </PreloadContainer>
        ) : (
          <ContentContainer>
            <MastHead
              image={
                user && user.coverImg ? (
                  config.EndPoints.digitalOcean + user.coverImg
                ) : null
              }
            />
            <Center>
              <Container noPadd>
                <div className={'profile__avatar'}>
                  <Avatar image={userAvatar()} />
                </div>
                <div className={'profile__header-meta'}>
                  <div className='profile__person'>
                    <p className={'profile__name'}>
                      {user && user.firstName ? (
                        user.firstName + ' ' + user.lastName
                      ) : (
                        'Your Name'
                      )}
                    </p>
                    <div className={'profile__location'}>
                      {Tools.renderIcon('pin')}{' '}
                      {user && user.location && user.location.name ? (
                        user.location.name
                      ) : (
                        `Unknown Location`
                      )}
                    </div>
                  </div>
                  {userId && userId !== props.user.id ? (
                    <div className={'profile__contact'}>
                      <div className={'profile_follow'}>
                        <Button
                          color={
                            following ? Colors.GREY_LIGHT : Colors.ORANGE_BASE
                          }
                          hoverColor={
                            following ? Colors.GREY_BASE : Colors.ORANGE_DARK
                          }
                          onPress={onFollow}
                          title={!following ? 'Follow' : 'Following'}
                        />
                      </div>
                      <Button
                        onPress={onMessage.bind(null, user)}
                        title='Message'
                      />
                      {props.user.surfer.phone && (
                        <a
                          href={`tel:${props.user.surfer.phone}`}
                          data-rel='external'>
                          <Button title='Call' />
                        </a>
                      )}
                    </div>
                  ) : (
                    <div className={'profile__contact'}>
                      <Button
                        icon={'pencil'}
                        iconSvg
                        onPress={onEditPress}
                        title='Edit Profile'
                        outlineDark
                      />
                    </div>
                  )}
                </div>
              </Container>
              <Container noPadd>
                <Stats>
                  <ProfileStat
                    stat={props.trips.yourTrips.length}
                    label='SURF TRIPS'
                  />
                  <StatDivide />
                  <ProfileStat stat={followers.length} label='FOLLOWERS' />
                  <StatDivide />
                  <ProfileStat
                    stat={user && user.following}
                    label='FOLLOWING'
                  />
                </Stats>

                {userId && userId !== props.user.id ? (
                  <div className={'profile__contact_mobile'}>
                    <div className={'profile__follow'}>
                      <Button
                        color={
                          following ? Colors.GREY_LIGHT : Colors.ORANGE_BASE
                        }
                        hoverColor={
                          following ? Colors.GREY_BASE : Colors.ORANGE_DARK
                        }
                        onPress={onFollow}
                        title={!following ? 'Follow' : 'Following'}
                      />
                    </div>
                    <Button
                      onPress={onMessage.bind(null, user)}
                      title='Message'
                    />
                    {props.user.surfer.phone && (
                      <a
                        href={`tel:${props.user.surfer.phone}`}
                        data-rel='external'>
                        <Button title='Call' />
                      </a>
                    )}
                  </div>
                ) : (
                  <div className={'profile__contact_mobile'}>
                    <Button
                      icon={'pencil'}
                      iconSvg
                      onPress={onEditPress}
                      title='Edit Profile'
                      outlineDark
                    />
                  </div>
                )}
              </Container>
              <TabContainer>
                <Tabs
                  align='left'
                  backgroundColor='transparent'
                  tabs={tabTitles}
                  onTabPress={onTabPress}
                />
              </TabContainer>
              {activeTab === 'about' ? (
                <Container>
                  <div className={'profile__detail'}>
                    <div className={'profile__card'}>
                      <Label>
                        Surfing Since:{' '}
                        {user &&
                          user.surfing_since &&
                          new Date(user.surfing_since).getFullYear()}
                      </Label>
                      <SurfIcons>
                        {user &&
                        user.surf_level && (
                          <SurfStat>
                            <img
                              src={PickIcon(user.surf_level.toLowerCase())}
                              alt={user.surf_level}
                            />
                            <span>Skill Level</span>
                          </SurfStat>
                        )}
                        {user &&
                        user.stance && (
                          <SurfStat>
                            <img
                              src={PickIcon(user.stance.toLowerCase())}
                              alt={user.stance}
                            />
                            <span>{user.stance}</span>
                          </SurfStat>
                        )}
                        {user &&
                        user.surf_modality && (
                          <SurfStat>
                            <img
                              src={PickIcon(user.surf_modality.toLowerCase())}
                              alt={user.surf_modality}
                            />
                            <span>{user.surf_modality}</span>
                          </SurfStat>
                        )}
                      </SurfIcons>

                      <Card>
                        <div className={'profile__description'}>
                          <div className={'profile__location-header'}>bio:</div>
                          {user && user.bio ? (
                            `${user.bio}`
                          ) : (
                            'Add something interesting about yourself here'
                          )}
                        </div>
                      </Card>
                    </div>
                  </div>
                  <div className={'profile__card'}>
                    <Card>
                      <div className={'profile__level'}>
                        <div>
                          <div className={'profile__location-header'}>
                            INTERESTS:
                          </div>
                          <div className={'profile_interests'}>
                            {user &&
                              user.interests &&
                              user.interests.length > 0 &&
                              user.interests.map(
                                item =>
                                  item !== '' && (
                                    <Interest key={item}>{item}</Interest>
                                  )
                              )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </Container>
              ) : (
                <Container>
                  <div className={'profile__trips'}>
                    <TripsType>
                      <ButtonGroup
                        action={onTripTypeFilter}
                        selected={tripsType}
                        items={[
                          {
                            title: 'Active trips'
                          },
                          {
                            title: 'Past trips'
                          },
                          {
                            title: 'All trips'
                          }
                        ]}
                      />
                    </TripsType>
                    <TripList trips={activeTrips()} loading={loading} />
                  </div>
                </Container>
              )}
              <FootItem />
            </Center>
            <Fab />
            <Footer />
          </ContentContainer>
        )}
      </ScrollContainer>
    </Profile>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  trips: state.trips
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ userActions, tripActions ])
)(withRouter(ProfileScreen))
