import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../MainPage/MainPage.css";
import SearchBar from "../component/SearchBar";

const MainPage = ({ cafes, list, changeFavorite }) => {
  const [favorites, setFavorites] = useState(
    cafes.map((cafe) => ({
      name: cafe.name,
      favorite: list.find((item) => item.name === cafe.name)?.favorite || false,
    }))
  );

  const handleFavoriteChange = (name) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.map((favorite) => {
        if (favorite.name === name) {
          return { ...favorite, favorite: !favorite.favorite };
        }
        return favorite;
      });
      return updatedFavorites;
    });
    changeFavorite(name);
  };

  return (
    <div id="MainPage" className="MainPage">
      <h1 className="Logo">LOGO</h1>
      <SearchBar
        cafes={cafes}
        onSearch={(searchText) => console.log('Searched:', searchText)}
        favorites={favorites}
        onFavoriteChange={handleFavoriteChange}
      />
      <div className="whatAboutThisCafe">이런 카페는 어떠세요?</div>
      {cafes.map((cafe, index) => (
        <div key={index}>
          <div className="grayLine"></div>
          <Link to={`/cafe/${cafe.cafeId}`} key={cafe.cafeId} className="cafeLink">
            <img className="picture" src={cafe.imageUrl || "이미지 주소가 없을 때 기본 이미지 주소"} width={100} height={100} />
            <div className="cafeName">{cafe.name}</div>
            <div className="americanoCost">{"아메리카노 " + cafe.minPrice}</div>
            <div className="characteristic">{cafe.operationHours + ", " + cafe.tags.join(", ")}</div>
          </Link>
          {list.find((item) => item.name === cafe.name)?.favorite ? (
            <img
              className="isFavorite"
              src="img/like.png"
              style={{ cursor: "pointer" }}
              alt="favorite"
              onClick={() => handleFavoriteChange(cafe.name)}
            />
          ) : (
            <img
              className="isFavorite"
              src="img/dislike.png"
              style={{ cursor: "pointer" }}
              alt="favorite"
              onClick={() => handleFavoriteChange(cafe.name)}
            />
          )}
        </div>
      ))}
      <div className="grayLine"></div>
    </div>
  );
};

export default MainPage;

