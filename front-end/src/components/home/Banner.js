import React from 'react'
import Carousel from 'react-material-ui-carousel'
import '../home/banner.css';


const data = [
  "https://images-eu.ssl-images-amazon.com/images/G/31/AmazonBusiness/980_AB_GIF_Wave04_SP_TopBanner_Unrec_1242x450.jpg",
  " https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50",
  "https://rukminim1.flixcart.com/flap/1680/280/image/8d4150cc4f3f967d.jpg?q=50",
  "https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGpO744dE4UCUH6FJztkPLvA5owm-l0Yc7EnDvaME0Qg&s",
  "https://static.tnn.in/thumb/msid-104282671,thumbsize-1433608,width-1280,height-720,resizemode-75/104282671.jpg"
]

const Banner = () => {
  return (
    <>

      <Carousel
        className="carasousel"
        autoPlay={true}
        animation="slide"
        indicators={false}
        navButtonsAlwaysVisible={true}
        cycleNavigation={true}
        navButtonsProps={{
          style: {
            background: "#fff",
            color: "#494949",
            borderRadius: 0,
            marginTop: -22,
            height: "104px",
          }
        }}>
        {
          data.map((imag, i) => {
            return (
              <>
                <img src={imag} alt="img" key={i} className="banner_img" />
              </>
            )
          })
        }

      </Carousel>
    </>
  )
}


export default Banner
