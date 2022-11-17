import { CircularProgress, Box  } from '@mui/material';

const Loading:React.FC = () => {
  return (
    <Box sx={{ display: 'flex', padding: '20px 0' }}>
        <CircularProgress sx={{color: '#fff', margin: '0 auto !important'}}/>
    </Box>
  )
}

export default Loading