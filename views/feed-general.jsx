import React from 'react';
import Main from './components/Main.jsx';
import Menu from './components/Menu.jsx';


const GeneralFeed = ({locals,network}) => {
    return (
        <Main>
            <Menu/>

            <header className="bg-white shadow feedHeader">


{locals.general ? 
  <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 networkDashInfoFeed">
  
    <div>
    <img src="#" alt="logo"/>
    {/* <!-- <span>members: <%= network.numberOfMembers %></span> --> */}
    <span></span>
    </div>

    <h1 className="text-3xl font-bold tracking-tight text-gray-900">General Feed</h1>
   
  </div>
:


// {network.map((e,i) => {
    <div key={i} className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 networkDashInfoFeed">
  
  <div className="networkLogoContainer">
  <img src={network.logo} alt="logo"/>
  <a href={`/network/${network.name}/members`}><span>members: {network.numberOfMembers}</span></a>
  <span></span>
  </div>

  <h1 className="text-3xl font-bold tracking-tight text-gray-900">{network.name}</h1>
 
</div>


// {/* })} */}


  }
</header>



        <script src="/js/postForm.js"></script>
        </Main>
    )
}
export default GeneralFeed