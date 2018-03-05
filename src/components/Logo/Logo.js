import React from 'react'
import brain from './brain4.png'

const Logo = () => {
	return (
		<div className="Logo ma4 mt0">
			<img 
				className="dim pointer grow"
				alt='logo' src={brain} width="82" height="82"
			/>
		</div>
	)
}

export default Logo;