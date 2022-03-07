import React, { useState } from "react";
import axios from "axios";

import { saveAs } from "file-saver";

import {
  Grid,
  Box,
  Card,
  ClickAwayListener,
  CardMedia,
  Button,
  Tooltip,
  Input,
  TextField,
} from "@mui/material";

const BASE_URL = "https://excoccur.pythonanywhere.com/api/v1";

const InfoExtractor = () => {
  const [infoContainerImage, setInfoContainerImage] = useState(null);
  const [alternateImage, setAlternateImage] = useState(
    "https://www.w3schools.com/w3images/fjords.jpg"
  );

  const [isText, setIsText] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [isExec, setIsExec] = useState(false);
  const [textInfo, setTextInfo] = useState(null);
  const [imageInfo, setImageInfo] = useState(null);
  const [execInfo, setExecInfo] = useState(null);
  const [openToolTip, setOpenToolTip] = useState(false);

  const handleExtractInfo = async () => {
    const formData = new FormData();
    formData.append("hiddenInfoContainerImage", infoContainerImage);

    try {
      const response = await axios({
        method: "post",
        url: BASE_URL + "/messages/extract-info",
        data: formData,
        headers: { "Content-Type": "application/json" },
      });

      console.log(response.data);
      if (response.data.success) {
        if (response.data.type === "TEXT") {
          setIsText(true);
          setTextInfo(response.data.body.textInfo);
        } else if (response.data.type === "IMAGE") {
          setIsImage(true);
          setImageInfo("https://excoccur.pythonanywhere.com" + response.data.body.imagePath);
        } else if (response.data.type === "EXEC") {
          setIsExec(true);
          setExecInfo("https://excoccur.pythonanywhere.com" + response.data.body.execPath);
        }
      } else {
        throw "Error occured";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleToolTipClose = () => {
    setOpenToolTip(false);
  };

  return (
    <Box>
      <Grid container direction="row" spacing={10}>
        <Grid item>
          <Card sx={{ maxWidth: 250 }}>
            <CardMedia
              component="img"
              height="100%"
              image={
                infoContainerImage === null
                  ? alternateImage
                  : URL.createObjectURL(infoContainerImage)
              }
              alt="green iguana"
            ></CardMedia>

            <Button sx={{ width: 250, marginTop: 1 }} variant="contained">
              <Input
                type="file"
                onChange={(e) => setInfoContainerImage(e.target.files[0])}
              />
            </Button>
            <Button
              onClick={handleExtractInfo}
              sx={{ width: 250, marginTop: 1 }}
              variant="contained"
            >
              Extract Info
            </Button>
          </Card>
        </Grid>
        <Grid item>
          {isText && (
            <Box>
              <ClickAwayListener onClickAway={handleToolTipClose}>
                <Tooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={handleToolTipClose}
                  open={openToolTip}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title="Text Copied"
                >
                  <TextField
                    variant="outlined"
                    placeholder="Write awesome things about yourself"
                    multiline
                    rows={8}
                    rowsmax={12}
                    value={textInfo}
                    sx={{ width: 350 }}
                    onClick={() => {
                      navigator.clipboard.writeText(textInfo);
                      setOpenToolTip(true);
                    }}
                    onFocus={(event) => event.target.select()}
                  />
                </Tooltip>
              </ClickAwayListener>
            </Box>
          )}
          {imageInfo && (
            <Card sx={{ maxWidth: 250 }}>
              <CardMedia
                component="img"
                height="100%"
                image={imageInfo}
                alt="Extracted Image"
              ></CardMedia>

              <Button onClick={()=> {
                var name = imageInfo.split("/")
                    saveAs(imageInfo, name[name.length-1])
                  }} sx={{ width: 250, marginTop: 1 }} variant="contained">
                Download
              </Button>
            </Card>
          )}

          {execInfo && (
            <Card sx={{ maxWidth: 250 }}>
              <CardMedia
                component="img"
                height="100%"
                image={alternateImage}
                alt="Extracted Image"
              ></CardMedia>

              <Button  onClick={()=> {
                var name = execInfo.split("/")
                    saveAs(execInfo, name[name.length-1])
                  }} sx={{ width: 250, marginTop: 1 }} variant="contained">
                Download
              </Button>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default InfoExtractor;
