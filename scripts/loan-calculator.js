$(document).ready(function () {
    $('#calculateBtn').click(function () {
        calculateEmi();
    });

    $('#loanType').change(function () {
        updateMaxTenure();
        calculateEmi(); // Recalculate on loan type change
    });

    $('#loanTenureInput').on('input', function () {
        calculateEmi();
    });

    $('input[name="tenureToggle"]').change(function () {
        calculateEmi();
    });

    updateMaxTenure(); // Initial setup
});

function updateMaxTenure() {
    var loanType = $('#loanType').val();
    var maxYears;

    if (loanType === 'Car Loan') {
        maxYears = 7;
    } else if (loanType === 'Home Loan') {
        maxYears = 30;
    } else {
        maxYears = 5;
    }

    $('#loanTenureInput').attr('max', maxYears);
}

function calculateEmi() {
    var loanAmount = parseFloat($('#loanAmount').val());
    var interestRate = parseFloat($('#interestRate').val()) / 100 / 12;
    var tenureType = $('input[name="tenureToggle"]:checked').val();
    var tenureYears = parseFloat($('#loanTenureInput').val());
    var tenureMonths = tenureType === 'years' ? tenureYears * 12 : tenureYears;

    var emi = (loanAmount * interestRate * Math.pow(1 + interestRate, tenureMonths)) / (Math.pow(1 + interestRate, tenureMonths) - 1);
    var totalPayment = emi * tenureMonths;
    var totalInterest = totalPayment - loanAmount;

    $('#emiResult').text('₹' + Math.round(emi).toLocaleString('en-IN'));
    $('#totalInterest').text('₹' + Math.round(totalInterest).toLocaleString('en-IN'));
    $('#totalPayment').text('₹' + Math.round(totalPayment).toLocaleString('en-IN'));
    $('.results').show();

    // Update chart
    var principal = loanAmount;
    var interest = totalInterest;
    var ctx = document.getElementById('paymentChart').getContext('2d');

    if (window.pieChart) {
        window.pieChart.destroy();
    }

    window.pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Principal Loan Amount', 'Total Interest'],
            datasets: [{
                data: [principal, interest],
                backgroundColor: ['#36A2EB', '#FF6384']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        },
    });
}
