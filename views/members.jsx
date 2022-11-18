import React from 'react';
import Main from './components/Main.jsx';
import Menu from './components/Menu.jsx';
// import Post from './components/Post.jsx;';


const Members = ({network, members, user, followingObj}) => {
    return (
        <Main>
            <Menu/>

            <header className="bg-white shadow feedHeader">
      <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 networkDashInfoFeed">
      
        <a href={`/${network.name}/feed`}><div>
        <img src={network.logo} alt="logo"/>
        <span>members: {network.members.length}</span>
        <span></span>
        </div>
        </a>
    
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">People also in {network.name}</h1>
        
      </div>
    
  </header>



<div className="container mt-5">
   
    <div className="row d-flex justify-content-center">
        
        <div className="col-md-7 memberCardContainer">
           
            {members ? members.map((e,i) => 
                      <a key={i} href={`/${e.userName}/profile`}>
                      <div className="card p-3 py-4 memberPageProfiles">
                          
                          <div className="text-center">
                            
                              {e.image ?
                                <img src={e.image} width="100" className="rounded-circle"/>
                                :     <img src="https://api.lorem.space/image/movie?w=100&h=100" width="100" className="rounded-circle"></img>
                                }
                             
                            
                          </div>
                          
                          <div className="text-center mt-3">
                            
                              {user.id == e._id &&
                              <span className="bg-secondary p-1 px-4 rounded text-white">You</span>
                               }
                              <h4 className="mt-2 mb-0">{e.name}</h4>
                              <h5 className="mt-2 mb-0">username: {e.userName}</h5>
                              <span>followers {e.followers.length}</span>
                              <span>following {e.following.length}</span>
                              
                              <div className="px-4 mt-1">
                                  <p className="fonts">{e.bio}</p>
                              </div>
                              
                             
                              
                              
                              <div className="buttons">
                                  {user.id != e._id &&
                                  <a href={`/message/${e.userName}`}>
                                  <button className="btn btn-outline-primary px-4"><i className="fa fa-solid fa-envelope"></i></button>
                                  </a>
                                  }
                                
                                
            
                               
                                   {(!followingObj[e._id] && user.id != e._id) &&
                                      <form  className="buttons" action={`/${e.userName}/follow`} method="post">
                                     <button className="btn btn-outline-primary px-4 ">Follow</button>
                                    </form>
                                   }
                                    
                                     
                                      {(followingObj[e._id] == e._id && user.id != e._id) && 
                                      <form  className="buttons" action={`/${e.userName}/unfollow`} method="post">
                                        <button className="unfollowButton btn btn-primary px-4 ms-3">Unfollow</button>
                                        </form>
                                      }
                                      
                                     
                                        {(network.createdBy == user.id && e._id != user.id) && 
                                        <form  className="buttons" action={`/network/${network.name}/${e.userName}/remove`} method="post">
                                          <button className="removeUserButton btn btn-primary px-4 ms-3">Remove User</button>
                                          </form>
                                        }
                                    
          
                              </div>
                              
                              
                          </div>
                          
                         
                          
                          
                      </div>
                    </a>

            ) : null}
        
           
        </div>
        
    </div>
   
  </div>
 
        </Main>
    )
}


export default Members