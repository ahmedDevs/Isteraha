import React from 'react';

const Messages = ({ messages }) => {
    return (
        <>
        {messages.errors 
            ? messages.errors.map((e,i) => 
            <div key={i} className='alert alert-danger'>{e.msg}</div>
            ) : null}
     
     {messages.info 
            ? messages.info.map((e,i) => 
            <div key={i} className='alert alert-danger'>{e.msg}</div>
            ) :null}
       </>
    )
}

export default Messages