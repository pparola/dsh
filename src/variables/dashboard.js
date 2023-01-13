
var Chartist = require("chartist");

// ##############################
// // // variables used to create animation on charts
// #############################
var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;

const datainit={
	"VentasResumen": [
		{
			"Ano": 0,
			"Mes":0,
			"CantidadRegistros": 0,
			"SumaCapital":0,
			"SumaComision": 0,
			"SumaImporteCuotas": 0,
			"PromedioCapital": 0,
			"PromedioCantidadCuotas": 0,
			"Interes": 0,
			"Coeficiente": 0
		},
		{
			"Ano": 0,
			"Mes":0,
			"CantidadRegistros": 0,
			"SumaCapital":0,
			"SumaComision": 0,
			"SumaImporteCuotas": 0,
			"PromedioCapital": 0,
			"PromedioCantidadCuotas": 0,
			"Interes": 0,
			"Coeficiente": 0
		}
	],
	"VentasResumenTipo": [],
	"CobranzasResumen": [
		{
			"Ano": 0,
			"Mes": 0,
			"CantidadRegistros": 0,
			"SumaImporte": 0,
			"SumaRecargo": 0,
			"SumaCuotasAdelantadas": 0,
			"SumaAnticipos": 0
		},
		{
			"Ano": 0,
			"Mes": 0,
			"CantidadRegistros": 0,
			"SumaImporte": 0,
			"SumaRecargo": 0,
			"SumaCuotasAdelantadas": 0,
			"SumaAnticipos": 0
		}
	],
	"RefinanciacionesResumen": [
		{
			"Ano": 0,
			"Mes": 0,
			"CantidadRegistros": 0,
			"SumaCapital": 0,
			"SumaImporteCuotas": 0,
			"PromedioCapital": 0
		},
		{
			"Ano": 0,
			"Mes": 0,
			"CantidadRegistros": 0,
			"SumaCapital": 0,
			"SumaImporteCuotas": 0,
			"PromedioCapital": 0
		}
	],
	"VentaCapitalTop20Efectivo": [],
	"VentaCapitalTop20DirigidoArray": [],
	"VentaCantidadTop20EfectivoArray": [],
	"VentaCantidadTop20DirigidoArray": [],
	"VentaCantidadCapitalTotal": [
		{
			"Cartera": "D",
			"SumaCantidad": 0,
			"SumaCapital": 0
		},
		{
			"Cartera": "E",
			"SumaCantidad": 0,
			"SumaCapital": 0
		}
	]
};

const top20EfectivoChart = {
	data: {
	  labels: ["A", "B"],
	  series: [[12, 38], [23, 12 ]]
	},
	options: {
	  lineSmooth: Chartist.Interpolation.cardinal({
		tension: 0
	  }),
	  low: 0,
	  high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
	  chartPadding: {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	  }
	},
	// for animation
	animation: {
	  draw: function(data) {
		if (data.type === "line" || data.type === "area") {
		  data.element.animate({
			d: {
			  begin: 600,
			  dur: 700,
			  from: data.path
				.clone()
				.scale(1, 0)
				.translate(0, data.chartRect.height())
				.stringify(),
			  to: data.path.clone().stringify(),
			  easing: Chartist.Svg.Easing.easeOutQuint
			}
		  });
		} else if (data.type === "point") {
		  data.element.animate({
			opacity: {
			  begin: (data.index + 1) * delays,
			  dur: durations,
			  from: 0,
			  to: 1,
			  easing: "ease"
			}
		  });
		}
	  }
	}
  };
  

export {
	datainit,
	top20EfectivoChart
}