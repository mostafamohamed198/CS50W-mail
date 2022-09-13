document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}

document.addEventListener('DOMContentLoaded', function() {

  document.querySelector('#compose-view').onsubmit = function() {
    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
          recipients: document.querySelector('#compose-recipients').value,
          subject: document.querySelector('#compose-subject').value,
          body: document.querySelector('#compose-body').value,
      })
    })
}
});

function email(emails) {
  let emaill = document.querySelector("#emails-view");
  let inboxdiv = document.createElement('div');
    let inboxtable = document.createElement('table')
    let divAttr = document.createAttribute('id');
        inboxdiv.setAttributeNode(divAttr);
        inboxdiv.setAttribute('id', `ok`)
    emails.forEach(email => {
        if (email['sender'] !== ''){
        
        let id = email.id
        let newtr = document.createElement("tr");
        let myAttr = document.createAttribute("id"); 
        newtr.innerHTML = `<td>${email['subject']}</td>
        <td>${email['sender']}</td>
        <td>${email['timestamp']}</td>
        `;
        let newbutton = document.createElement("button")
        let nerAttrbutton = document.createAttribute("id");
        newbutton.setAttributeNode(nerAttrbutton);
        newbutton.setAttribute('id', `${id}`);
        newbutton.innerHTML='click Here';
        inboxdiv.appendChild(newbutton);
        newtr.setAttributeNode(myAttr);
        newtr.setAttribute("id", `o${id}`);
        inboxtable.appendChild(newtr);
        inboxdiv.appendChild(inboxtable);
        emaill.appendChild(inboxdiv);  
      ;
        }
      }
    
  );

            
            };


document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#inbox').addEventListener('click',function(){
  fetch('/emails/inbox')
  .then(response => response.json())
  .then(emails =>email(emails)
  
)});

document.querySelector('#sent').addEventListener('click',function(){
  fetch('/emails/sent')
  .then(response => response.json())
  .then(emails =>email(emails)
  
)});  

document.querySelector('#archived').addEventListener('click',function(){
  fetch('/emails/archive')
  .then(response => response.json())
  .then(emails =>email(emails));

  
});
  });


document.addEventListener('DOMContentLoaded', function() {
window.addEventListener('load',function (){
  
  

  let theemailview = document.querySelector('#emails-view');
theemailview.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', function (){
    
    var email_id = button.id
    fetch('/emails/' + email_id)
    .then(response => response.json())
    .then(email => {
    // Print email

            
                // ... do something else with email ...
              let emailsview =document.querySelector('#emails-view');
              let newmaildiv = document.createElement('div');
              newmaildiv.innerHTML = `<h2 class='mailheading'>${email['subject']}</h2> <h5 class='emailsender'>${email['sender']}</h5> <p class='emailbody'>${email['body']}<p> <h6 class='emailtime'>${email['timestamp']}</h6><button id='reply'>Reply</button><button id='archieve'>Archieve</button>`
              emailsview.appendChild(newmaildiv);
              let reply = document.querySelector('#reply');
              let emmailview = document.querySelector('#emails-view')
                reply.addEventListener('click', function (){
                  let replydiv = document.createElement('div');
                  replydiv.innerHTML = `<h3>Reply</h3>
                  <form>
                      <div class="form-group">
                          From: <input disabled class="form-control" id='reply-sender' value="${email['recipients']}">
                      </div>
                      <div class="form-group">
                          To: <input disabled class="form-control" id='reply-recipient' value='${email['sender']}'>
                      </div>
                      <div class="form-group">
                          <input class="form-control" placeholder="Subject" id='reply-subject' value='Re:${email['subject']}'>
                      </div>
                      <textarea class="form-control"  placeholder="Body" id='reply-body'></textarea>
                      <input type="submit" id='reply-submit' class="btn btn-primary"/>
                  </form>`
                  let replyAttrbutton = document.createAttribute("id");
                replydiv.setAttributeNode(replyAttrbutton);
                replydiv.setAttribute('id', 'reply-div');
                  emmailview.appendChild(replydiv);

                  document.querySelector('#reply-div').onsubmit = function() {
                    fetch('/emails', {
                      method: 'POST',
                      body: JSON.stringify({
                          recipients: document.querySelector('#reply-recipient').value,
                          subject: document.querySelector('#reply-subject').value,
                          body: document.querySelector('#reply-body').value,
                      })})};
                });

                let archieve = document.querySelector('#archieve');
                archieve.addEventListener('click',function(){
                  fetch('/emails/' + email_id , {
                    method: 'PUT',
                    body: JSON.stringify({
                        archived: true
                    })
                  })
                })
              })
  });
  
});
})
});