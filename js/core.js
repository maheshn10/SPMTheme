var app = {

    init: function(){
        core.init();
        core.sidebarToggle();
        core.devMode();
        core.boxDropdown();
    },

    logIn: function(){
        core.logInTabs();
        core.logInValidate();
    },

    panel: function(){
        core.panelEdit();
        core.boxTabs();
        core.tableZebraStripes();
        core.workerComparison();
        core.myTeam();
        core.timeOff();
        core.steps();
        core.stickySteps();
        core.stickyStepsJumpToTop();
    }

};

var core = {

    init: function(){
        
    },

    devMode: function(){

        $('.js-dev-mode').on('click', function(){
            document.designMode = "on";
        });
        
    },

    logInTabs: function(){

        $('.js-log-in-tabs li').on('click', function(){

            var tabID = $(this).attr('data-tab');

            $('.js-log-in-tabs li').removeClass('active');
            $('.log-in-tab').removeClass('active');

            $(this).addClass('active');
            $("#" + tabID).addClass('active');

        });

        $('.log-in-form-field').on('click', function(){

            $('.log-in-form-field')
                .removeClass('active');

            $(this) 
                .addClass('active');

        });

    },

    logInValidate: function(){

        $('.log-in-submit').click(function() {

            event.preventDefault();

            var validEmail = $('#user-email').val() === 'spm';
            var validPassword = $('#user-password').val() === 'spm2017';

            if (validEmail === true && validPassword === true) {
                window.location = "panel-index.html";
            } else {
                $('.log-in-input')
                    .addClass('error');
            }
            
        });

    },

    panelEdit: function(){

        $('.js-panel-edit').on('click', function(){

            var panelParent = $(this).parents('.panel-edit');
            $('.panel-edit')
                .removeClass('active');

            panelParent
                .toggleClass('active');

        });

        // Hide dropdown

        $('html').click(function(){

            $('.panel-edit')
                .removeClass('active');

        });

        $('.panel-edit').click(function(event){
            event.stopPropagation();
        });

        // Change data

        $('.js-panel-item').on('click', function(){

            var _this = $(this);

            if ( !_this.hasClass('active') ) {
 
                // Get elements
                
                var parentKey = _this.parents('.key');
                var parentKeyTitle = parentKey.find('.key-title');
                var parentKeyValue = parentKey.find('.key-value');

                var newTitle = _this.data('keytitle');
                var newValue = _this.data('keyvalue');

                // Update with new data
                parentKeyTitle.text(newTitle);
                parentKeyValue.text(newValue);

                // Remove active class from others values in list
                parentKey
                    .find('.js-panel-item')
                    .removeClass('active');

                _this
                    .addClass('active');

                // Close edit dropdown
                $('.panel-edit')
                    .removeClass('active');
 
            }

        });

    },

    sidebarToggle: function(){

        var sidebarToggle = $('.js-sidebar-toggle');
        var sidebar = $('.sidebar');

        if (Cookies.get('sidebarHidden') == '1') {
            $('body')
                .addClass('sidebar-hidden');
            sidebarToggle
                .addClass('active');
        }
        
        sidebarToggle.on('click', function(){

            if (Cookies.get('sidebarHidden') == '1') {
                Cookies.set('sidebarHidden', '0', { expires: 21 });
            } else {
                Cookies.set('sidebarHidden', '1', { expires: 21 });
            }

            $('body')
                .toggleClass('sidebar-hidden');

            $(this)
                .toggleClass('active');

        });

    },

    boxTabs: function(){

        $(".js-tabs li").click(function(e){
            if (!$(this).hasClass("active")) {
                var parentBox = $(this).parents('.box');
                var tabNum = $(this).index();
                var nthChild = tabNum + 1;
                parentBox.find(".js-tabs li.active").removeClass("active");
                $(this).addClass("active");
                parentBox.find(".box-content .box-tab.active").removeClass("active");
                parentBox.find(".box-content .box-tab:nth-child("+nthChild+")").addClass("active");
            }
        });

    },

    customScrollbars: function(){

        $('.js-scrollbar').perfectScrollbar();

    },

    tableZebraStripes: function(){

        $('.table').each(function(){

            var _this = $(this);
            var rowCounter = _this.find('tr').length;
            
            if (rowCounter >= 10) {
                _this.addClass('table--stripes');
            }

        });

    },

    workerComparison: function(){

        // Compare list
        var checkedWorkersCount;
        var workerCol01 = $('.worker-col-01');
        var workerCol02 = $('.worker-col-02');

        $('.compare-checkbox').on('click', function(){

            var _this = $(this);
            checkedWorkersCount = $('.compare-checkbox:checked').length;

            if (checkedWorkersCount > 2 && _this.is(":checked")) {
                return false;
            } else if (checkedWorkersCount == 1) {
                
                workerCol01.show();
                workerCol02.hide();

            } else if (checkedWorkersCount == 2) {
            
                workerCol02.show();
            
            } else if (checkedWorkersCount == 0) {

                workerCol01.hide();
                workerCol02.hide();

            }

        });

        // Toggler
        $('.js-toggler-bar').on('click', function(){
            var togglerParent = $(this).parents('.toggler');
            togglerParent.toggleClass('active');
        });

        // Box Close

        $('.js-box-close').on('click', function(){

            var currentBox = $(this).parents('.worker-col');
            var currentBoxCheckbox = $(this).data('checkbox');
            
            currentBox.hide();
            
            $('#' + currentBoxCheckbox).prop('checked', false);

        });

        var options = {
            valueNames: [ 'name' ]
        };

        var listObj = new List('users', options);

        $('.navbar-search-input').on('keyup', function(){
            var searchString = $(this).val();
            listObj.search(searchString);
        });

    },

    myTeam: function(){

        // Show sample box with worker information
        $('.js-compare-more-info').on('click', function(){

            $('.worker-col').show();

        });

    },

    boxDropdown: function(){

        $('.js-box-dropdown').on('click', function(e){

            $(this)
                .find('.js-box-dropdown-content')
                .toggleClass('active');

            $(this)
                .toggleClass('active');

        });

        $('html').click(function() {

            $('.js-box-dropdown-content')
                .removeClass('active');

            $('.js-box-dropdown')
                .removeClass('active');
        });
        

        $('.js-box-dropdown-content, .js-box-dropdown').click(function(e){
            e.stopPropagation();
        });

    },

    timeOff: function() {

        // Base calendar init
        if($('#time-off-calendar').length > 0 ){

            $("#time-off-calendar").datepicker({
                numberOfMonths: 3
            });

        }

        $('.js-datepicker').datepicker({

            beforeShow: function( input, inst){
                $(inst.dpDiv).addClass('input-datepicker');
            }
            
        });

        $('.js-time-off-type').on('click', function(){

            $('.time-off-entry')
                .addClass('active');

            $('#entry-vacation-type')
                .val($(this).data('type'));

            $('body')
                .trigger('click');

            $('html, body').animate({
                scrollTop: $("#time-off-entry").offset().top
            }, 250);

        });

    },

    steps: function() {

        if ($('.steps-wrapper').length > 0) {
            $('.steps-wrapper').steps();
        }        

    },

    stickySteps: function(){

        var scroll = $(window).scrollTop();
        var navbarHeight = $('.navbar').outerHeight(true);
        var pageNavHeight = $('.page-nav').outerHeight(true);

        var combinedHeight = navbarHeight + pageNavHeight + 170;

        if ($('.steps-wrapper').length > 0) {

            if (scroll > combinedHeight) {
                $('.steps-nav')
                    .addClass('sticky');
                $('.steps-placeholder')
                    .css('height', '170px');
            } else {
                $('.steps-nav')
                    .removeClass('sticky');
                $('.steps-placeholder')
                    .css('height', 'auto');
            };

        };

    },

    stickyStepsJumpToTop: function(){

        $(document).on('click', '.steps-nav.sticky button', function(){
            $("html, body").animate({ scrollTop: 0 }, 250);
        });

    }

}

$(document).ready( function(){

    app.init();

})

$(window).on("load",function(){
    
    core.customScrollbars();

});
 
$(window).scroll(function(){
    
    core.stickySteps();

});

$(window).resize(function(){
    
    

});