//SubmitToLocalStorage.js
import { json } from "react-router-dom";

const SubmitToLocalStorage = (key, newValue) => {
  const existingData = localStorage.getItem(key);
  
  const parsedExistingData = existingData
    ? JSON.parse(existingData)
    : { userReview: [] };
  console.log(parsedExistingData.userReview);

  parsedExistingData.userReview.push(newValue);

  localStorage.setItem(key, JSON.stringify(parsedExistingData));
};

export default SubmitToLocalStorage;
