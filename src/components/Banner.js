import '../styles/Banner.css' 
import logo from '../assets/logo_lp.png'

function Banner() {
    const title= 'B2LP - Le Blog !'
    return (
    <div>
        <img src = {logo} alt = 'Lyon Palme' className='lp-logo' />
        <h1>{title}</h1>
    </div>)
}

export default Banner;