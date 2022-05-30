import React, {Component} from 'react';
import './App.css';
import Clarifai from 'clarifai'
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceDetection from './Components/FaceDetection/FaceDetection';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Background from './Components/Background/Background';


const initialState = {
  input : "",
  imageUrl : "",
  box : {},
  route : "signin",
  isSignedIn : false,
  user : {
    id : '',
    name : '',
    email : '',
    entries: 0,
    joined : ''
  }
}

class App extends Component {

  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name : data.name,
        email : data.email,
        entries : data.entries,
        joined : data.joined
    }
    })
  }

  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState(initialState)
    }else if (route === 'home'){
      this.setState({isSignedIn : true})
    }
    this.setState({route : route});
  }

  calculateFaceLocation = (data) => {
    const clarifaiFaceData = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);
    return{
      leftCol: clarifaiFaceData.left_col * imageWidth,
      topRow: clarifaiFaceData.top_row * imageHeight,
      rightCol: imageWidth - (clarifaiFaceData.right_col * imageWidth),
      bottomRow: imageHeight - (clarifaiFaceData.bottom_row * imageHeight)
    }

  }

  displayFaceBox = (box) =>{
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl : this.state.input});
    fetch('https://ancient-atoll-84841.herokuapp.com/imageurl', {
      'method' : 'post',
      'headers' : {'Content-Type' : 'application/json'},
      'body' : JSON.stringify({
        input : this.state.input,
      })
    })
      .then (response => response.json())
      .then(response =>{
        if(response){
          fetch('https://ancient-atoll-84841.herokuapp.com/image', {
            'method' : 'put',
            'headers' : {'Content-Type' : 'application/json'},
            'body' : JSON.stringify({
              id : this.state.user.id,
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  render(){
    const {isSignedIn, imageUrl, box, route} = this.state;
    return (
      <div className="App">
          <Background />
          <Navigation isSignedIn={isSignedIn} onRouteChange = {this.onRouteChange} /> <Logo />
          {route === "home" ?
          <div>
            <Rank 
            name = {this.state.user.name} 
            entries = {this.state.user.entries} 
            />
            <ImageLinkForm 
            onInputChange = {this.onInputChange} 
            onButtonSubmit = {this.onButtonSubmit} 
            />
            <FaceDetection 
            imageUrl = {imageUrl}
            box = {box}
            />
          </div>
        : (
            route === 'signin'?
            <SignIn 
            loadUser={this.loadUser} 
            onRouteChange={this.onRouteChange} 
            />
            :<Register 
            loadUser = {this.loadUser} 
            onRouteChange={this.onRouteChange} 
            />
          )  
        }
      </div>
    );
  }
}

export default App;
