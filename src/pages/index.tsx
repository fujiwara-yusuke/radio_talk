import type { NextPage } from 'next';
import PostForm from 'components/PostForm';
import Topics from 'components/TopicsSlider';

const Home: NextPage = () => {
  return (
    <>
      <Topics/>
      <PostForm/>
    </>
  );
};

export default Home;
