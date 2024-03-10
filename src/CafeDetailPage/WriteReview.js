// WriteReview.js
import React, { useState } from "react";
import "../CafeDetailPage/WriteReview.css";
import { useParams } from "react-router-dom";
import SubmitToLocalStorage from "../CafeDetailPage/SubmitToLocalStorage";

const WriteReview = ({ onClose }) => {
  const { id } = useParams();

  const tags = ["자리적음", "자리많음", "콘센트적음", "콘센트많음", "조용함"];

  const [text, setText] = useState("");
  const [buttonStates, setButtonStates] = useState(
    Array(tags.length).fill(false)
  );

  // 입력창 구현
  function onChangeText(input) {
    setText(input.target.value);
  }

  // 글자색 변경 구현
  function changeColor(index) {
    const newButtonStates = [...buttonStates];
    newButtonStates[index] = !newButtonStates[index];
    setButtonStates(newButtonStates);
  }

  function handleSubmit() {
    let now = new Date();
    SubmitToLocalStorage(id, {
      // userComment: text,
      // userTags: buttonStates,
      userReview: [text, buttonStates, now],
    });
    onClose(); // 작성 완료 후에 onClose() 호출
  }

  return (
    <div>
      <div className="shadow"></div>
      <div className="modal"></div>
      <button onClick={onClose} className="X">
        X
      </button>
      <input
        value={text}
        onChange={onChangeText}
        className="input"
        placeholder="소중한 리뷰를 작성해주세요"
      ></input>
      {tags.map((tag, index) => (
        <button
          key={tag}
          className={`tag ${buttonStates[index] ? "active" : ""}`}
          style={{ marginRight: index < tags.length - 1 ? "10px" : "0" }}
          onClick={() => changeColor(index)}
        >
          {tag}
        </button>
      ))}
      <button className="submit" onClick={handleSubmit}>
        작성 완료
      </button>
    </div>
  );
};

export default WriteReview;
