$('input[type="checkbox"]').on("change", updateTotal);

// Function to update the total price
function updateTotal() {
  var total = 0;
  $('input[type="checkbox"]:checked').each(function () {
    var price = parseFloat(
      $(this).closest("tr").find("td:nth-child(2)").text()
    );
    total += price;
  });
  $("#totalPrice").text(total.toFixed(2));
}

// Function to save the page as a PDF
$("#saveAsPdfButton").on("click", function () {
  // Trigger the print dialog
  window.print();
});
