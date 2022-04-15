import styled from "styled-components";
import { motion } from "framer-motion";

const Loading = () => {
  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5
      }
    }
  }
  
  const item = {
    hidden: { opacity: 1 },
    show: {
      opacity: [1, 0, 1],
      transition: {
        repeat: Infinity,
        duration: 2.5
      }
    }
  }
  
  return (
    <>
      <LoaderWrapper
      variants={container}
      initial="hidden"
      animate="show"
      >
        <Loader variants={item} />
        <Loader variants={item} />
        <Loader variants={item} />
        <Loader variants={item} />
        <Loader variants={item} />
      </LoaderWrapper>
    </>
  )
};


const LoaderWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: auto;
`
const Loader = styled(motion.div)`
  width: 30px;
  height: 30px;
  background: #000;
  border-radius: 15px;
  margin: 0px 10px;
`


export default Loading;
