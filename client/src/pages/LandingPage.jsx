import "../styles/landingpage.css"

function LandingPage() {

    
  return (
    <div className='landing-page-container'>
        <div className="landing-page-text">
          <h1>Not<span className="landing-page-title">Defterim</span>'e Hoşgeldiniz</h1>
          <p>
            Uludağ Üniversitesinde okuyan öğrenciler birbirleriyle yardımlaşmalarını kolaylaştırmayı amaçladığımız bu projemizde
            sizlerinde yer almanızı isteriz. <i style={{color:"pink"}} class="fa-solid fa-face-smile-wink"></i>
          </p>
          <p>
            10.11.2022 - <i class="fa-solid fa-infinity"></i>
          </p>
        </div>

        <div className="landing-page-icons">
          <a target="_blank" href="https://www.instagram.com/muratilhan.08/"><i class="fa-brands fa-instagram"></i></a>
          <a target="_blank" href="https://www.youtube.com/channel/UCsypit4r66dQH-R-HUUYygg"><i class="fa-brands fa-youtube"></i></a>
          <a target="_blank" href="https://www.linkedin.com/in/murat-ilhan-2762b8219/"><i class="fa-brands fa-linkedin"></i></a>
          <a href="#footer"><i class="fa-solid fa-envelope"></i>   </a>     
        </div>
        
    </div>
  )
}

export default LandingPage