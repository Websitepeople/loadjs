'use strict'

var fileSize,
uploadSize;
window.onload = function(){
    var loadLink = {
        css: function(path){
            if(!path || path.length === 0){
                throw new Error('argument "path" is required !');
            }
            var head  = document.getElementsByTagName('head')[0];
            var link  = document.createElement('link');
            link.href = path;
            link.rel  = 'stylesheet';
            link.type = 'text/css';
            head.appendChild(link);
        },
        js: function(path){
            if(!path || path.length === 0){
                throw new Error('argument "path" is required !');
            }
            var head    = document.getElementsByTagName('head')[0];
            var script  = document.createElement('script');
            script.src  = path;
            script.type = 'text/javascript';
            head.appendChild(script);
        }
    }
    loadLink.css("load.pat.css");
    setTimeout(function(){
        load.loading();
        // Loading method
    });
    load.bar();
    // Progress bar method
}
var load = {
    loading : function(){
        var el       = document.createElement("div"),
        coverel      = document.createElement("div");
        el.id        = "loading";
        el.style.top = "20%";
        coverel.id   = "coverel";
        document.body.appendChild(el);
        document.body.appendChild(coverel);
        if (!+[1,]) { 
        // To determine whether or not to IE
            var load_min   = '<div class="spinner">'+
                                 '<img src="<%=contextPath %>/dist/images/loading.gif"/>' +
                             '</div>';
        } else {
            var load_min   = '<div class="spinner">'+
                                 '<div class="rect1"></div>' +
                                 '<div class="rect2"></div>' +
                                 '<div class="rect3"></div>' +
                                 '<div class="rect4"></div>' +
                                 '<div class="rect5"></div>' +
                             '</div>';
        }
        el.innerHTML       = load_min;
        setTimeout(function(){
            document.body.removeChild(el);
            document.body.removeChild(coverel);
        },1200);
    },
    bar : function(){
        var bar_min  = '<div class="wrap">' +
                            '<div class="wrapbar">' +
                                '<div class="size"></div>'  +
                                '<div class="bar" id="bar_bg" style="width:1%"></div>'  +
                                '<div class="val" id="bar_val"></div>'  +
                            '</div>' +
                        '</div> ',
        el           = document.createElement("div"),
        coverel      = document.createElement("div");
        coverel.id   = "coverel";
        el.innerHTML = bar_min;
        document.body.appendChild(el);
        document.body.appendChild(coverel);
        this.progress();
        if ( this.percentage(fileSize,uploadSize) >= "100%") {
            setTimeout(function(){
                document.body.removeChild(el);
                document.body.removeChild(coverel);
            },1200);
        }
    },
    percentage : function(fileSize, uploadSize) {
        var uploadSize = parseFloat(uploadSize),
        fileSize = parseFloat(fileSize);
        if (isNaN(fileSize) || isNaN(fileSize)) {
            return "-"; 
        }
        return fileSize <= 0 ? "0%" : (Math.round(uploadSize / fileSize * 10000) / 100.00 + "%");
    },
    progress : function(){
        var bar_bg         = document.getElementById("bar_bg"),
        bar_val            = document.getElementById("bar_val"),
        percentagebar      = this.percentage(fileSize,uploadSize);
        bar_bg.style.width = percentagebar;
        bar_val.innerHTML  = percentagebar;
        if(uploadSize >= fileSize){
            window.clearTimeout(progresstimeout);
            return;
        }
        var progresstimeout = window.setTimeout("load.progress()");
    }
}
