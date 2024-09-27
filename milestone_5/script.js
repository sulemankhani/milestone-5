document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resume-form');
    var resumeContainer = document.getElementById('resume-container');
    var resumeElement = document.getElementById('resume');
    var downloadButton = document.getElementById('download-button');
    var profilePictureInput = document.getElementById('profile-picture');
    var profilePictureDataUrl = null;
    profilePictureInput.addEventListener('change', function (event) {
        var _a;
        var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                if (e.target && typeof e.target.result === 'string') {
                    profilePictureDataUrl = e.target.result;
                }
            };
            reader.readAsDataURL(file);
        }
    });
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var education = document.getElementById('education').value;
        var workExperience = document.getElementById('work-experience').value;
        var skills = document.getElementById('skills').value.split(',');
        resumeElement.innerHTML = "\n            <header>\n                ".concat(profilePictureDataUrl ? "<img src=\"".concat(profilePictureDataUrl, "\" alt=\"Profile Picture\" class=\"profile-picture\">") : '', "\n                <h1 contenteditable=\"true\" id=\"editable-name\">").concat(name, "</h1>\n                <p contenteditable=\"true\" id=\"editable-contact\">Contact: ").concat(email, " | ").concat(phone, "</p>\n            </header>\n            <section>\n                <h2>Education</h2>\n                <p contenteditable=\"true\" id=\"editable-education\">").concat(education, "</p>\n            </section>\n            <section>\n                <h2>Work Experience</h2>\n                <p contenteditable=\"true\" id=\"editable-work-experience\">").concat(workExperience, "</p>\n            </section>\n            <section>\n                <h2>Skills</h2>\n                <ul id=\"editable-skills\">\n                    ").concat(skills.map(function (skill) { return "<li contenteditable=\"true\">".concat(skill.trim(), "</li>"); }).join(''), "\n                </ul>\n            </section>\n        ");
        resumeContainer.style.display = 'block';
        makeSectionsEditable();
    });
    function makeSectionsEditable() {
        var nameElement = document.getElementById('editable-name');
        var contactElement = document.getElementById('editable-contact');
        var educationElement = document.getElementById('editable-education');
        var workExperienceElement = document.getElementById('editable-work-experience');
        var skillsElements = document.querySelectorAll('#editable-skills li');
        var saveContent = function (id, value) {
            console.log("Saving content of ".concat(id, ": ").concat(value));
        };
        [nameElement, contactElement, educationElement, workExperienceElement].forEach(function (element) {
            if (element) {
                element.addEventListener('input', function () {
                    var _a;
                    var value = (_a = element === null || element === void 0 ? void 0 : element.innerText) !== null && _a !== void 0 ? _a : '';
                    saveContent(element.id, value);
                });
            }
        });
        skillsElements.forEach(function (skillElement, index) {
            skillElement.addEventListener('input', function () {
                var _a;
                var value = (_a = skillElement === null || skillElement === void 0 ? void 0 : skillElement.innerText) !== null && _a !== void 0 ? _a : '';
                saveContent("skill-".concat(index), value);
            });
        });
    }
    var shareableLink = document.getElementById('shareable-link');
    shareableLink === null || shareableLink === void 0 ? void 0 : shareableLink.addEventListener("click", function () {
    });
    var downloadPdf = document.getElementById('downloadpdf');
    downloadPdf === null || downloadPdf === void 0 ? void 0 : downloadPdf.addEventListener("click", function () {
        window.print();
    });
});
