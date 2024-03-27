function searchTable(inputId, tableId, columnIndex) {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(inputId);
    filter = input.value.toUpperCase();
    table = document.getElementById(tableId);
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[columnIndex];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function sortTable(colIndex) {
  var table, rows, switching, i, x, y, shouldSwitch, direction, switchcount = 0;
  table = document.getElementById("table");
  switching = true;
  // Set the sorting direction to ascending
  direction = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    // Loop through all table rows (except the first, which contains the table headers)
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      // Get the two elements you want to compare: current and next row
      x = rows[i].getElementsByTagName("td")[colIndex];
      y = rows[i + 1].getElementsByTagName("td")[colIndex];
      // Check if the two rows should switch place based on the sorting direction
      if (direction == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop
          shouldSwitch= true;
          break;
        }
      } else if (direction == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      // Perform the switch and mark the switch as done
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Increase the switch count
      switchcount ++;
    } else {
      // If no switching has been done and the direction is ascending,
      // set the direction to descending and run the loop again
      if (switchcount == 0 && direction == "asc") {
        direction = "desc";
        switching = true;
      }
    }
  }
}

    // Get all table rows
    var rows = document.querySelectorAll('#table tbody tr');
    // Set initial page and items per page
    var currentPage = 1;
    var itemsPerPage = 5;

    function showPage(pageNumber) {
        // Hide all rows
        rows.forEach(function(row) {
            row.classList.add('hidden');
        });
        // Calculate start and end index of rows to show
        var startIndex = (pageNumber - 1) * itemsPerPage;
        var endIndex = startIndex + itemsPerPage;
        // Show rows within the current page range
        for (var i = startIndex; i < endIndex && i < rows.length; i++) {
            rows[i].classList.remove('hidden');
        }
    }

    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    }

    function nextPage() {
        if (currentPage < Math.ceil(rows.length / itemsPerPage)) {
            currentPage++;
            showPage(currentPage);
        }
    }

    // Show initial page
    showPage(currentPage);