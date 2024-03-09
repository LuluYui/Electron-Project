/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';

async function fetchPdfFilesData() {
    try {
        const response = await fetch('http://localhost:443/get_pdf', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-SSL-CERT': 'ca.pem',
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const pdfFiles = await response.json();
        console.log(pdfFiles)
        return pdfFiles;
    } catch (error) {
        console.error('Error fetching PDF files data:', error);
        return [];
    }
}


// Retrieve PDF files data from Flask app
fetchPdfFilesData().then(pdfFiles => {
    displayPdfFiles(pdfFiles);
}).catch(error => {
    console.error('Error fetching PDF files data:', error);
});

// Function to display PDF files data in a table
function displayPdfFiles(pdfFiles) {
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');

    // Add table headers
    ['ID', 'Filename', 'Modified Date'].forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Add table rows with PDF files data
    pdfFiles.forEach(pdfFile => {
        const tr = document.createElement('tr');

        Object.values(pdfFile).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });

        table.appendChild(tr);
    });

    document.body.appendChild(table);
}