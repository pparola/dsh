const _server = [];
const _modoapp = process.env.NODE_ENV;

_server["development"] = "http://localhost:88/api.business/v2/dsh/";
_server["production"] = "http://181.119.121.158/api.business/v2/dsh/";
//_server["development"] = "http://181.119.121.158/api.business/v2/dsh/";


const _apis = 
{
  uri: "../api.business/v2/dsh/",
  Dashboard: "resumen",
  AvisosDePagos:"aviso-de-pago",
  AvisosDePagosSemanal:"aviso-de-pago-semanal",
  Dashboardtotales: "resumen-totales",
  CobranzaOperacionesDiaria:  "cobranza-operaciones-por-dia",
  CobranzaOperacionesMensuales: "cobranza-operaciones-por-mes",
  CobranzasDiarias:  'cobranza-porcomercio-diario-vistaV',
  CobranzaPorVencimiento:'cobranza-vencimientos',
  DiarioVentaComercio:  'venta-porcomercio-diario-vistaV',
  VentaOperacionesDiarias:  'venta-operaciones-por-dia',
  VentaOperacionesMensuales: 'venta-operaciones-por-mes',
  VentaPorCuotas:  'venta-porcantidad-cuotas',
  RankingTop20: 'top-20',
  Proyeccion: 'proyeccion',
  ProyeccionCapital: 'proyeccion-capital'
};


const getUri = (key) => {
  let uri =  _server[_modoapp] + _apis[key];
  return uri;
}

module.exports = {
  _server,
  _modoapp,
  _apis,
  getUri
};
