/**
 * 単体ページを記述する
 */
var main;

if (typeof mainClass === "undefined") {
    var mainClass = function(){
        this.init();
    };
}

mainClass.prototype ={
    init: function(){
        //class変数
        this.debugFlg = true;
        this.$window = $(window);
        this.$document = $(document);
        this.$html = $("html, body");
        this.checkIOS = 7;
        this.checkANDROID = 4;
        this.SPEED = 500;
        this.TIMER = 500;
        this.ua = navigator.userAgent.toLowerCase();
        this.BREAK_POINT_SP = 768;
        this.isSrroll = false;
        this.windowWidth = 0;
        this.windowHeight = 0;
        this.contentsHeight = 0;
        this.windowScrollPos = 0;
        this.windowScrollPosY = 0;
        this.windowScrollPosY_save = 0;
        this.scrollTargetPos = 0;
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'showImageNumberLabel': false
        })
    },
    debug : function (params) {
        if(main.debugFlg){
            for(var i=0;i<params.length;i++){
                console.log(params[i]);
            }
        }
    },
    setEvent : function () {
        if(main.ua.indexOf('iphone')!=-1||main.ua.indexOf('ipod')!=-1||(main.ua.indexOf('android')!=-1&&main.ua.indexOf('mobile')!=-1)){
            document.addEventListener("touchend",handleTouchEnd);
            var menu = $('#js-header-menuBtn').parent();

            function handleTouchEnd(evt) {
                if(menu.is('.is-open')){
                    $('#js-header-menuList').focus();
                }
            }
        }
        main.$window.on('load resize',function(){
            main.windowWidth = main.$window.width();
            main.windowHeight = main.$window.height();
            main.contentsHeight = $('.wrapper').height();
            var header_h = $('header').height();
            $('#js-header-menuList-bg').height(main.contentsHeight - header_h);

            if(main.windowWidth < main.BREAK_POINT_SP) {
                $('#js-header-menuList').height(main.windowHeight - $('header').height());
            }
        });
        main.$window.on('scroll',function(){
            main.windowScrollPosY = main.$window.scrollTop();
            main.spHeader();
        });
        $('#js-header-searchBtn').on('click',function(){
            $(this).parent().toggleClass('is-open');
            var menu = $('#js-header-menuBtn').parent();
            if(menu.is('.is-open')){
                menu.removeClass('is-open');
            }
            var $header = $('header');
            var $wrapper = $('.wrapper');

            $header.toggleClass('is-focus');
            if($header.is('.is-focus')) {
                $header.css({
                    position: 'absolute',
                    top: main.windowScrollPosY + 'px'
                });
            } else {
                $header.css({
                    position: 'fixed',
                    top: 0
                });
            }

            if($wrapper.is('.is-menu')){
                $wrapper.removeClass('is-menu');
                main.$html.animate({scrollTop:main.windowScrollPosY_save}, 0, "swing");
            } else {
                main.$html.animate({scrollTop:main.windowScrollPosY}, 0, "swing");
            }

        });
        $('#js-header-menuBtn').on('click',function(){
            $(this).parent().toggleClass('is-open');
            var search = $('#js-header-searchBtn').parent();
            if(search.is('.is-open')){
                search.removeClass('is-open');
            }
            var $header = $('header');
            var $wrapper = $('.wrapper');
            main.$html.animate({scrollTop:main.windowScrollPosY}, 0, "swing");
            $header.removeClass('is-focus').css({
                position: 'fixed',
                top: 0
            });
            if(!$wrapper.is('.is-menu')) {
                main.windowScrollPosY_save = main.$window.scrollTop();
            }
            $wrapper.toggleClass('is-menu');
            if($wrapper.is('.is-menu')) {
                $wrapper.css({
                    top: main.windowScrollPosY_save*-1 + 'px'
                });
            } else {
                main.$html.animate({scrollTop:main.windowScrollPosY_save}, 0, "swing");
            }
        });
        $('#js-header-menuList-bg').on('click',function(){
            var menu = $(this).parent();
            var $wrapper = $('.wrapper');
            menu.removeClass('is-open');
            $wrapper.removeClass('is-menu');
            main.$html.animate({scrollTop:main.windowScrollPosY_save}, 0, "swing");
        });
        $('#js-header-menuList dt a').on('click',function(){
            $(this).parent().parent().toggleClass('is-open');
        });
        $('.js-product-list-name').on('click',function(){
            $(this).parent().toggleClass('is-open');
        });
        $('.js-service-product-list-name').on('click',function(){
            $(this).parent().parent().toggleClass('is-open');
        });
        $('#js-productList dt').on('click',function(){
            $(this).parent().toggleClass('is-open');
        });
        $('#js-productList dl').each(function(){
            var l = $(this).find('dd').length;
            if (l % 2 != 0) $(this).addClass('is-odd');
        })
        $('#js-header-menuList ul').each(function(){
            var l = $(this).find('li').length;
            if (l % 2 == 0) $(this).addClass('is-even');
        })
        $('.contents__product-about a,.contents__product-detail a,.contents__product-info a').each(function(){
            var _self = $(this);
            var href = _self.attr('href');
            if(href.indexOf('.pdf')!=-1){
                _self.attr('target','_blank');
                _self.parent().addClass('is-pdf');
            }
        });
        $('.js-contents__contact__push-tel').on('click',function(){
            if(main.windowWidth > main.BREAK_POINT_SP) return false;
        });
        $('a[rel^=lightbox]').on('click',function(){
            if(main.windowWidth < main.BREAK_POINT_SP) return false;
        });
    },
    spHeader : function () {
        if($('header').is('.is-focus')) {
            $('header').css({
                top: main.windowScrollPosY + 'px'
            });
        }
    },
    searchModule : function () {
        $('#js-productSearchBtn').on('click',function(){
            $(this).parent().parent().toggleClass('is-open');
            $('#js-search-module-hider').toggleClass('is-show');
            // $('#js-productSearchModule').toggleClass('is-hide');
        });
        $('#js-search-module-hider').on('click',function(){
            $('#js-productSearchBtn').parent().parent().removeClass('is-open');
            $('#js-search-module-hider').removeClass('is-show');
        });

    },
    tabModule : function () {
        $('.tab-body').jScrollPane();
        $('.js-tab-head li').on('click',function(){
            var $parent = $(this).parent();
            var $tabs = $parent.find('li');
            var $tabBody = $parent.parent().find('.js-tab-body');
            var $tabBodyUnit = $tabBody.find('.tab-body__unit');
            var $tabFoot = $parent.parent().find('.js-tab-foot');
            var $tabFootTabs = $tabFoot.find('li');
            var num = $('.js-tab-head li').index(this);

            $tabs.removeClass('is-current');
            $tabBodyUnit.removeClass('is-current');
            $tabFootTabs.removeClass('is-current');
            $tabs.eq(num).addClass('is-current');
            $tabBodyUnit.eq(num).addClass('is-current');
            $tabFootTabs.eq(num).addClass('is-current');

            $('.tab-body').jScrollPane();

        });
        $('.js-tab-foot li').on('click',function(){
            var $parent = $(this).parent();
            var $tabs = $parent.find('li');
            var $tabBody = $parent.parent().find('.js-tab-body');
            var $tabBodyUnit = $tabBody.find('.tab-body__unit');
            var $tabHead = $parent.parent().find('.js-tab-head');
            var $tabHeadTabs = $tabHead.find('li');
            var num = $('.js-tab-foot li').index(this);

            $tabs.removeClass('is-current');
            $tabBodyUnit.removeClass('is-current');
            $tabHeadTabs.removeClass('is-current');
            $tabs.eq(num).addClass('is-current');
            $tabBodyUnit.eq(num).addClass('is-current');
            $tabHeadTabs.eq(num).addClass('is-current');

            $('.tab-body').jScrollPane();

            var position = $parent.parent().offset().top+ 1;
            main.$html.animate({scrollTop:position}, main.SPEED, "swing");
        });
    },
    //クエリ文字列を変換
    getUrlVars: function(url){
        var vars = [], max = 0, hash = "", array = "";
        var url = url ? url : window.location.search;
        if(!url.match(/^\?/)){
            url = '?' + url.split('?')[1];
        }
        //?を取り除くため、1から始める。複数のクエリ文字列に対応するため、&で区切る
        hash  = url.slice(1).split('&');
        max = hash.length;
        for (var i = 0; i < max; i++) {
            array = hash[i].split('=');    //keyと値に分割。
            //vars.push(array[0]);    //末尾にクエリ文字列のkeyを挿入。
            vars[array[0]] = array[1];    //keyに、値を代入。
        }
        return vars;
    },
    smoothScroll: function(){
        $('a[href ^= "#"]').click(function(){
            var href= $(this).attr("href");
            var target = $(href == "#" || href == "" ? 'html' : href);
            var position = target.offset().top+ 1;
            main.$html.animate({scrollTop:position}, main.SPEED, "swing");
            return false;
        });
    },
    versionCheck: function(){
        // iOSのバージョン判断
        function ios_ver(){
            if( main.ua.indexOf("iphone") > 0 ) {
                main.ua.match(/iphone os (\w+){1,3}/g);
                var version = (RegExp.$1.split(/_/));
                version.splice( 1, 0, "." );
                version.push("0");
                version = parseFloat(version.join(''));
                return version;
            }
        }
        // Androidのバージョン判断
        function and_ver() {
            if( main.ua.indexOf("android") > 0 ) {
                var version = parseFloat(main.ua.slice(main.ua.indexOf("android")+8));
                return version;
            }
        }
        if(ios_ver() < main.checkIOS || and_ver() < main.checkANDROID) {
            $('.old_browser').show();
        }
    }
}

main = new mainClass();

$(function(){
    //初期関数実行
    main.$html.animate({scrollTop:1}, 0, "swing");
    $('#js-productSearchModule').find('input[type="checkbox"]').prop('checked','');
    main.smoothScroll();
    main.versionCheck();
    main.searchModule();
    main.tabModule();
    main.setEvent();
});