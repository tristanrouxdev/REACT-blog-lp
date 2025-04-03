import logo from '../assets/icon-react.png'

function Footer() {
	const text = 'Proudly powered by SIO 2 '
	return (
		<footer>
			<div>
				<img src = {logo} alt = 'Logo react'/>
                <h5>{text}</h5>
			</div>			
		</footer>
	)
}

export default Footer