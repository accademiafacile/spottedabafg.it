function showSpinner() {
    const element = document.createElement('div');

    element.classList.add('spinner');
    element.id = 'spinner';

    const img = document.createElement('img');
    img.src = '../img/01.png';

    element.appendChild(img);

    document.body.appendChild(element);
}

function hideSpinner() {
    const element = document.getElementById('spinner');

    if (element) {
        element.remove();
    }
}

const HOME_PAGE_URL = location.origin + "/calendar/index.html";