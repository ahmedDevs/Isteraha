const Comment = require("../models/Comment");
module.exports = {
    createComment: async (req, res) => {
        try {
            await Comment.create({
                comment: req.body.comment,
                likes: 0,
                post: req.params.id,
                user: req.user.id,
            });
        console.log("Comment has been added!");
        res.redirect(`/post/${req.params.id}`); 
        } catch (err) {
            console.log(err);
        }
    },
    deleteComment: async (req, res) => {
        try {
            // Find post by id
            let comment = await Comment.findById({ _id: req.params.id });
            console.log({ comment })
            // if req.user == comment.user
            await Comment.deleteOne({ _id: req.params.id });
            console.log("Deleted Comment");
            res.redirect("/post/" + comment.post);
        } catch (err) {
            res.redirect("/profile");
        }
    },
    likeComment: async (req,res) => {
        try {
            const comment = await Comment.findById(req.params.id)
            const likeArr = comment.likedBy
     
      if(likeArr.includes(req.user._id) === true) {
        await comment.updateOne(
          {
            $inc: { likes: -1 },
          },
          {
            new: true,
          },
        ) 
        
        likeArr.splice(likeArr.indexOf(req.user._id),1)
        await comment.save()
      }  else { 
        await comment.updateOne(
          {
            $inc: { likes: 1 },
          },
          {
            new: true,
          },
        ) 
        
        likeArr.push(req.user._id)
        await comment.save()
      }
      res.redirect(`/post/${req.params.id}`);
        }  catch(err) {
            console.error(err)
        }
    }
}