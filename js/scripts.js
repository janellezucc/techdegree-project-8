let json = {};

async function fetchUsers() {
    const response = await fetch ('https://randomuser.me/api/?results=12', {
      //method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        }
    });
    json = await response.json();

    return json.results;
};

const userContainer = document.getElementById('user-container');
const userFragment = document.createDocumentFragment();

fetchUsers().then(function(users) {
    users.map((user, index) => {
        const formattedDate = new Date(user.dob.date);
        const dateMonth = formattedDate.getMonth();
        const dateDay = formattedDate.getDay();
        const dateYear = formattedDate.getFullYear();

        const userColumn = document.createElement('div');
              userColumn.classList.add('column','user');
              userColumn.setAttribute('data-index', index);
              userColumn.onclick = function () {
                  const userIndex = this.getAttribute('data-index');
                  const userData = json.results[userIndex];

                  // instanciate new modal
                  var modal = new tingle.modal({
                    footer: true,
                    stickyFooter: false,
                    closeMethods: ['overlay', 'button', 'escape'],
                    closeLabel: "Close",
                    cssClass: ['custom-class-1', 'custom-class-2'],
                    beforeClose: function() {
                        // here's goes some logic
                        // e.g. save content before closing the modal
                        return true; // close the modal
                        return false; // nothing happens
                    }
                  });

                  // set content
                  modal.setContent(`
                      <div class="container">
                          <div class="row">
                              <div class="column">
                                  <div><img src="${user.picture.large}"></div>
                                  <h4>${user.name.first} ${user.name.last}<h4>
                                  <div>${user.email}</div>
                                  <div>${user.cell}</div>
                                  <div>${user.location.street.number} ${user.location.street.name}</div>
                                  <div>${user.location.city}, ${user.location.state} ${user.location.postcode}</div>
                                  <div>Birthday: ${dateMonth}/${dateDay}/${dateYear}</div>
                              </div>
                          </div>
                      </div>
                  `);

                  // open modal
                  modal.open();
              };

        const userProfilePic = document.createElement('div');
              userProfilePic.classList.add('user-profile-pic');
              userProfilePic.style.backgroundImage = `url(${user.picture.large})`;

        const userProfileInfo = document.createElement('div');
              userProfileInfo.classList.add('user-profile-info');

        const userProfileInfoName = document.createElement('h4');
              userProfileInfoName.textContent = `${user.name.first} ${user.name.last}`;

        const userProfileInfoEmail = document.createElement('div');
              userProfileInfoEmail.classList.add('profile-info-email');
              userProfileInfoEmail.textContent = user.email; 

        const userProfileInfoLocation = document.createElement('div');
              userProfileInfoLocation.classList.add('profile-info-location');
              userProfileInfoLocation.textContent = user.location.city;

        const userProfileCell = document.createElement('div');
              userProfileCell.classList.add('user-profile-cell');
              userProfileCell.textContent = user.cell;

        const userProfileStreet = document.createElement('div');
              userProfileStreet.classList.add('user-profile-street');
              userProfileStreet.textContent = `${user.location.street.number} ${user.location.street.name}`;

        const userProfileAddress = document.createElement('div');
              userProfileAddress.classList.add('user-profile-address');
              userProfileAddress.textContent = `${user.location.city} ${user.location.state} ${user.location.postcode}`;

        const userProfileBirthday = document.createElement('div');
              userProfileBirthday.classList.add('user-profile-birthday');
              userProfileBirthday.textContent = `${dateMonth}/${dateDay}/${dateYear}`;

              userProfileInfo.appendChild(userProfileInfoName);
              userProfileInfo.appendChild(userProfileInfoEmail);
              userProfileInfo.appendChild(userProfileInfoLocation);

              userColumn.appendChild(userProfilePic);
              userColumn.appendChild(userProfileInfo);

              userFragment.appendChild(userColumn);
    });

    userContainer.appendChild(userFragment);

    console.log('json', json);
});