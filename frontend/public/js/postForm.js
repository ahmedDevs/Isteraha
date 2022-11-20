const postForm = document.getElementById('postForm')
const postIcon = document.getElementById('postIcon')
const submitPostButton = document.getElementById('submitPostButton')
const feedBox = document.getElementById('feedBox')
const cancelButton = document.getElementById('cancelButton')
postIcon.addEventListener('click', () => {
    feedBox.classList.add('hidden')
    postForm.classList.remove('hidden')
})
submitPostButton.addEventListener('click', () => {
    postForm.classList.add('hidden')
    feedBox.classList.remove('hidden')
})
cancelButton.addEventListener('click', () => {
    postForm.classList.add('hidden')
    feedBox.classList.remove('hidden')
})