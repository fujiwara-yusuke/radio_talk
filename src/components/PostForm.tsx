import React, { FC } from "react";
import styled from "styled-components"
import { useForm } from "react-hook-form";
import { Button } from '@mui/material';
import axios from "axios";
import { AnimationControls } from "framer-motion";

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
  setMessage: (param: string) => void,
  displayMessage: AnimationControls,
  sliderEl: any
}

const TopicsPostForm: FC<Props> = ({
  isLoad,
  topicsList,
  setTopicsList,
  setMessage,
  displayMessage,
  sliderEl
}) => {

  const { register, handleSubmit, formState: { errors } } = useForm<Topics>();

  const postTopics = (topics: Topics) => {
    if(topicsList.length > 15){
      setMessage('これ以上追加できません');
      displayMessage.start(animationSetting);
      return;
    }

    axios.post('api/topics', topics)
    .then(res => {
      console.log(res.data);
      const updateTopicsList = [...topicsList, topics];
      setTopicsList(updateTopicsList);
      setMessage('投稿しました!!');
      animationSetting.background = "blue";
      displayMessage.start(animationSetting);
      sliderEl.current.slickGoTo(updateTopicsList.length -1);
    })
    .catch(err => {
      if(err.response.data.errorCode === "P2002"){
        setMessage('同じ内容の投稿がありました');
      }else{
        setMessage('投稿に失敗しました');
      }
      displayMessage.start(animationSetting)
    });
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
    <FormWrapper>
      <div className="item_form">
        <div className="item">
          投稿者
          {errors.name && errors.name.type === "required" && <span className="err_msg">記入してください</span>}
          {errors.name && errors.name.type === "maxLength" && <span className="err_msg">20文字以内にしてください</span>}
        </div>
        <input defaultValue="匿名希望" placeholder="※必須 10文字以内" {...register("name", { required: true, maxLength: 10 })} />
      </div>
      <div className="item_form">
        <div className="item">
          ラジオのネタ
          {errors.theme && errors.theme.type === "required" && <span className="err_msg">記入してください</span>}
          {errors.theme && errors.theme.type === "maxLength" && <span className="err_msg">30文字以内にしてください</span>}
        </div>
        <input placeholder="※必須 30文字以内" {...register("theme", { required: true, maxLength: 30})} />
      </div>
      <div className="button_wrapper">
        <Button variant="contained" onClick={handleSubmit(postTopics)} disabled={isLoad}>投稿</Button>
      </div>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  width: 65%;
  margin: auto;

  .item_form{
    padding: 15px 0px;
  }

  .item{
    font-size: 25px;
  }

  input{
    width: 100%;
    padding: 20px 15px;
    font-size: 16px;
    border-radius: 5px;
    border: 2px solid #ddd;
  }

  .err_msg{
    font-size: 15px;
    color: red;
    margin-left: 10px;
  }

  .button_wrapper{
    display: flex;
    justify-content: center;
    padding: 20px 0px;
  }

  .MuiButton-root{
    width: 120px;
  }
  @media screen and (max-width: 480px) {
    width: 80%;
    .item{
      font-size: 20px;
    }
    input{
      padding: 10px 5px;
      font-size: 15px;
    }
  }
`

export default TopicsPostForm;
