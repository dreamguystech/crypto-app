$(document).ready(function(e) {
    $(".loading-mask").css('opacity','0.5');
	
	$.ajax({
        url:'http://www.dreamguys.co.in/display/crypto-currency/api/get_posts/?post_type=currency&count=10&page=1',
        type:'POST',
        data:'',
		dataType:'json',
        success:function(data){ 
			$("#pcount").val(data.count_total);
			$("#pno").val(parseInt(pno)+1);
			var currency='';
			if(parseInt(pno) == 1)
			$(".news-container .grid").empty();
			for(var i=0;i<data.posts.length;i++){
				var url='';
				if(data.posts[i].attachments.length > 0)url=data.posts[i].attachments[0]['url'];
				var cur_rates = data.posts[i].cur_rates.split(",");
				if(data.posts[i].attachments.length > 0)url=data.posts[i].attachments[0]['url'];
				currency +='<li class="news-item"><a href="currency.html" class="news-link"><span><img src="'+url+'" width="28"></span> '+data.posts[i].title+' 1= £ '+cur_rates[0]+'</a><i class="icon fa fa-adjust"></i></li>';
			}
			$("#news-list").append(currency);
			$("#news-list").endlessRiver({
				buttons: true
			});
        }
    });
	
    loadcontent('post',10,1);
});

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
			if(parseInt(pno) == 1)
			$(".news-container .grid").empty();
			for(var i=0;i<data.posts.length;i++){
				var url=cmts='';
				//console.log(data.posts[i].attachments[0]['url']);
				if(data.posts[i].attachments.length > 0)url=data.posts[i].attachments[0]['url'];
				cont +='<div class="grid-item"><div class="card"><div class="card-image"><a href="#" data-bid="'+data.posts[i].id+'"><img src="'+url+'" alt="" /></a></div><div class="card-content"><h5><a href="#" data-bid="'+data.posts[i].id+'"><strong>'+data.posts[i].title+'</strong></a></h5></div><div class="card-feedback"><div class="card-users"></div><div class="comment-count"><i class="ion-chatbubble-working"></i> <span>'+data.posts[i].comment_count+'</span></div></div></div></div>';
				
				art_cnt += '<div id="article_'+data.posts[i].id+'" style="display:none;"><div class="navbar" style="width:100%;"><div class="wrapper-mask" data-ix="menu-mask" style="opacity: 0;"></div><a class="w-inline-block navbar-button" href="#" data-load="1"><div class="navbar-button-icon icon ion-ios-close-empty"></div></a><a class="w-inline-block navbar-button right menu-btn" href="currency.html" data-loader="1"><div class="right-menu"><span>Currency</span></div></a></div><div class="text-new no-borders" style="padding-top:60px;"><div class="separator-fields"></div><div><img src="'+url+'" alt="" /></div><h2 class="title-new">'+data.posts[i].title+'</h2></div><div class="separator-fields"></div><p class="description-new">'+data.posts[i].content+'</p>';
				
				/*art_cnt += '<div class="w-clearfix"><div class="w-widget w-widget-facebook social-block"><iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Ffacebook.com%2Fsensationhemes&amp;layout=button_count&amp;locale=en_US&amp;action=like&amp;show_faces=false&amp;share=false" scrolling="no" frameborder="0" allowtransparency="true" style="border: none; overflow: hidden; width: 92px; height: 20px;"></iframe></div><div class="w-widget w-widget-twitter social-block"><iframe src="https://platform.twitter.com/widgets/tweet_button.html#url=http%3A%2F%2Fsensationthemes.com&amp;counturl=sensationthemes.com&amp;text=Check%20out%20this%20site&amp;count=horizontal&amp;size=m&amp;dnt=true" scrolling="no" frameborder="0" allowtransparency="true" style="border: none; overflow: hidden; width: 110px; height: 20px;"></iframe></div></div>';*/
				
				
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
				art_cnt += '</div>';
			}
			
			$(".news-container .grid").append(cont);
			$(".news-container.item-new").append(art_cnt);
			
			var msnry = new Masonry( '.grid', {
			  itemSelector: '.grid-item',
			  isAnimated: true,
              isFitWidth: true,
			  isInitLayout : true,
			});
			$(".loading-mask").css('opacity','0');
			setInterval(function(){
				msnry.reloadItems();
				msnry.layout();
				},500);

        }
    });
}

$(window).scroll(function () {
	if($(".grid").parent().css('display') != 'none'){
		if(parseInt($("#pcount").val()+10) >= (parseInt($("#pno").val())*10))
		{
			if ($(document).height() <= $(window).scrollTop() + $(window).height()) {
				$(".loading-mask").css('opacity','0.5');
				loadcontent('post',10,$("#pno").val());
			}
		}
	}
 });
 
 $(document).on('click','a[data-bid]',function(){
	 //$(".loading-mask").css('opacity','0.5');
	 $("html, body").animate({ scrollTop: 0 }, 600);
	 $(".w-nav.navbar, .news-container").hide();
	 $(".news-container.item-new").show();
	 $(".news-container.item-new").children().hide();
	 
	 $(".news-container.item-new #article_"+$(this).attr('data-bid')).show();
	// $(".loading-mask").css('opacity','0');
 });
 
 $(document).on('click','.news-container.item-new a',function(){
	 $(".w-nav.navbar, .news-container").show();
	 $(".news-container").show();
	 $(".news-container.item-new").children().hide();
 });