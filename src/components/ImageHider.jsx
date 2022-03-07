import React, {useState} from "react";
import { saveAs } from "file-saver";

import { Grid, Box, Card, CardMedia, Input, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import LoadingGif from './gifs/loading.webp'

import axios from 'axios'

const BASE_URL = "https://excoccur.pythonanywhere.com/api/v1/messages"


const ImageHider = () => {

  const [containerImage, setContainerImage] = useState(null);
  const [alternateImage, setAlternateImage] = useState("https://www.w3schools.com/w3images/fjords.jpg");
  
  const [imageInfo, setImageInfo] = useState(null);
  const [hiddenInfoContainerImage, setHiddenInfoContainerImage] = useState("https://www.w3schools.com/w3images/fjords.jpg");

  const handleContainerImageChange = (e) => {
    setContainerImage(e.target.files[0]);
  };

  const handleImageInfoChange = (e) => {
    setImageInfo(e.target.files[0]);
  };


  const handleHiddenInfoContainerImageChange = (e)=> {
    setHiddenInfoContainerImage(e.target.files[0])
  }

  const handleHideImage = async ()=> {
    setHiddenInfoContainerImage(LoadingGif)
    try{
      const formData = new FormData();
      formData.append("containerImage", containerImage)
      formData.append("imageInfo", imageInfo)

      const response = await axios({
        method: 'post',
        url: BASE_URL+"/hide-image",
        data: formData,
        headers : {'Content-Type': 'application/json'}
      })

      
      if(response.data.success){
        setHiddenInfoContainerImage("https://excoccur.pythonanywhere.com"+response.data.body.containerImage)
      }else{
        throw "Error occured"
      }

    }catch(error){
      console.log(error)
    }
  }


  return (
    <Box display="flex">
    
          <Grid container direction="row" justifyContent="center" spacing={7}>
            <Grid item>
              <Card sx={{ maxWidth: 250 }}>
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
              <Card sx={{ maxWidth: 250 }}>
                <CardMedia
                  component="img"
                  height="100%"
                  image={imageInfo===null? alternateImage : URL.createObjectURL(imageInfo)}
                  alt="green iguana"
                ></CardMedia>

                <Button sx={{ width: 250, marginTop: 1 }} variant="contained">
                  <Input type="file" onChange={(e) => handleImageInfoChange(e)} />
                </Button>
                <Button onClick={handleHideImage} sx={{ width: 250, marginTop: 1 }} variant="contained">
                 Hide Image
                </Button>
              </Card>
            </Grid>
           
            <Grid item>
              <Card sx={{ maxWidth: 250, marginLeft: 0 }}>
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
      
    </Box>
  );
};

export default ImageHider;


