import type { NextPage } from 'next';
import styled from 'styled-components';

const Home: NextPage = () => {
  return (
    <>
      <h1>ラジオのネタを投稿しよう！！</h1>
      <SliderWrapper>
        <div className='slider'>
          test
        </div>
      </SliderWrapper>
      <div>
        <div>
          投稿ふぉーむ予定
        </div>
      </div>
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
