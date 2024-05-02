let rowCount = 1; // Initialize row count

$(document).ready(function() {
    // Function to add email configuration to the table
    function addEmailConfiguration() {
        // Extract values from input fields
        const configName = $('#emailConfigName').val();
        const emailAddress = $('#emailAddress').val();
        const emailAppPassword = $('#emailAppPassword').val();
        const smapPort = $('#smapPort').val();
        const smtpServer = $('#smtpServer').val();
        
        // Construct the new row HTML
        const newRow = '<tr>' +
                        '<td>' + rowCount + '</td>' + // Serial number
                        '<td>' + configName + '</td>' +
                        '<td>Email</td>' +
                        '<td>' +
                            '<button class="btn btn-dark btn-sm">' +
                                '<img src="/icons/pen.png" alt="" />' +
                            '</button>' +
                            '<button class="btn btn-danger btn-sm delete-row">' + // Add a class to identify delete buttons
                                '<img src="/icons/bin.png" alt="" />' +
                            '</button>' +
                        '</td>' +
                    '</tr>';
        
        // Append the new row to the table body
        $('#configurationsTableBody').append(newRow);
        
        // Increment row count for the next row
        rowCount++;
        
        // Close the modal
        $('#exampleModalCenter').modal('hide'); // Ensure this line is executed
    }

    // Event listener for the "Add Email" button in the modal
    $('#addEmailBtn').click(addEmailConfiguration);

    // Function to add drive configuration to the table
    function addDriveConfiguration() {
        // Extract values from input fields
        const configName = $('#driveConfigurationName').val();
        const ipAddress = $('#driveIpAddress').val();
        const folderName = $('#driveFolderName').val();
        const username = $('#driveUsername').val();
        const password = $('#drivePassword').val();
        
        // Construct the new row HTML
        const newRow = '<tr>' +
                        '<td>' + rowCount + '</td>' + // Serial number
                        '<td>' + configName + '</td>' +
                        '<td>Drive</td>' +
                        '<td>' +
                            '<button class="btn btn-dark btn-sm">' +
                                '<img src="/icons/pen.png" alt="" />' +
                            '</button>' +
                            '<button class="btn btn-danger btn-sm delete-row">' + // Add a class to identify delete buttons
                                '<img src="/icons/bin.png" alt="" />' +
                            '</button>' +
                        '</td>' +
                    '</tr>';
        
        // Append the new row to the table body
        $('#configurationsTableBody').append(newRow);
        
        // Increment row count for the next row
        rowCount++;
        
        // Close the modal
        $('#exampleModalCenter2').modal('hide');
    }

    // Event listener for the "Add Drive" button in the modal
    $('#addDriveBtn').click(addDriveConfiguration);

    // Event listener for delete buttons
    $(document).on('click', '.delete-row', function() {
        // Find the parent row and remove it
        $(this).closest('tr').remove();
        // Decrement row count
        rowCount--;
    });
});