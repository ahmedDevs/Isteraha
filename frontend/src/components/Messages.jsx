import React from 'react';

const Messages = ({ messages }) => {
    return (
        <>
        {messages.errors 
            ? messages.errors.map((e,i) => 
            <div key={i} className='alert alert-danger'>{e.msg}</div>
            ) : null}
     
<<<<<<< HEAD
     {messages.info 
            ? messages.info.map((e,i) => 
            <div key={i} className='alert alert-danger'>{e.msg}</div>
=======
     {messages.success 
            ? messages.success.map((e,i) => 
            <div key={i} className='alert alert-success'>{e.msg}</div>
            ) : null}

     {messages.info 
            ? messages.info.map((e,i) => 
            <div key={i} className='alert alert-info'>{e.msg}</div>
>>>>>>> parent of b9c6542 (i)
            ) :null}
       </>
    )
}

export default Messages