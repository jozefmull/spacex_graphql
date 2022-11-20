import { SyntheticEvent, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

import { Typography, Card, CardHeader, CardContent, IconButton, Badge, Button, CardActions, Tooltip} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Grow from '@mui/material/Grow';

import styles from '../css/LaunchesList.module.css'

type Props = {
    name: string,
    rocket_name: string,
    site_name: string,
    mission_id: string,
    launch_success: boolean | undefined,
    date: string,
    id: string,
    idx: number
}

const LaunchCard = ({name, rocket_name, site_name, mission_id, launch_success, date, id, idx}: Props) => {
    const {addToFavourites, formatDate, myState} = useContext(GlobalContext)
    const {favourites} = myState

    const handleAddToFavourites = (e:SyntheticEvent, id:string):void => {
        const target = e.target as Element
  
        target.classList.toggle(styles.selected)
        addToFavourites(id)
    }

  return (
    <Grow in={true}>
        <Card className={styles.card} >
            <CardHeader
            title={name.toUpperCase()}
                className={styles.card_header}
            />
            <CardContent className={styles.card_content}>
                <Tooltip title="rocket" arrow>
                <Typography gutterBottom variant="body2" component="span" noWrap className={styles.additional_info}>
                    {rocket_name}
                </Typography>
                </Tooltip>
                <Tooltip title="launch site" arrow>
                <Typography gutterBottom variant="body2" component="span" noWrap className={styles.additional_info}>
                    {site_name}
                </Typography>
                </Tooltip>
                {mission_id ? (
                <Tooltip title="mission id" arrow>
                    <Typography gutterBottom variant="body2" component="span" noWrap className={styles.additional_info}>
                    {mission_id}
                    </Typography>
                </Tooltip>
                ) : null}
                <Tooltip title="mission success" arrow>
                <Badge 
                    badgeContent={launch_success ? 'success' : 'failed'} 
                    className={launch_success ? `${styles.badge} ${styles.success}` : `${styles.badge} ${styles.fail}`}
                />
                </Tooltip>
                <Typography gutterBottom variant="h5" component="h3" noWrap>
                    {formatDate(date)}
                </Typography>
                <CardActions className={styles.card_actions}>
                    <Button size="large" variant="contained" disableRipple={true} href={`/launch/${id}`}>LEARN MORE</Button>
                    <IconButton 
                        className={favourites.find(item => item === id) ? `${styles.favourite} ${styles.selected}` : styles.favourite}
                        onClick={(e) => handleAddToFavourites(e, id)}>
                        <FavoriteIcon fontSize={'large'}/>
                    </IconButton>
                </CardActions>
            </CardContent>
        </Card>
    </Grow>
  )
}

export default LaunchCard