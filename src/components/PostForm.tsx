import React, { FC } from "react";
import styled from "styled-components"
import { useForm } from "react-hook-form";
import { Button } from '@mui/material';

interface Topics {
  name: string,
  theme: string
}

interface PostForm {
  isLoad: boolean,
  topicsList: Topics[],
  setTopicsList: (param: Topics[]) => void,
  setMessage: (param: string) => void,
  displayMessage: any,
  sliderEl: any
}

const PostForm: FC<PostForm> = ({
  isLoad,
  topicsList,
  setTopicsList,
  setMessage,
  displayMessage,
  sliderEl
}) => {

  const { register, handleSubmit, formState: { errors } } = useForm<Topics>();

  const postForm = (topics: Topics) => {
    const updateTopicsList = [...topicsList, topics];
    setTopicsList(updateTopicsList);
    setMessage('投稿しました!!');
    displayMessage.start({
      display: "initial",
      height: [0, 30, 30, 0],
      background: "blue",
      transition: {
        duration: 4,
      },
      transitionEnd: { display: "none" }
    })
    sliderEl.current.slickGoTo(updateTopicsList.length -1);
  }
  
  return (
    <FormWrapper>
      <div className="item_form">
        <div className="item">
          投稿者
          {errors.name && errors.name.type === "required" && <span className="err_msg">記入してください</span>}
          {errors.name && errors.name.type === "maxLength" && <span className="err_msg">20文字以内にしてください</span>}
        </div>
        <input defaultValue="匿名希望" placeholder="※必須 20文字以内" {...register("name", { required: true, maxLength: 20 })} />
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
        <Button variant="contained" onClick={handleSubmit(postForm)} disabled={isLoad}>投稿</Button>
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
`

export default PostForm;
