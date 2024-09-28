import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const usePostQuestion = () => {
  const [loading, setLoading] = useState(false);
  const postQuestion = async (title, content, user_id) => {
    
    const verification=handleInputError({title, content, user_id});
    if(!verification) return;

    setLoading(true);
    try {
      const result = await axios.post("http://localhost:5001/api/post/question", {
        title,
        content,
        user_id
      });
      console.log(result);
      toast.success("Question posted successfully!");
      return result;
    } catch (error) {
      console.error(error.message);
      toast.error("Error posting solution.");
    } finally {
      setLoading(false);
    }
  };

  return { postQuestion, loading};
};

function handleInputError({title, content, user_id}){
  if(!title){
    toast.error("no title for the question...")
    return
  }
  if(!content){
    toast.error("no description for the question...")
    return
  }
  if(!user_id){
    toast.error("please login to post the question!")
    return 
  }
  return true;
}
