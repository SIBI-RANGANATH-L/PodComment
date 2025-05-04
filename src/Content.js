import SearchBar from './SearchBar';
import PodcastList from './PodcastList';
import React, { useEffect, useState } from 'react';

const Content = () => {
  const [searchItem, setSearchItem] = useState('');
  const [podcast, setPodcast] = useState([]);
  const [token, setToken] = useState('');

  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

  console.log(process.env.REACT_APP_CLIENT_ID)
  console.log(process.env.REACT_APP_CLIENT_SECRET)

// eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    const authenticate = async () => {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
        },
        body: 'grant_type=client_credentials',
      });

      const data = await response.json();
      setToken(data.access_token);
    };

    authenticate();
  }, []);

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
      <PodcastList podcasts={podcast} />
    </div>
  );
};

export default Content;
