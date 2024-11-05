const MAX_DEBTS = 7;
       let debtCount = 0;

       function addDebtRow() {
           if (debtCount >= MAX_DEBTS) {
               showNotification("You can only add up to 7 debts.");
               return;
           }

           debtCount++;

           const row = document.createElement("tr");
           row.innerHTML = `
               <td><input type="text" placeholder="e.g., Credit Card" class="tooltip">
                  
               </td>
               <td><input type="text" placeholder="e.g., 1000" class="tooltip">
                  
               </td>
               <td><input type="text" placeholder="e.g., 15" class="tooltip">
                   
               </td>
               <td><input type="text" placeholder="e.g., 50" class="tooltip">
                   
               </td>
               <td><span class="delete-button" onclick="deleteDebtRow(this)">Delete</span></td>
           `;
           document.getElementById("debtInputs").appendChild(row);
       }

       function deleteDebtRow(button) {
           button.parentElement.parentElement.remove();
           debtCount--;
       }

       function showNotification(message) {
           const notification = document.getElementById("notification");
           notification.innerText = message;
           notification.style.display = "block";
           setTimeout(() => notification.style.display = "none", 5000);
       }

       function calculatePayoff() {
           const monthlyIncome = parseFloat(document.getElementById("monthlyIncome").value);

           if (isNaN(monthlyIncome) || monthlyIncome <= 0) {
               showNotification("Please enter a valid monthly income after expenses.");
               return;
           }

           const debtTable = document.querySelectorAll("#debtInputs tr");
           const debtList = [];
           let totalDebt = 0;

           debtTable.forEach((row, index) => {
               const debtName = row.cells[0].querySelector("input").value;
               const debtAmount = parseFloat(row.cells[1].querySelector("input").value);
               const debtInterest = parseFloat(row.cells[2].querySelector("input").value);
               const debtMinPayment = parseFloat(row.cells[3].querySelector("input").value);

               if (!debtName || isNaN(debtAmount) || isNaN(debtInterest) || isNaN(debtMinPayment)) {
                   showNotification(`Please enter valid values for Debt ${index + 1}`);
                   return;
               }

               debtList.push({
                   name: debtName,
                   amount: debtAmount,
                   interest: debtInterest,
                   min_mp: debtMinPayment,
                   month_pay: 0,
               });

               totalDebt += debtAmount;
           });

           if (debtList.length === 0) {
               showNotification("Please add at least one debt to calculate.");
               return;
           }

           const totalDebtHistory = [totalDebt];
           const debtHistory = [debtList.map(d => d.amount)];
           const outputData = [];
           let month = 0;

           while (totalDebt > 0 && month < 300) {
               let money_left = monthlyIncome;
               month++;
               const monthlyPayments = {};

               for (let debt of debtList) {
                   debt.month_pay = 0;
                   if (debt.amount < debt.min_mp) debt.min_mp = debt.amount;

                   if (debt.min_mp <= money_left) {
                       debt.amount -= debt.min_mp;
                       debt.month_pay += debt.min_mp;
                       money_left -= debt.min_mp;
                   } else {
                       debt.amount -= money_left;
                       debt.month_pay += money_left;
                       money_left = 0;
                   }
               }

               debtList.sort((a, b) => b.interest - a.interest);
               totalDebt = 0;

               for (let debt of debtList) {
                   if (debt.amount <= money_left) {
                       debt.month_pay += debt.amount;
                       money_left -= debt.amount;
                       debt.amount = 0;
                   } else {
                       debt.amount -= money_left;
                       debt.month_pay += money_left;
                       money_left = 0;
                   }

                   debt.amount = parseFloat((debt.amount * (1 + (debt.interest / 100) / 12)).toFixed(2));
                   totalDebt += debt.amount;

                   monthlyPayments[debt.name] = {
                       payment: debt.month_pay.toFixed(2),
                       remaining: debt.amount.toFixed(2),
                   };
               }

               totalDebtHistory.push(totalDebt);
               debtHistory.push(debtList.map(d => d.amount));

               for (const [debtName, { payment, remaining }] of Object.entries(monthlyPayments)) {
                   outputData.push({ month, debtName, payment, remaining });
               }
           }

           populateOutputTable(outputData);
           plotGraph(totalDebtHistory, debtHistory, debtList);
       }

       function populateOutputTable(data) {
           const outputTable = document.getElementById("outputTable");
           const outputTableBody = document.getElementById("outputTableBody");
           outputTableBody.innerHTML = "";

           data.forEach(entry => {
               const row = document.createElement("tr");
               row.innerHTML = `
                   <td>${entry.month}</td>
                   <td>${entry.debtName}</td>
                   <td>${entry.payment}</td>
                   <td>${entry.remaining}</td>
               `;
               outputTableBody.appendChild(row);
           });

           outputTable.style.display = "table";
       }

       function plotGraph(totalDebtHistory, debtHistory, debtList) {
           const months = Array.from({ length: totalDebtHistory.length }, (_, i) => i + 1);

           const data = [
               {
                   x: months,
                   y: totalDebtHistory,
                   type: "scatter",
                   name: "Total Debt",
               },
               ...debtList.map((debt, index) => ({
                   x: months,
                   y: debtHistory.map(monthlyDebt => monthlyDebt[index]),
                   type: "scatter",
                   name: debt.name,
               })),
           ];

           const layout = {
               title: "Debt Over Time",
               xaxis: { title: "Month" },
               yaxis: { title: "Total Debt" },
           };

           Plotly.newPlot("graph", data, layout);
       }