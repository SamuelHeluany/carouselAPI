import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState([])
  const carousel = useRef(null)

  useEffect(() => {
    const shoeItems = async () => {
      const result = await axios.get('http://localhost:3000/static/shoes.json')
      setData(result.data);
    }
    shoeItems();

  }, [])

  const handleLeftClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft -= carousel.current.offsetWidth
  }

  const handleRightClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft += carousel.current.offsetWidth
  }

  if (!data || !data.length)
    return null

  return (
    <div className="container">
      <div className="logo">
        <h2>SHOES</h2>
      </div>
      <div className="carousel" ref={carousel}>
        {data.map((item) => {
          const { id, name, price, oldPrice, image } = item;
          return (
            <div className="item" key={id}>
              <div className="image">
                <img src={image} alt={name} />
              </div>
              <div className="info">
                <span className="name">{name}</span>
                <span className="oldPrice">{oldPrice}</span>
                <span className="price">{price}</span>
              </div>
            </div>
          )
        })} 
      </div>
      <div className="buttons">
        <button onClick={handleLeftClick}>
          <img src="/static/images/216151_right_chevron_icon.png" alt="Scroll Left" />
        </button>
        <button onClick={handleRightClick}>
          <img src="/static/images/216151_right_chevron_icon.png" alt="Scroll Right" />
        </button>
      </div>
     
    </div>
    
  );
}

export default App;
