document.addEventListener("DOMContentLoaded", function() {
    displayCards();
  
    // Simulate content load time
    setTimeout(function() {
      document.getElementById("loader").style.display = "none";
      document.getElementById("main-content").style.display = "block";
    }, 1000); // Adjust time as needed
  });
  
  const tools = {
    "Loan EMI Calculator": [
      "loan-emi-calculator", 
      "images/loan-emi-calculator.jpeg", 
      "Loan EMI Calculator helps you easily calculate your monthly loan installments (EMI) based on the loan amount, interest rate, and tenure. It provides a quick way to plan and manage loan repayments."
    ],
    "Debt Payoff Calculator": [
      "debt-payoff-calculator", 
      "images/debt-payoff-calculator.png", 
      "Debt Payoff Calculator helps you estimate the time needed to pay off your debts based on your payment amount and interest rate. It’s a useful tool for planning debt reduction strategies and achieving financial freedom faster."
    ]
  };
  
  function displayCards() {
    const cardContainer = document.getElementById('card-container');
    for (let [name, data] of Object.entries(tools)) {
      const cardCol = document.createElement('div');
      cardCol.className = 'col-md-4 mb-4 d-flex align-items-stretch';
  
      const card = document.createElement('div');
      card.className = 'card';
  
      const img = document.createElement('img');
      img.src = data[1];
      img.alt = name + ' Image';
      card.appendChild(img);
  
      const cardContent = document.createElement('div');
      cardContent.className = 'card-content';
  
      const title = document.createElement('h3');
      title.innerText = name;
      cardContent.appendChild(title);
  
      const description = document.createElement('p');
      description.innerText = data[2];
      cardContent.appendChild(description);
  
      const link = document.createElement('button');
      link.className = 'btn btn-primary';
      link.innerText = 'Try it now';
      link.onclick = function() {
        openToolModal(`https://tools.pocket-insights.com/${data[0]}`);
      };
      cardContent.appendChild(link);
  
      card.appendChild(cardContent);
      cardCol.appendChild(card);
      cardContainer.appendChild(cardCol);
    }
  }
  
  function openToolModal(url) {
    const iframe = document.getElementById('toolIframe');
    iframe.src = url;
    $('#toolModal').modal('show');
  }
  