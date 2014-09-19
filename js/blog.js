define(['server/getFactData','server/executeQuery','server/putFile'],function(){
	var curLoadAmount = 0;
	var loadInterval = 5;
	$(function(){
		$('#updateForm').hide();
		$('#uploading').hide();

		$('head').append('<link rel="shortcut icon" href="pics/ahicon.ico" />');
		getPosts(getPosts);
		
	});


	function getPosts(callback)
	{
		quickforms.getFactData({queryName:'getTableData',
								params:'start='+curLoadAmount+',end='+(loadInterval),
			callback:function(data)
			{
				if(isJSONString(data))
				{
					$('html').removeClass('ui-mobile-rendering');
					var json = JSON.parse(data);
					var mainData = $('#mainData');
					$(json).each(function(i,row)
					{
						var rowId = row.blogupdateskey;
						mainData.append('<table width = "100%"><tr><td><div>'+row.DateString+
						'</div></td><td align="right"><input type="button" class="edit" value="" onclick="startUpdate('+rowId+')"/>'+
						'<input type="button" value="x" onclick="deletePost('+rowId+')" /></td></tr></table>');
						mainData.append('<div id="'+rowId+'">'+row.MESSAGE+'</div><hr /><hr />');
						mainData.append('<input type="hidden" value="'+row.date+'" id="date'+rowId+'" />');
					});
					var width = $(window).width();
					if(width< 1000)
					{
						$('#welcomeText').html("");
						$('#welcomeText').css("width","30");
					}
					var rowId = getParameterByName('rowId');
					if(rowId>0)
					{
						var target = $('#'+rowId);
						var oldCol = target.css('background-color');
						target.css('background-color','yellow');
						window.setTimeout(function(){target.css('background-color',oldCol);},2000);
					}
					var id = getParameterByName('id');
					if(id>0)
					{
						$('#updateForm').show();
					}
					mainData.append("<hr/>");
				}
				else
				{
					callback()
					if(data.length>5)
					{
						//alert("Error : "+data);
					}
				}
			}
		});
	}
	window.deletePost = function(id)
	{
		if($('#username').val()=="achamney")
		{
			quickforms.executeQuery('blog','deleteRow','id='+id,
				function(data){
					alert(data);
					
					window.location="index.html";
				});
		}
	};
	window.startUpdate = function(id,message)
	{
		window.location="index.html?id="+id;
	};
	window.putBlogFact = function()
	{
		if($('#username').val()=="achamney")
		{	
			quickforms.putFact($('#submitButton')[0],'index.html')
		}
	};
	window.uploadImage = function()
	{
		$('#uploading').show();
		var form = $('#updateForm').attr("id"),
			formObj = quickforms['currentForm'+form],
			fileData = new FormData(),
			uploadObj;
		fileData.append('folder','/home/gui/Downloads/images/');
		for(var i in formObj.children)
		{
			var child = formObj.children[i];
			if(child.file)
			{
				uploadObj = child;
				fileData.append('file',child.file)
			}
		}
		fileData.append('app',quickforms.app);
		
		quickforms.putFile(fileData,function(file){
			if($('#pictureDiv').html()=='.')
				$('#pictureDiv').html('Drag and drop for URL');
			if(isPicture(file))
			{
				$('#pictureDiv').append("<img src = '/test/"+file+"' width='50' height='50'></img>");
				$('#message').val($('#message').val()+"<img src = '/test/"+file+"'></img>");
			}
			else
			{
			$('#pictureDiv').append("<a href = '/test/"+file+"'>"+file+"</a>");
				$('#message').val($('#message').val()+"<a href = '/test/"+file+"'>"+file+"</a>");
			}
			$('#uploading').hide();
		});
	};
	$(window).scroll(function () { 
	   if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
			curLoadAmount+= loadInterval;
			getPosts();
	   }
	});
	function isPicture(file)
	{
		if(file.endsWith('.png')||file.endsWith('.jpg')||file.endsWith('.jpeg')||file.endsWith('.gif')||file.endsWith('.bmp'))
			return true;
		return false;
	}
	String.prototype.endsWith = function(suffix) {
		return this.indexOf(suffix, this.length - suffix.length) !== -1;
	};
});
