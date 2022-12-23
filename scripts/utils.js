function showSpinner() {
    const element = document.createElement('div');

    element.classList.add('spinner');
    element.id = 'spinner';

    const img = document.createElement('img');
    img.src = 'img/02.png';

    element.appendChild(img);

    document.body.appendChild(element);
}

function hideSpinner() {
    const element = document.getElementById('spinner');

    if (element) {
        element.remove();
    }
}