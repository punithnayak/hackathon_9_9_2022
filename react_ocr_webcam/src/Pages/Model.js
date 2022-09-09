import React, { useRef, useState, useCallback, createRef } from 'react';

import Webcam from "react-webcam";
import axios from 'axios'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { Header, Grid, Button, Icon, Message, Loader } from 'semantic-ui-react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Model=()=> {

  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [textOcr, setTextOcr] = useState(null);
  const [load, setLoad] = useState(false);
  let fileInputRef = createRef();

  const capture = useCallback(() => {
    setLoad(true)
    const imageSrc = webcamRef.current.getScreenshot();
    // console.log(imageSrc)  
    let url = 'http://localhost:5000/capture'
    let config = {
      headers: {'Content-Type': 'application/json'} // x-www-form-urlencoded
    }
    let dataBody = {
      img: imageSrc
    }
    axios.post(url, dataBody, config)
    .then((res) => {
        console.log(res.data)
        setTextOcr(res.data.text)
        setImgSrc(imageSrc);
        setLoad(false)
    })
    .catch((err) => {
      console.log(err)
    })
    
  }, [webcamRef, setImgSrc]
  );

  const upload = (file) => {
    setLoad(true)
    var url = 'http://localhost:5000/upload'
    var formData = new FormData()
    formData.append('file', file)
    var config = {
      headers:
      {'Content-Type': 'multipart/form-data'}
    }
    return axios.post(url, formData, config)
    .then((res)=>{
      console.log(res.data)
      setTextOcr(res.data.text)
      setImgSrc(res.data.image);
      setLoad(false)
    })
  }

  return (
    <>

    <div style={{backgroundColor: '#F5FFFA'}}>
      <center>
        <Header style={{fontSize:50, fontFamily:'roboto',margin:'0'}} size='huge'>
          React OCR
        </Header>
      </center>

      <Grid divided>
        <Grid.Column style={{width:"50%"}} key={0}>
          <center>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
            <Grid.Column>
              <Button size='big' onClick={capture} 
              style={{margin:20}} icon labelPosition='left' inverted color='green'>
                <Icon name='camera' />
                Capture
              </Button>
              
              <Button size='big' onClick={() => fileInputRef.current.click()} 
              style={{margin:20}} icon labelPosition='left' inverted color='blue'>
                <Icon name='upload' />
                Upload
                <form encType="multipart/form-data">
                  <input ref={fileInputRef} type='file' hidden name='filename'
                  onChange={(x)=>{upload(x.target.files[0])}}
                  accept="image/*"
                  />
                </form>
              </Button>
            </Grid.Column>
          </center>
        </Grid.Column>
        
        <Grid.Column style={{width:"50%"}} key={1}>
          {
            load
            ?
            <Loader style={{marginTop: 120}} active inline='centered' size='big'>Loading...</Loader>
            :
            (
              imgSrc 
              ?
              <>
                <Header style={{margin:10, fontFamily:'roboto'}} size='large'>
                  Result
                </Header>
                <img style= {{marginLeft:10, height:'50%'}} alt="captured" src={imgSrc}/>
                <Message
                  size='massive'
                  color='orange'
                  header={textOcr}
                  content=""
                  style={{margin:15}}
                />
                <Box sx={{
                  width: 500,
                    maxWidth: '100%',
                   }}>
                     <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <Grid></Grid>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Google Maps"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <DirectionsIcon />
      </IconButton>
    </Paper>
                    </Box>
                    
              </>
              :
              <Header style={{margin:10, fontFamily:'roboto'}} size='large'>
                No data preview
              </Header>
            )
          }
        </Grid.Column>
      </Grid>
      </div>
    </>
  );
}

export default Model;
