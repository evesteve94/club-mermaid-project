
  document.addEventListener('DOMContentLoaded', function () {
    // Find the menu icon and dropdown content elements
    const menuIcon = document.querySelector('.menu-icon');
    const dropdownContent = document.querySelector('.dropdown-content');

    // Add a click event listener to the menu icon
    menuIcon.addEventListener('click', function () {
      // Toggle the display of the dropdown content
      dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
    });

    // Close the dropdown when clicking outside of it
    window.addEventListener('click', function (event) {
      if (!event.target.matches('.menu-icon')) {
        dropdownContent.style.display = 'none';
      }
    });
  });
