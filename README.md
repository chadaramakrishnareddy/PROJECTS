# Tech for Girls Registration Website

A beautiful and modern registration website for the Tech for Girls Community project.

## Features

✅ **Responsive Design**: Works perfectly on all devices
✅ **Modern UI**: Clean, professional design with smooth animations
✅ **WhatsApp Integration**: Share button with counter functionality
✅ **File Upload**: Drag & drop file upload with validation
✅ **Form Validation**: Real-time validation with visual feedback
✅ **Single Submission**: Prevents multiple submissions using localStorage
✅ **Google Sheets Integration**: Saves data directly to Google Sheets

## Project Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── google-sheets-setup.md  # Google Sheets integration guide
└── README.md           # This file
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd tech-for-girls-registration
   ```

2. **Set up Google Sheets integration**
   - Follow the instructions in `google-sheets-setup.md`
   - Update the Google Script URL in `script.js`

3. **Deploy to GitHub Pages**
   - Push your code to GitHub
   - Go to repository Settings > Pages
   - Select source: Deploy from a branch
   - Choose branch: main
   - Your site will be available at: `https://username.github.io/repository-name`

## Features Implementation

### Basic Form Elements
- Name (text input)
- Phone (number input)
- Email (email input)
- College/Department (dropdown)

### WhatsApp Sharing
- Share button with pre-written message
- Click counter (0/5 to 5/5)
- Completion message after 5 clicks
- Submit button only enabled after sharing completion

### File Upload
- Drag & drop functionality
- File size validation (5MB limit)
- Visual feedback for successful upload
- Supports: PDF, JPG, PNG, DOC, DOCX

### Form Submission
- Validates all fields before submission
- Checks sharing completion
- Saves data to Google Sheets
- Prevents multiple submissions
- Shows success message

## Customization

### Colors
The main colors can be changed in `styles.css`:
- Primary: `#667eea`
- Secondary: `#764ba2`
- Success: `#28a745`
- WhatsApp: `#25d366`

### Messages
Update the WhatsApp message in `script.js`:
```javascript
const message = "Hey Buddy, Join Tech For Girls Community! 🚀👩‍💻";
```

### Styling
All styles are in `styles.css` with organized sections:
- Base styles
- Layout
- Components
- Animations
- Responsive design

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is created for the Tech for Girls Community educational project.

## Contact

For questions or support, please reach out to the Tech for Girls Community.