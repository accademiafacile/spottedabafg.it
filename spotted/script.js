const form = document.getElementById('writeForm');
const writeArea = document.getElementById('writeArea');
const submitButton = document.getElementById('submitButton');
const resultDiv = document.getElementById('result');

submitButton.addEventListener('click', e => {
  // get the value of the textarea
  const writtenText = writeArea.value.trim();

  // check if the text area is empty
  if (writtenText === '') {
    // show an error message
    alert('Non puoi pubblicare un messaggio vuoto');
    // prevent the form submission
    return;
  }

  // create a new p element with the writtenText
  const p = document.createElement('p');
  p.innerHTML = writtenText;

  // create a new span element to hold the time of publication
  const timeSpan = document.createElement('span');
  timeSpan.classList.add('time');

  // get the current time and the time when the comment was created
  const currentTime = new Date();
  const commentTime = new Date();

  // set the text of the span element to the time of publication in the HH:mm format
  const hours = commentTime.getHours().toString().padStart(2, '0');
  const minutes = commentTime.getMinutes().toString().padStart(2, '0');
  timeSpan.textContent = `${hours}:${minutes}`;

  // create a new button element
  const button = document.createElement('button');
  button.innerHTML = 'Mi piace';
  button.classList.add('like-button');

  // add a click event listener to the button
  button.addEventListener('click', () => {
    // increase the like count for the message
    let likeCount = p.dataset.likeCount || 0;
    likeCount = parseInt(likeCount, 10) + 1;
    p.dataset.likeCount = likeCount;

    // update the button text with a heart icon and the like count
    const likeCountSpan = document.createElement('span');
    likeCountSpan.innerHTML = `<i class="fa fa-heart white-color"></i>${likeCount}`;
    likeCountSpan.classList.add('like-count');
    button.innerHTML = '';
    button.appendChild(likeCountSpan);

    // disable the button
    button.disabled = true;
  });

  // create a new button element with the text "sono io"
  const newButton = document.createElement('button');
  newButton.textContent = 'Sono io';

  // add the "spotted-btn" class to the new button
  newButton.classList.add('spotted-btn');

  // create a new div element with the "comment" class
  const commentDiv = document.createElement('div');
  commentDiv.classList.add('comment');

  // append the p element, time span, button, and new button to the comment div
  commentDiv.appendChild(p);
  commentDiv.appendChild(timeSpan);
  commentDiv.appendChild(button);
  commentDiv.appendChild(newButton);

  // append the comment div to the result div
  resultDiv.insertBefore(commentDiv, resultDiv.firstChild);

  // clear the text area
  writeArea.value = '';
});