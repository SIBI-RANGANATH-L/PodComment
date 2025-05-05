import React from 'react';
import { Link } from 'react-router-dom';
const PodcastList = ({ podcasts ,searchItem}) => {
  return (

    <div className='podcastList'>

      {
      podcasts.length === 0 ? (
        <p>No podcasts found.</p>
      ) : (
        podcasts.map((podcast) => (
          <Link
            to={`podcast/${podcast.id}`}
            key={podcast.id}
            className='podcastCardLink'
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div key={podcast.id} className='podcastCard'>
              <img src={podcast.images[0]?.url} alt={podcast.name} width={100} />
              <div>
                <h3>{podcast.name}</h3>
                <p>{podcast.publisher}</p>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default PodcastList;
