// Use async and await to handle the wait needed for the fetch
// Use try / catch block to catch any errors with getting the API

// limit 60 requests per hour before 403 error
// Can become an authenticated user with Github app to increase API request limit

async function fetchGitHubProfile(username) {
    try {
      const apiUrl = `https://api.github.com/users/${username}`;
      
      // use await to wait for the fetch response. 
      const response = await fetch(apiUrl);

      console.log(response);
  
      // checks response object if ok: true
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
  
      // use await to wait for the json. 
      const data = await response.json();
      
      // use display function to show data
      displayProfileInfo(data);
      console.log(data)


    } catch (error) {
      console.error('Error:', error);
      displayError(error.message);
    }
  }

  function displayProfileInfo(profileData) {
    const profileInfoElement = document.getElementById('profileInfo');
    profileInfoElement.innerHTML = `
      <img src="${profileData.avatar_url}" alt="Profile Avatar">
      <h2>${profileData.name}</h2>
      <p><strong>Bio:</strong> ${profileData.bio || 'Not available'}</p>
      <p><strong>Company:</strong> ${profileData.company || 'Not available'}</p>
      <p><strong>On Gtihub Since:</strong> ${moment(profileData.created_at).format('MMMM Do YYYY, h:mm:ss a') || 'Not available'}</p>
    `;
  }
  
  function displayError(errorMessage) {
    const profileInfoElement = document.getElementById('profileInfo');
    profileInfoElement.innerHTML = `<p>Error: ${errorMessage}</p>`;
  }
  
  document.getElementById('fetchButton').addEventListener('click', () => {
    const usernameInput = document.getElementById('usernameInput');
    const username = usernameInput.value.trim();
  
    if (username) {
      fetchGitHubProfile(username);
    } else {
      const profileInfoElement = document.getElementById('profileInfo');
      profileInfoElement.innerHTML = `<p>Please enter a valid GitHub username.</p>`;
    }
  });
  