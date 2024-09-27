document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const resumeContainer = document.getElementById('resume-container') as HTMLDivElement;
    const resumeElement = document.getElementById('resume') as HTMLDivElement;
    const downloadButton = document.getElementById('download-button') as HTMLButtonElement;
    const profilePictureInput = document.getElementById('profile-picture') as HTMLInputElement;

    let profilePictureDataUrl: string | null = null;

    profilePictureInput.addEventListener('change', (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                if (e.target && typeof e.target.result === 'string') {
                    profilePictureDataUrl = e.target.result;
                }
            };
            reader.readAsDataURL(file);
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const education = (document.getElementById('education') as HTMLTextAreaElement).value;
        const workExperience = (document.getElementById('work-experience') as HTMLTextAreaElement).value;
        const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',');

        resumeElement.innerHTML = `
            <header>
                ${profilePictureDataUrl ? `<img src="${profilePictureDataUrl}" alt="Profile Picture" class="profile-picture">` : ''}
                <h1 contenteditable="true" id="editable-name">${name}</h1>
                <p contenteditable="true" id="editable-contact">Contact: ${email} | ${phone}</p>
            </header>
            <section>
                <h2>Education</h2>
                <p contenteditable="true" id="editable-education">${education}</p>
            </section>
            <section>
                <h2>Work Experience</h2>
                <p contenteditable="true" id="editable-work-experience">${workExperience}</p>
            </section>
            <section>
                <h2>Skills</h2>
                <ul id="editable-skills">
                    ${skills.map(skill => `<li contenteditable="true">${skill.trim()}</li>`).join('')}
                </ul>
            </section>
        `;

        resumeContainer.style.display = 'block';

        makeSectionsEditable();
    });

    function makeSectionsEditable() {
        const nameElement = document.getElementById('editable-name');
        const contactElement = document.getElementById('editable-contact');
        const educationElement = document.getElementById('editable-education');
        const workExperienceElement = document.getElementById('editable-work-experience');
        const skillsElements = document.querySelectorAll('#editable-skills li');

        const saveContent = (id: string, value: string) => {
            console.log(`Saving content of ${id}: ${value}`);
        };

        [nameElement, contactElement, educationElement, workExperienceElement].forEach((element) => {
            if (element) {
                element.addEventListener('input', () => {
                    const value = (element as HTMLElement)?.innerText ?? ''; 
                    saveContent(element.id, value);
                });
            }
        });

        skillsElements.forEach((skillElement, index) => {
            skillElement.addEventListener('input', () => {
                const value = (skillElement as HTMLElement)?.innerText ?? ''; 
                saveContent(`skill-${index}`, value);
            });
        });
    }
    const shareableLink = document.getElementById('shareable-link') as HTMLAnchorElement;
    shareableLink?.addEventListener("click", () => {
        
    })
    const downloadPdf = document.getElementById('downloadpdf') as HTMLButtonElement;
    downloadPdf?.addEventListener("click", () => {
        window.print();
    })
});