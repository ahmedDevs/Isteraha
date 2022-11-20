import React from 'react';
import Main from './components/Main.jsx';
import Menu from './components/Menu.jsx';

const Profile = ({user, profile,isFollower, posts}) => {
    return (
    <Main>

    <Menu user={user}/>
        <header className="bg-white shadow">
  <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Profile</h1>
  </div>
</header>

<main className="mainContainerProfile">
<div className="container mt-5">
    
  <div className="row d-flex justify-content-center">
      
      <div className="col-md-7">
          
          <div className="card p-3 py-4">
              
              <div className="text-center">
              

                {profile.image ? <img src={profile.image} alt="profile pic"/> 
                : <img src="/imgs/doggy2.png" width="100" className="rounded-circle"/>}
              </div>
              
              <div className="text-center mt-3">
             
                {user.id == profile._id ?  <span className="bg-secondary p-1 px-4 rounded text-white">You</span> : null}
                  <h4 className="mt-2 mb-0">{profile.name}</h4>
                  <h5 className="mt-2 mb-0">username: {profile.userName}</h5>
                  <span>followers {profile.followers.length}</span>
                  <span>  following {profile.following.length}</span>
                  
                  <div className="px-4 mt-1">
                      <p className="fonts">{profile.bio}</p>
                  
                  </div>
                  

                  
                  <div className="buttons">
                    {/* <% if (user.id == profile._id) { %>
                      <button className="btn btn-outline-primary px-4 editButton">Edit</button>
                      <% } %> */}
                      {user.id == profile._id ?   <button className="btn btn-outline-primary px-4 editButton">Edit</button>
                      :  <a href={`/message/${profile.userName}`}>
                      <button className="btn btn-outline-primary px-4"><i className="fa fa-solid fa-envelope"></i></button>
                    </a>}

                

                      {!isFollower && user.id != profile._id ? 
                      <form  className="buttons" action={`${profile.userName}/follow`} method="post">
                     <button className="btn btn-outline-primary px-4 ">Follow</button>
                    </form> : null}

                    {isFollower ? 
                     <form  className="buttons" action={`${profile.userName}/unfollow`} method="post">
                        <button className="unfollowButton btn btn-primary px-4 ms-3">Unfollow</button>
                        </form> : null}


                  </div>
                  
                  
              </div>
              
             
              
              
          </div>
          
      </div>
      
  </div>
  
</div>




      <div className="container mt-5 mb-5">
 
        <div className="row d-flex align-items-center justify-content-center">
            <div className="col-md-6">
                    {posts ? posts.map((posts,i) => 
                           <div key={i} className="card cardFeed">
                           <div className="d-flex justify-content-between p-2 px-3">
                            <div className="d-flex flex-row align-items-center"> 
                            {profile.image ? 
                            <img src={profile.image} width="50" className="rounded-circle"/>
                            : <img src="https://place-puppy.com/50x50" width="50" className="rounded-circle"/>}
                              <div className="d-flex flex-column ml-2"> <span className="font-weight-bold">{profile.name}</span> <small className="text-primary">{profile.userName}</small> </div>
                            </div>


                            <img src={posts.image} className="img-fluid postImage"/>
                    </div> 
                    

                    <a href={`/post/${posts._id}`}>
                    <div className="p-2">
                        <h3>{posts.title}</h3>
                        <p className="text-justify">{posts.caption}</p>
                        <hr/>
                        <div className="d-flex justify-content-between align-items-center postIconContainer">

                            <div className="d-flex flex-row icons d-flex align-items-center"> 
                              <form action={`/post/likePost/${posts._id}?_method=PUT`} method="POST">
                                <button className="btn likeIconPost fa fa-heart">
                                  {/* <!-- <i className="fa fa-heart"></i>  --> */}
                                </button>
                              </form>
                            </div>


                            <div className="d-flex flex-row muted-color likesAndComments"> 
                              <span>likes: {posts.likes}</span>
                              <span>comments: {posts.comments.length}</span> 
                              {/* <!-- <span className="ml-2">Share</span>  --> */}
                            </div>

                            <div className="d-flex flex-row icons d-flex align-items-center">
                                {posts.user == user.id && 
                                <form action={`/post/deletePost/${posts._id}?_method=DELETE`} method="POST" className="col-3">
                                <button className="btn fa fa-trash trashIconPost" type="submit"></button>
                              </form>}
                              </div>
                             

                        </div>
                        <hr/>

                
                    </div>
                    </a>

                </div>
                

         ) : null}

        </div>
      </div>
      </div>
      
</main>




<div className="container mt-3 editProfileForm hidden" id="profileForm">
  <div className="card p-3 text-center">
    <form action={`/settings/user/save?_method=PUT`} method="POST">
      <div className="d-flex flex-row justify-content-center mb-3">
          <div className="image"> 
            {/* <% if(!user.image) { %>
              <img src="https://placekitten.com/g/100/100" width="100" height="100" className="rounded-circle">
              <% } %>
            <img src="<%= user.image %>" className="rounded-circle">  */}
            {!user.image ? 
              <img src="https://placekitten.com/g/100/100" width="100" height="100" className="rounded-circle"/> :
              <img src={user.image} className="rounded-circle"/>}
          
          </div>
          
      </div>
      <h4>Edit Profile</h4>
      <div className="row">
          <div className="col-md-12">
              <div className="inputs"> <label>Name</label> <input className="form-control" type="text" placeholder={user.name} name="name" /> </div>
          </div>
         
      </div>


      <div className="mb-3">
        <label for="imgUpload" className="form-label">Profile Picture (optional)</label>
        <input type="file" className="form-control" id="imageUpload" name="file" />
      </div>


      <div className="row">
          <div className="col-md-12">
          {/* <% if(!user.bio) { %>
              <div className="about-inputs"> <label>Bio</label> <textarea className="form-control" type="text" placeholder="Tell us about yourself" name="bio"> </textarea> </div>
           <% } else { %>
            <div className="about-inputs"> <label>Bio</label> <textarea className="form-control" type="text" placeholder="<%= user.bio %>" name="bio"> </textarea> </div>
            <% } %> */}
            {!user.bio ? 
                 <div className="about-inputs"> <label>Bio</label> <textarea className="form-control" type="text" placeholder="Tell us about yourself" name="bio"> </textarea> </div> : 
                 <div className="about-inputs"> <label>Bio</label> <textarea className="form-control" type="text" placeholder={user.bio} name="bio"> </textarea> </div> }
          </div>
      </div>



      <div className="mt-3 gap-2 d-flex justify-content-end">   <button className="px-3 btn btn-sm btn-primary submitButton">Save</button> </div>
    </form>
    <div className="mt-3 gap-2 d-flex justify-content-end"> <button className="px-3 btn btn-sm btn-outline-primary cancelButton">Cancel</button> 
  </div>
</div>
</div>




 <script src="/js/main.js"></script> 
</Main>
    )
}

export default Profile