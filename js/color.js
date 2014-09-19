define(['dom/navControl'],function(){
	var rand = Math.random();
	if(rand<0.45) // Brown
	{
		$('body').attr('style',"background-color:#473436");
		$('.headText').attr('style',"background-color:#b3989b");
	}
	else if(rand < 0.70) // Light blue
	{
		$('body').attr('style',"background-color:#063a5b");
		$('.headText').attr('style',"background-color:#52b6f4");
	}
	else if(rand < 0.95) // dark blue
	{
		$('body').attr('style',"background-color:#0F1B31");
		$('.headText').attr('style',"background-color:#4874c7");
	}
	else
	{
		$('body').attr('style',"background-color:#389d01");
		$('.headText').attr('style',"background-color:#0dd357");
	}
});