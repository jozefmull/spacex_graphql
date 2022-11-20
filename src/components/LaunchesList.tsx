import { useContext, useRef, useState, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState'

import { useQuery } from 'urql'
import { getLaunches } from '../Queries';

import { Typography, Container, Grid, Button, Box} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { LaunchPastLaunchList } from '../context/Types';

import Loading from './Loading';
import Error from './Error';
import LaunchCard from './LaunchCard';

import styles from '../css/LaunchesList.module.css'

const LaunchesList:React.FC = () => {
  const {myState} = useContext(GlobalContext)
  const {favourites} = myState

  const [offset, setoffset] = useState<number>(0)
  const [initialQuery, setinitialQuery] = useState<boolean>(true)
  const [launchesList, setlaunchesList] = useState<any>([])

  const listRef = useRef<HTMLElement>(null);
  
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
                  <LaunchCard 
                    name={launch?.mission_name.toUpperCase()}
                    rocket_name={launch?.rocket.rocket_name}
                    site_name={launch?.launch_site.site_name}
                    mission_id={launch?.mission_id[0]}
                    launch_success={launch?.launch_success}
                    date={launch?.launch_date_utc}
                    id={launch?.id}
                    idx={id}
                    />
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