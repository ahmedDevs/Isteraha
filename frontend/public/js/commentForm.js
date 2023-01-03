const commentForm = document.getElementById('commentForm').submit()
commentForm.addEventListener('onKeypress', e => {
    if(e.keyCode == 13) {
        e.preventDefault()
    }
})
