$(function(){
	var winT=0;
	var timer=0;
	var winH;
	var pageN=0;
	var activeFlag=false;
	var winW;

	$(window).scroll(function(){
		winT=$(window).scrollTop();
		winH=$(window).height();

		if(winT > 10){
			if($("#header").hasClass("fixed") == false){
				$("#header").addClass("fixed");
				$(".top_btn").addClass("fixed");
			}
		}
		else{
			if($("#header").hasClass("fixed") == true){
				$("#header").removeClass("fixed");
				$(".top_btn").removeClass("fixed");
			}
		}

		clearTimeout(timer);

		timer=setTimeout(function(){
			if(winT < $(".section1").offset().top - winH/2){
				pageN=0;
				$(".slider").addClass("active");
			}
			else if(winT < $(".section2").offset().top - winH/2){
				pageN=1;
			}
			else if(winT < $(".section3").offset().top - winH/2){
				pageN=2;
			}
			else if(winT < $(".section4").offset().top - winH/2){
				pageN=3;
			}
			else if(winT < $(".section5").offset().top - winH/2){
				pageN=4;
			}
			else{
				pageN=5;
			}

			$("#gnb ul li").removeClass("active");
			$("#gnb ul li").eq(pageN).addClass("active");

			if(activeFlag == true){
				return;
			}

			if(pageN == 0){
				if($(".slider").hasClass("active") == false){
					$(".slider").addClass("active");
				}
			}
			else{
				if($(".section"+pageN).hasClass("active") == false){
					$(".section"+pageN).addClass("active");

					var activeN=0;

					$(".sub").each(function(){
						if($(this).hasClass("active") == true){
							activeN++;
						}
					});

					if(activeN == $(".sub").size()){
						activeFlag=true;
					}
				}
			}
		}, 10);
	});

	$("#gnb ul li").click(function(e){
		e.preventDefault();
		pageN=$(this).index();

		if(pageN == 0){
			targetY=0;
		}
		else{
			targetY=$(".section"+pageN).offset().top;
		}
		if($("#header .tab").hasClass("active") == true) {
			$("#header .tab").trigger("click");
		}
		winW=$(window).width();
		if(winW < 720){
			$("html").delay(400).animate({scrollTop: targetY}, 600);
		}
		else{
			$("html").animate({scrollTop: targetY}, 600);
		}
	});

	$(".top_btn").click(function(e){
		e.preventDefault();

		$("html").animate({scrollTop:0}, 400);
	});

	$("#header .tab").click(function(e){
		e.preventDefault();
		$(this).toggleClass("active");
		$("#gnb").toggleClass("active");
		$("body").toggleClass("active");
		$(".dim").toggleClass("active");
	});

	var winW;

	
		$(window).resize(function(){
			winW=$(window).width();
			clearTimeout(timer);
			timer=setTimeout(function(){	
				if(winW > 720){
					if($("#gnb").hasClass("active") == true){
						$("#gnb").removeClass("active");
						$("#header .tab").removeClass("active");
						$("body").removeClass("active");
						$(".dim").removeClass("active");
					}
				}
			}, 10);
		});
	

	$("#gnb ul li").hover(
		function(){
			$("#gnb ul li").removeClass("active");
			$(this).addClass("active");
		},
		function(){
			$(this).removeClass("active");
			$("#gnb ul li").eq(pageN).addClass("active");
		}
	);

	$(".dim").click(function(){
		$("#gnb").removeClass("active");
		$("#header .tab").removeClass("active");
		$("body").removeClass("active");
		$(".dim").removeClass("active");
	});

	$(window).trigger("resize");
	$(window).trigger("scroll");
});
