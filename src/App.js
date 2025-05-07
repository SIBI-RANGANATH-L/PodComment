import { Routes,Route } from 'react-router-dom';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import Podcast from './Podcast';
import { useEffect, useState } from 'react';
import EpisodeDeatils from './EpisodeDeatils';


function App() {

  const [token, setToken] = useState('');

  
    const CLIENT_ID = 'f16470ba5de14fc28c3a2622ef95797e';
    const CLIENT_SECRET = 'f7e7dad39b24406bbf002d5528308337';
  
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

  const title="PodComment"
  return (
    <div className="App">
      <Header 
        title={title}
      />
      <Routes>
        <Route path="/" element={<Content token={token} />} />
        <Route path="/podcast">
          <Route path=":id" element={<Podcast token={token} />} />
          <Route path=":podcastId/episode/:episodeId" element={<EpisodeDeatils token={token} />} />
        </Route>
      </Routes>

      
      <Footer />
    </div>
  );
}

export default App;
