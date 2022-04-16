import { useState, FC } from "react";
import axios from "axios";
import styled from "styled-components";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

interface Topics {
  id:        number,
  name:      string,
  theme:     string,
  good:      number,
  bad:       number,
  createdAt: Date
}

interface Props {
  topics: Topics,
  setMessage: (param:string) => void,
  displayMessage: any
}

const EvaluteButton :FC<Props> = ({
  topics,
  setMessage,
  displayMessage
}) => {
  const [isGood, setIsGood] = useState<boolean>(false);
  const [isBad, setIsBad] = useState<boolean>(false);
  
  const evaluteGood = ():void => {
    topics.good = topics.good + 1;
    axios.post('api/topics/evalute', topics)
    .then(() => {
      setMessage('goodボタンを押しました');
      animationSetting.background = "blue";
      displayMessage.start(animationSetting);
      setIsGood(true);
    })
  }
  
  const evaluteBad = ():void => {
    topics.bad = topics.bad + 1;
    axios.post('api/topics/evalute', topics)
    .then(() => {
      setMessage('badボタンを押しました');
      displayMessage.start(animationSetting);
      setIsBad(true);
    })
  }

  const animationSetting = {
    display: "initial",
    height: [0, 35, 35, 0],
    background: "red",
    transition: {
      duration: 4,
    },
    transitionEnd: { display: "none" }
  }
  
  return (
    <EvaluteButtonWrapper>
      <div className="good_button">
        {isGood ?
          <ThumbUpAltIcon/>
          :
          <ThumbUpOffAltIcon onClick={evaluteGood}/>
        }
        <div>{topics.good}good</div>
      </div>
      <div className="bad_button">
        {isBad ?
          <ThumbDownAltIcon/>
          :
          <ThumbDownOffAltIcon onClick={evaluteBad}/>
        }
        <div>{topics.bad}bad</div>
      </div>
    </EvaluteButtonWrapper>
  );
};

const EvaluteButtonWrapper = styled.div`
  position: absolute;
  left: 45px;
  display: flex;

  .good_button,
  .bad_button{
    display: flex;
    margin-right: 10px;
  }

  .good_button svg,
  .bad_button svg{
    margin-right: 10px;
  }

  .good_button div,
  .bad_button div{
    line-height: 24px;
  }

  @media screen and (max-width: 480px) {
    left: 20px;
    top: 145px;
  }
`

export default EvaluteButton;
