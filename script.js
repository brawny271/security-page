let rowCount = 1; 

$(document).ready(function() {
    function addEmailConfiguration() {
        const configName = $('#emailConfigName').val();
        const emailAddress = $('#emailAddress').val();
        const emailAppPassword = $('#emailAppPassword').val();
        const smapPort = $('#smapPort').val();
        const smtpServer = $('#smtpServer').val();
        
        const newRow = '<tr>' +
                        '<td>' + rowCount + '</td>' + 
                        '<td>' + configName + '</td>' +
                        '<td>Email</td>' +
                        '<td>' +
                            '<button class="btn btn-dark btn-sm">' +
                                '<img src="/icons/pen.png" alt="" />' +
                            '</button>' +
                            '<button class="btn btn-danger btn-sm delete-row">' + 
                                '<img src="/icons/bin.png" alt="" />' +
                            '</button>' +
                        '</td>' +
                    '</tr>';

        $('#configurationsTableBody').append(newRow);
        
        rowCount++;
        $('#exampleModalCenter').modal('hide');
    }

    $('#addEmailBtn').click(addEmailConfiguration);

    function addDriveConfiguration() {
        const configName = $('#driveConfigurationName').val();
        const ipAddress = $('#driveIpAddress').val();
        const folderName = $('#driveFolderName').val();
        const username = $('#driveUsername').val();
        const password = $('#drivePassword').val();
        
        const newRow = '<tr>' +
                        '<td>' + rowCount + '</td>' + 
                        '<td>' + configName + '</td>' +
                        '<td>Drive</td>' +
                        '<td>' +
                            '<button class="btn btn-dark btn-sm">' +
                                '<img src="/icons/pen.png" alt="" />' +
                            '</button>' +
                            '<button class="btn btn-danger btn-sm delete-row">' + 
                                '<img src="/icons/bin.png" alt="" />' +
                            '</button>' +
                        '</td>' +
                    '</tr>';

        $('#configurationsTableBody').append(newRow);

        rowCount++;

        $('#exampleModalCenter2').modal('hide');
    }

    $('#addDriveBtn').click(addDriveConfiguration);

    $(document).on('click', '.delete-row', function() {
        $(this).closest('tr').remove();
        rowCount--;
    });
});



//************ SAP & OCR Functionality ************

document.addEventListener("DOMContentLoaded", function() {
    function handleButtonClick(penButton, updateButton, cancelButton, emailInput) {
      penButton.addEventListener("click", function() {
        emailInput.readOnly = false;
        penButton.classList.add("hidden");
        updateButton.classList.remove("hidden");
        cancelButton.classList.remove("hidden");
        updateButton.classList.add("slide-in-right");
        cancelButton.classList.add("slide-in-right");
      });
  
      cancelButton.addEventListener("click", function() {
        emailInput.readOnly = true;
        penButton.classList.remove("hidden");
        updateButton.classList.add("hidden");
        cancelButton.classList.add("hidden");
      });
  
      updateButton.addEventListener("click", function() {
        emailInput.readOnly = true;
        penButton.classList.remove("hidden");
        updateButton.classList.add("hidden");
        cancelButton.classList.add("hidden");
      });
    }
  
    //SAP Section 
    const penButton1 = document.getElementById("penButton1");
    const updateButton1 = document.getElementById("updateButton1");
    const cancelButton1 = document.getElementById("cancelButton1");
    const emailInput1 = document.getElementById("exampleInputEmail1");
    handleButtonClick(penButton1, updateButton1, cancelButton1, emailInput1);
  
    //OCR Section 
    const penButton2 = document.getElementById("penButton2");
    const updateButton2 = document.getElementById("updateButton2");
    const cancelButton2 = document.getElementById("cancelButton2");
    const emailInput2 = document.getElementById("exampleInputEmail2");
    handleButtonClick(penButton2, updateButton2, cancelButton2, emailInput2);
  });



  //OCR & SAP Data Fetch

function appendAndFetch() {
    const container1 = document.getElementById('exampleInputEmail1');
    const container2 = document.getElementById('exampleInputEmail2');
    const updateButton1 = document.getElementById('updateButton1');
    const cancelButton1 = document.getElementById('cancelButton1');
    const updateButton2 = document.getElementById('updateButton2');
    const cancelButton2 = document.getElementById('cancelButton2');
    const saveChangesButton = document.getElementById('saveChangesButton');
  
    let sapUrlValue, ocrUrlValue;
  
    fetch(`http://172.16.12.21:8000/test/sap-ocr-data/2`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        container1.value = data.sap_url;
        container2.value = data.ocr_url;
        sapUrlValue = data.sap_url;
        ocrUrlValue = data.ocr_url;
  
        updateButton1.addEventListener('click', function() {
          sapUrlValue = container1.value;
        });
        cancelButton1.addEventListener('click', function() {
          container1.value = sapUrlValue;
        });
        updateButton2.addEventListener('click', function() {
          ocrUrlValue = container2.value;
        });
        cancelButton2.addEventListener('click', function() {
          container2.value = ocrUrlValue;
        });
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  
    saveChangesButton.addEventListener('click', function() {
      const dataToUpdate = {
        sap_url: sapUrlValue,
        ocr_url: ocrUrlValue
      };
  
      fetch('http://172.16.12.21:8000/test/sap-ocr-data/2', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToUpdate)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Data updated successfully!');
      })
      .catch(error => {
        console.error('There was a problem updating the data:', error);
      });
    });
  }
  
  appendAndFetch();


  function fetchPlantWiseGroups() {
    const url = 'http://172.16.12.21:8000/test/plant-wise-groups/';
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data from API:', data);
        createElementsFromData(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
  
  // Call the fetch function to retrieve data from the API and create elements
  fetchPlantWiseGroups();

  // function createElementsFromData(data) {
  //   data.forEach(obj => {
  //     for (const prop in obj) {
  //       const details = obj[prop];
  //       const containerDiv = document.getElementById(prop); 
        
  //       if (containerDiv) {
  //         details.forEach(detail => {
  //           const boxDiv = document.createElement('div');
  //           boxDiv.classList.add('box');
  
  //           const label = document.createElement('label');
  //           label.classList.add('checkbox-container');
  
  //           const input = document.createElement('input');
  //           input.setAttribute('type', 'checkbox');
  
  //           const spanCheckmark = document.createElement('span');
  //           spanCheckmark.classList.add('checkmark');
  
  //           label.appendChild(input);
  //           label.appendChild(spanCheckmark);
  
  //           const heading = document.createElement('h6');
  //           heading.classList.add('box-lable');
  //           heading.textContent = detail.name;
  
  //           boxDiv.appendChild(label);
  //           boxDiv.appendChild(heading);
  
  //           containerDiv.appendChild(boxDiv);
  //         });
  //       } else {
  //         console.error(`No div found with ID '${prop}'`);
  //       }
  //     }
  //   });
  // }

  function createElementsFromData(data) {
    data.forEach(obj => {
      for (const prop in obj) {
        const details = obj[prop];
        const containerDiv = document.getElementById(prop);
        
        if (containerDiv) {
          details.forEach(detail => {
            const boxDiv = document.createElement('div');
            boxDiv.classList.add('box');
  
            const label = document.createElement('label');
            label.classList.add('checkbox-container');
  
            const input = document.createElement('input');
            input.setAttribute('type', 'checkbox');
  
            const spanCheckmark = document.createElement('span');
            spanCheckmark.classList.add('checkmark');
  
            label.appendChild(input);
            label.appendChild(spanCheckmark);
  
            const heading = document.createElement('h6');
            heading.classList.add('box-lable');
            heading.textContent = detail.name;
  
            boxDiv.appendChild(label);
            boxDiv.appendChild(heading);
  
            containerDiv.appendChild(boxDiv);
          });
        } else {
          console.error(`No div found with ID '${prop}'`);
        }
      }
    });
  }
  
  // Function to collect checked values
  function collectCheckedValues() {
    const checkedValues = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
      checkedValues.push(checkbox.parentNode.nextElementSibling.textContent);
    });
    return checkedValues;
  }
  
  const saveChangesButton = document.querySelector('.save-button');
  saveChangesButton.addEventListener('click', function() {
    // Gather checked values
    const checkedValues = collectCheckedValues();
    
    // Send checked values to the API only if there are checked values
    if (checkedValues.length > 0) {
      sendCheckedValuesToAPI(checkedValues);
    }
  });
  
  function sendCheckedValuesToAPI(checkedValues) {
    const url = 'http://172.16.12.21:8000/test/plant-wise-groups/';
    const payload = { checkedValues };
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Response from API:', data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }