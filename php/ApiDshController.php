<?php
namespace api\controllers;

use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
use Respect\Validation\Validator as V;
use Illuminate\Database\Capsule\Manager as DB;
use Carbon\Carbon;

class ApiDshController extends Controller {

   public function getDshResumen(ServerRequestInterface $request, ResponseInterface $response){

        $year  = $request->getParam('year');
        $month = $request->getParam('month');
            
		$dt = Carbon::now();
		$co = Carbon::now();
		$day = $dt->day;
		
		$dt->setDate($year,$month,1);
		
        $startOfMonth = $dt->format('Y-m-d');;
		$endOfMonth = $dt->endOfMonth()->format('Y-m-d');
		if ( $endOfMonth < $co->format('Y-m-d'))
		{
			$day = $dt->endOfMonth()->day;
		}else {
			$day = $dt->day;
		}
		set_time_limit(300);
        try 
		{   
			
	        $dataJson = array();
            $ventaResumenArray=array();
			$ventaResumenTipoArray=array();
			$cobranzaResumenArray=array();
			$refinanciacionResumenArray=array();
			
			
			$ssql = "CALL sp_dsh_getVentaResumen($year,$month, $day)";		
            $data = DB::select($ssql);
            foreach ($data as $key => $value) {
				$ventaResumenArray[$key]['Ano'] = $value->Ano;				
				$ventaResumenArray[$key]['Mes'] = $value->Mes;	
				$ventaResumenArray[$key]['CantidadRegistros'] = $value->CantidadRegistros;	
				$ventaResumenArray[$key]['SumaCapital'] = $value->SumaCapital;
				$ventaResumenArray[$key]['SumaComision'] = $value->SumaComision;
				$ventaResumenArray[$key]['SumaImporteCuotas'] = $value->SumaImporteCuotas;
				$ventaResumenArray[$key]['PromedioCapital'] = $value->PromedioCapital;
				$ventaResumenArray[$key]['PromedioCantidadCuotas'] = $value->PromedioCantidadCuotas;
				$ventaResumenArray[$key]['Interes'] = $value->SumaImporteCuotas - $value->SumaCapital;
				$ventaResumenArray[$key]['Coeficiente'] = $value->SumaImporteCuotas / $value->SumaCapital;
			}
			
			$ssql = "CALL sp_dsh_getVentaResumenTipo('$startOfMonth','$endOfMonth')";		
            $data = DB::select($ssql);
			foreach ($data as $key => $value) {
				$ventaResumenTipoArray[$key]['Ano'] = $value->Ano;				
				$ventaResumenTipoArray[$key]['Mes'] = $value->Mes;	
				$ventaResumenTipoArray[$key]['CantidadRegistros'] = $value->CantidadRegistros;	
				$ventaResumenTipoArray[$key]['SumaCapital'] = $value->SumaCapital;
				$ventaResumenTipoArray[$key]['SumaInteres'] = $value->SumaInteres;
			}
			
			$ssql = "CALL sp_dsh_getCobranzaResumen($year,$month, $day)";		
            $data = DB::select($ssql);
			foreach ($data as $key => $value) {
				$cobranzaResumenArray[$key]['Ano'] = $value->Ano;				
				$cobranzaResumenArray[$key]['Mes'] = $value->Mes;	
				$cobranzaResumenArray[$key]['CantidadRegistros'] = $value->CantidadRegistros;	
				$cobranzaResumenArray[$key]['SumaImporte'] = $value->SumaImporte;
				$cobranzaResumenArray[$key]['SumaRecargo'] = $value->SumaRecargo;
				$cobranzaResumenArray[$key]['SumaCuotasAdelantadas'] = $value->SumaCuotasAdelantadas;
				$cobranzaResumenArray[$key]['SumaAnticipos'] = $value->SumaAnticipos;
				$cobranzaResumenArray[$key]['Total'] =$value->SumaImporte+ $value->SumaRecargo+ $value->SumaAnticipos +$value->SumaCuotasAdelantadas;
			}
			
			
			$ssql = "CALL sp_dsh_getRefinanciacionesResumen($year,$month, $day)";		
            $data = DB::select($ssql);
			foreach ($data as $key => $value) {
				$refinanciacionResumenArray[$key]['Ano'] = $value->Ano;				
				$refinanciacionResumenArray[$key]['Mes'] = $value->Mes;	
				$refinanciacionResumenArray[$key]['CantidadRegistros'] = $value->CantidadRegistros;	
				$refinanciacionResumenArray[$key]['SumaCapital'] = $value->SumaCapital;
				$refinanciacionResumenArray[$key]['SumaImporteCuotas'] = $value->SumaImporteCuotas;
				$refinanciacionResumenArray[$key]['PromedioCapital'] = $value->PromedioCapital;
				
			}
			
			
			$dataJson = [
				'VentasResumen' => $ventaResumenArray,
				'VentasResumenTipo' => $ventaResumenTipoArray,
				'CobranzasResumen'=> $cobranzaResumenArray,
				'RefinanciacionesResumen'=> $refinanciacionResumenArray
			
			];
			
			//var_dump($dataJson); exit;
				
			return $this->response->withJson($dataJson, 200, JSON_PARTIAL_OUTPUT_ON_ERROR);
            //return $this->response->withJson($dataArray, 200, JSON_PARTIAL_OUTPUT_ON_ERROR);
        } catch(\PDOException $e) {
            echo "La excepción se creó en la línea: " . $e->getMessage();
        }

    }  

 public function getDshResumenTotales(ServerRequestInterface $request, ResponseInterface $response){

        $year  = $request->getParam('year');
        $month = $request->getParam('month');
            
		$dt1 = Carbon::now();
		$dt2 = Carbon::now();
		$dt1->setDate($year-2,1,1);
		$dt2->setDate($year,$month,1);
		
        $startOfMonth = $dt1->format('Y-m-d');;
		$endOfMonth = $dt2->endOfMonth()->format('Y-m-d');
		set_time_limit(200);
        try 
		{   
			
	        $dataJson = array();
           
			$ventaComparativaAnual=array();
			$cobranzaComparativaAnual=array();
			
			$ssql = "CALL sp_dsh_getVentaAcumulada('$startOfMonth','$endOfMonth')";		// año actual y cuantos años hacia atras
			
			
            $data = DB::select($ssql);
			foreach ($data as $key => $value) {
				$ventaComparativaAnual[$key]['Ano'] = $value->Ano;				
				$ventaComparativaAnual[$key]['Mes'] = $value->Mes;	
				$ventaComparativaAnual[$key]['CantidadRegistros'] = $value->CantidadRegistros;	
				$ventaComparativaAnual[$key]['SumaCapital'] = $value->SumaCapital;
				$ventaComparativaAnual[$key]['SumaComision'] = $value->SumaComision;
				$ventaComparativaAnual[$key]['SumaImporteCuotas'] = $value->SumaImporteCuotas;
				$ventaComparativaAnual[$key]['PromedioCapital'] = $value->PromedioCapital;
				$ventaComparativaAnual[$key]['PromedioCantidadCuotas'] = $value->PromedioCantidadCuotas;
				$ventaComparativaAnual[$key]['Interes'] = $value->SumaImporteCuotas - $value->SumaCapital;
				$ventaComparativaAnual[$key]['Coeficiente'] = $value->SumaImporteCuotas / $value->SumaCapital;
				
			}
			
			$ssql = "CALL sp_dsh_getCobranzaAcumulada('$startOfMonth','$endOfMonth')";		// año actual y cuantos años hacia atras
			
			
            $data = DB::select($ssql);
			foreach ($data as $key => $value) {
				$cobranzaComparativaAnual[$key]['Ano'] = $value->Ano;				
				$cobranzaComparativaAnual[$key]['Mes'] = $value->Mes;	
				$cobranzaComparativaAnual[$key]['CantidadRegistros'] = $value->CantidadRegistros;	
				$cobranzaComparativaAnual[$key]['SumaImporte'] = $value->SumaImporte;
				$cobranzaComparativaAnual[$key]['SumaRecargo'] = $value->SumaRecargo;
				$cobranzaComparativaAnual[$key]['SumaCuotasAdelantadas'] = $value->SumaCuotasAdelantadas;
				$cobranzaComparativaAnual[$key]['SumaAnticipos'] = $value->SumaAnticipos;
				$cobranzaComparativaAnual[$key]['Total'] = $value->SumaAnticipos +$value->SumaRecargo + $value->SumaCuotasAdelantadas + $value->SumaAnticipos;
				
			}
			$dataJson = [
				'VentaComparativaAnual'=>$ventaComparativaAnual,
				'CobranzaComparativaAnual'=>$cobranzaComparativaAnual,
			];
			
			//var_dump($dataJson); exit;
				
			return $this->response->withJson($dataJson, 200, JSON_PARTIAL_OUTPUT_ON_ERROR);
            //return $this->response->withJson($dataArray, 200, JSON_PARTIAL_OUTPUT_ON_ERROR);
        } catch(\PDOException $e) {
            echo "La excepción se creó en la línea: " . $e->getMessage();
        }

    }    	
	
public function getDshVentaOperacionesPorDia(ServerRequestInterface $request, ResponseInterface $response){

        $year  = $request->getParam('year');
        $month = $request->getParam('month');
        $cartera=  $request->getParam('cartera'); 
		$ssql='';
		$filtrocartera='D,E';
		 if($request->getParam('cartera') == 'D' || $request->getParam('cartera') == 'E'){
			
			$filtrocartera=$request->getParam('cartera');
		
		 }
		  $ssql = "CALL sp_dsh_getVentaOperacionesPorDia($year,$month,'$filtrocartera')";
		  
		
		
        try 
		{   
			
	        $dataJson = array();
            $ventaPorDia=array();
			
			
					
            $data = DB::select($ssql);
            foreach ($data as $key => $value) {
				$ventaPorDia[$key]['Comercio'] = $value->Comercio;				
				$ventaPorDia[$key]['Nombre'] = $value->Nombre;	
				$ventaPorDia[$key]['Dia'] = $value->Dia;	
				$ventaPorDia[$key]['Cantidad'] = $value->Cantidad;
				$ventaPorDia[$key]['Capital'] = $value->Capital;
				$ventaPorDia[$key]['Interes'] = $value->Interes;
				$ventaPorDia[$key]['Total'] = $value->Total;
			}
			
			return $this->response->withJson($ventaPorDia, 200, JSON_PARTIAL_OUTPUT_ON_ERROR);
            //return $this->response->withJson($dataArray, 200, JSON_PARTIAL_OUTPUT_ON_ERROR);
        } catch(\PDOException $e) {
            echo "La excepción se creó en la línea: " . $e->getMessage();
        }

    }  


	public function getDshVentaOperacionesPorMes(ServerRequestInterface $request, ResponseInterface $response){

        $year  = $request->getParam('year');
        $cartera=  $request->getParam('cartera'); 
		$ssql='';
		$filtrocartera='D,E';
		 if($request->getParam('cartera') == 'D' || $request->getParam('cartera') == 'E'){
			
			$filtrocartera=$request->getParam('cartera');
		
		 }
		  $ssql = "CALL sp_dsh_getVentaOperacionesPorMes($year,'$filtrocartera')";
		  
		 
		
        try 
		{   
			
	        $dataJson = array();
            $venta=array();
			
			
					
            $data = DB::select($ssql);
            foreach ($data as $key => $value) {
				$venta[$key]['Comercio'] = $value->Comercio;				
				$venta[$key]['Nombre'] = $value->Nombre;	
				$venta[$key]['Mes'] = $value->Mes;	
				$venta[$key]['Cantidad'] = $value->Cantidad;
				$venta[$key]['Capital'] = $value->Capital;
				$venta[$key]['Interes'] = $value->Interes;
				$venta[$key]['Total'] = $value->Total;
			}
			
			return $this->response->withJson($venta, 200, JSON_PARTIAL_OUTPUT_ON_ERROR);
            //return $this->response->withJson($dataArray, 200, JSON_PARTIAL_OUTPUT_ON_ERROR);
        } catch(\PDOException $e) {
            echo "La excepción se creó en la línea: " . $e->getMessage();
        }

    }    	
	
	 public function getVentaDiaViewVertical($request, $response){
		$year  = $request->getParam('year');
		$month  = $request->getParam('month');
		
		$dt=Carbon::create($year, $month, 1);
        $startOfMonth =$dt->format('Y-m-d');
        $endOfMonth = $dt->endOfMonth()->format('Y-m-d');

        $ssql = "SELECT co.codigo AS COMERCIO, co.nombre AS NOMBRE, DATE_FORMAT(c.fecha, '%d/%m/%Y') AS FECHA,
        COUNT(IF(p.ADEVEN = 'A' AND p.TIPO <> 'F' AND c.PLAN <> 'R99',1,NULL)) AS CANTIDADADELANTADO,
        SUM(IF(p.ADEVEN = 'A' AND p.TIPO <> 'F' AND c.PLAN <> 'R99',c.capital,0)) AS CAPITALADELANTADO,
        SUM(IF(p.ADEVEN = 'A' AND p.TIPO <> 'F' AND c.PLAN <> 'R99', ((p.cancuo * c.impcuot) - c.capital) ,0)) AS INTERESADELANTADO,
        COUNT(IF(p.ADEVEN = 'V' AND p.TIPO <> 'F',1,NULL)) AS CANTIDADVENCIDO,
        SUM(IF(p.ADEVEN = 'V' AND p.TIPO <> 'F',c.capital,0)) AS CAPITALVENCIDO,
        SUM(IF(p.ADEVEN = 'V' AND p.TIPO <> 'F', ((p.cancuo * c.impcuot) - c.capital) ,0)) AS INTERESVENCIDO,
        COUNT(IF(p.TIPO = 'F',1,NULL)) AS CANTIDADREFINANCIADO,
        SUM(IF(p.TIPO = 'F',c.capital,0)) AS CAPITALREFINANCIADO,
        SUM(IF(p.TIPO = 'F', ((p.cancuo * c.impcuot) - c.capital) ,0)) AS INTERESREFINANCIADO,
        COUNT(*) AS CANTIDAD,
        SUM(c.capital) AS CAPITAL,
        SUM((p.cancuo * c.impcuot) - c.capital) AS INTERES
        FROM creditos AS c
        INNER JOIN planes AS p ON c.plan = p.codigo
        INNER JOIN comercio AS co ON c.comercio = co.codigo
        WHERE c.fecha <> '1900-01-01' AND p.TIPO <> 'F' AND c.PLAN <> 'R99' -- SE AGREGA R99
        AND c.fecha >= '$startOfMonth' AND c.fecha <= '$endOfMonth'
        AND c.prestam NOT IN (SELECT cb.prestam FROM crebaja cb)
        GROUP BY c.fecha, co.codigo
        ORDER BY c.fecha, co.codigo";

        // echo $ssql;
        // exit();

        try{
            $data = DB::select($ssql);

            if(!$data){
                $data = array("status" => 0, "mensaje" => "sin resultados");
            }

            return $this->response->withJson($data, 200, JSON_PARTIAL_OUTPUT_ON_ERROR);
        } catch(\PDOException $e) {
            echo "La excepción se creó en la línea: " . $e->getLine();
        }  

    }
	
	 public function getVentaPorCantidadCuotas($request, $response) {

        $year  = $request->getParam('ano');
        $month = $request->getParam('mes');

        $comercio = !empty($request->getParam('comercio')) ? $request->getParam('comercio') : "NULL" ;

        $dateString = "$year-$month-01";
        $lastDateOfMonth = date("t", strtotime($dateString));
        
        $dt = Carbon::create($year, $month, $lastDateOfMonth);
        $startOfMonth = $dt->startOfMonth();
        
        $dt = Carbon::create($year, $month, $lastDateOfMonth);
        $endOfMonth = $dt->endOfMonth();

        if(!empty($request->getParam('cartera') && $request->getParam('cartera') != 'T')) {   

            $cartera = $request->getParam('cartera');
            
            $ssql = "CALL sp_getVentaPorCantidadCuotas('$startOfMonth','$endOfMonth', '$cartera', $comercio)";
        } else { 
            $ssql = "CALL sp_getVentaPorCantidadCuotas('$startOfMonth','$endOfMonth', NULL, $comercio)";
        }

        try {

            $data = DB::select($ssql);
            $dataArray = array();

            // var_dump($data) ; 
            // exit();

            if(!$data) {

                $dataArray = array("status" => 0, "mensaje" => "sin resultados");

            } else {

                $TOTAL = (int)0;
                $TOTALVENCIDO = (int)0;
                $TOTALADELENTADO = (int)0;

                // Totales
                foreach ($data as $value) {
                    $TOTAL = $TOTAL + $value->CAPITAL;
                    $TOTALVENCIDO = $TOTALVENCIDO + $value->CAPITALVENCIDO;
                    $TOTALADELENTADO = $TOTALADELENTADO + $value->CAPITALADELANTADO;
                }

                foreach ($data as $key => $value) {
                    $dataArray[$key]['CANCUO'] = $value->CANCUO;
                    $dataArray[$key]['CANTIDADADELANTADO'] = $value->CANTIDADADELANTADO;
                    $dataArray[$key]['CAPITALADELANTADO'] = $value->CAPITALADELANTADO;
                    if(isset($value->CAPITALADELANTADO) && $value->CAPITALADELANTADO != 0):
                    $dataArray[$key]['PORCENTUALADELANTADO'] = number_format((($value->CAPITALADELANTADO / $TOTALADELENTADO) * 100),2);
                    endif;
                    $dataArray[$key]['CANTIDADVENCIDO'] = $value->CANTIDADVENCIDO;
                    $dataArray[$key]['CAPITALVENCIDO'] = $value->CAPITALVENCIDO;
                    $dataArray[$key]['PORCENTUALVENCIDO'] = number_format((($value->CAPITALVENCIDO / $TOTALVENCIDO) * 100 ),2);
                    $dataArray[$key]['CANTIDAD'] = $value->CANTIDAD;
                    $dataArray[$key]['CAPITAL'] = $value->CAPITAL;
                    $dataArray[$key]['PORCENTUALCAPITAL'] = number_format((($value->CAPITAL / $TOTAL) * 100 ),2);
                }

            }

            return $this->response->withJson($dataArray, 200, JSON_PARTIAL_OUTPUT_ON_ERROR);

        } catch(\PDOException $e) {
            echo "La excepción se creó en la línea: " . $e->getLine(); 
        }

    }

	
	public function getDshTop20(ServerRequestInterface $request, ResponseInterface $response){

        $year  = $request->getParam('year');
        $month = $request->getParam('month');
    
        
		$dt = Carbon::now();
		$day =$dt->day; // Dia de hoy
		// si se solicita lo del dia
		
		$dt->setDate($year,$month,1);
		
        $startOfMonth = $dt->format('Y-m-d');;
        $endOfMonth = $dt->endOfMonth()->format('Y-m-d');
       

         

        try 
		{   
			
	        $dataJson = array();
        	$ventaCapitalTopEfectivoArray=array();
			$ventaCapitalTopDirigidoArray=array();
			$ventaCantidadTopEfectivoArray=array();
			$ventaCantidadTopDirigidoArray=array();
			$ventaCantidadCapitalTotal=array();
			$totalesCalculados=array("TotalesCalculados" =>0, "CantidadEfectivo"=>0 ,"CapitalEfectivo"=>0,"CantidadDirigido"=>0 ,"CapitalDirigido"=>0 );
			$tcapital=0; $tcantidad=0; $tImporteTotal=0;
			$indiceD=-1; $indiceE=-1;
			$ssql = "CALL sp_dsh_getVentaCantidadCapitalTotal('$startOfMonth','$endOfMonth')";	
            $data = DB::select($ssql);
			foreach ($data as $key => $value) {
				$ventaCantidadCapitalTotal[$key]['Cartera'] = $value->Cartera;				
				$ventaCantidadCapitalTotal[$key]['SumaCantidad'] = $value->SumaCantidad;
				$ventaCantidadCapitalTotal[$key]['SumaCapital'] = $value->SumaCapital;
				$ventaCantidadCapitalTotal[$key]['SumaImporteTotal'] = $value->SumaImporteTotal;
				$ventaCantidadCapitalTotal[$key]['SumaIntereses'] = $value->SumaImporteTotal - $value->SumaCapital;
				if ($value->Cartera=='E')
				{
					$indiceE=$key;
				}else if  ($value->Cartera=='D')
				{
					$indiceD=$key;
				}
				$tcantidad+= $value->SumaCantidad;
				$tcapital+= $value->SumaCapital;
				$tImporteTotal +=  $value->SumaImporteTotal;
			}
			$totalesCalculados["TotalesCalculados"]= array( "CantidadCapital"=> array ("SumaCantidad" => $tcantidad, "SumaCapital" => $tcapital, "SumaImporteTotal"=> $tImporteTotal) );
			
			$ssql = "CALL sp_dsh_getVentaCapitalTop20('$startOfMonth','$endOfMonth','E')";	
            $data = DB::select($ssql);
			$tcapital=0;
			foreach ($data as $key => $value) {
				$ventaCapitalTopEfectivoArray[$key]['Comercio'] = $value->Comercio;				
				$ventaCapitalTopEfectivoArray[$key]['Nombre'] = $value->Nombre;	
				$ventaCapitalTopEfectivoArray[$key]['Porcentaje'] = $value->SumaCapital*100 / $ventaCantidadCapitalTotal[$indiceE]['SumaCapital'];	
				$ventaCapitalTopEfectivoArray[$key]['SumaCapital'] = $value->SumaCapital;
				$tcapital+= $value->SumaCapital;
			}
			$totalesCalculados["CapitalEfectivo"]=$tcapital;
			
			$ssql = "CALL sp_dsh_getVentaCapitalTop20('$startOfMonth','$endOfMonth','D')";	
            $data = DB::select($ssql);
			$tcapital=0;
			foreach ($data as $key => $value) {
				$ventaCapitalTopDirigidoArray[$key]['Comercio'] = $value->Comercio;				
				$ventaCapitalTopDirigidoArray[$key]['Nombre'] = $value->Nombre;
				$ventaCapitalTopDirigidoArray[$key]['Porcentaje'] =  $value->SumaCapital*100 / $ventaCantidadCapitalTotal[$indiceD]['SumaCapital'];	
				$ventaCapitalTopDirigidoArray[$key]['SumaCapital'] = $value->SumaCapital;
				$tcapital+= $value->SumaCapital;
			}
			$totalesCalculados["CapitalDirigido"]=$tcapital;
			
			$ssql = "CALL sp_dsh_getVentaCantidadTop20('$startOfMonth','$endOfMonth','E')";	
            $data = DB::select($ssql);
			$tcantidad=0;
			
			foreach ($data as $key => $value) {
				$ventaCantidadTopEfectivoArray[$key]['Comercio'] = $value->Comercio;				
				$ventaCantidadTopEfectivoArray[$key]['Nombre'] = $value->Nombre;	
				$ventaCantidadTopEfectivoArray[$key]['SumaCantidad'] = $value->SumaCantidad;
				$ventaCantidadTopEfectivoArray[$key]['SumaCapital'] = $value->SumaCapital;
				$ventaCantidadTopEfectivoArray[$key]['Porcentaje'] = $value->SumaCantidad * 100 / $ventaCantidadCapitalTotal[$indiceE]['SumaCantidad'];	
				$tcantidad+=$value->SumaCantidad;
			}
			$totalesCalculados["CantidadEfectivo"]=$tcantidad;
			
			$ssql = "CALL sp_dsh_getVentaCantidadTop20('$startOfMonth','$endOfMonth','D')";	
            $data = DB::select($ssql);
			$tcantidad=0;
			foreach ($data as $key => $value) {
				$ventaCantidadTopDirigidoArray[$key]['Comercio'] = $value->Comercio;				
				$ventaCantidadTopDirigidoArray[$key]['Nombre'] = $value->Nombre;	
				$ventaCantidadTopDirigidoArray[$key]['SumaCantidad'] = $value->SumaCantidad;
				$ventaCantidadTopDirigidoArray[$key]['SumaCapital'] = $value->SumaCapital;
				$ventaCantidadTopDirigidoArray[$key]['Porcentaje'] = $value->SumaCantidad * 100 / $ventaCantidadCapitalTotal[$indiceD]['SumaCantidad'];	
				$tcantidad+=$value->SumaCantidad;
			}
			
			$totalesCalculados["CantidadDirigido"]=$tcantidad;
			
			$dataJson = [
				'VentaCapitalTopEfectivo'=>$ventaCapitalTopEfectivoArray,
				'VentaCapitalTopDirigido'=>$ventaCapitalTopDirigidoArray,
				'VentaCantidadTopEfectivo'=>$ventaCantidadTopEfectivoArray,
				'VentaCantidadTopDirigido'=>$ventaCantidadTopDirigidoArray,
				'VentaCantidadCapitalTotal'=>$ventaCantidadCapitalTotal,
				'Totales' => $totalesCalculados
			];
			
			//var_dump($dataJson); exit;
				
			return $this->response->withJson($dataJson, 200, JSON_PARTIAL_OUTPUT_ON_ERROR);
            //return $this->response->withJson($dataArray, 200, JSON_PARTIAL_OUTPUT_ON_ERROR);
        } catch(\PDOException $e) {
            echo "La excepción se creó en la línea: " . $e->getMessage();
        }

    }    
	

 public function getDshCobranzaOperacionesPorDia(ServerRequestInterface $request, ResponseInterface $response){

        $year  = $request->getParam('year');
        $month = $request->getParam('month');
        $cartera=  $request->getParam('cartera'); 
		$ssql='';
		$filtrocartera='D,E';
		 if($request->getParam('cartera') == 'D' || $request->getParam('cartera') == 'E'){
			
			$filtrocartera=$request->getParam('cartera');
		
		 }
	     $ssql = "CALL sp_dsh_getCobranzaOperacionesPorDia($year,$month,'$filtrocartera')";
		
        try 
		{   
			
	        $dataJson = array();
            $venta=array();
			
			
					
            $data = DB::select($ssql);
            foreach ($data as $key => $value) {
				$venta[$key]['Comercio'] = $value->Comercio;				
				$venta[$key]['Nombre'] = $value->Nombre;	
				$venta[$key]['Dia'] = $value->Dia;	
				$venta[$key]['Cantidad'] = $value->Cantidad;
				$venta[$key]['SumaImporte'] = $value->SumaImporte;
				$venta[$key]['SumaRecargo'] = $value->SumaRecargo;
				$venta[$key]['Total'] = ($value->SumaImporte +$value->SumaRecargo);
			}
			
			return $this->response->withJson($venta, 200, JSON_PARTIAL_OUTPUT_ON_ERROR);
            //return $this->response->withJson($dataArray, 200, JSON_PARTIAL_OUTPUT_ON_ERROR);
        } catch(\PDOException $e) {
            echo "La excepción se creó en la línea: " . $e->getMessage();
        }

    }   
	
		public function getDshCobranzaOperacionesPorMes(ServerRequestInterface $request, ResponseInterface $response){

        $year  = $request->getParam('year');
        $cartera=  $request->getParam('cartera'); 
		$ssql='';
		$filtrocartera='D,E';
		 if($request->getParam('cartera') == 'D' || $request->getParam('cartera') == 'E'){
			
			$filtrocartera=$request->getParam('cartera');
		
		 }
	     $ssql = "CALL sp_dsh_getCobranzaOperacionesPorMes($year,'$filtrocartera')";
				 
        try 
		{   
			
	        $dataJson = array();
            $venta=array();
			
			
					
            $data = DB::select($ssql);
            foreach ($data as $key => $value) {
				$venta[$key]['Comercio'] = $value->Comercio;				
				$venta[$key]['Nombre'] = $value->Nombre;	
				$venta[$key]['Mes'] = $value->Mes;	
				$venta[$key]['Cantidad'] = $value->Cantidad;
				$venta[$key]['SumaImporte'] = $value->SumaImporte;
				$venta[$key]['SumaRecargo'] = $value->SumaRecargo;
				$venta[$key]['Total'] = ($value->SumaImporte +$value->SumaRecargo);
			}
			
			return $this->response->withJson($venta, 200, JSON_PARTIAL_OUTPUT_ON_ERROR);
            //return $this->response->withJson($dataArray, 200, JSON_PARTIAL_OUTPUT_ON_ERROR);
        } catch(\PDOException $e) {
            echo "La excepción se creó en la línea: " . $e->getMessage();
        }

    }    	
	
	 public function getCobranzaByVencimiento(ServerRequestInterface $request, ResponseInterface $response) {

        $year  = $request->getParam('ano');
        $month = $request->getParam('mes');

        $comercio = !empty($request->getParam('comercio')) ? $request->getParam('comercio') : "NULL" ;

        $dateString = "$year-$month-01";
        $lastDateOfMonth = date("t", strtotime($dateString));
        
        $dt = Carbon::create($year, $month, $lastDateOfMonth);
        $startOfMonth = $dt->startOfMonth();
        
        $dt = Carbon::create($year, $month, $lastDateOfMonth);
        $endOfMonth = $dt->endOfMonth();

        // $startOfMonth = Carbon::now()->startOfMonth();
        // $endOfMonth = Carbon::now()->endOfMonth();

        $ssql = "CALL sp_getCobranzaByVencimiento('$startOfMonth','$endOfMonth')";

        // echo $ssql;
        // exit();

        try {        
            $data = DB::select($ssql);
            
            if(!$data) {
                $dataArray = array("status" => 0, "mensaje" => "sin resultados");
            }else{

                // var_dump($data);
                // exit();

                $i=0;
                foreach($data as $row) {
                    $dataArray[$i]['ANO'] = $row->ANO;
                    $dataArray[$i]['MES'] = $row->MES;
                    $dataArray[$i]['REGISTROS'] = (int)$row->REGISTROS;
                    $dataArray[$i]['REG_NOR'] = (int)$row->REG_NOR;
                    $dataArray[$i]['REG_REF'] = (int)$row->REG_REF;
                    $dataArray[$i]['IMPORTE'] = (float)$row->IMPORTE;
                    $dataArray[$i]['CAPITAL_NOR'] = (float)$row->CAPITAL_NOR;
                    $dataArray[$i]['CAPITAL_REF'] = (float)$row->CAPITAL_REF;
                    $dataArray[$i]['RECARGO'] = (float)$row->RECARGO;
                    $dataArray[$i]['RECARGO_NOR'] = (float)$row->RECARGO_NOR;  
                    $dataArray[$i]['RECARGO_REF'] = (float)$row->RECARGO_REF;
                    $dataArray[$i]['TOTAL'] = (float)$row->IMPORTE + $row->RECARGO;
                    $i++;
                }

            }

            return $this->response->withJson($dataArray, 200, JSON_PARTIAL_OUTPUT_ON_ERROR);

        } catch(\PDOException $e) {

            echo "La excepción se creó en la línea: " . $e->getLine();
        }

    }
	
	 Public function getCobranzaDiaViewVertical($request, $response) {

        $year  = $request->getParam('year');
		$month  = $request->getParam('month');
		
		$dt=Carbon::create($year, $month, 1);
        $startOfMonth =$dt->format('Y-m-d');
        $endOfMonth = $dt->endOfMonth()->format('Y-m-d');;

        $ssql = "SELECT
        r.COMERCIO,
        co.NOMBRE,
        DATE_FORMAT(r.fecha, '%d/%m/%Y') AS FECHA,
        COUNT(*) AS REGISTROS,
        SUM(r.importe) AS IMPORTE,
        SUM(r.recargo) AS RECARGO
        FROM recibos AS r
        LEFT JOIN comercio AS co ON r.comercio = co.codigo
        WHERE r.fecha <> '1900-01-01'
        AND r.fecha >= '$startOfMonth' AND r.fecha <= '$endOfMonth'
        AND r.COMERCIO <> ''
        AND r.codigo NOT IN (SELECT rb.CODIGO FROM recbaja AS rb WHERE rb.CODIGO = r.CODIGO AND rb.PRESTAM = r.PRESTAM AND rb.CUOTA = r.CUOTA)
        AND r.prestam  NOT IN (SELECT cb.PRESTAM FROM crebaja cb) -- AGREGO LINEA
        AND EXISTS (SELECT * FROM creditos AS cds WHERE r.prestam = cds.prestam)  -- AGREGO LINEA
        GROUP BY r.fecha, r.comercio, co.nombre
        ORDER BY r.comercio, r.fecha";

        

        try {
            $dataRecibos = DB::select($ssql);

            $i=0;
            if($dataRecibos) {
                foreach($dataRecibos as $rowRecibo) {
                    $data[$i]['COMERCIO'] = $rowRecibo->COMERCIO;
                    $data[$i]['NOMBRE'] = $rowRecibo->NOMBRE;
                    $data[$i]['FECHA'] = $rowRecibo->FECHA;
                    $data[$i]['REGISTROS'] = $rowRecibo->REGISTROS;
                    $data[$i]['IMPORTE'] = $rowRecibo->IMPORTE;
                    $data[$i]['RECARGO'] = $rowRecibo->RECARGO;
                    $data[$i]['TOTAL'] = $rowRecibo->IMPORTE + $rowRecibo->RECARGO;
                    $i++;
                }
            }

            return $this->response->withJson($data, 200, JSON_PARTIAL_OUTPUT_ON_ERROR);
        } catch(\PDOException $e) {
            echo "La excepción se creó en la línea: " . $e->getLine();        
        }

    }


   
    public function proyeccion(ServerRequestInterface $request, ResponseInterface $response) 
    {
        // $data = $request->getParsedBody();
		
		$dth  = Carbon::now('America/Argentina/Buenos_Aires');
		$dtd = Carbon::now('America/Argentina/Buenos_Aires');
		$dtd->setDate($dth->year,$dth->month,1);
		
		$dmad = Carbon::now('America/Argentina/Buenos_Aires');
		
		$dmad->setDate($dth->year,$dtd->month-1,1);
		
		$dyad = Carbon::now('America/Argentina/Buenos_Aires');
		$dyad->setDate($dth->year-1,$dtd->month,1);
		
		
        $mesActualDesde =$dtd->format('Y-m-d');
        $mesActualHasta = $dth->format('Y-m-d');
		
		$mesAnteriorDesde =$dmad->format('Y-m-d');
        $mesAnteriorHasta = $dmad->endOfMonth()->format('Y-m-d');
        
		$mismoMesAnoAnteriorDesde =$dyad->format('Y-m-d');
        $mismoMesAnoAnteriorHasta = $dyad->endOfMonth()->format('Y-m-d');
		       
      
       
		
        $mes = $dth->month; // Año en curso

        // $dia = cal_days_in_month(CAL_GREGORIAN, $mes, 2020); // Ultimo dia del mes
        // $dia_cantidad_mes = $dia;

        $importe = (int)0;
        $cantidad = (int)0;

        switch ($mes) :
            case  1: $lastDay = 31; $businessDay = 26;
            case  2: $lastDay =  28; $businessDay = 23;
            case  3: $lastDay =  31; $businessDay = 24;
            case  4: $lastDay =  30; $businessDay = 24;
            case  5: $lastDay =  31; $businessDay = 25;
            case  6: $lastDay =  30; $businessDay = 24;
            case  7: $lastDay =  31; $businessDay = 24;
            case  8: $lastDay =  31; $businessDay = 24;
            case  9: $lastDay =  30; $businessDay = 24;
            case 10: $lastDay =  31; $businessDay = 25;
            case 11: $lastDay =  30; $businessDay = 24;
            case 12: $lastDay =  31; $businessDay = 24;
        endswitch; 


		 //sp_dsh_getProyeccion('2020-03-01','2020-03-31','2020-02-01','2020-02-28', '2019-03-01', '2019-03-31') 
		$ssql = "CALL sp_dsh_getProyeccion('$mesActualDesde', '$mesActualHasta', '$mesAnteriorDesde', '$mesAnteriorHasta', '$mismoMesAnoAnteriorDesde', '$mismoMesAnoAnteriorHasta')";	
		//echo $ssql;
		//return;
		$registros = DB::select($ssql);	
		    $i=0;
		
		$lg=count($registros);
		
		$data=['MesAnterior'=> array(), 'MismoMesAnoAnterior'=> array(), 'MesActual'=> array()];
		
        if($lg>0) {
			while ($i<$lg)
			{
				//Corte por tipo
				$keyTipo=$registros[$i]->Tipo;
				$j=0;
				$importe=0;
				while ($i<$lg && $keyTipo==$registros[$i]->Tipo )
				{
						$value=$registros[$i];
						if(date('D',strtotime($value->FECHA)) != 'Sun') {
							$cantidad++;
						}

						$importe += $value->IMPORTE;

						if ($cantidad != 0) {
						   $estimado = (($importe / $cantidad) * $businessDay);
						}else{
							$estimado = (($importe) * $businessDay); ;
						}

						array_push($data[$keyTipo],[
							'FECHA' => $value->FECHA,
							'VENTA_ACTUAL' => $importe,
							'VENTA_ESTIMADA' => $estimado,
							'DIA_CANTIDAD' => $cantidad,
							'DIA_COMERCIAL_ULTMO' => $businessDay,
							'DIA_COMERCIALES_DEL_MES' => $lastDay
						]);
					$j++; $i++;
				}
			}
		}
        
        return $this->response->withJson($data, 200, JSON_PARTIAL_OUTPUT_ON_ERROR);

    }
	
	
	 public function getDshAvisoDePago(ServerRequestInterface $request, ResponseInterface $response){

		$fechadesde = $request->getParam('fechadesde');
		$fechahasta=$request->getParam('fechahasta');
		$comerciodesde=$request->getParam('comerciodesde');
		$comerciohasta=$request->getParam('comerciohasta');
		
        try 
		{   
			
	        			
			$ssql = "CALL sp_dsh_getAvisosDePagos('$fechadesde', '$fechahasta', '$comerciodesde', '$comerciohasta')";	
			$registros = DB::select($ssql);	
		    $i=0;
		
		  $lg=count($registros);
            if($lg>0) {
					$data = array();
					$Totales=array();
					$AvisosDePagos=array();
					$Pendientes=array();
					$EnProceso=array();
					$TotalPorSemana=[ 'AvisosDePago'=>array(), 'PendientesDeAprobacion'=>array(),  'PendientesDeProceso'=>array()  ];
					$tOrdPago=0;
					$tPlan=0;
					$tgCantidad=0;
					$tgCapital=0;
					$tgRetenidas=0;
					$tgComision=0;
					$tgIvaCom=0;
					$tgAnticipo=0;
					$tgTotal=0;
					while ($i<$lg)
					{
						//Corte por tipo
						$keyTipo=$registros[$i]->Tipo;
						$tComercio=0;
						$tOrdPago=0;
						$tPlan=0;
						$tCantidad=0;
						$tCapital=0;
						$tRetenidas=0;
						$tComision=0;
						$tIvaCom=0;
						$tAnticipo=0;
						$tTotal=0;
						$dta=array();
						while ($i<$lg && $keyTipo==$registros[$i]->Tipo )
						{
							// Corte por Tipo+Comercio
							$keyComercio=$registros[$i]->Comercio;
							$keyComercioNombre=$registros[$i]->ComercioNombre;
							$tcOrdPago=0;
							$tcPlan=0;
							$tcCantidad=0;
							$tcCapital=0;
							$tcRetenidas=0;
							$tcComision=0;
							$tcIvaCom=0;
							$tcAnticipo=0;
							$tcTotal=0;
							$idc=$registros[$i]->Tipo . $registros[$i]->Comercio;
							while ($i<$lg && $keyTipo==$registros[$i]->Tipo  && $keyComercio==$registros[$i]->Comercio)
							{
								//Corte Tipo+Comercio+OrdPago
								$keyOrdPago=$registros[$i]->Ordpago;
								$keyFecPago=$registros[$i]->Fecpago;
								$tcoPlan=0;
								$tcoCantidad=0;
								$tcoCapital=0;
								$tcoRetenidas=0;
								$tcoComision=0;
								$tcoIvaCom=0;
								$tcoAnticipo=0;
								$tcoTotal=0;
								$idco=$registros[$i]->Tipo . $registros[$i]->Comercio . $registros[$i]->Ordpago;
								while ($i<$lg && $keyTipo==$registros[$i]->Tipo  && $keyComercio==$registros[$i]->Comercio && $keyOrdPago==$registros[$i]->Ordpago)
								{
									$r=$registros[$i];
									$t=($r->Capital - $r->Comision - $r->Retenidas);
									array_push($dta, [ 
														'Id'=>$idco . $i, 
														'Comercio'=>'',
														'ComercioNombre'=>'', 
														'Ordpago'=>'', 
														'Fecpago'=>'',
														'Plan'=>$r->Plan,
														'Cantidad'=>$r->Cantidad,	// cantidad de creditos por plan													
														'Capital'=>$r->Capital,
														'Retenidas'=>$r->Retenidas,
														'Comision'=>$r->Comision,
														'Total'=>$t,
														'ParentId'=>$idco
													]
											   );
									
									// Acumula por semana / dia
									$dt = Carbon::parse($r->Fecpago);

									//$key=($dt->weekOfYear *10 + $dt->dayOfWeek);
									
									if ( !array_key_exists($r->Fecpago, $TotalPorSemana[$r->Tipo]) )
									{
										$TotalPorSemana[$r->Tipo][$r->Fecpago]=0;
									}
									
									$TotalPorSemana[$r->Tipo][$r->Fecpago]+= $t;
									
									$tcoCantidad+=$r->Cantidad;
									$tcoPlan++;
									$tcoCapital+=$r->Capital;
									$tcoRetenidas+=$r->Retenidas;
									$tcoComision+=$r->Comision;
									$tcoIvaCom+=$r->Ivacom;
									$tcoAnticipo+=$r->Anticipo;
									$tcoTotal+=$r->Capital  - $r->Retenidas - $r->Comision - $r->Ivacom - - $r->Anticipo;
									$i++;
								}
								 array_push($dta, [ 
													'Id'=>$idco , 
													'Comercio'=>'',
													'ComercioNombre'=>'', 
													'Ordpago'=>$keyOrdPago, 
													'Fecpago'=>$keyFecPago,
													'Plan'=>$tcoPlan, 
													'Cantidad'=>$tcoCantidad,														
													'Capital'=>$tcoCapital,
													'Retenidas'=>$tcoRetenidas,
													'Comision'=>$tcoComision,
													'IvaCom'=>$tcoIvaCom,
													'Anticipo'=>$tcoAnticipo,
													'Total'=>$tcoTotal,
													'ParentId'=>$idc
												]
											   );
								$tcOrdPago++;
								$tcPlan+= $tcoPlan;
								$tcCantidad+=$tcoCantidad;
								$tcCapital+=$tcoCapital;
								$tcRetenidas+=$tcoRetenidas;
								$tcComision+=$tcoComision;
								$tcIvaCom+=$tcoIvaCom;
								$tcAnticipo+=$tcoAnticipo;
								$tcTotal+=$tcoTotal;
							}
							array_push($dta, [ 
											'Id'=>$idc , 
											'Comercio'=>$keyComercio,
											'ComercioNombre'=>$keyComercioNombre, 
											'Ordpago'=>$tcOrdPago, 
											'FecPago'=>'',
											'Plan'=>$tcPlan, 
											'Cantidad'=>$tcCantidad,														
											'Capital'=>$tcCapital,
											'Retenidas'=>$tcRetenidas,
											'Comision'=>$tcComision,
											'IvaCom'=>$tcIvaCom,
											'Anticipo'=>$tcAnticipo,
											'Total'=>$tcTotal
										]
								   );
							$tComercio++;
							$tOrdPago+=$tcOrdPago;
							$tPlan+=$tcPlan;
							$tCantidad+=$tcCantidad;
							$tCapital+=$tcCapital;
							$tRetenidas+=$tcRetenidas;
							$tComision+=$tcComision;
							$tIvaCom+=$tcIvaCom;
							$tAnticipo+=$tcAnticipo;
							$tTotal+=$tcTotal;
						}
						
						if ($keyTipo=='AvisosDePago')
						{
							$AvisosDePagos=$dta;
							array_push($Totales, [ 'Tipo'=>'Avisos de Pago', 
											'Comercio'=>$tComercio,
											'Ordpago'=>$tOrdPago,
											'Plan'=>$tPlan,
											'Cantidad'=>$tCantidad,														
											'Capital'=>$tCapital,
											'Retenidas'=>$tRetenidas,
											'Comision'=>$tComision,
											'IvaCom'=>$tIvaCom,
											'Anticipo'=>$tAnticipo,
											'Total'=>$tTotal
											]);
						}
						elseif ($keyTipo=='PendientesDeAprobacion')
						{
							$Pendientes=$dta;
							array_push($Totales, [ 'Tipo'=>'Pendientes de Aprobación', 
											'Comercio'=>$tComercio,
											'Ordpago'=>$tOrdPago,
											'Plan'=>$tPlan,
											'Cantidad'=>$tCantidad,														
											'Capital'=>$tCapital,
											'Retenidas'=>$tRetenidas,
											'Comision'=>$tComision,
											'IvaCom'=>$tIvaCom,
											'Anticipo'=>$tAnticipo,
											'Total'=>$tTotal
											]);
						}
						else 
						{
							$EnProceso=$dta;
							array_push($Totales, [ 'Tipo'=>'No Procesados', 
											'Comercio'=>$tComercio,
											'Ordpago'=>$tOrdPago,
											'Plan'=>$tPlan,
											'Cantidad'=>$tCantidad,														
											'Capital'=>$tCapital,
											'Retenidas'=>$tRetenidas,
											'Comision'=>$tComision,
											'IvaCom'=>$tIvaCom,
											'Anticipo'=>$tAnticipo,
											'Total'=>$tTotal
											]);
						}
						$tgCantidad+=$tCantidad;
						$tgCapital+=$tCapital;
						$tgRetenidas+=$tRetenidas;
						$tgComision+=$tComision;
						$tgIvaCom+=$tIvaCom;
						$tgAnticipo+=$tAnticipo;
						$tgTotal+=$tTotal;
						
					}
			}
			$data = [
				'TotalGeneral'=>[
								'Cantidad'=>$tgCantidad,														
								'Capital'=>$tgCapital,
								'Retenidas'=>$tgRetenidas,
								'Comision'=>$tgComision,
								'IvaCom'=>$tgIvaCom,
								'Anticipo'=>$tgAnticipo,
								'Total'=>$tgTotal
								],
				'TotalesPorEstado'=>$Totales,
				'TotalPorDia'=>$TotalPorSemana,
				'AvisosDePagos'=>$AvisosDePagos,
				'Pendientes'=>$Pendientes,
				'EnProceso'=>$EnProceso
			];
			return $this->response->withJson($data, 200, JSON_PARTIAL_OUTPUT_ON_ERROR);
            //return $this->response->withJson($dataArray, 200, JSON_PARTIAL_OUTPUT_ON_ERROR);
        } catch(\PDOException $e) {
            echo "La excepción se creó en la línea: " . $e->getMessage();
        }

    }  

}