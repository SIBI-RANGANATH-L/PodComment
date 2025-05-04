import React from 'react';

const PodcastList = ({ podcasts }) => {
  return (
    <div className='podcastList'>
      {podcasts.length === 0 ? (
        <p>No podcasts found.</p>
      ) : (
        podcasts.map((podcast) => (
          <div key={podcast.id} className='podcastCard'>
            <img src={podcast.images[0]?.url} alt={podcast.name} width={100} />
            <div>
              <h3>{podcast.name}</h3>
              <p>{podcast.publisher}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PodcastList;
