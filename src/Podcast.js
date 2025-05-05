import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Podcast = ({ token }) => {
  const { id } = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [podcast, setPodcast] = useState(null);

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const showRes = await fetch(`https://api.spotify.com/v1/shows/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const showData = await showRes.json();
        setPodcast(showData);

        const epRes = await fetch(`https://api.spotify.com/v1/shows/${id}/episodes?limit=50`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const epData = await epRes.json();
        setEpisodes(epData.items || []);
      } catch (err) {
        console.error('Error loading podcast:', err);
      }
    };

    fetchPodcast();
  }, [id, token]);

  return (
    <div className="podcastPage">
      {podcast ? (
        <>
          <div className="podcastHeader">
            <img src={podcast.images?.[0]?.url} alt={podcast.name} />
            <div className="podcastInfo">
              <span className="label">PODCAST</span>
              <h1>{podcast.name}</h1>
              <p>{podcast.description}</p>
            </div>
          </div>

          <div className="episodes">
            <h2>Episodes</h2>
            {episodes.map((episode) => (
              <div className="episodeCard" key={episode.id}>
                <div className="episodeDetails">
                <img
                    src={episode.images?.[0]?.url}
                    alt={episode.name}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                />
                  <h4>{episode.name}</h4>
                  <p>{episode.description}</p>
                  {episode.audio_preview_url && (
                    <audio controls src={episode.audio_preview_url}></audio>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="loading">Loading podcast...</p>
      )}
    </div>
  );
};

export default Podcast;
