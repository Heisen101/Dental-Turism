document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll(".service-checkbox");
  const totalAmount = document.getElementById("total-amount");
  const calculateTotalButton = document.getElementById("calculate-total");
  const createPDFButton = document.getElementById("create-pdf");

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", updateTotal);
  });

  calculateTotalButton.addEventListener("click", calculateTotal);
  createPDFButton.addEventListener("click", createPDF);

  function updateTotal() {
    let total = 0;
    checkboxes.forEach(function (checkbox) {
      if (checkbox.checked) {
        total += parseFloat(checkbox.value);
      }
    });

    totalAmount.textContent = total.toFixed(2);
  }

  function calculateTotal() {
    const totalSection = document.getElementById("total-section");
    const total = parseFloat(totalAmount.textContent).toFixed(2);
    totalSection.textContent = `Total service cost: ${total} euros`;
  }

  function createPDF() {
    const doc = new jsPDF();

    doc.text("Dental Service List", 10, 10);

    let y = 30;
    checkboxes.forEach(function (checkbox) {
      if (checkbox.checked) {
        const serviceRow = checkbox.parentElement.parentElement;
        const serviceName =
          serviceRow.querySelector("td:nth-child(1)").textContent;
        const servicePrice =
          serviceRow.querySelector("td:nth-child(2)").textContent;
        doc.text(`${serviceName} - ${servicePrice} euros`, 10, y);
        y += 10;
      }
    });

    doc.text(
      `Total service cost: ${totalAmount.textContent} euros`,
      10,
      y + 10
    );

    // Save the PDF
    doc.save("dental_services.pdf");
  }
});
