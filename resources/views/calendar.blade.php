<!DOCTYPE html>
<html lang="en">
   <head>
      <title>Calendar</title>
      <meta charset="utf-8">
      <meta name="csrf-token" content="{{ csrf_token() }}">
      <link rel="stylesheet" href="{{ ('css/bootstrap.min.css') }}">
      <link rel="stylesheet" href="{{ ('css/main.css') }}">
      <link rel="stylesheet" href="{{ ('css/pnotify.custom.min.css') }}">
      <script src="{!!URL('js/jquery.min.js')!!}" type='text/javascript'></script>
      <script src="{!!URL('js/bootstrap.min.js')!!}" type='text/javascript'></script>
      <script src="{!!URL('js/calendar.js')!!}" type='text/javascript'></script>
      <script src="{!!URL('js/moment.min.js')!!}" type='text/javascript'></script>
      <script src="{!!URL('js/main.min.js')!!}" type='text/javascript'></script>
      <script src="{!!URL('js/pnotify.custom.min.js')!!}" type='text/javascript'></script>
   </head>
   <body>
      <div class="container-fluid">
         <div class="row">
            <div class = "col col-sm-4">
               <h4>Calendar</h4>
               <div class="row">
                  <div class="col col-sm-12">
                     <label>Event:</label>
                     <input type="text" class="form-control" id="event">
                  </div>
               </div>
               <br>
               <div class="row">
                  <div class="col col-sm-6">
                     <label>From:</label>
                     <input type="date" data-date-format="YYYY-MM-DD" class="form-control" id="startdate">
                  </div>
                  <div class="col col-sm-6">
                     <label>To:</label>
                     <input type="date" data-date-format="YYYY-MM-DD" class="form-control" id="enddate"  >
                  </div>
               </div>
               <br>
               <div class="row">
                  <div class="col-sm-12">
                     <label>Days:</label>
                     <br/>
                     <label class="checkbox-inline">
                     <input type="checkbox" name="days" value="1">Mon
                     </label>
                     <label class="checkbox-inline">
                     <input type="checkbox" name="days" value="2">Tue
                     </label>
                     <label class="checkbox-inline">
                     <input type="checkbox" name="days" value="3">Wed
                     </label>
                     <label class="checkbox-inline">
                     <input type="checkbox" name="days" value="4">Thu
                     </label>
                     <label class="checkbox-inline">
                     <input type="checkbox" name="days" value="5">Fri
                     </label>
                     <label class="checkbox-inline">
                     <input type="checkbox" name="days" value="6">Sat
                     </label>
                     <label class="checkbox-inline">
                     <input type="checkbox" name="days" value="7">Sun
                     </label>
                  </div>
               </div>
               <br/>
               <div class="row">
                  <div class="col-sm-8">
                     <button class="btn btn-save btn-md btn-primary">Save</button>
                  </div>
               </div>
            </div>
            <div class = "col col-sm-8">
               <br>
               <div class="response"></div>
               <div id='calendar'></div>
            </div>
         </div>
      </div>
   </body>
</html>