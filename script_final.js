$(document).ready(function() {
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
});