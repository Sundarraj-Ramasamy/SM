!(function($) {
  "use strict";

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {

        var scrollto = target.offset().top;

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox();
	  
	  $.ajax({url: "http://localhost:8080/api/productsWithImages", async: true, success: function(result){
			result.forEach(function(item, i, arr){
				$("#portfolio-flters").append(`<li  data-filter=".filter-${item.table_id}">${item.name}</li>`);
				
				$("#productDescription").append(`<div class="col-md-7 pt-4 productDesc desc-filter-${item.table_id}" data-aos="fade-left">
					<h3>${item.name}</h3>
					<ul ID = "productSpec-${item.table_id}">
					</ul>
        </div>`);

        let specList = item.specification.split('\n');

        specList.forEach(function(name){
          $("#productSpec-" + item.table_id).append(`<li><i class="icofont-check"></i>${name}</li>`);
        });
        			
				item.imageData.forEach(function(item2, i2, arr2){
					$("#productImages").append(`<div class="col-lg-4 col-md-6 portfolio-item filter-${item.table_id}">
													  <img src="${item2}" class="img-fluid" alt="">
												  </div>`);
				});
				});
			      var portfolioIsotope = $('.portfolio-container').isotope({
                  itemSelector: '.portfolio-item',
                  layoutMode: 'fitRows',
                  filter:'filter-3'
                });

			      $('#portfolio-flters li').on('click', function(event) {
              $(".productDesc").hide();
              $("#portfolio-flters li").removeClass('filter-active');
              $(this).addClass('filter-active');
              let _className = event.currentTarget.dataset.filter.replace(/\./g, "");
              $(".desc-"+_className).show();
              
              portfolioIsotope.isotope({
                filter: $(this).data('filter')
              });
					});
		}
    });
    });
  });

   // Initi AOS
   AOS.init({
     duration: 800,
     easing: "ease-in-out"
   });

})(jQuery);