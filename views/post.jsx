import React from 'react';
import Main from './components/Main.jsx';
import Menu from './components/Menu.jsx';

const post = ({poster, post, comments, commenters}) => {
    return (
        <Main>
            <Menu/>
            <header className="bg-white shadow commentPageHeader">
  <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
    {poster.image ? 
        <img src={poster.image} alt="profile pic"/>
        :   <img src="https://placekitten.com/g/100/100" alt="profile pic"/>
    }
   
   

    <div>
    <span>{poster.name}</span>
    <span>username: {poster.userName}</span>
    <span>likes: {post.likes}</span>

    <div className="commentPageIcons">
      <form
      className="col-1"
      action={`/post/likePost/${post._id}?_method=PUT`}
      method="POST"
    >
      <button className="btn btn-primary fa fa-heart" type="submit"></button>
    </form>
  
    <form
    action={`/post/deletePost/${post._id}?_method=DELETE`}
    method="POST"
    className="col-3"
  >
    <button className="btn btn-primary fa fa-trash" type="submit"></button>
  </form>
    </div>
 
    </div>

  </div>

  <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl font-bold tracking-tight text-gray-900">{post.title}</h1>

  </div>
</header>



<div className="container justify-content-center mt-5 border-left border-right" id="commentSectionContainer">


  <div className="d-flex justify-content-between p-2 px-3" id="postBoxCommentSection">
    <div className="d-flex flex-row align-items-center">
       {/* <!-- <img src="https://i.imgur.com/UXdKE3o.jpg" width="50" className="rounded-circle"> --> */}
        <div className="d-flex flex-column ml-2"> <span className="font-weight-bold">{post.caption}</span> 
          {/* <!-- <small className="text-primary">Collegues</small>  --> */}
        </div>
    </div>
  
  
    <div className="d-flex flex-row mt-1 ellipsis"> 
      {/* <!-- <small className="mr-2">20 mins</small> 
      <i className="fa fa-ellipsis-h"></i>  --> */}
    </div>
  </div> 
  
  {/* <!-- <img src="" className="img-fluid postImage"> --> */}



  <div className="d-flex justify-content-center pt-3 pb-2"> 
    <form action={`/comment/createComment/${post._id}`} method="POST" id="commentForm">
      <input type="text" name="comment" placeholder="+ Add a comment" required className="form-control addtxt"/>
    </form>
  </div>



  {comments.map((e,i) => 
    <div key={i} className="d-flex justify-content-center py-2">
      <div className="second py-2 px-2"> <p className="text1">{e.comment}</p>
          <div className="d-flex justify-content-between py-1 pt-2">
            
              <div >
                <a href={`/${commenters[e.user].name}/profile`} className="commenterProfilePic">
                {commenters[e.user].image ? 
                 <img src={commenters[e.user].image} width="18" alt="profile pic"/>
                 : <img src="https://i.imgur.com/tPvlEdq.jpg" width="18" alt="profile pic"/>
                }
                
                <span className="text2">{commenters[e.user].name}</span>
                </a>
              </div>


              <div>
                {/* <!-- <span className="text3">Upvote?</span>
                <span className="thumbup"><i className="fa fa-thumbs-o-up"></i></span> --> */}
                <span className="text4">{e.likes}</span>
              </div>
              
          </div>


          <div className="d-flex justify-content-end">
            <form action={`/comment/likeComment/${e._id}?_method=PUT`} method="POST">
              <button className="btn likeIconPost fa fa-heart">
              </button>
              </form>
              </div>



      </div>
  </div>
    
    )}
  


</div>
        </Main>
    )
}

export default post