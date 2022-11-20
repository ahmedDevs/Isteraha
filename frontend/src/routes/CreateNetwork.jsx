// import Main from '../components/Main.jsx';
import { Link } from 'react-router-dom';

const CreateNetwork = () => {
    return (
        <>
        <header className="bg-white shadow">
      
    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
    <Link to="/">
            {/* <span className="sr-only">Your Company</span> */}
            <img alt="logo" className="h-8 w-auto sm:h-20" src="/imgs/cover.png"/>
        </Link>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 notifications-h1">Create Your Network</h1>
    </div>
  </header>

<main className="container" id="mainNetworkForm">
    <form className="createNetworkForm" action="/network/createNetwork" enctype="multipart/form-data" method="POST">
        <div className="mb-3">
            <label for="networkName" className="form-label">Name</label>
            <input type="text" className="form-control" id="networkName" name="networkName" required/>
          </div>
       
        <div className="mb-3">
          <label for="slogan" className="form-label">Slogan</label>
          <input type="text" className="form-control" id="slogan" name="slogan" required/>
        </div>

        <div className="mb-3">
          <label for="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" required/>
        </div>
          <div className="mb-3">
            <label for="imgUpload" className="form-label">Logo</label>
            <input type="file" className="form-control" id="imageUpload" name="file" required/>
          </div>
      <div className="wrapper">
        <div className="title">Would you like your network to be private or public?</div>
        <div className="box">
          <p className="typeExplanation">In private networks, only people you authorize to join will have access to the network. Public networks are open for all and their posts can be seen by all users.</p>
          <input className="radio" type="radio" value="Public" name="type" id="value1"></input>
          <input className="radio" type="radio" value="Private" name="type" id="value2"></input>

          <label for="value1" className="value1">
            <div className="select-dots"></div>
            <div className="text">Public</div>
          </label>
          <label for="value2" className="value2">
            <div className="select-dots"></div>
            <div className="text">Private</div>
          </label>
      
        </div>
      </div>
      <div className="wrapper">
        <div className="title">How did you learn about Isteraha?</div>
        <div className="box">
          <input className="radio" type="radio" value="Friends and colleagues" name="how" id="value-1"></input>
          <input className="radio" type="radio" value="Other social media" name="how" id="value-2"></input>
          <input className="radio" type="radio" value="Advertisements" name="how" id="value-3"></input>
          <input className="radio" type="radio" value="Another business" name="how" id="value-4"></input>
          <input className="radio" type="radio" value="Other" name="how" id="value-5"></input>

          <label for="value-1" className="value-1">
            <div className="select-dots"></div>
            <div className="text">Friends and colleagues</div>
          </label>
          <label for="value-2" className="value-2">
            <div className="select-dots"></div>
            <div className="text">Other social media</div>
          </label>
          <label for="value-3" className="value-3">
            <div className="select-dots"></div>
            <div className="text">Advertisements</div>
          </label>
          <label for="value-4" className="value-4">
            <div className="select-dots"></div>
            <div className="text">Another business</div>
          </label>
          <label for="value-5" className="value-5">
            <div className="select-dots"></div>
            <div className="text">Other</div>
          </label>
        </div>
      </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
</main>
            
        </>
    )
}

export default CreateNetwork