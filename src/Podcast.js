import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

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
              {episodes.length > 0 ? (
                <>
                  <h2>Episodes</h2>
                  {episodes.map((episode) => (
                    <Link to={`/podcast/${id}/episode/${episode.id}`} key={episode.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div className="episodeCard">
                        <div className="episodeDetails" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                          <img
                            src={episode.images?.[0]?.url}
                            alt={episode.name}
                            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                          />
                          <div>
                            <h4>{episode.name}</h4>
                            <p>
                              {episode.description.length >= 100 ? (
                                <>
                                  {episode.description.slice(0, 500)} <strong>Read More</strong>
                                </>
                              ) : (
                                episode.description
                              )}
                            </p>
                            {episode.audio_preview_url && (
                              <audio controls src={episode.audio_preview_url}></audio>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}

                </>
              ) : (
                <div>
                  <p className="loadingDiv">Loading episodes...</p>
                </div>
              )}
            </div>
          
        </>
      ) : (
        <p className="loading">Loading podcast...</p>
      )}
    </div>
  );
};

export default Podcast;
