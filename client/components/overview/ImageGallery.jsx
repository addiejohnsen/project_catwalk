import React, {useState, useEffect} from 'react';
import ImageNav from './ImageNav.jsx'
import ExpandedViewModal from './ExpandedViewModal'
import ModalImage from "react-modal-image";
import Grid from '@material-ui/core/Grid';
import ArrowForward from '@material-ui/icons/ArrowForwardIos';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import Modal from "@material-ui/core/Modal"

const ImageGallery = ({currentStyle}) => {

  const [currentIndex, setCurrentIndex] = useState(0)
  const [ArrayLength, setArrayLength] = useState(currentStyle.photos.length)

  useEffect(() => {
      setArrayLength(currentStyle.photos.length)
  }, [currentStyle])


  const handleNextImageClick = () => {
    if (currentIndex === ArrayLength - 1) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlepreviousImageClick = () => {
    if (currentIndex === 0) {
      setCurrentIndex(ArrayLength - 1)
    } else {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleImageClick = () => {
    return (
      <Modal open={true}>
        alert('ooops')
      </Modal>
    )
  }


  return (
    currentStyle
      ?  <section id="slider" style={{height: "1200px", padding: "30px", padding: "30px"}}>

          <Grid container >
            <ArrowBack id="backButton" onClick={handlepreviousImageClick}/>
            <ArrowForward id="forwardButton" onClick={handleNextImageClick}/>
            <Grid item xs={12}>

              {currentStyle.photos.map((photo, index) => {
                return (

                  <div className={index === currentIndex ? 'slide active' : 'slide'} key={index}>

                    {index === currentIndex && (<img className="image" src={[photo.url]} onClick={handleImageClick} />)}

                  </div>

                  )
                })}



            </Grid>
          </Grid>
        </section>




      : <div style={{height: '1000px'}}>Hello From Image Gallery</div>

  )
}

export default ImageGallery