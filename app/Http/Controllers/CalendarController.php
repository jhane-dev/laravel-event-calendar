<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Calendar;

class CalendarController extends Controller
{

	public function getALL(Request $request){
        $data=Calendar::calendar();
    	return $data;
        
       } 

    public function addNew(Request $request){

          $event_name = $request->get('eventname');
	      $from = $request->get('startdate');
	      $to = $request->get('enddate');
	      $days = $request->get('days');
	      $calendar = new Calendar; 
	      $calendar->fill(['event_name'=>$event_name,'start_date'=> $from,'end_date'=>$to, 'days'=>$days]);
	       $calendar->save();
	       return $calendar;
       }  

}
