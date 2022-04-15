import type { NextPage } from 'next';
import PostForm from 'components/PostForm';
import Topics from 'components/TopicsSlider';
import { useRef, useState, useEffect } from 'react';
import { useAnimation } from "framer-motion";

interface TopicsList {
  name: String,
  theme: String
}

const Home: NextPage = () => {

  const sliderEl = useRef(null);

  const [topicsList, setTopicsList] = useState<TopicsList[]>();
  const [isLoad, setIsLoad] = useState<Boolean>(true);
  const [message, setMessage] = useState<String>('');
  const displayMessage = useAnimation();

  useEffect(() => {
    const testTopis = [
      {name: "test", theme: "ああああああああああああああああああああああああああああああ"},
      {name: "test", theme: "test1test2test3test4test5test6"},
      {name: "test", theme: "test1test2test3test4test5test6"},
      {name: "test", theme: "test1test2test3test4test5test6"},
      {name: "test", theme: "test1test2test3test4test5test6"},
      {name: "test", theme: "test1test2test3test4test5test6"},
    ]

    setTopicsList(testTopis);
    setIsLoad(false);
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
