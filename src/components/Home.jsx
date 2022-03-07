import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Paper,
  Toolbar,
  ListItemText,
  ListItem,
  List,
  Divider,
  Typography
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { createTheme, ThemeProvider, styled, useTheme } from "@mui/material/styles";

import TextHider from "./TextHider";
import ExecHider from "./ExecHider";
import InfoExtractor from "./InfoExtractor";
import ImageHider from "./ImageHider";
import LOGO1 from "./images/logo1.png";
import LOGO2 from "./images/logo2.png";
import LOGO3 from "./images/logo3.png";

import BackgroundImage from "./images/background.jpg";
import Background from "./images/back.jfif";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import CloseIcon from "@mui/icons-material/Close";




const theme = createTheme({
  palette: {
    primary: {
      light: "#111111",
      main: "#111111",
      dark: "#111111",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#fff",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const StyledTab = styled(Tab)(({ theme }) => ({
  color: "#70706E",
  disableRipple: true,
  "&:hover, &.Mui-focusVisible": {
    color: "#fff",
  },
  "&.Mui-active": {
    color: "#fff",
  },
  fontFamily: `"montserrat-regular", sans-serif`,
}));

const Home = () => {
  const themes = useTheme();
  const matches = useMediaQuery(themes.breakpoints.up("sm"));
  const [value, setValue] = useState("1");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [textHider, setTextHider] = useState(false);
  const [imageHider, setImageHider] = useState(false);
  const [execHider, setExecHider] = useState(false);
  const [infoExtractor, setInfoExtractor] = useState(false);

  useEffect(()=> {
    if(matches){
      setImageHider(false)
      setTextHider(false)
      setExecHider(false)
      setInfoExtractor(false)
    }
   
    if(!matches){
      setTextHider(true)
    }
  }, [matches])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  const handleMenuClick = (event) => {
    if(event.target.innerHTML==="Image Hider"){
      setImageHider(true)
      setTextHider(false)
      setExecHider(false)
      setInfoExtractor(false)
    }else if(event.target.innerHTML==="Text Hider"){
      setImageHider(false)
      setTextHider(true)
      setExecHider(false)
      setInfoExtractor(false)
    }else if(event.target.innerHTML==="Exec Hider"){
      setImageHider(false)
      setTextHider(false)
      setExecHider(true)
      setInfoExtractor(false)
    }else if(event.target.innerHTML==="Info Extractor"){
      setImageHider(false)
      setTextHider(false)
      setExecHider(false)
      setInfoExtractor(true)
    }

    setOpenDrawer(!openDrawer)
  }

  const MenuDrawer = (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <SwipeableDrawer
          open={openDrawer}
          anchor="top"
          onOpen={() => setOpenDrawer(true)}
          onClose={() => setOpenDrawer(false)}
          sx={{ marginTop: 30 }}
        >
          <Box
            sx={{ width: "100%", backgroundColor: "#111111" }}
            role="presentation"
            // onClick={setOpenDrawer(!openDrawer)}
            //onKeyDown={setOpenDrawer(false)}
          >
            <AppBar position="fixed">
              <Toolbar>
                <Box
                  component="img"
                  sx={{
                    height: 16,
                    width: 220,
                    maxHeight: { xs: 14, md: 16 },
                    maxWidth: { xs: 150, md: 220 },
                  }}
                  alt="The house from the offer."
                  src={LOGO2}
                />
                <IconButton
                  onClick={() => setOpenDrawer(!openDrawer)}
                  disableRipple
                  sx={{ marginLeft: "auto", color: "#fff" }}
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Divider />
            <Divider />
            <List sx={{ marginTop: 7 }}>
              {[
                "Text Hider",
                "Image Hider",
                "Exec Hider",
                "Info Extractor",
              ].map((text, index) => (
                <ListItem onClick={handleMenuClick} button key={text}>
                  <ListItemText
                     disableTypography
                     primary={<Typography type="body2" style={{ color: '#FFFFFF', fontFamily:`"montserrat-regular", sans-serif` }}>{text}</Typography>}
                  />
                </ListItem>
              ))}
            </List>

            <Divider />
          </Box>
        </SwipeableDrawer>
      </React.Fragment>
    </ThemeProvider>
  );

  return (
    // <Paper
    //   style={{
    //     backgroundImage: `url(${Background})`,
    //     height: 700,
    //     width: "100%",
    //   }}
    // >
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%", typography: "body1", marginTop: 8 }}>
        <TabContext value={value}>
          <AppBar position="fixed" sx={{ bgcolor: "primary" }}>
            <Toolbar>
              <Box
                component="img"
                sx={{
                  height: 16,
                  width: 220,
                  maxHeight: { xs: 14, md: 16 },
                  maxWidth: { xs: 150, md: 220 },
                }}
                alt="The house from the offer."
                src={LOGO2}
              />

              {!matches && (
                <IconButton
                  onClick={() => setOpenDrawer(!openDrawer)}
                  disableRipple
                  sx={{ marginLeft: "auto", color: "#fff" }}
                >
                  <MenuIcon />
                </IconButton>
              )}

              {matches ? (
                <TabList
                  sx={{ marginLeft: "auto", textColor: "red" }}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="lab API tabs example"
                  textColor="secondary"
                  indicatorColor="inherit"
                >
                  <StyledTab disableRipple label="Text Hider" value="1" />
                  <StyledTab disableRipple label="Image Hider" value="2" />
                  <StyledTab disableRipple label="Exec Hider" value="3" />
                  <StyledTab disableRipple label="Info Extractor" value="4" />
                </TabList>
              ) : (
                MenuDrawer
              )}
            </Toolbar>
          </AppBar>
          {matches && (
            <Box>
              <TabPanel value="1">
                <TextHider />
              </TabPanel>
              <TabPanel value="2">
                <ImageHider />
              </TabPanel>
              <TabPanel value="3">
                <ExecHider />
              </TabPanel>
              <TabPanel value="4">
                <InfoExtractor />
              </TabPanel>
            </Box>
          )}

          {imageHider && <ImageHider/>}
          {textHider && <TextHider/>}
          {execHider && <ExecHider/>}
          {infoExtractor && <InfoExtractor/>}
        </TabContext>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
