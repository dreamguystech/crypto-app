$(document).ready(function(){
	var email    = $("#email");
	var password = $("#password");
	
	email.blur(validateEmailUsername);	
	password.blur(validateLpassword);
	email.keyup(validateEmailUsername);
	password.keyup(validateLpassword);
		$('#login-form').submit(function(){ 
				if(validateEmailUsername() & validateLpassword() )
				{
        androidToken = window.localStorage.getItem("androidToken");
        iosToken = window.localStorage.getItem("iosToken");
        var dataString ="uname="+$("#email").val()+"&pass="+$("#password").val()+"&android="+androidToken+"&ios="+iosToken;
        $.ajax({
            url:"http://amisapp.ansarullah.co.uk/mobile_app/login",
            type:"POST",
            data:dataString,
            dataType:"json",
            beforeSend:function(){
                $(".loading-mask").css('opacity','0.5');
               // disableBack = true;
            },
            success:function(data){
               // disableBack = false;
				$(".loading-mask").css('opacity','0');
                if(data.res==1){
                   /* if ($('.chksign').is(":checked")){
                        window.localStorage.setItem("stay_signed", email);
                    }else{
                        window.localStorage.removeItem('stay_signed');
                    }*/
                    //set item
					var pro_img = '<img src="http://amisapp.ansarullah.co.uk/images/member/'+data.det.prof_img+'" />';
					if(data.det.prof_img == "user.png")
					var pro_img  = '<i class="navbar-button-icon icon ion-ios-person-outline" style="font-size: 30px; height: 35px; width: 35px; display: inline;"></i>';
                    window.localStorage.setItem("member_id", data.det.m_id);
                    window.localStorage.setItem("user_id", data.det.u_id);
                    window.localStorage.setItem("first_name", data.det.fname);
                    window.localStorage.setItem("middle_name", data.det.mid_name);
                    window.localStorage.setItem("surname", data.det.surname);
                    window.localStorage.setItem("member_code", data.det.m_code);
                    window.localStorage.setItem("region", data.det.region);
                    window.localStorage.setItem("area", data.det.area);
                    window.localStorage.setItem("prof_img", pro_img);
                    window.localStorage.setItem("latitude", data.det.latitude);
                    window.localStorage.setItem("longitude", data.det.longitude);

                    //get item
                    user_id = window.localStorage.getItem("user_id");
                    member_id = window.localStorage.getItem("member_id");
                    member_code = window.localStorage.getItem("member_code");
                    first_name = window.localStorage.getItem("first_name");
                    middle_name = window.localStorage.getItem("middle_name");
                    surname = window.localStorage.getItem("surname");
                    member_region = window.localStorage.getItem("region");
                    member_area = window.localStorage.getItem("area");
                    profImg_url = window.localStorage.getItem("prof_img");
                    latitude = window.localStorage.getItem("latitude");
                    longitude = window.localStorage.getItem("longitude");
                    /*var ul_obj = data.det.ula;
                    
                    var usr_l = Object.keys(ul_obj).map(function(key){return ul_obj[key]});

                    for (var xy = 0; xy < ula_field.length; xy++) {
                        if(in_array(ula_field[xy], usr_l)){
                            $('.'+ula_field[xy]).show();
                        }else{
                            $('.'+ula_field[xy]).hide();
                        }
                        
                    }*/
                    location.href = "home.html";
                   /* $('.profileName h4').html(first_name+' '+surname);
                    $('.profileImage img').attr("src","http://amisapp.ansarullah.co.uk/images/member/"+profImg_url);
                    setTimeout(function(){
                        $('.ajaxOverlay').hide();
                        $.mobile.changePage("#menuList", {
                            transition: "none"
                        });
                    }, 2000);*/
                    
                    //profile details 
                   // profile_details();
                    //events list call
                    //events_list();
                    //message centre list call
                    //message_centre();
                    //inbox 
                   // email_inbox();
                    //regions
                  //  regions();
                    //salaat times
                   // tday();
                    
                    //finance year
                   /* $('#fin_year').html('<option value="">* Year</option><option value="'+prv_yr+'">'+prv_yr+'</option><option value="'+cur_yr+'">'+cur_yr+'</option><option value="'+nxt_yr+'">'+nxt_yr+'</option>');*/
                }else{
					$('#password').addClass("error");
					$('#email').addClass("error");	
                    setTimeout(function(){$('.ajaxOverlay').hide();$('.login_err').html(data.det);}, 2000);
                    window.localStorage.clear();
                }
            }
        });
    
					
					
				}
				return false;
		});
		
		function validateEmailUsername()
		{
			var a = $("#email").val();
			var filter = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
			if(a == "")
			{
				$('#email').addClass("error");
				return false;
			}else
			{
				if(filter.test(a)){
					$("#email").removeClass("error");
					return true;
				}
				else{
					$('#email').addClass("error");
					return false;
				}
			}
		}
		
		function validateLpassword(){
			var password  = $('#password').val();
			if(password == '')
			{
				$('#password').addClass("error");				
				return false;
			}else
			{
				$('#password').removeClass("error");
				return true;
			}
		}
		
		var forgotpw = $('#forgotpw');	
		
		forgotpw.submit(function(){			
				if(validateEmailfp())
				{
					$("#fpload").show();
					$("#fpfooter").hide();
					$.post(base_url+'forgot_password', 
                        { useremail:$("#fpemail").val() },
                        function(data){	
							$("#fpload").hide();
							if(data.success == "success")
							{								
								$("#fpfooter").after('Check your email to reset your password');
							}else
							{
								$('#fpemail').addClass("error");	
								$("#fpfooter").show();
							}
                        }, 
                        "json"
                    );
					return false;
				}
				else
				{
				return false;
				}
		});
		
		
});