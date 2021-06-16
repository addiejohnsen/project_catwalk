import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import GITHUB_API_TOKEN from '../../config.js';


const Answer = (props) => {
  const [isHelpful, setIsHelpful] = useState(false);
  const [reported, setReported] = useState(false);

  //format Date function
  const handleHelpful = (e) => {
    console.log('clicked');
  }

  //ANSWER ID = props.answer.answer_id

  // Logic for marking an answer as helpful
  const markAnswerHelpful = (e) => {
    const queryParam = props.answer.answer_id;
    const config = {
      method: 'put',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/answers/${queryParam}/helpful`,
      headers: {
        Authorization: GITHUB_API_TOKEN,
        ContentType: 'application/json'
      },
      data: null
    }
    if (!isHelpful) {
      console.log('mark this as helpful');
      axios(config)
        .then((result) => {
          setIsHelpful(true);
        })
        .catch((err) => {
          console.error("Error marking as helpful: ", error);
        })
    }
  };

  // Logic for Reporting an Answer
  const reportAnswer = (e) => {
    // console.log('reported');
    const queryParam = props.answer.answer_id;
    const config = {
      method: 'put',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/answers/${queryParam}/report`,
      headers: {
        Authorization: GITHUB_API_TOKEN,
        ContentType: 'application/json'
      },
      data: null
    }
    if (!reported) {
      axios(config)
        .then((result) => {
          setReported(true);
          // props.getAnswers(props.questionId)
        })
        .catch((err) => {
          console.error("Error reporting answer: ", error);
        })
    }
  };

  return (
    <React.Fragment>
      <Typography component="div">
        <Box fontWeight="fontWeightBold" display="inline" >A: </Box> {props.answer.body}
      </Typography>
      <Typography variant="overline">By {props.answer.answerer_name}  | {props.answer.date.slice(0, 10)} | helpful  <span onClick={markAnswerHelpful}><u>yes</u> </span>
        ({isHelpful ? props.answer.helpfulness + 1 : props.answer.helpfulness}) |
        {reported ? <span> Reported</span> :
          <span onClick={reportAnswer}> <u>report</u></span>}</Typography>
    </React.Fragment>
  )
};

export default Answer;
