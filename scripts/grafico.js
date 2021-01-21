var dataPoints = [];
baseStats = [78, 84, 78, 109, 85, 100];

var chart = new CanvasJS.Chart("chartContainer", {
  animationEnabled: true,
  theme: "light2",
  title: {
    text: "Typhlosion base stats",
  },
  axisY: {
    includeZero: true,
  },
  data: [
    {
      type: "column",
      dataPoints: dataPoints,
    },
  ],
});

function addData(data) {
  for (var i = 0; i < data.length; i++) {
    dataPoints.push({
      y: baseStats[i],
      label: labels[i],
    });
  }
  chart.render();
}

$.getJSON(
  "https://canvasjs.com/data/gallery/javascript/daily-sales-data.json",
  addData
);

var labels = [
  "Hp",
  "Attack",
  "Defense",
  "Special Attack",
  "Special Defense",
  "Speed",
];
