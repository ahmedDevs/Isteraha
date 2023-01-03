import React from 'react';
import Main from './components/Main.jsx';
import Menu from './components/Menu.jsx';


const PublicNetworks = ({networks, isAuth, isMember}) => {
    return (
        <Main>


    {isAuth ? 
        <Menu/>
    : null}
    
        <header className="bg-white shadow">
    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Public Networks</h1>
    </div>
  </header>


    <div className="container mt-5">
      
            <div className="col-md-4 networkContainer">
                {networks ? networks.map((e,i) => 
                
                <a key={i} href={`/${e.name}/feed`}>
                <div className="card p-3">
                
                    <div className="d-flex flex-row mb-3"><img src={e.logo} width="70"/>
                        <div className="d-flex flex-column ml-2"><span>{e.name}</span><span className="text-black-50">{e.slogan}</span><span className="ratings"><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i></span></div>
                    </div>
                    <h6>{e.about}</h6>
                    <div className="d-flex justify-content-between install mt-3"><span>{e.members.length} members</span>
                
                        {isAuth && isMember[i] === true ? 
                        <>
                         <a href={`/invite/${e.name}`}><span className="text-primary">Invite&nbsp;<i className="fa fa-angle-right"></i></span> </a>
                         <a href="#"><span className="text-primary">Leave&nbsp;<i className="fa fa-angle-right"></i></span> </a>
                         </>
                        : null}
                     
                      
                         {!isAuth || !isMember[i] ?
                            <form action={`/network/${e.name}/join`} method="POST">
                               <button><span className="text-primary">Join&nbsp;<i className="fa fa-angle-right"></i></span></button>
                            </form>
                        : null}
                    </div>
                </div>
              </a>
                
                
                
                
                ) : null}
            
            </div>
         
        </div>

                
        </Main>
    )
}

export default PublicNetworks