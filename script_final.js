/*$(document).ready(function() {
    $('#dataTable').DataTable({
        "paging": true, // Enable pagination
        "searching": true, // Enable search
        "ordering": true, // Enable sorting
        "order": [], // Initial sorting order (empty for no initial sorting)
        pageLength: 5, //show only 5 entries
        "language": {
            "search": "", // Remove search box label
            "searchPlaceholder": "Search...", // Set search box placeholder text
            "paginate": {
                "previous": "Previous", // Set previous page button text
                "next": "Next" // Set next page button text
            }
        },"dom": '<"top"lfip>rt<"bottom"p>'
    });
});*/
$(document).ready(function() {

        function applyRowColors() {
            var counter = 1;
            $('tr.parent-row').each(function(index) {
                if ($(this).is(':visible')) {
                    //console.log(counter % 2);
                    $(this).removeClass('even').addClass(counter % 2 === 0 ? 'even' : '');
                    counter++;
                }
            });
        }

        // Add click event listener to parent rows
        function hide_elements(){
            $('.explanation-table').hide();
            $('.child-table').hide();
            $('.daily-child-data').hide();
        }

        applyRowColors();

        $('#symbolDropdown').select2({
            placeholder: 'Search for a symbol',
            allowClear: true, // Allow clearing the selection
            width: 'resolve' // Adjust width automatically
        });

        $('.parent-row').click(function() {
            hide_elements();
            // Get the ID of the parent row
            var parentId = $(this).attr('id');
            // Toggle the visibility of the explanation and child tables with corresponding class
            $('.explanation-table.' + parentId).show();
            $('.child-table.' + parentId).show();
            $('.child-table.' + parentId + " .child-table-parent").click();
        });

        $('.child-table .child-table-parent').click(function() {
            // Get the ID of the parent row
            classes = $(this).attr('class').split(" ");
            //console.log('tr.' + classes[1] + ' .daily-child-data');
            $('tr.' + classes[1] + ' .daily-child-data:even').toggle();
        });

        $('td.action').click(function(){
            hide_elements();
            $('.parent-row').hide();
            var targetId = $(this).attr('id');
            if (targetId=='all' || targetId=='all_daily'){
                $('.parent-row').show();
            }else{
                $('.' + targetId).show();
            }
            applyRowColors();
        });

        $('#symbolDropdown').change(function(){
            hide_elements();
            $('.parent-row').hide();
            var symbol = $(this).val();
            if (symbol.length > 0){
                $('#' + symbol).show();
                $('#' + symbol).click();
            }else{
                $('.parent-row').show();
            }
            applyRowColors();
        });

        // Show next parent row when next button is clicked
        $('.nextBtn').on('click', function() {
            var currentRow = $('#dataTable tbody tr.parent-row:visible');
            var currentId = currentRow.attr("id");
            var nextRow = currentRow.nextAll('.parent-row:first');
            if (nextRow.length > 0) {
                currentRow.hide();
                $('tr.' + currentId).hide();
                nextRow.show();
                nextRow.click();
            }
        });

        // Show previous parent row when previous button is clicked
        $('.prevBtn').on('click', function() {
            var currentRow = $('#dataTable tbody tr.parent-row:visible');
            var currentId = currentRow.attr("id");
            var prevRow = currentRow.prevAll('.parent-row:first');
            if (prevRow.length > 0) {
                currentRow.hide();
                $('tr.' + currentId).hide();
                prevRow.show();
                prevRow.click();
            }
        });

        // Initially hide all parent rows except the first one
        $('#dataTable tbody tr.parent-row:not(:first)').hide();

        $('.parent-row:first').click();
        //$('.child-table:first .child-table-parent').click();

        // Show popup when previous row is clicked
        $('.daily-child-data').on('click', function() {
            // Hide any previously shown popups
            var popup_text = $(this).next().find('td').html()
            //console.log(popup_text);
            $('.popup .popup-content').html(popup_text);
            $('.popup').show();
            // Show the next row as popup
            //$(this).next().show();
        });

        // Close popup when close button is clicked
        $('.close').on('click', function() {
            $('.popup').hide();
        });
});