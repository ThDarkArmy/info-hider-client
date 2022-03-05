import * as React from 'react';
import {Box, Paper} from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import TextHider from './TextHider';
import ExecHider from './ExecHider';
import InfoExtractor from './InfoExtractor';
import ImageHider from './ImageHider';

import BackgroundImage from './images/background.jpg'


const Home = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    // <Paper style={{backgroundImage: `url(${BackgroundImage})`, height: 700, width: '100%'}}>
    <Box sx={{ width: '100%', typography: 'body1', marginTop: 8 }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList 
            onChange={handleChange} 
            variant="scrollable"
            scrollButtons="auto" 
            aria-label="lab API tabs example">
                <Tab label="Text Hider" value="1" />
                <Tab label="Image Hider" value="2" />
                <Tab label="Executables Hider" value="3" />
                <Tab label="Info Extractor" value="4" />
            
          </TabList>
        </Box>
        <TabPanel value="1"><TextHider/></TabPanel>
        <TabPanel value="2"><ImageHider/></TabPanel>
        <TabPanel value="3"><ExecHider/></TabPanel>
        <TabPanel value="4"><InfoExtractor/></TabPanel>
      </TabContext>
    </Box>
    // </Paper>
  );
}


export default Home;
