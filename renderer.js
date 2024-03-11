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


document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.getElementById('data-table-body');
    const pdfViewer = document.getElementById('pdf-viewer');
  
    // Function to handle row selection
    async function selectRow(event) {
      const selectedRow = event.target.parentElement;
      const rows = tableBody.getElementsByTagName('tr');
  
      // Remove highlight from all rows
      for (let i = 0; i < rows.length; i++) {
        rows[i].classList.remove('highlight');
      }
      // Highlight selected row
      selectedRow.classList.add('highlight');

      // Display PDF data
      const dataIndex = parseInt(selectedRow.getAttribute('data-index'));
      const selectedData = fetchedData[dataIndex];
      const pdfData = selectedData.pdf;

          // Display loading spinner
      pdfViewer.innerHTML = '<div class="loading-spinner"></div>';

      // Lazy load PDF data
      try {
        const response = await fetchPdfData(pdfData); // Fetch PDF data
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        
        // Display PDF in iframe
        pdfViewer.innerHTML = `<iframe src="${url}" width="100%" height="600px"></iframe>`;
      } catch (error) {
        console.error('Error loading PDF:', error);
        pdfViewer.innerHTML = '<div class="error-message">Error loading PDF</div>';
      }
      }

      // Function to fetch PDF data
    async function fetchPdfData(pdfData) {
      return await fetch(`data:application/pdf;base64,${pdfData}`);
    }

  async function fetchDataFromLocalhost() {
    try {
      const data = await window.electron.fetchData();
      return data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


    function renderData(data) {
          // Clear existing table rows
          tableBody.innerHTML = '';
          data.forEach((item, index) => {
            const row = document.createElement('tr');
            row.setAttribute('data-index', index); // Set data-index attribute to store the index of the data in the array
            const idCell = document.createElement('td');
            idCell.textContent = item.id;
            row.appendChild(idCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = item.name;
            row.appendChild(nameCell);

            const modifiedDateCell = document.createElement('td');
            modifiedDateCell.textContent = item.modified_date;
            row.appendChild(modifiedDateCell);

            const filesizeCell = document.createElement('td');
            filesizeCell.textContent = item.file_size;
            row.appendChild(filesizeCell);

            row.addEventListener('click', selectRow); // Add click event listener to each row
            tableBody.appendChild(row);

          });
  }
    // Function to fetch data from localhost using Electron's preload script
  
    // Call fetchDataFromLocalhost function when the window finishes loading
    const fetchedData = await fetchDataFromLocalhost();
    renderData(fetchedData);// Populate table with fetched data
  });

// Retrieve PDF files data from Flask app
// fetchPdfFilesData().then(pdfFiles => { 
//     displayPdfFiles(pdfFiles);
// }).catch(error => {
//     console.error('Error fetching PDF files data:', error);
// });


// // Function to display PDF files data in a table
// function displayPdfFiles(pdfFiles) {
//     const table = document.createElement('table');
//     const headerRow = document.createElement('tr');

//     // Add table headers
//     ['ID', 'Filename', 'Modified Date'].forEach(headerText => {
//         const th = document.createElement('th');
//         th.textContent = headerText;
//         headerRow.appendChild(th);
//     });
//     table.appendChild(headerRow);

//     // Add table rows with PDF files data
//     pdfFiles.forEach(pdfFile => {
//         const tr = document.createElement('tr');

//         Object.values(pdfFile).forEach(value => {
//             const td = document.createElement('td');
//             td.textContent = value;
//             tr.appendChild(td);
//         });

//         table.appendChild(tr);
//     });

//     document.body.appendChild(table);
// }