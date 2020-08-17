/*!
    * Start Bootstrap - SB Admin v6.0.0 (https://startbootstrap.com/templates/sb-admin)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    (function($) {
    "use strict";

    // Add active state to sidbar nav links
    var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
        $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
            if (this.href === path) {
                $(this).addClass("active");
            }
        });

    // Toggle the side navigation
    $("#sidebarToggle").on("click", function(e) {
        e.preventDefault();
        $("body").toggleClass("sb-sidenav-toggled");
    });
})(jQuery);


$(function () {
    jQuery('[data-toggle="tooltip"]').tooltip();
    jQuery(".datepicker").datepicker({ 
        autoclose: true, 
        todayHighlight: true
}).datepicker('update', new Date());
    
});






  // upload file

  (function($) {
  
    function createPdfPreview(fileContents, $displayElement) {
      PDFJS.getDocument(fileContents).then(function(pdf) {
        pdf.getPage(1).then(function(page) {
          var $previewContainer = $displayElement.find('.preview__thumb');
          var canvas = $previewContainer.find('canvas')[0];
          canvas.height = $previewContainer.innerHeight();
          canvas.width = $previewContainer.innerWidth();
  
          var viewport = page.getViewport(1);
          var scaleX = canvas.width / viewport.width;
          var scaleY = canvas.height / viewport.height;
          var scale = (scaleX < scaleY) ? scaleX : scaleY;
          var scaledViewport = page.getViewport(scale);
  
          var context = canvas.getContext('2d');
          var renderContext = {
            canvasContext: context,
            viewport: scaledViewport
          };
          page.render(renderContext);
        });
      });
    }
    
    
    
    
    
    function createPreview(file, fileContents) {
      var $previewElement = '';
      switch (file.type) {
        case 'image/png':
        case 'image/jpeg':
        case 'image/gif':
          $previewElement = $('<img src="' + fileContents + '" />');
          break;
        case 'video/mp4':
        case 'video/webm':
        case 'video/ogg':
          $previewElement = $('<video autoplay muted width="100%" height="100%"><source src="' + fileContents + '" type="' + file.type + '"></video>');
          break;
        case 'application/pdf':
          $previewElement = $('<canvas id="" width="100%" height="100%"></canvas>');
          break;
        default:
          break;
      }
      var $displayElement = $('<div class="preview">\
                                 <div class="preview__thumb"></div>\
                                 <span class="preview__name" title="' + file.name + '">' + file.name + '</span>\
                                 <span class="preview__type" title="' + file.type + '">' + file.type + '</span>\
                               </div>');
      $displayElement.find('.preview__thumb').append($previewElement);
      $('.upload__files').append($displayElement);
      
      if (file.type === 'application/pdf') {
        createPdfPreview(fileContents, $displayElement);
      }
    }
    
    
    
    
    
    function fileInputChangeHandler(e) {
      var URL = window.URL || window.webkitURL;
      var fileList = e.target.files;
      
      if (fileList.length > 0) {
        $('.upload__files').html('');
        
        for (var i = 0; i < fileList.length; i++) {
          var file = fileList[i];
          var fileUrl = URL.createObjectURL(file);
          createPreview(file, fileUrl);
        }
      }
    }
    
    
    
    
    
    $(document).ready(function() {
      $('input:file').on('change', fileInputChangeHandler);
    });
  })(jQuery.noConflict());