window.addEventListener('load', () => {
    getUserInfo().then(user => {
        
        const instagram_name = document.getElementById('instagram_name');
        if(instagram_name) instagram_name.innerText = user.instagram;

    })
});