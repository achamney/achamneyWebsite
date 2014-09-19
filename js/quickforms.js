///
/// Turn this variable to false if just running UI
var queryServer = true;
/// Turn this variable to false if just running UI
///

function getFieldSelection(appName, factName) {
    $.ajaxSetup({ cache: false });
    var updateid = getParameterByName('id');
    if(updateid != null)
    {
        var hiddenId = $('<input type=hidden id=updateid name=updateid value='+updateid+' />')
        $('form').append(hiddenId);
        fillDomsWithRowId(appName,factName,updateid);
    }
    // Find all children within the form that have the "select" tag
    var len = $('form').children('select').length;
    var count = 0;
    $('form').children('select').each(function(){
         var thisDom = $(this);
         var domId = thisDom.attr("id");
         // Asynchronously get the fields from the controller 
         var get_callback=$.get('/quickforms/getFieldSelection', // Controller url
            {app:appName,factTable:factName,field:domId,updateid:updateid}, // controller parameters
            function(data){
                if(data != ""){
                    // replace the current select dom elements with the JSON supplied from the controller
                    convertJSONtoSelect(thisDom,data);
                    count += 1;
                    if(count == len)
                    {
                        $.getScript('js/jquery.mobile-1.1.1.min.js');  /// add the jquery mobile api after inserting 
                        /// required or else css will not be applied to the select tags.
                    }
                }
              });
          get_callback.fail(function() 
		  { 
			count += 1;
			if(count == len){
				$.getScript('js/jquery.mobile-1.1.1.min.js');	
			}
		  });
      }); 
      
    var myDate = new Date();
    var prettyDate =(myDate.getMonth()+1) + '/' + myDate.getDate() + '/' +
    myDate.getFullYear();
    $( ".date" ).val(prettyDate);
    $( ".date" ).datepicker();
    $(".birthdate").datepicker({ yearRange: '-105:+1',changeYear: true });
};
function convertJSONtoSelect(thisDom, data)
{
    if(isJSONString(data)){
		thisDom.children().remove();
        var json = JSON.parse(data);
        for(i=0;i<json.length;i++)
        {
            thisDom.append($('<option value='+json[i].id+' '+json[i].selected+'>'+json[i].label+'</option>'));
        }
    }
    else
    {
        alertJSONError(data);
    }
}
function getResultSet(appName, queryLab, prms, callback) {
    $.ajaxSetup({ cache: false });
	$.ajax({
	  type: 'GET',
          dataType: "text",
	  url: '/quickforms/getResultSet',
	  data: {app:appName,queryLabel: queryLab, params : prms},
	  success: function(data,status,xhr){
			// return the json data back to the form specific controller
			callback(data);
	  },
	  error: function(xhr, status, e){callback('Error: '+e);}
	});
}
function executeQuery(appName, queryLab, prms, callback) {
     $.ajaxSetup({ cache: false });
	$.ajax({
	  type: 'GET',
          dataType: "text",
	  url: '/quickforms/executeQuery',
	  data: {app:appName,queryLabel: queryLab, params : prms},
	  success: function(data,status,xhr){
			// return the json data back to the form specific controller
			callback(data);
	  },
	  error: function(xhr, status, e){callback('Error: '+e);}
	});
}
function loadTableData(appName,factName, queryName, parameterList)
{
    getResultSet(appName,queryName,parameterList,
        function(data){
            if(isJSONString(data))
            {
                var json = JSON.parse(data); 
                var liProto = $('#mainData li');
                for(i=0;i<json.length-1;i++)
                {
                    var liNew = liProto.clone();
                    liNew.appendTo('#mainData');
                }

                for(i=0;i<json.length;i++)
                {   
                   // var thisLi = $('#mainData li').eq(i);
                   var updateLink = $('#mainData li:eq('+i+') a');
                   var liHandle = $('#mainData li:eq('+i+')');
                   var leafHandle = $('#mainData li:eq('+i+') td:not(:has(*))');
                   var updateHref=updateLink.attr('href')+'?id='+json[i]['id'];
                   
                   updateLink.attr('href',updateHref); // add the id to the update link
                   updateLink.children('table').attr('onclick',"window.location='"+updateHref+"'"); 
                   // Must make the table have an on click because IE sucks
                   
                   liHandle.attr('id',json[i]['id']); // add the data id to the li row
                   liHandle.append('<input type=hidden value='+json[i]['id']+'>');
                   
                   leafHandle.each(function(){ // find each leaf node and replace it with data
                           if($(this).attr('id')!= null)
                           {
                                $(this).html('');
                                $(this).append(json[i][$(this).attr('id')]);
                           }
                    });
                }
            }
            else
            {
                alertJSONError(data);
            }
             $.getScript('js/jquery.mobile-1.1.1.min.js');  /// add the jquery mobile api after loading lookups 
                        /// required or else css will not be applied to the <li>s
        }
    );
    if(getParameterByName("insertedRow")=="true")
    {
        window.setTimeout(function(){highlightMostRecent()},500);
    }
}
function highlightMostRecent()
{
        //var liProto = $('#mainData li:eq(0)');
        var updatedId = getParameterByName('id');
        $('#mainData li#'+updatedId).effect("highlight", {}, 2000);
}
function putFact (appName, factName, location)
{
    //// append the information about the app and the fact table to the form
    $('<input />').attr('type', 'hidden')
            .attr('name', 'app')
            .attr('value', appName)
            .appendTo('form');
    $('<input />').attr('type', 'hidden')
            .attr('name', 'factTable')
            .attr('value', factName)
            .appendTo('form');
            
	$.ajax({
	  type: 'POST',
	  url: '/quickforms/putFact',
	  data: $('form').serialize(),
	  success: function(data,status,xhr){
			var json;
			if(isJSONString(data))
			{
				json = JSON.parse(data);
				window.location.href = location +'?insertedRow=true&id='+json[0]['id'];
			}
			else
			{
				window.alert("Row not saved : "+data);
			}
	  },
	  error: function(xhr, status, e){
			if(queryServer)
			{
				window.alert("Row not saved, could not connect to server: "+e);
			}
			else
			{
				window.location.href = location;
			}
	  }
	});
	return false;
}
function putFile (callback)
{
    //// append the information about the app and the fact table to the form
	var fileData = new FormData();
	var myFile = null;
	$($('#files')[0].files).each(function(i,file){
		fileData.append('file'+i, file);
		myFile = file;
	});
	
	$.ajax({
    url: '/quickforms/putFile',
    data: fileData,
    cache: false,
    contentType:false,
    processData: false,
    type: 'POST',
	success: function(data,status,xhr){
		callback(myFile.name);
	},
	error: function(xhr, status, e){
		if(queryServer)
		{
			window.alert("Row not saved, could not connect to server: "+e);
		}
		else
		{
			window.location.href = location;
		}
	}
	});
	return false;
}

function loadReportInTable(appName,factName, queryName, parameterList)
{
    getResultSet(appName,queryName,parameterList,
        function(data){
            if(isJSONString(data))
            {
                var json = JSON.parse(data); 
                var liProto = $('#'+queryName+' table tbody tr');
                for(i=0;i<json.length-1;i++)
                {
                    var liNew = liProto.clone();
                    liNew.appendTo('#'+queryName+' table tbody');
                }

                for(i=0;i<json.length;i++)
                {   
                   var leafHandle = $('#'+queryName+' table tbody tr:eq('+i+') td:not(:has(*))');

                   leafHandle.each(function(){ // find each leaf node and replace it with data
                           if($(this).attr('id')!= null)
                           {
                                $(this).html('');
                                $(this).append(json[i][$(this).attr('id')]);
                           }
                    });
                }
            }
            else
            {
                alertJSONError(data);
            }
            // $.getScript('js/jquery.mobile-1.1.1.min.js');  /// add the jquery mobile api after loading lookups 
                        /// required or else css will not be applied to the <li>s
        }
    );
}
function fillDomsWithRowId(appName,factName,updateid)
{
    getResultSet(appName, factName+'_get_row', 'updateid='+updateid, function(data){
        if(isJSONString(data)){
            var json = JSON.parse(data);
            $('form').children('input').each(function(){
                 var thisDom = $(this);
                 thisDom.attr('value',json[0][thisDom.attr('id')]);
            });
        }
        else
        {
            alertJSONError(data);
        }
    });
}
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
function isJSONString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
function alertJSONError(data)
{
    if(queryServer == true)
    {
        alert("Not JSON : "+data);
    }
}