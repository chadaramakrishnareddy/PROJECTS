// Initialize variables
let clickCount = 0;
const maxClicks = 5;
let isSubmitted = false;

// DOM elements
const form = document.getElementById('registrationForm');
const whatsappBtn = document.getElementById('whatsappBtn');
const clickCounter = document.getElementById('clickCounter');
const completionMessage = document.getElementById('completionMessage');
const submitBtn = document.getElementById('submitBtn');
const fileUpload = document.getElementById('fileUpload');
const fileName = document.getElementById('fileName');
const successMessage = document.getElementById('successMessage');

// Check if user has already submitted
window.addEventListener('load', () => {
    const submitted = localStorage.getItem('techForGirlsSubmitted');
    if (submitted === 'true') {
        showSuccessMessage();
    }
});

// WhatsApp sharing functionality
whatsappBtn.addEventListener('click', () => {
    if (clickCount < maxClicks) {
        clickCount++;
        updateCounter();
        
        // Open WhatsApp with pre-written message
        const message = "Hey Buddy, Join Tech For Girls Community! 🚀👩‍💻";
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        // Check if sharing is complete
        if (clickCount >= maxClicks) {
            showCompletionMessage();
            checkSubmitBtnState();
        }
    }
});

// Update counter display
function updateCounter() {
    clickCounter.textContent = `Click count: ${clickCount}/${maxClicks}`;
    
    // Add visual feedback
    clickCounter.style.background = clickCount === maxClicks ? '#d4edda' : '#fff';
    clickCounter.style.color = clickCount === maxClicks ? '#155724' : '#333';
    clickCounter.style.border = clickCount === maxClicks ? '2px solid #c3e6cb' : '2px solid #e1e5e9';
}

// Show completion message
function showCompletionMessage() {
    completionMessage.style.display = 'flex';
    whatsappBtn.disabled = true;
    whatsappBtn.style.background = '#ccc';
    whatsappBtn.innerHTML = '<i class="fas fa-check"></i> Sharing Complete!';
}

// File upload handling
fileUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        // Check file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size should be less than 5MB');
            e.target.value = '';
            return;
        }
        
        // Show file name
        fileName.textContent = `Selected: ${file.name}`;
        fileName.style.display = 'block';
        
        // Update upload label
        const uploadLabel = document.querySelector('.upload-label');
        uploadLabel.style.background = '#e8f5e8';
        uploadLabel.style.borderColor = '#28a745';
        uploadLabel.innerHTML = `
            <i class="fas fa-check-circle" style="color: #28a745;"></i>
            <span style="color: #28a745;">File uploaded successfully!</span>
            <small style="color: #666;">Click to change file</small>
        `;
        
        checkSubmitBtnState();
    }
});

// Check if submit button should be enabled
function checkSubmitBtnState() {
    const formValid = form.checkValidity();
    const sharingComplete = clickCount >= maxClicks;
    const fileUploaded = fileUpload.files.length > 0;
    
    if (formValid && sharingComplete && fileUploaded) {
        submitBtn.disabled = false;
        submitBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    } else {
        submitBtn.disabled = true;
        submitBtn.style.background = '#ccc';
    }
}

// Form validation on input
form.addEventListener('input', checkSubmitBtnState);

// Form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Check if already submitted
    if (isSubmitted) {
        return;
    }
    
    // Validate sharing completion
    if (clickCount < maxClicks) {
        alert('Please complete the WhatsApp sharing (5 clicks required) before submitting.');
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    
    try {
        // Collect form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            college: formData.get('college'),
            file: formData.get('file'),
            submissionTime: new Date().toISOString(),
            sharingCompleted: true
        };
        
        // Here you would typically send data to Google Sheets
        // For now, we'll simulate the submission
        await simulateSubmission(data);
        
        // Mark as submitted
        isSubmitted = true;
        localStorage.setItem('techForGirlsSubmitted', 'true');
        
        // Show success message
        showSuccessMessage();
        
    } catch (error) {
        console.error('Submission error:', error);
        alert('There was an error submitting your form. Please try again.');
        
        // Reset submit button
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Registration';
    }
});

// Simulate form submission (replace with actual Google Sheets integration)
async function simulateSubmission(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form submitted:', data);
            resolve();
        }, 2000);
    });
}

// Show success message and disable form
function showSuccessMessage() {
    form.style.display = 'none';
    successMessage.style.display = 'block';
    
    // Disable all form elements
    const inputs = form.querySelectorAll('input, select, button');
    inputs.forEach(input => {
        input.disabled = true;
    });
}

// Add smooth scrolling for better UX
function smoothScroll(target) {
    target.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

// Form section navigation
document.querySelectorAll('.form-section').forEach(section => {
    section.addEventListener('click', () => {
        smoothScroll(section);
    });
});

// Add input animations
document.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
    });
});

// Drag and drop functionality for file upload
const uploadContainer = document.querySelector('.upload-container');

uploadContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadContainer.classList.add('drag-over');
});

uploadContainer.addEventListener('dragleave', () => {
    uploadContainer.classList.remove('drag-over');
});

uploadContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadContainer.classList.remove('drag-over');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        fileUpload.files = files;
        fileUpload.dispatchEvent(new Event('change'));
    }
});

// Add CSS for drag over state
const style = document.createElement('style');
style.textContent = `
    .drag-over .upload-label {
        background: #f0f8ff !important;
        border-color: #4a90e2 !important;
        transform: scale(1.02);
    }
`;
document.head.appendChild(style);

// Google Sheets Integration Function (to be implemented)
async function submitToGoogleSheets(data) {
    // Replace with your Google Apps Script Web App URL
    const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
    
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error submitting to Google Sheets:', error);
        throw error;
    }
}