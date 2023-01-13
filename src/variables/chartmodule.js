const chartOption= {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 0
    },
    hover: {
        animationDuration: 0
    },
    responsiveAnimationDuration: 0
};

const chartColors=[
  {
    up: '#90caf9',
		down: '#42a5f5',
  },
  {
    up: '#ef9a9a',
		down: '#f44336',
  },
  {
    up: '#4db6ac',
		down: '#009688',
  },
  {
    up: '#ffb74d',
		down: '#ff9800',
  },
  {
    up: '#a1887f',
		down: '#795548',
  },
  {
    up: '#ba68c8',
		down: '#9c27b0',
  },
];


export {
    chartOption,
    chartColors
}