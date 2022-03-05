import React, { useState } from "react";
import { saveAs } from "file-saver";

import LoadingGif from './gifs/loading.webp'

import {
  Grid,
  Card,
  CardMedia,
  Input,
  Button,
  Box,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1/messages";

const ExecHider = () => {
  const [containerImage, setContainerImage] = useState(null);
  const [alternateImage, setAlternateImage] = useState(
    "https://www.w3schools.com/w3images/fjords.jpg"
  );

  const [execInfo, setExecInfo] = useState(null);
  const [hiddenInfoContainerImage, setHiddenInfoContainerImage] = useState(
    "https://www.w3schools.com/w3images/fjords.jpg"
  );

  const handleContainerImageChange = (e) => {
    setContainerImage(e.target.files[0]);
  };

  const handleExecInfoChange = (e) => {
    setExecInfo(e.target.files[0]);
  };

  const handleHiddenInfoContainerImageChange = (e) => {
    setHiddenInfoContainerImage(e.target.files[0]);
  };

  const handleHideExec = async () => {
    setHiddenInfoContainerImage(LoadingGif)
    const formData = new FormData();
    formData.append("containerImage", containerImage);
    formData.append("execFile", execInfo);

    console.log(formData.get('execInfo'))
    try {
      const response = await axios({
        method: "post",
        url: BASE_URL + "/hide-exec",
        data: formData,
        headers : {'Content-Type': 'application/x-msdos-program'}
      });

      console.log(response.data);

      setHiddenInfoContainerImage(
        "http://localhost:8000" + response.data.body.containerImage
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Grid container direction="row" justifyContent="flex-start">
        <Grid item>
          <Card sx={{ maxWidth: 250 }}>
            <CardMedia
              component="img"
              height="100%"
              image={
                containerImage === null
                  ? alternateImage
                  : URL.createObjectURL(containerImage)
              }
              alt="green iguana"
            ></CardMedia>

            <Button sx={{ width: 250, marginTop: 1 }} variant="contained">
              <Input
                type="file"
                onChange={(e) => handleContainerImageChange(e)}
              />
            </Button>
          </Card>
        </Grid>
        <Grid item>
          <Card
            sx={{
              maxWidth: 250,
              marginLeft: 8,
            }}
          >
            <CardMedia
              component="img"
              height="100%"
              image={alternateImage}
              alt="green iguana"
            />

            <Input type="file" onChange={handleExecInfoChange} />
            <Button
              onClick={handleHideExec}
              sx={{ width: 250, marginTop: 1 }}
              variant="contained"
            >
              Hide Exec
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
              alt="Hidden Info Conatiner Image"
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

export default ExecHider;
