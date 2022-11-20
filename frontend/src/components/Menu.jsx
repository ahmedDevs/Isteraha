import React from 'react';

const Menu = ({user, invitations, networkFeed, userName}) => {
    return (
        <div id="sideMenu" className="d-flex flex-column flex-shrink-0 bg-light vh-100" style= {{width: "100px"}}>
        <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
            {/* <!-- <li className="nav-item"> 
              <a href="/" className="nav-link active py-3 border-bottom"> 
                <i className="fa fa-home"></i> <small>Home</small> </a> </li>--> */}
    
                <li className="nav-item"> 
                  <a href="/" className="nav-link py-3 border-bottom menuLogo">
                    <img src="/imgs/default.png" className="fa" alt="logo"/>
                  </a> 
                </li>
    
            <li> <a href="/dashboard" className="nav-link py-3 border-bottom"> <i className="fa fa-dashboard"></i> <small>Dashboard</small> </a> </li>
            {user &&
          
            <li>
              
                 <a href={`/${user.userName}/profile`} className="nav-link py-3 border-bottom"> 
                 <i className="fa fa-light fa-user"></i> <small>My Profile</small> </a>
            
             
            </li>
             }
        
            {/* <!-- <li className="nav-link py-3 border-bottom"><a href="/message"><i className="fa fa-solid fa-envelope"></i></a></li> --> */}
    
            {/* <!-- <li className="nav-link py-3 border-bottom"><i className="fa fa-solid fa-envelope-dot"></i></li> -->
            
    
            <!-- <i className="fa fa-first-order"></i> --> */}
          
            <li> <a href="/network" className="nav-link py-3 border-bottom"> <i className="fa fa-solid fa-people-group"></i> <small>Public</small> </a> </li>
            <li className="nav-item"> 
                {/* <!-- <span className="sr-only">View notifications</span> -->
                <!-- Heroicon name: outline/bell --> */}
                {/* <!-- <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"> --> */}
                  <a className="nav-link py-3 border-bottom" href="/notification">
    
                    {invitations && invitations.length > 0 ?
                      <svg className="fa" xmlns="http://www.w3.org/2000/svg" width="25px" fill="red" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" ariaHidden="true">
                        <path stroke-linecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
                      </svg>
                    :
                  <svg className="fa" xmlns="http://www.w3.org/2000/svg" width="25px" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" ariaHidden="true">
                  <path stroke-linecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
                </svg> }
                
              </a>
            </li>
            {networkFeed && networkFeed == true  ?
            <li className="nav-item nav-link py-3 border-bottom" id="postIcon"> 
              <i className="fa fa-regular fa-comment"></i><small>Post</small>
           
          {/* <!-- </a> --> */}
            </li>  : null}
    

      
                
    
            {/* <!-- <li> <a href="/<%=user.userName%>/user-settings" className="nav-link py-3 border-bottom"> <i className="fa fa-cog"></i> <small>Settings</small> </a> </li>
            <li> <a href="#" className="nav-link py-3 border-bottom"> <i className="fa fa-bookmark"></i> <small>Bookmark</small> </a> </li> --> */}
    
    
        </ul>
        <div className="dropdown border-top"> <a href="#" className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false"> 
        
          {user && user.image ?
          <img src={user.image} alt="mdo" width="24" height="24" className="rounded-circle"/>
           
          :
          <img src="http://placekitten.com/g/25/25" alt="mdo" width="24" height="24" className="rounded-circle"/>}
         
        </a>
            <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
                <li><a className="dropdown-item" href="/network/create">Create a network..</a></li>
                {/* <!-- <li><a className="dropdown-item" href="/<%=user.userName%>/user-settings">Settings</a></li> --> */}
                {user &&
                <li><a className="dropdown-item" href={`/${user.userName}/profile`}>Profile</a></li> }
                <li>
                    <hr className="dropdown-divider"/>
                </li>
                <li><a className="dropdown-item" href="/logout">Sign out</a></li>
            </ul>
        </div>
    </div>

    )

}

export default Menu