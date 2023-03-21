import './Banner.css'
import {useState,useEffect} from 'react'
function Banner() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [playing,setPlaying] = useState(true)

  const slides = [
    {
      title: "Quality Healthcare for Everyone",
      subtitle: "Experience Compassionate Care with Us",
      image: "/images/Banner.jpg"
    },
    {
      title: "Patient-Centered Care",
      subtitle: "Put Your Health and Well-being First",
      image: "/images/Banner2.jpg"
    },
    {
      title: "Innovative Treatments",
      subtitle: "Discover the Latest Advances in Medicine",
      image: "/images/Banner3.jpg"
    },
  ];
  useEffect(()=>{
    let interval
    if(playing){
      interval = setInterval(()=>{
        setSlideIndex(slideIndex === slides.length - 1 ? 0 : slideIndex+1)
      },5000)
    }
    return()=>{
      clearInterval(interval)
    }
  },[slideIndex,playing,slides.length])

  const goToPrevSlide = () => {
    setSlideIndex(slideIndex === 0 ? slides.length - 1 : slideIndex - 1);
  };

  const goToNextSlide = () => {
    setSlideIndex(slideIndex === slides.length - 1 ? 0 : slideIndex + 1);
  };
 
  
  return (
    <div className="hero" style={{backgroundImage:`url(${slides[slideIndex].image})`}} >
      <div className="hero-text-container ">
        <h1 className="hero-title">{slides[slideIndex].title}</h1>
        <p className="hero-subtitle">{slides[slideIndex].subtitle}</p>
        <button className="hero-button prev-button" onClick={goToPrevSlide}>
          &#10094;
        </button>
        <button className="hero-button next-button" onClick={goToNextSlide}>
          &#10095;
        </button>
      </div>
    </div>
  )
}

export default Banner;