import React from 'react';


const Chat = ({sent, received, messagesTo, messagesFrom }) => {
    return (

<div className="page-content page-container" id="page-content">

  
<div className="padding">
    <div className="row container d-flex justify-content-center">
<div className="col-md-6">

<form className="searchbarMessages card card-bordered mt-8 space-y-6" action="/message" method="POST">
<input type="hidden" name="remember" value="true"/>
<div className="-space-y-px rounded-md shadow-sm">
  <div>
    <p>Search by username here</p>
    <label for="userName" className="sr-only">Email address</label>
    
    <input id="userName" name="userName" type="text"   onkeyup="sendData(this)" className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="User name"/>
    <div id="searchResults"></div>
  </div>

</div>


        <div className="card card-bordered">
          <div className="card-header">
            <h4 className="card-title"><strong>Message</strong></h4>
            <a className="btn btn-xs btn-secondary" href="#" data-abc="true">UserName</a>
          </div>


            <div className="media media-chat">
              <img className="avatar" src="/imgs/doggy.png" alt="pic"/>
              <div className="media-body">
               {/* {sent && */}
                {messagesTo && messagesTo.map((e,i) => 
                    <p key={i}>{e.message}</p>
                )} 
                    
                {/* } */}
           
         
                
              </div>
            </div>


            <div className="media media-chat media-chat-reverse">
              <div className="media-body">
              {/* {received ? */}

                {messagesFrom && messagesFrom.map((e,i) => 
                    <p key={i}>{e.message}</p>
                    )}
            {/* : null} */}
            
             
              </div>
              
            </div>

            <div className="publisher bt-1 border-light">
              <img className="avatar avatar-xs" src="/imgs/doggy.png" alt="profile pic"/>
           
                <input className="publisher-input" type="text" placeholder="Your message" name="message"/>
              
              
         
            </div>
            </div>
            
            </form>
       
       
            </div>
         </div>
      </div>
      </div>


      
     
    )

}

export default Chat