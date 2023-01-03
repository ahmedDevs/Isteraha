import React from 'react';
import Main from './components/Main.jsx';
import Menu from './components/Menu.jsx';
import Chat from './components/Chat.jsx';
// import Post from './components/Post.jsx;';

const Messages = ({props}) => {
    return (
        <Main>
            <Menu/>

            <Chat/>

            <script src="/js/searchbarInvite.js"></script>
        </Main>
    )

}

export default Messages