import type { NextPage } from 'next';
import axios from "axios";
import PostForm from 'components/PostForm';
import Topics from 'components/TopicsSlider';
import { useRef, useState, useEffect } from 'react';
import { useAnimation } from "framer-motion";

interface TopicsList {
  name: string,
  theme: string
}

const Home: NextPage = () => {

  const sliderEl = useRef(null);

  const [topicsList, setTopicsList] = useState<TopicsList[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [message, setMessage] = useState<String>('');
  const displayMessage = useAnimation();

  useEffect(() => {
    axios.get('api/topics')
    .then(res => {
      setTopicsList(res.data);
      setIsLoad(false);
    })
    .catch(err => {
      setMessage('トピックスの取得が出来ませんでした');
      displayMessage.start({
        display: "initial",
        height: 30,
        background: "red",
      });
      setIsLoad(false);
    });
  }, [])

  return (
    <>
      <Topics
        isLoad={isLoad}
        topicsList={topicsList}
        setTopicsList={setTopicsList}
        message={message}
        setMessage={setMessage}
        displayMessage={displayMessage}
        sliderEl={sliderEl}
        />
      <PostForm
        isLoad={isLoad}
        topicsList={topicsList}
        setTopicsList={setTopicsList}
        setMessage={setMessage}
        displayMessage={displayMessage}
        sliderEl={sliderEl}
        />
    </>
  );
};

export default Home;
