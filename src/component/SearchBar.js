import React, { useState, useEffect } from 'react';
import searchImage from './search.png';
import { Link } from 'react-router-dom';
import "../component/SearchBar.css";

const SearchBar = ({ cafes, onSearch, favorites, onFavoriteChange }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [showNoResult, setShowNoResult] = useState(false);

  useEffect(() => {
    onSearch(searchText);
  }, [searchText, onSearch]);

  const handleSearch = () => {
    if (searchText.length > 0) { 
    const filteredCafes = cafes.filter((cafe) => {
      return (
        cafe.name.toLowerCase().includes(searchText.toLowerCase()) ||
        (cafe.tags && cafe.tags.some((tag) =>
          tag.toLowerCase().includes(searchText.toLowerCase())
        ))
      );
    });

    setFilteredCafes(filteredCafes);
    setShowNoResult(filteredCafes.length === 0 && searchText.length > 0);
  } else {
    setFilteredCafes([]); // 검색어가 없는 경우, 모든 카페를 보여줄 수 있도록 빈 배열로 설정
    setShowNoResult(false); // 검색어가 없는 경우, "검색 결과가 없습니다." 메시지를 표시하지 않음
  }
};

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    setShowNoResult(false);
  };

  const handleFavoriteChange = (name) => {
    onFavoriteChange(name);
  };

  return (
    <div>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="찾으시는 카페가 있으신가요?"
          value={searchText}
          onChange={handleInputChange}
          className='search-input'
        />
        <div className='vertical-line'></div>
        <button onClick={handleSearch} className='search-button'>
          <img src={searchImage} alt='Search' width={25} height={25} />
        </button>
      </div>

      {searchText.length > 0 && (<div className='SearchResult'> '{searchText}' 검색결과</div>)}
      {showNoResult && (
        <div className='cafes-result'>
          <div className='gray-Line'></div>
          <div className='NoSearchResult'>
            검색 결과와 일치하는 카페가 없습니다.
          </div>
          <div className='gray-Line'></div>
        </div>
      )}

      <div className='cafes-result'>
        {filteredCafes.length > 0 && (
          filteredCafes.map((cafe, index, array) => (
            <div className={`cafe-result ${index === array.length - 1 ? 'last-cafe-result' : ''}`}>
              <Link to={`/cafe/${cafe.cafeId}`} key={index} className={`cafe-result ${index === array.length - 1 ? 'last-cafe-result' : ''}`}>
                <div className="gray_Line"></div>
                <img className="picture" src={cafe.imageUrl || "이미지 주소가 없을 때 기본 이미지 주소"} width={100} height={100} />
                <div className="cafeName">{cafe.name}</div>
                <div className="americanoCost">{"아메리카노 " + cafe.minPrice}</div>
                <div className="characteristic">{cafe.tags.join(", ")}</div>
              </Link>

              {favorites.find((favorite) => favorite.name === cafe.name)?.favorite ? (
                <img
                  className="isFavorite"
                  src="img/like.png"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleFavoriteChange(cafe.name)}
                  alt="favorite"
                />
              ) : (
                <img
                  className="isFavorite"
                  src="img/dislike.png"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleFavoriteChange(cafe.name)}
                  alt="not favorite"
                />
              )}
            </div>

          ))
        )}
        {filteredCafes.length > 0 && <div className="last-grayLine"></div>}
      </div>
    </div>
  );
};

export default SearchBar;
