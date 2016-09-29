$(document).ready(function(e) {
    $(".loading-mask").css('opacity','0.5');
	
	
    loadcontent('currency',10,1);
});
var baseConfig = {
        xAxis: {
            categories: [],
				labels: {
				   enabled: false
			   },
			   tickLength: 1,
			   
        },
		title: {
			   text: ''
			}, 
			 yAxis: {
            title: {
                text: ''
            },
			
        },      
        tooltip: {
            valuePrefix: '£',
			
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
		credits: {
      enabled: false
  }
    };
function loadcontent(type,pcount,pno){
	$.ajax({
        url:'http://www.dreamguys.co.in/display/crypto-currency/api/get_posts/?post_type='+type+'&count='+pcount+'&page='+pno,
        type:'POST',
        data:'',
		dataType:'json',
        success:function(data){ 
			$("#pcount").val(data.count_total);
			$("#pno").val(parseInt(pno)+1);
			var cont=art_cnt='';
			//if(parseInt(pno) == 1)
			//$(".news-container .grid").empty();
			for(var i=0;i<data.posts.length;i++){
				var url='';
				//console.log(data.posts[i].attachments[0]['url']);
				if(data.posts[i].attachments.length > 0)url=data.posts[i].attachments[0]['url'];
				var cur_rates = data.posts[i].cur_rates.split(",");
				cont +='<li class="list-item"><div class="w-row"><div class="w-col w-col-4 w-col-small-4 w-col-tiny-4 n-p-l mt-10"><div class="currency-img"><a href="#" data-cid="'+data.posts[i].id+'"><img class="img-circle" width="28" height="28" src="'+url+'" alt=""></a></div><p class="description-new"><a href="#" data-cid="'+data.posts[i].id+'">'+data.posts[i].title+'</a></p></div><div class="w-col w-col-4 w-col-small-4 w-col-tiny-4 mt-10"><p class="description-new">£ '+cur_rates[0]+'</p></div><div class="w-col w-col-4 w-col-small-4 w-col-tiny-4 n-p-r n-p-l"><div class="graph-img"><div class="container" style="width: 100px; height: 50px; margin: 0 auto; float:left;" data-val="'+data.posts[i].cur_rates+'"></div></div></div></div></li>';
				
				art_cnt += '<div class="w-row" id="currency_'+data.posts[i].id+'" style="display:none;"><div class="w-col w-col-12 "><div class="currency-top white-box text-center"><p class="currency-title"><span><img class="img-circle" width="28" height="28" src="'+url+'" alt=""></span> '+data.posts[i].title+'</p></div><div class="currency-desc white-box"><h2 class="title-new">Description</h2><p>'+data.posts[i].content+'</p></div><div class="currency-price white-box text-center"><span class="w-clearfix w-inline-block">1 '+data.posts[i].cur_code+' =</span> <span class="w-clearfix w-inline-block con-price">£ '+cur_rates[0]+'</span></div><div class="currency-graph "><div class="container" style="width: 94%; height: 200px; margin: 0 auto; float:left;" data-val="'+data.posts[i].cur_rates+'"></div></div></div></div>';
				
			}
			$(".loading-mask").css('opacity','0');
			$(".currency-list").append(cont);
			$(".currency-view").append(art_cnt);
			$(".currency-list").find(".container").each(function(index, element) {
				var rowval = $(this).attr('data-val').split(","); 
				var data2 = {
				series: [{
					name: 'Rate',
					data: rowval.map(Number),
					showInLegend: false, 
					enableMouseTracking: false
			  }]};
			  
				 $(this).highcharts(
				  $.extend(baseConfig, data2)
			  );
			});
			$(".currency-view").find(".container").each(function(index, element) {
				var rowval = $(this).attr('data-val').split(","); 
				var data2 = {
				series: [{
					name: 'Rate',
					data: rowval.map(Number),
					showInLegend: false, 
					enableMouseTracking: true
			  }]};
			  
				 $(this).highcharts(
				  $.extend(baseConfig, data2)
			  );
			});
			
			
			
        }
    });
}

$(window).scroll(function () {
	if($(".currency-list").css('display') != 'none'){
		if(parseInt($("#pcount").val()+10) >= (parseInt($("#pno").val())*10))
		{
			if ($(document).height() <= $(window).scrollTop() + $(window).height()) {
				$(".loading-mask").css('opacity','0.5');
				loadcontent('currency',10,$("#pno").val());
			}
		}
	}
 });
 
 $(document).on('click','a[data-cid]',function(){
	 //$(".loading-mask").css('opacity','0.5');
	 $(".currency-list").hide();
	 $(".news-container.item-new").show();
	 $(".news-container.item-new").children().hide();
	 $(".currency-view #currency_"+$(this).attr('data-cid')).show();
	 $(".w-nav.navbar a img").css('display','inline-block');
	// $(".loading-mask").css('opacity','0');
 });
 
 $(document).on('click','.w-nav.navbar a',function(){
	 if($(this).find('img').css('display') == "inline-block"){
	 $(this).find('img').css('display','none');
	 $(".w-nav.navbar, .news-container").show();
	 $(".currency-list").show();
	 $(".currency-view").children().hide();
	 }
 });