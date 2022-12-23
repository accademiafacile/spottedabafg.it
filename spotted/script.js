// script.js
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
    
  // create a new span element to hold the time that has passed since the comment was created
  const timeSpan = document.createElement('span');
  timeSpan.classList.add('time');

  // get the current time and the time when the comment was created
  const currentTime = new Date();
  const commentTime = new Date();

  // calculate the difference between the two times in minutes
  let timeDifference = Math.floor((currentTime - commentTime) / 60000);

  // check if the time difference is less than 2 minutes
  if (timeDifference < 2) {
    // set the text of the span element to "just now"
    timeSpan.textContent = 'adesso';
  } else {
    // check if the time difference is more than 60 minutes
    if (timeDifference >= 60) {
      // calculate the difference in hours
      timeDifference = Math.floor(timeDifference / 60);
      // check if the time difference is more than 24 hours
      if (timeDifference >= 24) {
        // calculate the difference in days
        timeDifference = Math.floor(timeDifference / 24);
        // set the text of the span element to the time difference in days
        timeSpan.textContent = `${timeDifference} giorni`;
      } else {
        // set the text of the span element to the time difference in hours
        timeSpan.textContent = `${timeDifference} ore`;
      }
    } else {
      // set the text of the span element to the time difference in minutes
      timeSpan.textContent = `${timeDifference} minuti`;
    }
  }
    
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
    
    // create a new div element with the "comment" class
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    
  // append the p element, time span, and button to the comment div
  commentDiv.appendChild(p);
  commentDiv.appendChild(timeSpan);
  commentDiv.appendChild(button);
  
  // append the comment div to the result div
  resultDiv.appendChild(commentDiv);
  
  // clear the text area
  writeArea.value = '';
});