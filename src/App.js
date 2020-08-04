import React from 'react';
import './App.css';
import Tab from '@material-ui/core/Tab';
import { AppBar, Tabs, makeStyles, Typography, Button } from '@material-ui/core';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import Box from '@material-ui/core/Box'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow:1,
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper
  },
  mainDiv: {
    marginTop: 'auto',
		position: 'absolute',
		width: '30vw',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%,-50%)'
  },

  insertCoinButton: {
    marginBottom: '10px',  
    position: 'absolute',    
    width: '90%',
    height: '10%',
    bottom: '0',
    left: '0',
    right: '0',    
    marginRight: 'auto',
    marginLeft: 'auto',
    color: 'white',
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },

  spendCoinButton: {
    marginBottom: '10px',  
    position: 'absolute',    
    width: '90%',
    height: '10%',
    bottom: '0',
    left: '0',
    right: '0',    
    marginRight: 'auto',
    marginLeft: 'auto'
  }
}))
function App() {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = React.useState(0);
  const [fichas, setFichas] = React.useState(parseInt(localStorage.getItem('fichas'))|| 0)
  const onChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  }
  const insertCoinAudio = new Audio("/earn_single_coin.mp3")
  const payCoinAudio = new Audio("/spend_coin.mp3")
  const increaseFichas = () => {
    insertCoinAudio.play();
    const newFichas = fichas + 1;
    localStorage.setItem('fichas', newFichas.toString())
    setFichas(newFichas)
    
  }

  const decreaseFichas = () => {
    payCoinAudio.play();
    if(fichas <= 0) {
      alert('Vai treinar, seu sedentário kkk')
      return;
    }
    const newFichas = fichas - 1;
    localStorage.setItem('fichas', newFichas.toString())
    setFichas(newFichas)
    
  }
  return (
    <div className={classes.root}>
     <AppBar position="static">
      <Tabs value={currentTab} onChange={onChangeTab} variant="fullWidth">
        <Tab icon={<FitnessCenterIcon/>} label="Comprar"/>
        <Tab icon={<SportsEsportsIcon/>} label="Pagar"/>
       </Tabs>       
     </AppBar>

     <Box hidden={currentTab !== 0}>
        <div className={classes.mainDiv}>
          <Typography variant="h1" component="h1">
            {fichas}
          </Typography>
          <Typography>
            Fichas
          </Typography>          
        </div> 
        <Button onClick={increaseFichas} className={classes.insertCoinButton} size="large" variant="contained" color="success" startIcon={<FitnessCenterIcon/>}>
            +1 ficha
        </Button>
      </Box>
      <Box hidden={currentTab !== 1}>
        <div className={classes.mainDiv}>
          <Typography variant="h1" component="h1">
            {fichas}
          </Typography>
          <Typography>
            Fichas
          </Typography>          
        </div> 
        <Button onClick={decreaseFichas} className={classes.spendCoinButton} size="large" variant="contained" color="secondary" startIcon={<SportsEsportsIcon/>}>
            -1 ficha
        </Button>
      </Box>
    </div>
  );
}

export default App;
