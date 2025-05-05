import SearchBar from './SearchBar';
import PodcastList from './PodcastList';
import React, { useEffect, useState } from 'react';

const Content = ({token}) => {
  const [searchItem, setSearchItem] = useState('');
  const [podcast, setPodcast] = useState([]);
  

// eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    const search = async () => {
      if (!token) return;

      const query=searchItem ? `q=${encodeURIComponent(searchItem)}`:`q=trending`

      const result = await fetch(
        `https://api.spotify.com/v1/search?${query}&type=show&limit=10`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await result.json();
      setPodcast(data.shows?.items || []);
    };

    search();

   



  }, [searchItem, token]);

  return (
    <div>
      <h1>Search Podcasts</h1>
      <SearchBar searchList={searchItem} setSearchList={setSearchItem} />
      <PodcastList podcasts={podcast} searchItem={searchItem} />
    </div>
  );
};

export default Content;
