//row1 colomn1
//sales
async function fetchAllCarts() {
  const res = await fetch('https://dummyjson.com/carts');
  const data = await res.json();
  return data.carts;
}
function calculateTotalSalesForCarts(carts) {
  let total = 0;
  carts.forEach(cart => {
    cart.products.forEach(product => {
      total += product.price * product.quantity;
    });
  });
  return total;
}
function percentChange(today, yesterday) {
  if (yesterday === 0) return "N/A";
  return (((today - yesterday) / yesterday) * 100).toFixed(2) + '%';
}
async function updateSales() {
  const carts = await fetchAllCarts();
  const todaysCarts = carts.filter(cart => cart.id % 2 === 0);     // Even IDs → Today
  const yesterdaysCarts = carts.filter(cart => cart.id % 2 !== 0); // Odd IDs → Yesterday
  const todayTotal = calculateTotalSalesForCarts(todaysCarts);
  const yesterdayTotal = calculateTotalSalesForCarts(yesterdaysCarts);
  document.getElementById('todaySale').textContent = todayTotal.toFixed(2);
  document.getElementById('percentChange').textContent = `${percentChange(todayTotal, yesterdayTotal)} from yesterday`;
}
updateSales();
//order
async function fetchAllCarts() {
  const res = await fetch('https://dummyjson.com/carts');
  const data = await res.json();
  return data.carts;
}
function calculateTotalOrdersForCarts(carts) {
  let totalOrders = 0;
  carts.forEach(cart => {
    cart.products.forEach(product => {
      totalOrders += product.quantity;
    });
  });
  return totalOrders;
}
function calculatePercentChange(today, yesterday) {
  if (yesterday === 0) return "N/A";
  return (((today - yesterday) / yesterday) * 100).toFixed(2) + '%';
}

async function updateOrders() {
  const carts = await fetchAllCarts();
  const todaysCarts = carts.filter(cart => cart.id % 2 === 0);     // Even IDs → Today
  const yesterdaysCarts = carts.filter(cart => cart.id % 2 !== 0); // Odd IDs → Yesterday
  const todayOrders = calculateTotalOrdersForCarts(todaysCarts);
  const yesterdayOrders = calculateTotalOrdersForCarts(yesterdaysCarts);
  document.getElementById('todayOrders').textContent = todayOrders;
  document.getElementById('orderpercentChange').textContent = `${calculatePercentChange(todayOrders, yesterdayOrders)} from yesterday`;
}
updateOrders();
//sold product
async function fetchAllCarts() {
  const res = await fetch('https://dummyjson.com/carts');
  const data = await res.json();
  return data.carts;
}

function totalProductsSold(carts) {
  let total = 0;
  carts.forEach(cart => {
    cart.products.forEach(product => {
      total += product.quantity;
    });
  });
  return total;
}

function calculatePercentChange(today, yesterday) {
  if (yesterday === 0) return "N/A";
  return (((today - yesterday) / yesterday) * 100).toFixed(2) + '%';
}

async function updateProductsSold() {
  const carts = await fetchAllCarts();
  const todaysCarts = carts.filter(cart => cart.id % 2 === 0);     // Even IDs → Today
  const yesterdaysCarts = carts.filter(cart => cart.id % 2 !== 0); // Odd IDs → Yesterday
  const productsToday = totalProductsSold(todaysCarts);
  const productsYesterday = totalProductsSold(yesterdaysCarts);
  document.getElementById('productsSoldToday').textContent = productsToday;
  document.getElementById('soldpercentChange').textContent = `${calculatePercentChange(productsToday, productsYesterday)} from yesterday`;
}
updateProductsSold();

//row 1 column 2
const x = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
new Chart("myChart", {
  type: "line",
  data: {
    labels: x,
    datasets: [{
      data: [310,290,250,190,194,220,250,280,200,180,160,110],
      borderColor: "purple",
      label: "Loyal Customer",
      fill: false,
      pointStyle: 'circle'
    },{
      data: [280,250,190,160,194,250,300,310,330,220,170,130],
      borderColor: "red",
      label: "New Customer",
      fill: false
    },{
      data: [330,410,420,380,315,276,280,290,330,180,210,220],
      borderColor: "green",
      label: "Unique Customer",
      fill: false
    }]
  },
  options: {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'rectRounded', 
          padding: 20,
          font: {
            size: 10,
            family: 'Arial',
            weight: 'bold'
          },
        }
      }
    },
    scales: {
      x: {
        grid: {display: false}
      },
      y: {
        ticks: {
          stepSize: 100 
        },
        beginAtZero: true 
      }
    }
  },
});

//row 2 column 1
async function fetchProducts() {
  const res = await fetch("https://dummyjson.com/products?limit=100");
  const data = await res.json();
  return data.products;
}
function simulateMonthlyRevenue(products) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const monthlyRevenue = {};
  months.forEach(month => monthlyRevenue[month] = 0);
  products.forEach(product => {
    const month = months[Math.floor(Math.random() * months.length)];
    const sold = Math.floor(product.stock * 0.3); // Assume 30% stock sold
    const revenue = product.price * sold;
    monthlyRevenue[month] += revenue;
  });
  return {
    months,
    revenues: months.map(m => monthlyRevenue[m].toFixed(2))
  };
}
async function renderRevenueChart() {
  const products = await fetchProducts();
  const { months, revenues } = simulateMonthlyRevenue(products);
  new Chart(document.getElementById("myChart1"), {
    type: "bar",
    data: {
      labels: months,
      datasets: [{
        label: "Total Revenue ($)",
        data: revenues,
        backgroundColor: "#42a5f5"
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
renderRevenueChart();

//row 2 column 2
async function fetchProductData() {
  const response = await fetch('https://dummyjson.com/products?limit=100');
  const data = await response.json();
  return data.products;
}
function generateFakeMonthlyRatings(products) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const monthlyRatings = {};
  //Initialize
  months.forEach(month => monthlyRatings[month] = []);
  //Randomly assign each product rating to a month
  products.forEach(product => {
    const randomMonth = months[Math.floor(Math.random() * months.length)];
    monthlyRatings[randomMonth].push(product.rating);
  });
  //Calculate average per month
  const avgRatings = months.map(month => {
    const ratings = monthlyRatings[month];
    const avg = ratings.length > 0 ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length : 0;
    return avg.toFixed(2);
  });
  return { months, avgRatings };
}
async function renderChart() {
  const products = await fetchProductData();
  const { months, avgRatings } = generateFakeMonthlyRatings(products);
  const ctx = document.getElementById('myChart2').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: 'Customer Satisfaction (Rating)',
        data: avgRatings,
        borderColor: 'green',
        backgroundColor: 'rgba(0, 200, 83, 0.2)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 5
        }
      }
    }
  });
}
renderChart();

//row 2 column 3
const xValues1 = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July"];
new Chart("myChart3", {
  type: "bar",
  data: {
    labels: xValues1,
    datasets: [{
      label: "Reality Sales",
      data: [1600, 1700, 1700, 1900, 2000, 2700, 4000],
      backgroundColor: "#00C896", // green
      borderRadius: 5,
    },{
      label: "Target Sales",
      data: [300, 700, 2000, 5000, 6000, 4000, 2000],
      backgroundColor: "#FFD233", // yellow
      borderRadius: 5,
    }]
  },
  options: {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'rectRounded', // Rounded box
          padding: 20,
          font: {
            size: 12,
            family: 'Arial',
            weight: 'bold'
          },
          color: '#444'
        }
      }
    },
    scales: {
      x: {
        ticks: {display: true},
        grid: {display: false}
      },
      y: {
        beginAtZero: true,
        ticks: {display: false},
        grid: {display: false}
      }
    }
  }
});
//row 3 column 1
fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(data => {
const products = data.products;
//Get top 4 products by rating
const topProducts = products.sort((a, b) => b.rating - a.rating).slice(0, 4);
//Extract labels and values
const labels = topProducts.map(p => p.title);
const values = topProducts.map(p => p.rating * 10); // rating (0–5) to 0–50%
//Chart context
const ctx = document.getElementById('myChart4').getContext('2d');
//Create Chart
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Popularity',
      data: values,
      backgroundColor: [
        'blue',
        'green',
        'purple',
        'orange'
      ],
      borderRadius: 5,
      barThickness: 30
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        min: 0,
        max: 50,
        ticks: {
          callback: value => `${value}%`
        },
        title: {
          display: true,
          text: 'Rating (%)'
        }
      },
      y: {
        ticks: {
          autoSkip: false
        }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
      callbacks: {
        label: ctx => `${ctx.parsed.x.toFixed(1)}%`
      }
    }}}
  });
}).catch(error => {
  console.error("Failed to fetch product data:", error);
});
//row3 column 2
fetch('https://unpkg.com/world-atlas/countries-50m.json')
.then(res => res.json())
.then(topology => {
const countries = ChartGeo.topojson.feature(topology, topology.objects.countries).features;
const countrySales = {
  "United States of America": 100,
  "Brazil": 90,
  "China": 85,
  "Indonesia": 80,
  "Saudi Arabia": 70,
  "Nigeria": 60
};
const colorMap = {
  100: "#FFA500",  // Orange
  90: "#FF4D6D",   // Red
  85: "#7A5FFF",   // Purple
  80: "#00C49F",   // Teal
  70: "#00B894",   // Green
  60: "#0088FE"    // Blue
};
const data = countries.map(c => {
  const value = countrySales[c.properties.name] || 0;
  return {
    feature: c,
    value
  };
});
new Chart(document.getElementById("worldMapChart").getContext("2d"), {
  type: 'choropleth',
  data: {
    labels: countries.map(d => d.properties.name),
    datasets: [{
      label: 'Sales Mapping',
      data,
      backgroundColor: ctx => {
        const value = ctx.dataset.data[ctx.dataIndex]?.value;
        return colorMap[value] || "#e5e7eb"; // Gray for all others
      },
      borderColor: "#ffffff",
      borderWidth: 0.5
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false } // Disable tooltip for clean look
    },
    scales: {
      xy: {
        projection: 'equalEarth'
      }
    }
  }
});
});

//row 3 column 3
const x6 = [100,600,500,750,940,300];
new Chart("myChart6", {
  type: "bar",
  data: {
    labels: x6,
    datasets: [{
      label: "Volume",
      data: [1600, 1700, 1700, 1900, 2000, 2700, 4000],
      backgroundColor: "lightgreen",
      borderRadius: 5,
      stack: 'sales', // enable stacking
    },{
        label: "Service",
        data: [300, 700, 2000, 5000, 6000, 4000, 2000],
        backgroundColor: "lightblue", // yellow
        borderRadius: 5,
        stack: 'sales', // same stack group
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 10,
            family: 'Arial',
            weight: 'bold'
          },
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.formattedValue}`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {display: true},
        grid: {display: false}
      },
      y: {
        beginAtZero: true,
        ticks: {display: false},
        grid: {display: false}
      }
    }
  }
});
//sign in
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3NTgxMTY2MzUsImV4cCI6MTc2MDcwODYzNX0.RB_xtybEsoR_8W572ElEFTbPQX7yexv0hIsSayKTpjU"
localStorage.setItem("accessToken", accessToken);
  
const token = localStorage.getItem('accessToken');

window.onload = function () {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    alert("No token found. Please log in.");
    window.location.href = "work.html";
    return;
  }
  fetch('https://dummyjson.com/auth/me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(res => {
    if (!res.ok) throw new Error("Unauthorized");
    return res.json();
  }).then(data => {
    document.getElementById('user-image').src = data.image;
    document.getElementById('user-fullname').textContent = `${data.firstName} ${data.lastName}`;
    document.getElementById('user-username').textContent = data.username;
    document.getElementById('user-gender').textContent = data.gender;
    document.getElementById('user-age').textContent = data.age;
  }).catch(err => {
    alert("Session expired. Please log in again.");
    localStorage.removeItem("accessToken");
    window.location.href = "work.html";
  });
};
