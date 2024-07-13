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
  const profileImgFile = document.getElementById('photo').files[0];

  const reader = new FileReader();

  reader.onload = function(e) {
      // Proceed with generating the resume without image size validation
      createResume(name, email, phone, education, experience, skills, achievements, languages, hobbies, e.target.result);
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
          .resume-header img {
              max-width: 100px;
              border-radius: 50%;
          }
          .resume h1 {
              font-size: 24px;
              margin: 0;
          }
          .resume h2 {
              font-size: 20px;
              margin: 0;
          }
          .resume-section {
              margin-bottom: 20px;
          }
          .resume-section h3 {
              font-size: 18px;
              margin-bottom: 10px;
              color: #e4a100;
          }
          .resume-section p {
              margin: 0;
          }
      </style>
      <div class="resume">
          <div class="resume-header">
              <div>
                  <h1>${name}</h1>
                  <h2>${email}</h2>
                  <p>${phone}</p>
              </div>
              ${profileImgSrc ? `<img src="${profileImgSrc}" alt="Profile Image">` : ''}
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

  // Display the resume HTML in the modal
  const resumeModalBody = document.getElementById('resume-modal-body');
  resumeModalBody.innerHTML = resumeHTML;

  // Show the modal
  $('#resumeModal').modal('show');
}

// Print resume
document.getElementById('print-resume').addEventListener('click', function() {
  const printContents = document.getElementById('resume-modal-body').innerHTML;
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
});

// Add form validation and event listener for form submission
const form = document.getElementById('resume-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  event.stopPropagation();

  if (form.checkValidity()) {
      generateResume();
  }

  form.classList.add('was-validated');
}, false);

// Preview selected image
document.getElementById('photo').addEventListener('change', function(event) {
  const input = event.target;
  if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
          document.getElementById('profile-img').src = e.target.result;
          document.getElementById('profile-img').style.display = 'block';
      };
      reader.readAsDataURL(input.files[0]);
  } else {
      document.getElementById('profile-img').style.display = 'none';
  }
});
