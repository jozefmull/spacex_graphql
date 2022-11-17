import {useContext, useRef, useState, useEffect, SyntheticEvent} from 'react';
import { GlobalContext } from '../context/GlobalState'

import { useQuery } from 'urql'
import { getLaunches } from '../Queries';

import { Typography, Container, Grid, Card, CardHeader, CardContent, IconButton, Badge, Button, CardActions, Box, Tooltip} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { LaunchPastLaunchList } from '../context/Types';

import Loading from './Loading';
import Error from './Error';

import styles from '../css/LaunchesList.module.css'

const MONTHS:string[] = [
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUN',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER'
]

const LaunchesList:React.FC = () => {
  const {addToFavourites, myState} = useContext(GlobalContext)
  const {favourites} = myState

  const [offset, setoffset] = useState<number>(0)
  const [initialQuery, setinitialQuery] = useState<boolean>(true)
  const [launchesList, setlaunchesList] = useState<any>([])

  const listRef = useRef<HTMLElement>(null);
  // console.log(favourites.find(item => item === '118'));
  
    const [{data:launches, fetching, error}] = useQuery({
        query: getLaunches,
        variables: {
          limit: 10,
          offset: offset
        }
    })

    useEffect(() => {
      if (!fetching && !error && launches?.launchesPast) {
        setlaunchesList([...launchesList , ...launches?.launchesPast])
        setinitialQuery(false)
      }
      return () => {setlaunchesList([])}
    }, [launches?.launchesPast])


    /**
    * HANDLE SCROLL TO LAUCHES LIST 
    */
    const handleScroll = ():void => {
      listRef.current?.scrollIntoView({behavior: 'smooth'});
    };
    /**
     * FORMAT DATE
     * @param date 
     * @returns month day, year string
     */
    const formatDate = (date:string):string => {
      const d = new Date(date);
      const month = MONTHS[d.getMonth()]
      const day = d.getDay() + 1
      const year = d.getFullYear()

      return `${month} ${day}, ${year}`;
    }

    const handleAddToFavourites = (e:SyntheticEvent, id:string):void => {
      const target = e.target as Element

      target.classList.toggle(styles.selected)
      addToFavourites(id)
    }

  return (
    <section className={styles.launches_section}>
      <section className={styles.header_section}>
        <Typography variant='h1' fontWeight={900}>
          LAUNCHES
        </Typography>
        <KeyboardArrowDownIcon sx={{fontSize: 68}} onClick={() => handleScroll()}/>
      </section>
      <section className={styles.list_section} ref={listRef}>
        <Container maxWidth="lg">
        {initialQuery && fetching ? <Loading/> : null}
        {!initialQuery && (
          <Box className={styles.summary_wrap}>
            <Typography gutterBottom variant="h5" component="h2" noWrap>
              Displaying: {launchesList?.length} launches
            </Typography>
            <Typography gutterBottom variant="h5" component="h2" noWrap>
              Favourites: {favourites?.length}
            </Typography>
        </Box>
        )}
        <Grid container spacing={2}>
          {!initialQuery && launchesList?.map((launch:LaunchPastLaunchList, id:number) => (
              <Grid item md={6} xs={12} key={`launch-${id}`}>
                <Card className={styles.card} >
                  <CardHeader
                    title={launch.mission_name.toUpperCase()}
                      className={styles.card_header}
                    />
                    <CardContent className={styles.card_content}>
                      <Tooltip title="rocket" arrow>
                        <Typography gutterBottom variant="body2" component="span" noWrap className={styles.additional_info}>
                          {launch.rocket.rocket_name}
                        </Typography>
                      </Tooltip>
                      <Tooltip title="launch site" arrow>
                        <Typography gutterBottom variant="body2" component="span" noWrap className={styles.additional_info}>
                          {launch.launch_site.site_name}
                        </Typography>
                      </Tooltip>
                      {launch?.mission_id[0] ? (
                        <Tooltip title="mission id" arrow>
                          <Typography gutterBottom variant="body2" component="span" noWrap className={styles.additional_info}>
                            {launch.mission_id[0]}
                          </Typography>
                        </Tooltip>
                      ) : null}
                      <Tooltip title="mission success" arrow>
                        <Badge 
                          badgeContent={launch.launch_success ? 'success' : 'failed'} 
                          className={styles.badge}
                        />
                      </Tooltip>
                      <Typography gutterBottom variant="h5" component="h3" noWrap>
                        {formatDate(launch.launch_date_utc)}
                      </Typography>
                      <CardActions className={styles.card_actions}>
                        <Button size="large" variant="contained" disableRipple={true} href={`/launch/${launch.id}`}>LEARN MORE</Button>
                        <IconButton 
                          className={favourites.find(item => item === launch.id) ? `${styles.favourite} ${styles.selected}` : styles.favourite}
                          onClick={(e) => handleAddToFavourites(e, launch.id)}>
                          <FavoriteIcon fontSize={'large'}/>
                        </IconButton>
                      </CardActions>
                    </CardContent>
                </Card>
              </Grid>
          ))}
          {error ? (<Error message={error.message}/>) : null}
          {!initialQuery ? (
            <Box className={styles.load_more_wrap}>
              <Button className={styles.load_more} size="large" variant="contained" disableRipple={true} onClick={() => setoffset(prev => prev + 10)}>
                LOAD MORE
              </Button>
              {fetching ? <Loading/> : null}
            </Box>
          ) : null}
        </Grid>
        </Container>
      </section>
    </section>
  )
}

export default LaunchesList