import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../CafeDetailPage/CafeDetailPage.css";
import styles from "../CafeDetailPage/ahyeon.module.css";
import WriteReview from "./WriteReview";
import { logDOM } from "@testing-library/react";

const CafeDetailPage = ({ cafes, list, changeFavorite }) => {

    const [showReview, setShowReview] = useState(false);
    const { id } = useParams();
    const cafe = cafes.find(cafe=> cafe.cafeId === parseInt(id));
    const isFavorite = list.find(item => item.name === cafe.name)?.favorite;
    const toggleFavorite = () => {
        changeFavorite(cafe.name);
    };
    const [userComment, setUserComment] = useState("");
    const [userTags, setUserTags] = useState([]);
    const [userReview, setUserReview] = useState([]);
    const tags = ["자리적음", "자리많음", "콘센트적음", "콘센트많음", "조용함"];
   
    useEffect(() => {
        const userData = localStorage.getItem(id);
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          // setUserComment(parsedUserData.userComment);
          // setUserTags([...parsedUserData.userTags]);
          setUserReview(...parsedUserData.userReview);
        }
    }, [id]);

    let localData = JSON.parse(localStorage.getItem(id));
    localData = localData || {}; // null일 경우 빈 객체로 초기화
  
    if (!cafe) {
      return <p>카페를 찾을 수 없습니다!</p>;
    }

    return (
        <div className="cafe-detail">
            <h1 className="detail-Logo">LOGO</h1>
            <img className="detail-cafe-picture" src={cafe.imageUrl || "이미지 주소가 없을 때 기본 이미지 주소"} width={100} height={100} />
            <div className="detail-cafeName">{cafe.name}</div>
            {isFavorite ? (
                <img
                    className="detail-isFavorite"
                    src="/img/like.png"
                    style={{ cursor: "pointer" }}
                    alt="favorite"
                    onClick={toggleFavorite}
                />
            ) : (
                <img
                    className="detail-isFavorite"
                    src="/img/dislike.png"
                    style={{ cursor: "pointer" }}
                    alt="favorite"
                    onClick={toggleFavorite}
                />
            )}
            <div className="detail-americanoCost">{"아메리카노 " + cafe.minPrice + "원"}</div>
            <div className="detail-characteristic">{cafe.operationHours}</div>
            <div className="detail-tags">
                {cafe.tags.map((tag, index) => (
                    <div key={index} className="detail-tag-container">
                        <div className="detail-tag"> {tag} </div>
                    </div>
                ))}
            </div>
            <h3 className="review">리뷰</h3>
            <div className="review-grayLine1"></div>
            <div className="review-list">
            {localData.userReview ? localData.userReview.map((item, index) => {
                console.log(item.userReview);
                let realReview = `${item.userReview[0]}`;
                let realTags = item.userReview[1];
                let realDate = item.userReview[2];
                return (
                    <div>
                        <div key={index} className="reviewContainer">
                            <div className="profileName">익명의 누군가</div>
                            <div className="profileImage"></div>
                            <div className="date">{realDate}</div>
                            <div className="realComment">{realReview}</div>
                            <div className="tagContainer">
                                {realTags.map(
                                    (realTag, index) =>
                                       realTag === true && (
                                           <div className="realTag" key={index}>{tags[index]}</div>
                                       )
                                )}
                            </div>
                            <div className="review-grayLine"></div>
                        </div>
                    </div>
                );
            })
            : null}
            </div>

        <button className={styles.writeComment} onClick={() => setShowReview(true)}>
            <img src="/img/Frame.png" alt="리뷰 작성"></img>
        </button>

        {showReview && <WriteReview onClose={() => setShowReview(false)} />}
            
        </div>
    );
};

export default CafeDetailPage;
