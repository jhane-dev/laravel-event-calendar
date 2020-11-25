<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    protected $table='tbl_calendar';
    public $incrementing = true;
    protected $fillable = [
          'event_name','start_date','end_date','days',
    ];

    public static function calendar(){
      		return Calendar::all();
      }

      

}
