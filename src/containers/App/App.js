import React, { Component } from 'react'
import Particles from 'react-particles-js'
import Navigation from '../../components/Navigation/Navigation'
import Logo from '../../components/Logo/Logo'
import Welcome from '../../components/Welcome/Welcome'
import ImageLinkForm from '../../components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from '../../components/FaceRecognition/FaceRecognition'
import Clarifai from 'clarifai'
import './App.css';

const app = new Clarifai.App({
 apiKey: 'dc43176701b34653ab16217abf77f069'
});

const particleOptions = {
	particles: {
		number: {
			value: 150,
			density: {
				enable: true,
				value_area: 800
			}
		}
	}
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      boxes: [],
    }
  }

  calculateFacesLocation = (data) => {

    const image = document.getElementById('inputimage')
    const width = Number(image.width)
    const height = Number(image.height)

    const clarifaiFaces = data.outputs[0].data.regions.map( (value) => {
      const region_info = value.region_info.bounding_box;
      return {
        leftCol: region_info.left_col * width,
        topRow: region_info.top_row * height,
        rightCol: width - (region_info.right_col * width),
        bottomRow: height - (region_info.bottom_row * height)
      }
    }) 
    return clarifaiFaces;
  }

  displayFaceBoxes = (boxes) => {
    this.setState({boxes: boxes})
    console.log(boxes);
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input}, () => {
      app.models
      .predict(
        'a403429f2ddf4b49b307e318f00e528b',
        this.state.imageURL)
      .then(response => this.displayFaceBoxes(this.calculateFacesLocation(response)))
      .catch(err => console.log(err))
    })
  }

  render() {
    const {input, imageURL, boxes} = this.state;
    return (
        <div className="App">
          <Particles className="particles" params={particleOptions} />
          <Navigation />
          <Logo />
          <Welcome />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
          <FaceRecognition imageURL={imageURL} faceBoxes={boxes} /> 
        </div>
    );
  }
}

export default App;
