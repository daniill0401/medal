var review = {
	images: $(".show_scale"),
	images_inside: $(".show_scale-inside"),
	images_next: $(".show_scale-next"),
	images_slick: $(".show_scale-slick"),
	fon: $(".review_fon"),
	target: $("img.review_photo"),
	wrapper: $(".review_photo-wrapper-fill"),
	cross: $(".review_photo-cross"),
	listen: function() {
		this.images.click(this.hearHandle);
		this.images_inside.click(this.insideHandle);
		this.images_next.click(this.nextHandle);
		this.images_slick.click(this.slickHandle);
		this.fon.click(this.showHide);
	},
	hearHandle: function() {
		var image = $(this);
		var src = image.attr("src") || image.css("background-image").replace("url\(\"", "").replace("\"\)", "");
		$(".test_img").attr("src", src);
		var img = $(".test_img");
		review.handle.call(img);

	},
	insideHandle: function() {
		var img = $(this).find(".show_scale");
		review.handle.call(img);
	},
	nextHandle: function() {
		if($(this).parent().find(".show_scale").attr("src") ){
			var img = $(this).parent().find(".show_scale");
		}
		else if ($(this).parent().find(".show_scale").css("background-image")) {
			var src = $(this).parent().find(".show_scale").css("background-image").replace("url\(\"", "").replace("\"\)", "");
			$(".test_img").attr("src", src);
			var img = $(".test_img");
		}
		else {
			return;
		}
		review.handle.call(img);
	},
	slickHandle: function() {
		if($(this).parent().find(".slick-active").attr("src") ){
			var img = $(this).parent().find(".slick-active");
		}
		else if ($(this).parent().find(".slick-active img").attr("src")) {
			var img = $(this).parent().find(".slick-active img");
		}
		else if ($(this).parent().find(".show_scale").attr("src")) {
			var img = $(this).parent().find(".show_scale");
		}
		else if ($(this).parent().find(".show_scale").css("background-image")) {
			var src = $(this).parent().find(".show_scale").css("background-image").replace("url\(\"", "").replace("\"\)", "");
			$(".test_img").attr("src", src);
			var img = $(".test_img");
		}
		else {
			return;
		}
		review.handle.call(img);
	},
	handle: function() {
		review.target.attr("src", "");
		review.target.css("opacity", "0");
		var image = $(this);
		var prop = image.width()/image.height();
		var innerWidth = window.innerWidth;
		var innerHeight = window.innerHeight;
		var prop_screen = innerWidth/innerHeight;
		var part = .8;
		while (true){
			var width = innerWidth*part;
			var height = width / prop;
			if (height < innerHeight-100){
				break;
			}
			part-=.1
		}
		var src = image.attr("src");

		review.showHide();
		setTimeout(function() {
			review.wrapper.css("transition", "none");
		}, 30);
		review.wrapper.attr("style", "");
		setTimeout(function() {
			review.wrapper.css("transition", "");
			review.wrapper.css({"height": height +10 +"px", "width": width+8+"px"});
			setTimeout(function() {
				review.target.css("opacity", "1");
				review.target.attr("src", src);
			}, 500);
		}, 200);
	},
	showHide: (function() {
		var state = 0;
		return function() {
			if(state%2==0){
				review.fon.fadeIn();
			}
			else {
				review.fon.fadeOut();
			}
			state++;
		}
	})()
}
