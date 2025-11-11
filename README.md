# Tracking Snippet V2

## Summary
This project provides a tracking solution for WordPress sites. It includes:  

- **JS Snippet:** Collects all necessary data on page load and sends it to Google Sheets.  
- **Apps Script:** Receives the data from the snippet and populates the sheet.  

## Deliverables
- JavaScript code snippet for embedding on your website  
- Google Apps Script code for processing incoming data  
- WordPress plugin (ZIP file) for easy installation  

## How to Use
1. Download the plugin ZIP from the Git repository.  
2. In the WordPress dashboard, go to **Plugins → Add New → Upload Plugin**, select the ZIP, and enable it.  
3. Once enabled, the plugin will:  
   - Automatically create a new tab in the Google Sheet for the domain (if it does not exist).  
   - Add a new row to the **IDD Tracking Snippet** sheet on every page load.  

## Links
- **Google Sheet URL:** [IDD Tracking Snippet](#)  
- **Demo Page with Plugin:** [Demo Page](#)  

