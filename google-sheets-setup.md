# Google Sheets Integration Setup

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Tech for Girls Registrations"
4. Add the following headers in row 1:
   - A1: Name
   - B1: Phone
   - C1: Email
   - D1: College
   - E1: File Name
   - F1: Submission Time
   - G1: Sharing Completed

## Step 2: Create Google Apps Script

1. In your Google Sheet, go to `Extensions` > `Apps Script`
2. Replace the default code with the following:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Parse the JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Append data to the sheet
    sheet.appendRow([
      data.name,
      data.phone,
      data.email,
      data.college,
      data.file ? data.file.name : '',
      data.submissionTime,
      data.sharingCompleted
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Data submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Step 3: Deploy the Script

1. Click on `Deploy` > `New deployment`
2. Choose type: `Web app`
3. Set execute as: `Me`
4. Set access: `Anyone`
5. Click `Deploy`
6. Copy the web app URL

## Step 4: Update Your JavaScript

1. Open `script.js`
2. Find the line with `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';`
3. Replace with your actual web app URL
4. Uncomment the Google Sheets submission code in the form submission handler

## Step 5: Test the Integration

1. Submit a test form
2. Check your Google Sheet to see if data appears
3. If there are issues, check the Apps Script logs

## Additional Notes

- The script handles file names but not actual file uploads to Google Drive
- For file uploads, you'll need to extend the script to save files to Google Drive
- Always test thoroughly before going live
- Consider adding data validation and error handling

## Security Considerations

- The web app URL should be kept private
- Consider adding authentication if needed
- Validate all input data on the server side