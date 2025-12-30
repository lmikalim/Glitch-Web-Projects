document.addEventListener('DOMContentLoaded', () => {
  // Ensure that this ID matches the element in your HTML
  const playlistMakerButton = document.getElementById('playlist-maker-button');
  if (playlistMakerButton) {
    playlistMakerButton.addEventListener('click', () => {
      // Handle button click
      console.log('Playlist Maker button clicked');
      // Redirect or perform another action
    });
  } 

  // Similarly for other elements
  const findRangeButton = document.getElementById('find-range-button');
  if (findRangeButton) {
    findRangeButton.addEventListener('click', () => {
      // Handle button click
      console.log('Find my vocal range button clicked');
      // Redirect or perform another action
    });
  }
});