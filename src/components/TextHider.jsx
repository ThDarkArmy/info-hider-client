import React, { useState } from "react";
import { Grid, Card, CardMedia, Input, TextField, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { saveAs } from "file-saver";

import LoadingGif from './gifs/loading.webp'


import axios from 'axios'

const BASE_URL = "http://localhost:8000/api/v1/messages"

const TextHider = () => {
  const [containerImage, setContainerImage] = useState(null);
  const [alternateImage, setAlternateImage] = useState("https://www.w3schools.com/w3images/fjords.jpg");
  
  const [textInfo, setTextInfo] = useState();
  const [hiddenInfoContainerImage, setHiddenInfoContainerImage] = useState("https://www.w3schools.com/w3images/fjords.jpg");

  const handleContainerImageChange = (e) => {
    setContainerImage(e.target.files[0]);
  };

  const handleTextChange = (e) => {
    setTextInfo(e.target.value);
  };

  const handleHiddenInfoContainerImageChange = (e) => {
    setHiddenInfoContainerImage(e.target.files[0]);
  };

  const handleHideText = async ()=> {
    setHiddenInfoContainerImage(LoadingGif)
    var formData = new FormData()
    formData.append("containerImage", containerImage)
    formData.append("textInfo", textInfo)

    const data ={
      "containerImage": containerImage,
      "textInfo": textInfo
    }

    try{
      const response = await axios({
        method: "post",
        url: BASE_URL + "/hide-text",
        data: formData,
        headers: { 'Content-Type': 'application/json'}
      })

      console.log(response.data)

      setHiddenInfoContainerImage("http://localhost:8000"+response.data.body.containerImage)

    }catch(error){
      console.log(error)
    }
    
  }

  return (
    <div style={{ marginTop: 10 }}>
    
          <Grid container direction="row" justifyContent="flex-start">
            <Grid item>
              <Card sx={{ maxWidth: 250}}>
                <CardMedia
                  component="img"
                  height="100%"
                  image={containerImage===null? alternateImage : URL.createObjectURL(containerImage)}
                  alt="green iguana"
                ></CardMedia>

                <Button sx={{ width: 250, marginTop: 1 }} variant="contained">
                  <Input type="file" onChange={(e) => handleContainerImageChange(e)} />
                </Button>
              </Card>
            </Grid>
            <Grid item>
              <Card sx={{ maxWidth: 250, marginLeft: 8 }}>
                <TextField
                  id="outlined-multiline-static"
                  //   label="Put Text Here"
                  placeholder="Put Your Text Here"
                  multiline
                  rows={6}
                  defaultValue=""
                  sx={{ width: 250 }}
                  onChange={(e) => handleTextChange(e)}
                />
                <Button onClick={handleHideText} sx={{ width: 250, marginTop: 1 }} variant="contained">
                  Hide Text 
                </Button>
              </Card>
            </Grid>
            <Grid item>
              <Card sx={{ maxWidth: 250, marginLeft: 8 }}>
                <CardMedia
                  component="img"
                  height="100%"
                  image={hiddenInfoContainerImage}
                  onChange={(e) => handleHiddenInfoContainerImageChange(e)}
                  alt="Encrypted Image"
                ></CardMedia>
                <Button
                  sx={{ width: 250, marginTop: 1 }}
                  variant="contained"
                  endIcon={<DownloadIcon />}
                  onClick={()=> {
                    var name = hiddenInfoContainerImage.split("/")
                    saveAs(hiddenInfoContainerImage, name[name.length-1])
                  }}
                >
                  Download
                
                </Button>
              </Card>
            </Grid>
          </Grid>
       
    </div>
  );
};


export default TextHider;
