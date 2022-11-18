import React from 'react';
import Main from './components/Main.jsx';
import Menu from './components/Menu.jsx';
// import Post from './components/Post.jsx;';


const Dashboard = ({memberOf,user}) => {
    return (
        <Main>
            <Menu/>

            <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Networks</h1>
      </div>
    </header>

    <main id="mainDashboard">
  
        <div className="container mt-5">
          {/* <!-- <div className="row"> --> */}
              <div className="col-md-4  networkContainer">
               
               {/* <h2>Member Of:</h2> */}
              
                {memberOf.length < 1 ?
                <p>You're not a member of any networks. You can either be invited to join networks, join public networks from <a className="text-primary" href="/network">here</a> or <a className="text-primary" href="/network/create">create</a> one!</p>
                  : null
                }
             
             

              
                {memberOf ? memberOf.map((e,i) => 
                    <a key={i} href={`/${e.name}/feed`}>
                    {e.createdBy == user.id ? 
                      <span className="bg-secondary p-1 px-4 rounded text-white">Creator</span>
                     : null }
                  <div className="card p-3">
                    
    
                      <div className="d-flex flex-row mb-3"><img src={e.logo} width="70"/>
                      
                          <div className="d-flex flex-column ml-2">
                            
                            <span>{e.name}</span><span className="text-black-50">{e.slogan}</span><span className="ratings"><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i></span></div>
                      </div>
                      <h6>{e.about}</h6>
                      <div className="d-flex justify-content-between install mt-3">
                       
                        <a href={`/network/${e.name}/members`}>
                          {e.members.length < 2 ? 
                          <span>{e.members.length} member</span>
                         :
                            <span>{e.members.length} members</span>
                          } 
                        </a>
                 
                        
                           <a href={`/invite/${e.name}`}><span className="text-primary">Invite&nbsp;<i className="fa fa-angle-right"></i></span> </a>

                           {e.createdBy != user.id ? 
                           <form action={`/network/${e.name}/leave`} method="POST">
                            <button><span className="text-primary">Leave&nbsp;<i class="fa fa-angle-right"></i></span> </button>
                           </form>
                            : null}
                           
                          {/* <!-- <span class="text-primary">Accept&nbsp;<i class="fa fa-angle-right"></i></span> --> */}
                       
                      </div>
                  </div>
                </a>

                ) : null} 
  
                

              </div>
             {/* <!-- </div> --> */}
          </div>
         
         
          </main>
          
    </Main>
    )
}

export default Dashboard;