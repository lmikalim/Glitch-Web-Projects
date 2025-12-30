

document.addEventListener('DOMContentLoaded', () => {
  fetch('/liked-songs')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Liked Songs:', data);
      displayLikedSongs(data);
    })
    .catch(error => console.error('Error fetching liked songs:', error));
});

function displayLikedSongs(data) {
  const songList = document.getElementById('song-list');
  songList.innerHTML = ''; // Clear existing list items

  if (data.items && Array.isArray(data.items)) {
    data.items.forEach(item => {
      const song = item.track;
      const listItem = document.createElement('li');
      listItem.textContent = `${song.name} by ${song.artists.map(artist => artist.name).join(', ')}`;
      songList.appendChild(listItem);
    });
  } else {
    songList.innerHTML = 'No liked songs found or data format is incorrect.';
  }
}

