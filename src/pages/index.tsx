import type { NextPage } from 'next';
import styled from 'styled-components';
import PostForm from 'components/PostForm';
import TopicsSlider from 'components/TopicsSlider';

const Home: NextPage = () => {
  return (
    <>
      <TopicsSlider/>
      <PostForm/>
    </>
  );
};

const SliderWrapper = styled.div`
  .slider{
    background: #FFF;
    color: #000;
    width: 95%;
    border-radius: 5px;
    height: 250px;
    margin: auto;
  }
`
export default Home;
