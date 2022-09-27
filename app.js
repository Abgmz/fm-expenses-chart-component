const app = () => {
  const $chartContainer = document.querySelector("[data-chart-container]");

  const getData = async () => {
    let template = "";
    const res = await fetch("./data.json");
    const data = await res.json();

    const maxAmount = data.reduce((a, b) => [...a, b.amount], []);

    data.forEach((el) => {
      let barAmount = el.amount + 20;
      template += `
        <div class="chart__spending-bar-day">
            <div class="chart__spending-bar ${
              el.amount === Math.max(...maxAmount) ? "max-amount" : ""
            }" style="height: ${barAmount}%">
                <span class="chart__spending-bar-amount">$${el.amount}</span>
            </div>
            <div class="chart__spending-bar-text">${el.day}</div>   
        </div>
        `;

      $chartContainer.innerHTML = template;
    });
  };

  getData();
};

document.addEventListener("DOMContentLoaded", app);
