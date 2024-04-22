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
        });

        $('.child-table .child-table-parent').click(function() {
            // Get the ID of the parent row
            classes = $(this).attr('class').split(" ");
            //console.log('tr.' + classes[1] + ' .daily-child-data');
            $('tr.' + classes[1] + ' .daily-child-data').toggle();
        });

        $('tr.action').click(function(){
            hide_elements();
            $('.parent-row').hide();
            var targetId = $(this).attr('id');
            if (targetId=='All'){
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

        $('.parent-row:first').click();
        $('.child-table:first .child-table-parent').click();
    });