import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EpisodeDetails = ({ token }) => {
  const { episodeId } = useParams();
  const [episode, setEpisode] = useState(null);

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const res = await fetch(`https://api.spotify.com/v1/episodes/${episodeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setEpisode(data);
      } catch (err) {
        console.error('Error fetching episode:', err);
      }
    };
    fetchEpisode();
  }, [episodeId, token]);

  // Dummy nested comments
  const dummyComments = [
    {
      id: 1,
      username: 'music_lover99',
      content: 'This episode is a banger! 🔥',
      replies: [
        {
          id: 4,
          username: 'beatdropper',
          content: 'Absolutely agree!',
        },
      ],
    },
    {
      id: 2,
      username: 'audiophile_23',
      content: 'Loved the storytelling. 🎧',
      replies: [],
    },
    {
      id: 3,
      username: 'spotifyfan',
      content: 'I keep coming back to this one!',
      replies: [
        {
          id: 5,
          username: 'echoes123',
          content: 'Same here. Perfect for late nights.',
        },
        {
          id: 6,
          username: 'vibesOnly',
          content: 'Timeless vibe!',
        },
      ],
    },
  ];

  const renderComments = (comments, level = 0) => {
    return comments.map((comment) => (
      <div key={comment.id} className="comment" style={{ marginLeft: `${level * 20}px` }}>
        <strong>{comment.username}</strong>
        <p>{comment.content}</p>
        {comment.replies && comment.replies.length > 0 && renderComments(comment.replies, level + 1)}
      </div>
    ));
  };

  return (
    <div className="episodeDetailsPage">
      {episode ? (
        <>
          <h2>{episode.name}</h2>
          <img src={episode.images?.[0]?.url} alt={episode.name} style={{ width: 200 }} />
          <p>{episode.description}</p>
          {episode.audio_preview_url && <audio controls src={episode.audio_preview_url}></audio>}

          <div className="commentsSection">
            <h3>Comments</h3>
            {renderComments(dummyComments)}
          </div>
        </>
      ) : (
        <p>Loading episode...</p>
      )}
    </div>
  );
};

export default EpisodeDetails;
