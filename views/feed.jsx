import React from 'react';
import Main from './components/Main.jsx';
import Menu from './components/Menu.jsx';
import Post from './components/Post.jsx';

const feed = ({general, network, members, posts, hashMap, user, networkFeed}) => {
    return (
        <Main>
            <Menu networkFeed={networkFeed}/>

            <header className="bg-white shadow feedHeader">

{general ? 
  <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 networkDashInfoFeed">
  
    <div>
    <img src="#" alt="logo"/>
    <a href={`/network/${network.name}/members`}>
      <span>members: {network.members.length}</span>
    </a>
    <span></span>
    </div>

    <h1 className="text-3xl font-bold tracking-tight text-gray-900">General Feed</h1>
   
  </div> :


<div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 networkDashInfoFeed">
  
  <div className="networkLogoContainer">
  <img src={network.logo} alt="logo"/>
  <a href={`/network/${network.name}/members`}><span>members: {network.members.length}</span></a>
  <span></span>
  </div>

  <h1 className="text-3xl font-bold tracking-tight text-gray-900">{network.name}</h1>
 
</div>
}
</header>


<div className="suggestionBox">
  {members.length > 1  &&
  <h3 className="text-1xl font-bold tracking-tight text-black-400">People in {network.name} you might know</h3>
  }
  
 
        <ul>
        {members ? members.map((e,i) => 
         <li key={i} className="suggestion"> <a href={`/${e.userName}/profile`}>
       {e._id != user.id ?
        <div>
       {e.image ? 
        <img src={e.image} alt="pic" width="50" height="50"/>
        : <img src="http://placekitten.com/g/50/50" alt="pic" width="50" height="50"/>
       }
        <h3>{e.name}</h3><span>username: {e.userName}</span></div>
        
       : null}
       </a>
       </li>
       ) : null}
        </ul>
    
</div>
      
    


<div className="container mt-5 mb-5">

<div className="row d-flex formAndPostsBox">

  <Post network={network}/>


    <div className="col-md-6" id="feedBox">
        {posts ? posts.map((e,i) => 

            <div key={i} className="card cardFeed">
            <div className="d-flex justify-content-between p-2 px-3">
              <a href="/<%= hashMap[e.user].userName %>/profile">
                <div className="d-flex flex-row align-items-center"> 
                  {hashMap[e.user].image ? 
                    <img src={hashMap[e.user].image} width="50" className="rounded-circle"/>
                 :
                  <img src="https://place-puppy.com/50x50" width="50" className="rounded-circle"/>
                }
                    <div className="d-flex flex-column ml-2"> <span className="font-weight-bold">{hashMap[e.user].name}</span> <small className="text-primary">{hashMap[e.user].userName}</small> </div>
                </div>
              </a>
            
             
                 {/* <!-- <div className="d-flex flex-row mt-1 ellipsis"> <small className="mr-2">20 mins</small> <i className="fa fa-ellipsis-h"></i> </div> --> */}
            </div> 
            
            <div className="p-2 postBox">
              <a href={`/post/${e._id}`} className="postBoxLink">
              <img src={e.image} className="img-fluid postImage"/>
                <h3 className="postTitle">{e.title}</h3>
                <p className="text-justify postContent">{e.caption}</p>
                <hr/>
                </a>
                <div className="d-flex justify-content-between align-items-center postIconContainer">

                    <div className="d-flex flex-row icons d-flex align-items-center"> 

                      <form action={`/post/likePost/${e._id}?_method=PUT`} method="POST">

                     
                          {/* <!-- <button className="likeIconPost" >  
                            <i className="btn fa fa-heart"  style="color: red"></i>                  
                          </button> --> */}
                      
                          
                        <button className="btn likeIconPost fa fa-heart">
                          {/* <!-- <i className="fa fa-heart"></i>  --> */}
                        </button>

                        {/* <!-- used to be occupied by closing bracket for loop --> */}
             

                      </form>
                      
                      
                      {/* <!-- <i className="fa fa-smile-o ml-2"></i> --> */}
                    </div>


                    <div className="d-flex flex-row muted-color likesAndComments">  
                      <span>likes: {e.likes}</span>
                      <span>comments: {e.comments.length}</span>
                    </div>

                    <div className="d-flex flex-row icons d-flex align-items-center">
                      {e.user==user.id ?
                        <form action={`/post/deletePost/${e._id}?_method=DELETE`} method="POST" className="col-3">
                          <button className="btn fa fa-trash trashIconPost" type="submit"></button>
                        </form>
                       : null}
                      </div>


                </div>
                <hr/>
        
            </div>
 


        </div>


        ) : null}
   
    
    </div>
</div>
</div>


            <script src="/js/postForm.js"></script> 
        </Main>
    )
}




export default feed