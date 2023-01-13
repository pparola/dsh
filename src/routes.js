import Dashboard from "@material-ui/icons/Dashboard";
import Event from "@material-ui/icons/Event";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import HomeIcon from '@material-ui/icons/Home';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
// Listados de Creditos
import HomePage from "views/Home/Home.js";
import DashboardPage from "views/Dashboard/Dashboard.js";
import VentasPorCuotas from "views/ListadosCreditos/VentasPorCuotas.js";
import DiarioVentaComercio from "views/ListadosCreditos/DiarioVentaComercio.js";
import VentaOperacionesDiarias from "views/ListadosCreditos/VentaOperacionesDiarias.js";
import VentaOperacionesMensuales from "views/ListadosCreditos/VentaOperacionesMensuales.js";
import RankingTop20 from "views/ListadosCreditos/RankingTop20.js";
import Proyeccion from "views/ListadosCreditos/Proyeccion.js";
import ProyeccionCapital from "views/ListadosCreditos/ProyeccionCapital.js";

//Listados de Cobranzas
import CobranzasDiarias from "views/ListadosCobranzas/CobranzasDiarias.js";
import CobranzaOperacionesDiarias from "views/ListadosCobranzas/CobranzaOperacionesDiarias.js";
import CobranzaOperacionesMensuales from "views/ListadosCobranzas/CobranzaOperacionesMensuales.js";
import CobranzaPorVencimiento from "views/ListadosCobranzas/CobranzaPorVencimiento.js";
import AvisosDePagos from "views/ListadosCobranzas/AvisosDePagos.js";
import AvisosDePagosSemanal from "views/ListadosCobranzas/AvisosDePagosSemanal.js";


const dashboardRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: HomeIcon,
    component: HomePage,
    open:false,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    open:false,
    layout: "/admin"
  },
  {
    path: "/home",
    name: "Cobranzas",
    icon: AccountBalanceIcon,
    layout: "/admin",
    open:false,
    items:[
     
      {
          path:"/cobranzasdiaria",
          name:"Diaria",
          icon: ArrowRightIcon,
          component: CobranzasDiarias,
          layout: "/admin"
      },
      {
        path:"/cobranzaoperacionesdiarias",
        name:"Operaciones Diarias",
        icon: ArrowRightIcon,
        component: CobranzaOperacionesDiarias,
        layout: "/admin"
      },
      {
        path:"/cobranzaoperacionesmensuales",
        name:"Operaciones Mensuales",
        icon: ArrowRightIcon,
        component: CobranzaOperacionesMensuales,
        layout: "/admin"
      },
      {
        path:"/cobranzaporvencimiento",
        name:"Por Vencimiento",
        icon: ArrowRightIcon,
        component: CobranzaPorVencimiento,
        layout: "/admin"
      }
    ],
  },
  {
    path: "/home",
    name: "Créditos",
    icon: MonetizationOnIcon,
    open:false,
    layout: "/admin",
    items:[
      {
        path: "/DiarioVentaComercio",
        name:"Venta Diaria",
        icon: ArrowRightIcon,
        component: DiarioVentaComercio,
        layout: "/admin"
      },
      {
        path: "/VentasPorCuotas",
        name:"Venta Por Cuotas",
        icon: ArrowRightIcon,
        component: VentasPorCuotas,
        layout: "/admin"
      },
      {
        path: "/VentasOperacionesDiarias",
        name:"Operaciones Diarias",
        icon: ArrowRightIcon,
        component: VentaOperacionesDiarias,
        layout: "/admin"
      },
      {
        path: "/VentasOperacionesMensuales",
        name:"Operaciones Mensuales",
        icon: ArrowRightIcon,
        component: VentaOperacionesMensuales,
        layout: "/admin"
      }
    ]
  },
  {
    path: "/home",
    name: "Estadísticas",
    icon: InsertChartIcon,
    open:false,
    layout: "/admin",
    items:[
      {
        path:"/avisosdepagos",
        name:"Avisos de Pagos General",
        icon: ArrowRightIcon,
        component:AvisosDePagos,
        layout: "/admin"
    },
      {
        path:"/avisosdepagossemanal",
        name:"Avisos de Pagos Semanal",
        icon: ArrowRightIcon,
        component:AvisosDePagosSemanal,
        layout: "/admin"
    },
      {
        path:"/proyeccion",
        name:"Proyección",
        icon: ArrowRightIcon,
        component: Proyeccion,
        layout: "/admin"
      },
      ,
      {
        path:"/proyeccioncapital",
        name:"Proyección Capital",
        icon: ArrowRightIcon,
        component: ProyeccionCapital,
        layout: "/admin"
      },
      {
        path:"/rankingtop20",
        name:"Ranking",
        icon: ArrowRightIcon,
        component: RankingTop20,
        layout: "/admin"
      }
    ]
  }
 ];

export default dashboardRoutes;
