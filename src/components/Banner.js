import '../styles/Banner.css'
import logo from '../assets/logo_lp.png'

function Banner() {
    const title= 'B2LP - Le Blog !'
    return (
    <div className='lp-banner'>
        <img src = {logo} alt = 'Lyon Palme' className='lp-logo' />
        <h1 className='lp-title'>{title}</h1>
    </div>)
}

export default Banner;