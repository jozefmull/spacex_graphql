import {useRef, useState, useEffect} from 'react';
import { useQuery } from 'urql'
import { getLaunches } from '../Queries';
// import { LaunchesPast } from '../gql/graphql';

import { Typography, Container, Grid, Card, CardHeader, CardContent, IconButton, Badge, Button, CardActions, Box} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';

import Loading from './Loading';

import styles from '../css/LaunchesList.module.css'

const MONTHS = [
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

const LaunchesList = () => {
  const [offset, setoffset] = useState(10)
  const [launchesList, setlaunchesList] = useState<any>([])
  const listRef = useRef<HTMLElement>(null);

    const [{data:launches, fetching, error}] = useQuery({
        query: getLaunches,
        variables: {
          limit: 20,
          offset: 0
        }
    })

    useEffect(() => {
      if (!fetching && !error && launches?.launchesPast) {
        setlaunchesList(launches?.launchesPast)
      }
    }, [launches])

    const handleScroll = () => {
      listRef.current?.scrollIntoView({behavior: 'smooth'});
    };

    const handleLoadMore = () => {
      console.log('clicked');
      
      // const [{data:loadMoreData, fetching:loadMoreFetching, error:loadMoreError}] = useQuery({
      //   query: getLaunches,
      //   variables: {
      //     limit: 10,
      //     offset: offset
      //   }
      // })

      // console.log(loadMoreData, loadMoreFetching, loadMoreError);
      
    }
    const formatDate = (date:string) => {
      const d = new Date(date);
      const month = MONTHS[d.getMonth() - 1]
      const day = d.getDay()
      const year = d.getFullYear()
      
      return `${month} ${day}, ${year}`;
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
        {fetching ? <Loading /> : (
          <>
            <Grid container spacing={2}>
              {launchesList?.map((launch:any, id:number) => (
                <Slide in={true} key={`launch-${id}`}> 
                  <Grid item md={6} xs={12} >
                    <Card className={styles.card} >
                      <CardHeader
                        title={launch.mission_name.toUpperCase()}
                          className={styles.card_header}
                        />
                        <CardContent className={styles.card_content}>
                          <Typography gutterBottom variant="body2" component="span" noWrap className={styles.additional_info}>
                            {launch.rocket.rocket_name}
                          </Typography>
                          <Typography gutterBottom variant="body2" component="span" noWrap className={styles.additional_info}>
                            {launch.launch_site.site_name}
                          </Typography>
                          <Badge 
                            badgeContent={launch.launch_success ? 'success' : 'failed'} 
                            className={styles.badge}/>
                          <Typography gutterBottom variant="h5" component="h3" noWrap>
                            {formatDate(launch.launch_date_utc)}
                          </Typography>
                          <CardActions className={styles.card_actions}>
                            <Button size="large" variant="contained" disableRipple={true} href={`/launch/${launch.id}`}>LEARN MORE</Button>
                            <IconButton className={`${styles.favourite}`}>
                              <FavoriteIcon fontSize={'large'}/>
                            </IconButton>
                          </CardActions>
                        </CardContent>
                    </Card>
                  </Grid>
                </Slide>
              ))}
            </Grid>
            {/* <Fade in={true} timeout={500}>
              <Box textAlign='center'>
                <Button className={styles.load_more} size="large" variant="contained" disableRipple={true} onClick={() => handleLoadMore()}>LOAD MORE</Button>
              </Box>
            </Fade> */}
          </>
        )}
      </Container>
      </section>
    </section>
  )
}

export default LaunchesList