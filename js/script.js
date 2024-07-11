$(document).ready(function() {
    $('#resume-form').submit(function(event) {
        event.preventDefault();
        var name = $('#name').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        var photo = $('#photo')[0].files[0];
        var education = $('#education').val();
        var experience = $('#experience').val();
        var skills = $('#skills').val();
        var achievements = $('#achievements').val();
        var languages = $('#languages').val();
        var hobbies = $('#hobbies').val();

        if (photo) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var photoSrc = e.target.result;
                generateResume(name, email, phone, photoSrc, education, experience, skills, achievements, languages, hobbies);
            };
            reader.readAsDataURL(photo);
        } else {
            generateResume(name, email, phone, '', education, experience, skills, achievements, languages, hobbies);
        }
    });

    function generateResume(name, email, phone, photoSrc, education, experience, skills, achievements, languages, hobbies) {
        var resumeHTML = `
            <div class="resume">
                <div class="resume-header">
                    <h2>${name}</h2>
                    ${photoSrc ? `<img src="${photoSrc}" alt="Photo">` : ''}
                </div>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <h3>Education</h3>
                <p>${education}</p>
                <h3>Experience</h3>
                <p>${experience}</p>
                <h3>Skills</h3>
                <p>${skills}</p>
                <h3>Achievements</h3>
                <p>${achievements}</p>
                <h3>Languages</h3>
                <p>${languages}</p>
                <h3>Hobbies</h3>
                <p>${hobbies}</p>
            </div>
        `;
        $('#resume-modal-body').html(resumeHTML);
        $('#resumeModal').modal('show');
    }

    $('#print-resume').click(function() {
        var printContent = $('#resume-modal-body').html();
        var originalContent = $('body').html();
        $('body').html(printContent);
        window.print();
        $('body').html(originalContent);
        location.reload();
    });

    $('#download-pdf').click(function() {
        var doc = new jsPDF();
        doc.fromHTML($('#resume-modal-body').html(), 10, 10, {
            'width': 180
        });
        doc.save('resume.pdf');
    });
});
