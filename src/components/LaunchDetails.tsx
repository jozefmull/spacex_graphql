import React, {useState, useEffect, useContext, SyntheticEvent} from 'react'
import { Link, useParams } from 'react-router-dom'

import { useQuery } from 'urql'
import { getLaunchDetails } from '../Queries';
import { GlobalContext } from '../context/GlobalState'

import Loading from './Loading';
import Error from './Error';

import { Typography, Container, Box, Button, IconButton} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';

import styles from '../css/LaunchDetails.module.css'

const LaunchDetails:React.FC = () => {
  const {launchId} = useParams()
  const {addToFavourites, formatDate, myState} = useContext(GlobalContext)
  const {favourites} = myState

  const [shouldPause, setshouldPause] = useState<boolean>(true)

  const [{data:launchDetails, fetching, error}] = useQuery({
    query: getLaunchDetails,
    variables: {
      id: launchId ? launchId : ''
    },
    pause: shouldPause
  })  

  useEffect(() => {
    if (launchId !== undefined) {
      setshouldPause(prev => prev = false)
    }
  }, [launchId])

  const handleAddToFavourites = (e:SyntheticEvent, id:string | null | undefined):void => {
    const target = e.target as Element

    target.classList.toggle(styles.selected)
    if (id) {
      addToFavourites(id)      
    }
  }

  return (
    <section className={styles.launchDetailsWrap}>
      <Container maxWidth="lg">
        <Link to='/'><KeyboardArrowLeftSharpIcon/> BACK TO LAUNCHES</Link>
        {fetching ? <Loading/> : null}
        {error ? (<Error message={error.message}/>) : null}
        {!fetching && launchDetails?.launch ? (
          <Box>
            <Typography variant='h1' fontWeight={900} fontSize={42} textTransform={'uppercase'} marginBottom={'1rem'} marginTop={'2rem'}>
              {launchDetails?.launch?.mission_name}
              {launchDetails?.launch?.id ? (
                <IconButton 
                  className={favourites.find(item => item === launchDetails?.launch?.id) ? `${styles.favourite} ${styles.selected}` : styles.favourite}
                  onClick={(e) => handleAddToFavourites(e, launchDetails?.launch?.id)}
                  >
                  <FavoriteIcon fontSize={'large'}/>
                </IconButton>
              ) : null}
            </Typography>
            <Typography gutterBottom variant="h4" component="h3" fontSize={36} marginBottom={'2rem'}>
              {formatDate(launchDetails?.launch?.launch_date_utc)}
            </Typography>
            <Typography variant='h2' component="h2"  fontWeight={700} fontSize={28} marginBottom={'1rem'}>
              SITE: 
              <Typography variant='body1' component="span"  fontWeight={400} fontSize={28} lineHeight={1}>
               {' ' + launchDetails?.launch?.launch_site?.site_name_long}
              </Typography>
            </Typography>
            <Typography variant='h2' component="h2"  fontWeight={700} fontSize={28} marginBottom={'1rem'}>
              ROCKET: 
              <Typography variant='body1' component="span"  fontWeight={400} fontSize={28} lineHeight={1}>
               {' ' + launchDetails?.launch?.rocket?.rocket_name}
              </Typography>
            </Typography>
            <Typography variant='body1' component="p"  fontWeight={700} marginBottom={'2rem'}>
              {launchDetails?.launch?.details}
            </Typography>
            
            <Box sx={{display: 'flex', alignItems: 'center'}} className={styles.btnsWrap}>
              {launchDetails?.launch?.links?.video_link ? 
                <Button size="large" variant="contained" target='_blank' disableRipple={true} href={launchDetails?.launch?.links?.video_link}>VIDEO</Button>
              : null}
              {launchDetails?.launch?.links?.wikipedia ? 
                <Button size="large" variant="contained" target='_blank' disableRipple={true} href={launchDetails?.launch?.links?.wikipedia}>WIKIPEDIA</Button>
              : null}
            </Box>

          </Box>
        ) : null}
      </Container>
    </section>
  )
}

export default LaunchDetails