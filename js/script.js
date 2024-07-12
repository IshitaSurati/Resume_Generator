// Initialize Firebase
var firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
firebase.analytics();

// DOM elements
const form = document.getElementById('resume-form');
const modalBody = document.getElementById('resume-modal-body');

// Disable form submissions if there are invalid fields
form.addEventListener('submit', function(event) {
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }
  form.classList.add('was-validated');
}, false);

// Function to generate the resume
function generateResume() {
  // Get the form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const education = document.getElementById('education').value;
  const experience = document.getElementById('experience').value;
  const skills = document.getElementById('skills').value;
  const achievements = document.getElementById('achievements').value;
  const languages = document.getElementById('languages').value;
  const hobbies = document.getElementById('hobbies').value;
  const profileImgFile = document.getElementById('profile-img').files[0];

  // Validate profile image size (200x200 pixels)
  const img = new Image();
  const maxImageSize = 200;
  const reader = new FileReader();

  reader.onload = function(e) {
    img.onload = function() {
      if (img.width > maxImageSize || img.height > maxImageSize) {
        alert('Profile image dimensions must be 200x200 pixels or less.');
        return;
      }
      // Proceed with generating the resume if image size is valid
      createResume(name, email, phone, education, experience, skills, achievements, languages, hobbies, reader.result);
    };
    img.src = e.target.result;
  };

  if (profileImgFile) {
    reader.readAsDataURL(profileImgFile);
  } else {
    // No profile image selected
    createResume(name, email, phone, education, experience, skills, achievements, languages, hobbies, '');
  }
}

// Function to create the resume HTML and display it in the modal
function createResume(name, email, phone, education, experience, skills, achievements, languages, hobbies, profileImgSrc) {
  // Create the resume HTML
  const resumeHTML = `
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        color: #333;
        padding: 20px;
      }
      .resume {
        background-color: #fff;
        padding: 20px;
        border: 1px solid #ddd;
      }
      .resume-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #a09999;
        padding-bottom: 10px;
        margin-bottom: 20px;
      }
      .resume-header h2 {
        font-size: 24px;
        font-weight: bold;
        margin: 0;
      }
      .resume-section {
        margin-top: 20px;
      }
      .resume-section h3 {
        font-size: 20px;
        margin-bottom: 10px;
      }
      .resume-section p {
        margin: 0;
      }
      .profile-img {
        max-width: 200px;
        max-height: 200px;
        border-radius: 50%;
        object-fit: cover;
      }
    </style>
    <div class="resume">
      <div class="resume-header">
        <h2>${name}</h2>
        <img class="profile-img" src="${profileImgSrc}" alt="Profile Image">
      </div>
      <div class="resume-section">
        <h3>Contact Information</h3>
        <ul>
          <li>Email: ${email}</li>
          <li>Phone: ${phone}</li>
        </ul>
      </div>
      <div class="resume-section">
        <h3>Education</h3>
        <p>${education}</p>
      </div>
      <div class="resume-section">
        <h3>Experience</h3>
        <p>${experience}</p>
      </div>
      <div class="resume-section">
        <h3>Skills</h3>
        <p>${skills}</p>
      </div>
      <div class="resume-section">
        <h3>Achievements</h3>
        <p>${achievements}</p>
      </div>
      <div class="resume-section">
        <h3>Languages</h3>
        <p>${languages}</p>
      </div>
      <div class="resume-section">
        <h3>Hobbies</h3>
        <p>${hobbies}</p>
      </div>
    </div>
  `;

  // Show the resume in the modal
  modalBody.innerHTML = resumeHTML;
  $('#resumeModal').modal('show');

  // Open a new window for printing
  const printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.write(`<html><head><title>Resume</title>${resumeHTML}</head><body></body></html>`);
  printWindow.document.close();
  printWindow.print();
}

// Event listener for form submission
form.addEventListener('submit', function(event) {
  event.preventDefault();
  event.stopPropagation();

  if (form.checkValidity()) {
    generateResume();
  }

  form.classList.add('was-validated');
}, false);

// Event listener for printing the resume from modal
document.getElementById('print-resume').addEventListener('click', function() {
  const printContent = modalBody.innerHTML;
  const printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.write(`<html><head><title>Resume</title><style>body { font-family: Arial, sans-serif; }</style></head><body>${printContent}</body></html>`);
  printWindow.document.close();
  printWindow.print();
});
// Event listener for form submission
form.addEventListener('submit', function(event) {
  event.preventDefault();
  event.stopPropagation();

  console.log('Form submitted!'); // Add this line for debugging

  if (form.checkValidity()) {
      generateResume();
  }

  form.classList.add('was-validated');
}, false);
