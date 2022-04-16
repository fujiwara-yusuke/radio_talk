import React, { useState, FC } from "react";
import axios from "axios";
import styled from "styled-components";
import { Button } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { motion, AnimationControls } from "framer-motion";

import Loading from "./Loading";
import EvaluteButton from "./EvaluteButton";

interface Topics {
  id:        number,
  name:      string,
  theme:     string,
  good:      number,
  bad:       number,
  createdAt: Date
}

interface Props {
  isLoad: boolean,
  topicsList: Topics[],
  setTopicsList: (param: Topics[]) => void,
  message: string,
  setMessage: (param: string) => void,
  displayMessage: AnimationControls,
  sliderEl: any
}

const TopicsSlider :FC<Props> = ({
  topicsList,
  setTopicsList,
  isLoad,
  message,
  setMessage,
  displayMessage,
  sliderEl
}) => {

  const [isPause, setIsPause] = useState<boolean>(false);

  const playSlide = ():void => {
    setIsPause(false);
    sliderEl.current.slickPlay();
    setMessage('スライド開始します');
    animationSetting.background = "blue";
    displayMessage.start(animationSetting)
  }
  
  const selectRandom = ():void => {
    setIsPause(true);
    const random = Math.floor( Math.random() * topicsList.length );
    sliderEl.current.slickGoTo(random);
    sliderEl.current.slickPause();
    setMessage('この話に決まり！！');
    animationSetting.background = "blue";
    displayMessage.start(animationSetting)
  }
  
  const updateTopicsList = ():void => {
    axios.get('api/topics')
    .then(res => {
      setTopicsList(res.data);
      setMessage('トピックスを更新しました');
      animationSetting.background = "blue";
      displayMessage.start(animationSetting)
    })
    .catch(() => {
      setMessage('トピックスの取得が出来ませんでした');
      displayMessage.start({
        display: "initial",
        height: 30,
        background: "red",
      });
    });
  }
  
  const pauseSlide = ():void => {
    setIsPause(true);
    sliderEl.current.slickPause();
    setMessage('スライド停止します');
    displayMessage.start(animationSetting);
  }
  
  const removeTopics = (sliderIndex: number):void => {
    if(topicsList.length == 1){
      setMessage('これ以上削除できません');
    }else{
      const updateTopicsList = topicsList.filter((topics, index) => index != sliderIndex);
      setTopicsList(updateTopicsList);
      setMessage('トピックスを削除しました');
    }
    
    displayMessage.start(animationSetting);
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

  const sliderSetting = {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true
  };
  
  return (
    <Topcis>
      <SliderWrapper>
        <CustomMsg animate={displayMessage}>{message}</CustomMsg>
        {
          isLoad ?
          <Loading/>
          :
          <SliderCustom ref={sliderEl} {...sliderSetting}>
            {
              topicsList.map((topics, index) => {
                return(
                  <div  key={index} className="topics">
                    <RemoveCircleIcon onClick={() => removeTopics(index)}/>
                    <div className="name">{topics.name}さんからの投稿</div>
                    <h2 className="theme">{topics.theme}</h2>
                    <div className="gobi">の話</div>
                    <EvaluteButton
                      topics={topics}
                      setMessage={setMessage}
                      displayMessage={displayMessage}
                    />
                  </div>
                )
              })
            }
          </SliderCustom>
        }
      </SliderWrapper>
      <ButtonWrapper>
        <Button variant="contained" onClick={playSlide} disabled={isLoad||!isPause}>スタート</Button>
        <Button variant="contained" onClick={selectRandom}  disabled={isLoad}>ランダム</Button>
        <Button variant="contained" onClick={updateTopicsList} disabled={isLoad}>更新</Button>
        <Button variant="contained" onClick={pauseSlide} disabled={isLoad||isPause}>ストップ</Button>
      </ButtonWrapper>
    </Topcis>
  );
};

const Topcis = styled.div`
  padding: 40px 0px 5px 0px;
`

const CustomMsg = styled(motion.div)`
  width: 100%;
  z-index: 10;
  position: absolute;
  color: #FFF;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  opacity: 0.8;
  text-align: center;
  line-height: 35px;
`
const SliderWrapper = styled.div`
  background: #FFF;
  color: #000;
  width: 90%;
  border-radius: 5px;
  height: 250px;
  margin: auto;
  display: flex;
  position: relative;
  
  .topics{
    height: 100%;
    position: relative;
    padding: 60px 0px;
  }

  .MuiSvgIcon-root[data-testid="RemoveCircleIcon"]{
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 10;
  }

  .name{
    margin-left: 50px;
    font-size: 20px;
  }

  .theme{ 
    text-align: center;
    font-size: 25px;
    margin: 10px 0px;
  }

  .gobi{
    text-align: end;
    margin-right: 50px;
    font-size: 20px;
  }

  @media screen and (max-width: 480px) {
    height: 210px;
    .topics{
      padding: 40px 0px;
    }
    .name{
      margin-left: 20px;
      font-size: 15px;
    }
    .theme{ 
      font-size: 20px;
    }
    .gobi{
      margin-right: 35px;
      font-size: 20px;
    }
  }
`
  
const SliderCustom = styled(Slider)`
  height: 100%;
  width: 100%;

  .slick-prev {
    left: 10px;
    z-index: 10;
  }

  .slick-next {
    right: 10px;
  }

  .slick-prev:before,
  .slick-next:before {
    color: black;
  }

  .slick-list{
    height: 90%;
  }

  .slick-track,
  .slick-slide,
  .slick-slide > div{
    height: 100%;
  }

  ul.slick-dots{
    position: initial;
    bottom: 0;
    height: 10%;
  }

  @media screen and (max-width: 480px) {
    .slick-list{
      height: 80%;
    }
    .slick-prev:before,
    .slick-next:before {
      display: none;
    }
    ul.slick-dots{
      height: 20%;
    }
    .slick-dots li{
      width: 10px;
      height: 10px;
    }
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 95%;
  margin: auto;
  padding: 15px 100px;

  .MuiButton-root{
    width: 120px;
  }
`

export default TopicsSlider;
