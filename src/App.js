import './App.css';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';

function App() {

  const title="PodComment"
  return (
    <div className="App">
      <Header 
        title={title}
      />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
