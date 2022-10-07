var numtickets = 0;
let attendance = null; 
let rentals = null;

$(document).ready(function() {
  $('input[type=radio][name="rsvp"]').change(function() {
      attendance = $(this).val();
      if (attendance === 'no') {
        $('#cant-go').show();
        $('#food-ticket').hide();
        $('#rental-ticket').hide();
      } else {
        $('#cant-go').hide();
        $('#food-ticket').show();
        $('#rental-ticket').show();
      }
  });
  $('input[type=radio][name="rentals"]').change(function() {
      rentals = $(this).val();
  });
});

document.getElementById('rsvp').addEventListener('submit', (e) => {
  submit(e);
})

function submit(event) {
  event.preventDefault();
  let formData = new FormData(event.target)
  let formProps = Object.fromEntries(formData);

  //Check if all fields are filled 
  if (event.target.id === 'rsvp') {
    if (formProps.name && attendance === 'no') {
      formSend(formProps);
      hideTicket(event.target, event.submitter);
      //disable ticket
    } else if (formProps.name && attendance && rentals && formProps.food) {
      formSend(formProps);
      $(`#food-ticket`).hide();
      $(`#rental-ticket`).hide();
      $(`#see-you`).show();
      hideTicket(event.target, event.submitter);
      //disable ticket
    } else {
      alert('Please fill in all the fields!')
    }
  } else {
    if (formProps.name && formProps.mainname && formProps.food && formProps.rentals) {
      formSend(formProps)
      hideTicket(event.target, event.submitter);
    } else {
      alert('Please fill in all the fields!')
    }
  }
}

function formSend(data) {
  var data = {
    fields: {
      "name" : data.name,
      "mainname" : data.mainname ||  '',
      "attendance": data.rsvp,
      "food" : data.food,
      "rentals" : data.rentals,
      "song" : data.song
    }
  }

  fetch('https://angelroyparty.herokuapp.com/send', {
    method: 'POST',
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(function(response) {
      return response.json();
  })
  .then(function(data) {
      console.log('Request succeeded with JSON response', data);
  })
  .catch(function(error) {
      console.log('Request failed', error);
  });
}

function createNewTicket () {
  var ticket = document.createElement(`form`);
  ticket.id = `plusone${numtickets}`
  ticket.classList.add("RSVP")
  ticket.onsubmit = (e) => {
    submit(e);
  }
  
  var mainticket = document.createElement(`div`);
  mainticket.classList.add("ticket", "main-ticket")
  mainticket.innerHTML = `
    <div class="RSVP-title">RSVP</div>
    <div class="main-ticket-content">
      <div class="RSVP-description">We'd love to have you at our party, please let us know if you are able to make it by <strong>6th October 2022</strong>.</div>
      <div class="divider"></div>
      <input type="text" id="mainname_${numtickets}" name="mainname" placeholder="Your name">
      <input type="text" id="name_${numtickets}" name="name" placeholder="Their name">
    </div>          
    `

  var subticket = document.createElement(`div`);
  subticket.classList.add(`sub-ticket`)
  subticket.innerHTML = `
    <div class="food-rental-ticket">
        <div class="ticket food" id="food-ticket_${numtickets}">
          <label for="food-dropdown_${numtickets}">What type of food would they like to have?</label>
          <select class="food-dropdown "id="food-dropdown_${numtickets}" name="food">
            <option value="" disabled selected>Select...</option>
            <option value="refreshments">Refreshments</option>
            <option value="meal">Meal</option>
            <option value="none">None for me!</option>
          </select>
        </div>
        <div class="ticket rentals" id="rental-ticket_${numtickets}">
          <div>Will they be needing rental skates?</div>
          <div class="radio-box">
            <input type="radio" id="rental-yes_${numtickets}" name="rentals" value="yes">
            <label class="radio-label" for="rental-yes_${numtickets}">Yes</label><br>
            <input type="radio" id="rental-no_${numtickets}" name="rentals" value="no">
            <label class="radio-label" for="rental-no_${numtickets}">No</label><br>
          </div>
        </div>
      </div>
      <input type="submit" class="ticket submit" id="submit_${numtickets}" value="SUBMIT"></input>
  `
  ticket.appendChild(mainticket);
  ticket.appendChild(subticket);
  
  var addpersonbtn = document.getElementById('add-btn-container')
  addpersonbtn.parentNode.insertBefore(ticket, addpersonbtn);

  numtickets++;
  if (numtickets === 3) {
    addpersonbtn.style.display = 'none';
  }
}