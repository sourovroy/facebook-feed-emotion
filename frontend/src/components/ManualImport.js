import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EastIcon from '@mui/icons-material/East';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';

import { setLoading, setResultPage, startProcessingThunk } from '../store/processReducer';

/**
 * Individual text field.
 */
function PostField(props) {

  const changePostField = (event, index) => {
    props.setPost((postsCopy) => {
      postsCopy[index] = {...postsCopy[index], text: event.target.value};

      return [...postsCopy];
    });
  };

  return (
    <Box mt={3}>
      <TextField
        label={"Facebook Post - " + (props.index + 1) }
        placeholder="Enter your facebook post."
        multiline
        fullWidth 
        minRows={2}
        value={props.data.text}
        onChange={(event) => changePostField(event, props.index)}
      />
    </Box>
  );
}

/**
 * Final component to export
 */
export default function ManualImport() {
  const [posts, setPost] = useState(() => {
    return [{
      text: "",
      key: nanoid()
    }];
  });

  const dispatch = useDispatch();

  const addNewPostField = () => {
    let postsCopy = [...posts];
    postsCopy.push({
      text: "",
      key: nanoid()
    });

    setPost(postsCopy);
  };

  // On click submit button
  const startProcessing = () => {
    dispatch(setLoading(true));
    dispatch(setResultPage(true));
    dispatch(startProcessingThunk(posts.map((item) => item.text)));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" align="center" mb={2}>
          Manual Import
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center">
          In manual import you have copy your post from Facebook to here.<br />
          Here you can add as many posts as you want we will provide an average result to you.
        </Typography>
        
        {posts.map((text, index) => 
          <PostField data={text} key={text.key} index={index} setPost={setPost} />
        )}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
          mt={3}
        >
          <Button variant="outlined" color="secondary" 
            startIcon={<ControlPointIcon />}
            onClick={addNewPostField}
          >Add New Post</Button>

          <Button variant="outlined" color="secondary" 
            endIcon={<EastIcon />}
            onClick={startProcessing}
          >Start Processing</Button>
        </Box>
      </CardContent>
    </Card>
  );
}
