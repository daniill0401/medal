(function() {



	// slick

	var slickInit = function() {

		$('.third_bottom-slider-inner').slick({
			fade: true,
			infinite: true,
			speed: 900,
			cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
			prevArrow: "<img class='third_bottom-slider-arrow third_bottom-slider-arrow-prev' src='img/prev_button.png'>",
			nextArrow: "<img class='third_bottom-slider-arrow third_bottom-slider-arrow-next' src='img/next_button.png'>",

		});

		$('.third_bottom-slider-inner').on("beforeChange", function(event, slick, el, next) {
			var element = slick.$slides[next];
			var title = $(element).data("title");
			$(".third_bottom-desc").html(title);
		})

		$('.eighth_slider-wrapper').slick({
			slidesToShow: 3,
			infinite: true,
			prevArrow: "<img class='eighth_slider-arrow eighth_slider-arrow-prev' src='img/eighth_slider-prev.png'>",
			nextArrow: "<img class='eighth_slider-arrow eighth_slider-arrow-next' src='img/eighth_slider-next.png'>",
			responsive: [
				{
					breakpoint: 800,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 560,
					settings: {
						slidesToShow: 1
					}
				}
			]

		});

		$(".third_bottom-collection-img").on("click", function() {
			var index = $(this).index();
			$('.third_bottom-slider-inner').slick("slickGoTo", index)
		})

	}

	// sixth

	var sixth = {
		items: $(".sixth_left-item"),
		window: $(".sixth_slider-window"),
		show: $(".sixth_slider-wrapper .scaled"),
		handle: function() {
			var src = $(this).css("background-image").replace("url\(\"", "").replace("\"\)", "");
			sixth.window.animate({"opacity": "0"}, 300);
			sixth.show
			.css("background-image", "url("+src+")")
			setTimeout(function() {
				sixth.window
				.css("background-image", "url("+src+")")
				.animate({"opacity": "1"}, 300);

			}, 300)
		},
		listen: function() {
			this.items.on("click", this.handle);
		}
	}

	// seventh

	var seventh = {
		items: $(".seventh_left-item"),
		window: $(".seventh_slider-window"),
		show: $(".seventh_slider-wrapper .scaled"),
		handle: function() {
			var src = $(this).css("background-image").replace("url\(\"", "").replace("\"\)", "");;
			seventh.window.animate({"opacity": "0"}, 300);
			seventh.show
				.css("background-image", "url("+src+")")
			setTimeout(function() {
				seventh.window
				.css("background-image", "url("+src+")")
				.animate({"opacity": "1"}, 300);
			}, 300)
		},
		listen: function() {
			this.items.on("click", this.handle);
		}
	}

	// scrolling

	var scrollListen = function() {
		$(".menu_main-item").on("click", function() {
			var hash = $(this).attr("data-scroll");
			var toScroll = $("#"+hash);
			$("html, body").animate({ scrollTop: toScroll.offset().top-50}, "slow")
		})
	}

	var zoomInit = function() {
		zoomIt($(".sixth_slider-window")[0], $(".sixth_slider-back")[0], $(".sixth_slider-wrapper .scaled"))
		zoomIt($(".seventh_slider-window")[0], $(".seventh_slider-back")[0], $(".seventh_slider-wrapper .scaled"))
	}

	var zoomIt = function(element, overlay, show) {
		var mouse = $("<div class='mouse_scale'></div>");
		mouseWidth = mouse.width();
		mouseHeight = mouse.height();
		var parent = $(element).parent();
		parent.append(mouse);

		// mouse restriction

		var minLeft = 20;
		var minTop = 20;
		var maxLeft = overlay.offsetWidth - 20;
		var maxTop = overlay.offsetHeight - 20;

		// element img dimension

		var elWidth = $(element).width();
		var elHeight = $(element).height();

		// edges

		var edgeTop = element.offsetTop;
		var edgeLeft = element.offsetLeft;

		// actually img dimension
		var actuallyDim;

		$(overlay).on("mouseover", function(e) {

			mouse.css("opacity", "1")
			show.css("opacity", "1")

			// update data
			actuallyDim = getDimen($(element).css("background-image").replace("url\(\"", "").replace("\"\)", ""))
			
		})

		$(overlay).on("mousemove", function(e) {
			var centerTop = e.pageY-$(this).offset().top;
			var top = centerTop - mouseHeight/2;
			top = top > minTop ? top < maxTop-mouseHeight ? top : maxTop-mouseHeight : minTop;

			var centerLeft = e.pageX-$(this).offset().left;
			var left = centerLeft - mouseWidth/2;
			left = left > minLeft ? left < maxLeft-mouseWidth ? left : maxLeft-mouseWidth : minLeft;
			
			mouse.css({
				"top": top  + "px",
				"left": left + "px"
			})

			var backLeft = (centerLeft-edgeLeft)/elWidth;
			backLeft = (backLeft > 0 ? backLeft < 1 ? backLeft : 1 : 0)*100;

			var backTop = (centerTop-edgeTop)/elHeight;
			backTop = (backTop > 0 ? backTop < 1 ? backTop : 1 : 0)*100;

			show.css({
				"background-position" : backLeft+"% " + backTop + "%"
			})

		})

		$(overlay).on("mouseout", function(e) {
			mouse.css("opacity", "0")
			show.css("opacity", "0")
		})

	}

	var getDimen = function(src) {
		$(".test_img").attr("src", src);
		var img = $(".test_img");
		return {
			width: img.width(),
			height: img.height()
		}
	}

	// inputs

	var inputs = {
		items: $(".input"),
		focus: function() {
			var val = this.value.trim();
			var ph = $(this).attr('data-placeholder');
			$(this).css("border-color", "");
			if(ph === val){
				this.value = '';
			}
		},
		blur: function() {
			var val = this.value.trim();
			var ph = $(this).attr('data-placeholder');
			if(val === ""){
				this.value = ph;
			}
		},
		listen: function() {
			this.items.on("focus", this.focus);
			this.items.on("blur", this.blur);
		}
	}

	// forms

	var forms = {
		items: $(".popup_wrapper"),
		buttons: $(".popup_trigger"),
		crosses: $(".popup_cross"),
		submitButtons: $("input.button"),
		fon: $(".popup_fon"),
		current: undefined,
		patterns: [/[a-zA-Zа-яА-Я\S]{2,}/, /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/, /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/],
		validate: function() {
			var form = this.parentNode;
			var inputs = $(form).find("input:not([type=button])");
			var valid = true;
			$.each(inputs, function(index, item) {
				var val = $(item).val();
				if(((val.trim()==$(item).attr("data-placeholder") && $(item).attr("name")!=="email") || !(forms.patterns[index].test(val)))){
					if ($(item).attr("name")=="email" && val.trim()==$(item).attr("data-placeholder"))
						return;
					$(item).css("border-color", "red");
					valid = false;
					return;
				}
			})
			if(valid){
				forms.send(form);
			}
		},
		send: function(form) {
			$.post('/mail.php', $(form).serialize(),
				function(data) {
					forms.current.fadeOut();
					forms.showThankyou();
				})
		},
		showThankyou: function() {
			$(".thankyou_wrapper").fadeIn();
			$(".popup_fon").fadeIn();
			forms.current = $(".thankyou_wrapper");
		},
		show: function() {
			forms.current = $("."+$(this).data("form"));
			forms.current.fadeIn()
			forms.fon.fadeIn()
		},
		hide: function() {
			forms.current.fadeOut();
			forms.fon.fadeOut();
		},
		listen: function() {
			this.buttons.on("click", this.show);
			this.crosses.on("click", this.hide);
			this.fon.on("click", this.hide);
			this.submitButtons.on("click", this.validate);
		}
	}

	// menu

	var menu = {
		mobileTitle: $(".menu_main-title"),
		body: $(".menu_main-wrapper-inner"),
		handle: (function() {
			var state = 0;
			return function() {
				if(state%2==0){
					menu.body.fadeIn();
					$(".menu_main-item").on("click", menu.handle);
				}
				else {
					menu.body.fadeOut();
					$(".menu_main-item").off("click", menu.handle);
				}
				state++;
			}
		})(),
		listen: function() {
			this.mobileTitle.on("click", this.handle);
		}
	}

	$(document).ready(function() {
		scrollListen();
		slickInit();
		sixth.listen();
		seventh.listen();
		inputs.listen();
		review.listen();

		var firstBack = new Image();
		firstBack.src = "/img/first_fon.png";
		firstBack.onload = function() {
			new WOW().init();
		}
		zoomInit();
		forms.listen();
		menu.listen();
	})


})()