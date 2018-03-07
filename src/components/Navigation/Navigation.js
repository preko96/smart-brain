import React from 'react';
import './Navigation.css'

const Navigation = ({ route, onClick }) => {
	return (
		<div className="Navigation">
			<div className="f3 link dim black underline pa3 pointer" onClick={ ()=> onClick(
					(route === 'signin') 
					? 'register'
					: 'signin')} >
				{
					(route === 'signin') 
					? 'Register' : 
					((route === 'register')
					? 'Sign In' 
					: 'Log Out')
				}
			</div>
		</div>
	)
}

export default Navigation;