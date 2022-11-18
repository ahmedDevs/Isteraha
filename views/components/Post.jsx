import React from 'react';

const Post = ({network}) => {
    return (
        <div class="mt-5 hidden" id="postForm">
    <h2>Add a post</h2>
    {network ?
        <form action={`/post/createPost/${network.name}`} enctype="multipart/form-data" method="POST">
            <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input type="text" class="form-control" id="title" name="title" required/>
            </div>
            <div class="mb-3">
              <label for="caption" class="form-label">Post</label>
              <textarea class="form-control" id="caption" name="caption" required></textarea>
            </div>
            <div class="mb-3">
              <label for="imgUpload" class="form-label">Image</label>
                <input type="file" class="form-control" id="imageUpload" name="file"/>
            </div>
            <button type="submit" class="btn btn-primary" id="submitPostButton" value="Upload">Submit</button>
            <button type="reset" class="btn btn-primary" id="cancelButton">Cancel</button>
          </form> 
     : null} 
  </div>
    )
}


export default Post