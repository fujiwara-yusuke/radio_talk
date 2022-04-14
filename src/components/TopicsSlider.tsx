import { useRef } from "react";
import styled from "styled-components";
import { Button } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const TopicsSlider = () => {

  const sliderEl = useRef(null);

  const testTopis = [
    {name: "test", theme: "ああああああああああああああああああああああああああああああ"},
    {name: "test", theme: "test1test2test3test4test5test6"},
    {name: "test", theme: "test1test2test3test4test5test6"},
    {name: "test", theme: "test1test2test3test4test5test6"},
    {name: "test", theme: "test1test2test3test4test5test6"},
    {name: "test", theme: "test1test2test3test4test5test6"},
  ]

  const settings = {
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

  const playSlide = () => {
    sliderEl.current.slickPlay();
  }

  const selectRandom = () => {
    const random = Math.floor( Math.random() * testTopis.length );
    sliderEl.current.slickGoTo(random);
  }

  const pauseSlide = () => {
    sliderEl.current.slickPause();
  }
  
  return (
    <Topcis>
      <SliderWrapper>
        <SliderCustom ref={sliderEl} {...settings}>
          {
            testTopis.map((topics, index) => {
              return(
                <div  key={index} className="topics">
                  <RemoveCircleIcon/>
                  <div className="name">{topics.name}さんからの投稿</div>
                  <h2 className="theme">{topics.theme}</h2>
                  <div className="gobi">の話</div>
                </div>
              )
            })
          }
        </SliderCustom>
      </SliderWrapper>
      <ButtonWrapper>
        <Button variant="contained" onClick={playSlide}>スタート</Button>
        <Button variant="contained" onClick={selectRandom}>ランダム</Button>
        <Button variant="contained" >更新</Button>
        <Button variant="contained" onClick={pauseSlide}>ストップ</Button>
      </ButtonWrapper>
    </Topcis>
  );
};

const Topcis = styled.div`
  padding: 40px 0px 5px 0px;
`

const SliderWrapper = styled.div`
  background: #FFF;
  color: #000;
  width: 90%;
  border-radius: 5px;
  height: 250px;
  margin: auto;
  display: flex;
  
  .topics{
    height: 100%;
    position: relative;
    padding: 60px 0px;
  }

  .MuiSvgIcon-root{
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
