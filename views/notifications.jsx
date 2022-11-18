import React from 'react';
import Main from './components/Main.jsx';
import Menu from './components/Menu.jsx';
// import props from 'prop-types';


const Notifications = ({network,locals,messages,senders}) => {
    return (
        <Main>
            <Menu/>

     <main class="feedMainContainer">

  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900 notifications-h1">Notifications</h1>
    </div>
  </header>
 


{/* <% var userNetworks = user.networks %> */}

<div class="container mt-5">
  {/* <!-- <div class="row"> --> */}
      <div class="col-md-4 networkContainer">
       
        {(!network && !locals.messages) &&
          <p>You don't have any notifications.</p>
        }
        <h2>Your notifications</h2>
        {network ? network.map((e,i) => 

<div key={i} class="card p-3">
               
<div class="d-flex flex-row mb-3"><img src={e.logo} width="70"/>
    <div class="d-flex flex-column ml-2"><span>Invitation to: {e.name}</span><span class="text-black-50">{e.slogan}</span><span class="ratings"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></span></div>
</div>
<h6>{e.about}</h6>
<div class="d-flex justify-content-between install mt-3"><span>{e.members.length} members</span>


      {/* <!-- <span class="text-primary">Joined&nbsp;<i class="fa fa-angle-right"></i></span>
      <span>hiii</span> --> */}
    

     <form action={`/invite/${e.name}/accept?_method=PUT" method="post`}>
      <button><span class="text-primary">Accept&nbsp;<i class="fa fa-angle-right"></i></span></button>
  </form>

  <form action={`/invite/${e.name}/decline?method_DELETE" method="post`}>
      <button><span class="text-primary">Decline&nbsp;<i class="fa fa-angle-right"></i></span></button>
  </form>


{/*        
     <!-- <a href="/<%=e.name%>/acceptInvitation"><span class="text-primary">Accept&nbsp;<i class="fa fa-angle-right"></i></span> </a> -->

    <!-- <span class="text-primary">Accept&nbsp;<i class="fa fa-angle-right"></i></span> --> */}
 
</div>
</div>


        ) : null}
        
         
      </div>


      {/* <div class="col-md-4 networkContainer">

        {messages ? messages.map((e,i) => {

            <div key={i} class="card p-3">
               
            <div class="d-flex flex-row mb-3">
              {senders[i].image == '' ?
              <img src="/imgs/doggy.png" alt="profile pic"/>
              : <img src={senders[i].image} width="70"/>
            }
            
                <div class="d-flex flex-column ml-2"><span>Message from: {senders[i].name}</span><span class="text-black-50">{senders[i].userName}</span></div>
            </div>
            <h6>{e.message}</h6>
            <div class="d-flex justify-content-between install mt-3">
              <a href={`/message/${senders[i].userName}`}><span class="text-primary">View&nbsp;<i class="fa fa-angle-right"></i></span></a>
            </div>
        </div>

        }) : null}
       
        
      </div> */}
     {/* <!-- </div> --> */}
  </div>


</main>



        </Main>
    )
}

export default Notifications