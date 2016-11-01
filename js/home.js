$(document).ready(function(e) {
    $(".loading-mask").css('opacity','0.5');
	
	$.ajax({
        url:'http://cryptoinfo.co.uk/api/get_posts/?post_type=post&count=3&page=1&order=ASC',
        type:'POST',
        data:'',
		dataType:'json',
        success:function(data){ 
			$("#pcount").val(data.count_total);
			$("#pno").val(parseInt(pno)+1);
			var slideimg, art_cnt='';
			if(parseInt(pno) == 1)
			$(".news-container .grid").empty();
			for(var i=0;i<data.posts.length;i++){
				var url='';
				if(data.posts[i].attachments.length > 0)url=data.posts[i].attachments[0]['url'];
				
				slideimg +='<div class="w-slide" ><a class="w-inline-block link-blog-list" href="#" data-load="1" data-pid="'+data.posts[i].id+'"><div class="image-new"><img src="'+url+'" ></div><div class="hero-image-title"><h4>'+data.posts[i].title+'</h4></div> </a></div>';
				
				art_cnt += '<div id="article_'+data.posts[i].id+'" style="display:none;"><div class="navbar" style="width:100%;"><div class="wrapper-mask" data-ix="menu-mask" style="opacity: 0;"></div><div class="w-col w-col-tiny-2 n-p-l"><a class="w-inline-block navbar-button left menu-btn" href="#" data-loader="1"><div class="left-menu navbar-title"><img src="images/back.png" style="display: inline-block;" width="20" height="20"> </div></a></div><div class="w-col w-col-tiny-8 n-p-l"><div class="navbar-title">News</div></div></div><div class="text-new no-borders" style="padding-top:60px;padding-left:10px;padding-right:10px;"><div class="separator-fields"></div><div><img src="'+url+'" alt="" /></div><h2 class="title-new">'+data.posts[i].title+'</h2><div>'+data.posts[i].content+'</div>';
				
				now = new Date();
				if(data.posts[i].comments.length > 0){
					art_cnt += '<h3 class="title">Comments <span class="light-text">('+data.posts[i].comment_count+')</span></h3><div id="cmt_view"><ul class="list comment-list">';
					for(var j=0;j<data.posts[i].comments.length;j++){
						var theevent = new Date(data.posts[i].comments[j]['date']);
						var sec_num = (now - theevent) / 1000;
						var interval = Math.floor(sec_num / 31536000);
						var cmt_td;
						if (interval > 1) {
							cmt_td = interval + " years";
						}						
						interval = Math.floor(sec_num / 86400);
						if (interval > 1) {
							cmt_td = interval + " days";
						}
						interval = Math.floor(sec_num / 3600);
						if (interval > 1) {
							cmt_td = interval + " hours";
						}
						
						
					art_cnt += '<li class="list-item"><div class="comment-det">'+data.posts[i].comments[j]['content']+'<span class="light-text">'+cmt_td+'</span></div></li>';
					}
					art_cnt += '</ul></div></div>';
				}
				art_cnt += '</div></div>';
			}
			$(".w-slider-mask").append(slideimg);
			$(".news-container.item-new").append(art_cnt);
			Framework.require('ix').init([
			  {"slug":"slider"}
			]);
        }
    });
	
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
        url:'http://cryptoinfo.co.uk/api/get_posts/?post_type='+type+'&count='+pcount+'&page='+pno+'&order=ASC',
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
				var cur_rates = new Array;
				if(data.posts[i].cur_rates)
				var cur_rates = data.posts[i].cur_rates.split(",");
				cont +='<li class="list-item"><div class="w-row"><div class="w-col w-col-4 w-col-small-4 w-col-tiny-5 n-p-l mt-10"><div class="currency-img"><a href="#" data-cid="'+data.posts[i].id+'"><img class="img-circle" width="28" height="28" src="'+url+'" alt=""></a></div><p class="description-new"><a href="#" data-cid="'+data.posts[i].id+'">'+data.posts[i].title+'</a></p></div><div class="w-col w-col-4 w-col-small-4 w-col-tiny-3 mt-10 n-p-l n-p-r"><p class="description-new">£ '+cur_rates[0]+'</p></div><div class="w-col w-col-4 w-col-small-4 w-col-tiny-4 n-p-r n-p-l"><div class="graph-img"><div class="container" style="width: 100px; height: 50px; margin: 0 auto; float:left;" data-val="'+data.posts[i].cur_rates+'"></div></div></div></div></li>';
				
				art_cnt += '<div class="w-row" id="currency_'+data.posts[i].id+'" style="display:none;"><div class="w-col w-col-12 "><div class="currency-top white-box text-center"><p class="currency-title"><span><img class="img-circle" width="28" height="28" src="'+url+'" alt=""></span> '+data.posts[i].title+'</p></div><div class="currency-desc white-box"><h2 class="title-new">Description</h2><p>'+data.posts[i].content+'</p></div><div class="currency-price white-box text-center"><span class="w-clearfix w-inline-block">1 '+data.posts[i].cur_code+' =</span> <span class="w-clearfix w-inline-block con-price">£ '+cur_rates[0]+'</span></div><div class="currency-graph white-box" style="float: left; width: 100%;"><div class="container" style="width: 94%; height: 200px; margin: 0 auto; float:left;" data-val="'+data.posts[i].cur_rates+'"></div></div></div></div>';
				
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
	if($(".w-slider").css('display') != 'none'){
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
	 $("html, body").animate({ scrollTop: 0 }, 600);
	 $(".currency-list, .w-slider").hide();
	 $(".news-container.item-new").show();
	 $(".news-container.item-new").children().hide();
	 $(".currency-view #currency_"+$(this).attr('data-cid')).show();
	 $(".w-nav.navbar a img").css('display','inline-block');
	// $(".loading-mask").css('opacity','0');
 });
 
 $(document).on('click','a[data-pid]',function(){
	 $(".currency-list, .w-slider").hide();
	 $(".body").hide();
	 $(".news-container.item-new #article_"+$(this).attr('data-pid')).show();
	 $(".w-nav.navbar a img").css('display','inline-block');
 });
 
 $(document).on('click','.w-nav.navbar a',function(){
	 if($(this).find('img').css('display') == "inline-block"){
	 $(this).find('img').css('display','none');
	 $(".w-nav.navbar, .news-container").show();
	 $(".currency-list, .w-slider").show();
	 $(".currency-view").children().hide();
	 }
 });
 
$(document).on('click','.news-container.item-new a.navbar-button',function(){
	$("html, body").animate({ scrollTop: 0 }, 600);
	$(".w-nav.navbar a img").css('display','none');
	$(".news-container.item-new").children().hide();
	 $(".w-nav.navbar, .news-container").show();
	 $(".currency-list, .w-slider").show();
	 $(".body").show();
 });
