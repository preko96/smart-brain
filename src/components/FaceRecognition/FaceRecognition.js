import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({ imageURL, faceBoxes }) => {
	return (
		<div className='center ma2'>
			<div className='absolute mt2'>
				<img id='inputimage' alt='' src={imageURL} width='500px' height='auto'/>
				{
					faceBoxes.map(box => (<div className='bounding-box' style={{
						top: box.topRow, 
						right: box.rightCol, 
						bottom: box.bottomRow, 
						left: box.leftCol
					}}></div>))
				}
			</div>
		</div>
	)
}

export default FaceRecognition;
