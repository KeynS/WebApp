

(function ($) {
    "use strict";

    /*[ Load page ]
    ===========================================================*/
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1500,
        outDuration: 800,
        linkElement: '.animsition-link',
        loading: true,
        loadingParentElement: 'html',
        loadingClass: 'animsition-loading-1',
        loadingInner: '<div class="loader05"></div>',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: ['animation-duration', '-webkit-animation-duration'],
        overlay: false,
        overlayClass: 'animsition-overlay-slide',
        overlayParentElement: 'html',
        transition: function (url) { window.location.href = url; }
    });

    //*================================================================/

    let activeButton = $('.active-menu');
    //alert($(location).attr('pathname').toLowerCase());
    if (/^\/(ru|en)(\/home)?(\/index)?(\/)?$/.test($(location).attr('pathname').toLowerCase())) {
        $(activeButton).removeClass('active-menu');
        $('#btn-index').addClass('active-menu');
        $('header').removeClass('header-v4');
        $('.wrap-menu-desktop').removeClass('how-shadow1');
    }
    else {
        let text = $(location).attr('pathname').toLowerCase();
        let lastIndex = text.lastIndexOf("/");
        if (lastIndex == $(location).attr('pathname').length - 1) {
            text = text.substring(0, lastIndex);
            lastIndex = text.lastIndexOf("/");
        }
        text = text.substring(lastIndex + 1, text.length);
        $(activeButton).removeClass('active-menu');
        $('#btn-' + text).addClass('active-menu');
        $('header').addClass('header-v4');
        $('.wrap-menu-desktop').addClass('how-shadow1');
    }


    /*[ Back to top ]
    ===========================================================*/
    var windowH = $(window).height() / 2;

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > windowH) {
            $("#myBtn").css('display', 'flex');
        } else {
            $("#myBtn").css('display', 'none');
        }
    });

    $('#myBtn').on("click", function () {
        $('html, body').animate({ scrollTop: 0 }, 300);
    });

    //======================================================================

    $('.reg-url').on('click', function () {
        $('.login-form').removeClass('visible-form');
        $('.login-form').addClass('hidde-form');
        $('.registration-form').addClass('visible-form');
        $('.registration-form').removeClass('hidde-form');
    })

    $('.back-url').on('click', function () {
        $('.registration-form').removeClass('visible-form');
        $('.registration-form').addClass('hidde-form');
        $('.login-form').addClass('visible-form');
        $('.login-form').removeClass('hidde-form');
    })

    //=======================================================================

    $('#icon').on('click', function () {
        $('body').css('overflow', 'hidden');
        $('.modal-search-header').addClass('show-modal-search');

    });

    $('.btn-hide-modal-search').on('click', function () {
        $('.modal-search-header').removeClass('show-modal-search');
        $('body').css('overflow', '');
    });

    $('.input100').on('click', function () {
        $('.input100').css('border', '');
        $('.txt1').text("ᅠ");
    });

    //Login button
    $('.login-form .login100-form-btn').on('click', function () {
        //let email = $('.registration-form input[name="email"]')[0].value;
        let email = $('.login-form input[name="email"]')[0].value; // document.getElementsByName("email")[0].value;
        let pass = $('.login-form input[name="pass"]')[0].value; //document.getElementsByName("pass")[0].value;
        $.ajax({
            url: '/Home/isAuthorization/")',
            method: 'POST',
            data: { Email: email, Pass: pass },
            success: function (response) {
                if (response && response.isAuthorization) {
                    $.ajax({
                        url: '/Login/Login/',
                        method: 'POST',
                        data: {
                            Email: email
                        },
                        success: function () {
                            location.href = $(location).attr('pathname').toLowerCase();
                        }
                    });
                }
                else {
                    $('.login-form .input100').css('border', '2px solid red');
                    /*Неправильный логин или пароль*/
                    $('.login-form .txt1').text("Incorrect login or password");
                    return false;
                }
            },
            error: function (err) {
                /*Ошибка входа*/
                $('.login-form .input100').css('border', '2px solid red');
                $('.login-form .txt1').text("Connection error");
                return false;
            }
        });
        return false;
    });


    //Registration button
    $('.registration-form .input100').on('click', function () {
        $('.registration-form .txt1').text("ᅠ");
    });

    $('.registration-form .login100-form-btn').on('click', function () {
        let name = $('.registration-form input[name="name"]')[0].value;
        let surname = $('.registration-form input[name="surname"]')[0].value;
        let email = $('.registration-form input[name="email"]')[0].value;
        let pass = $('.registration-form input[name="pass"]')[0].value;
        let repass = $('.registration-form input[name="repass"]')[0].value;

        if (validateName('.registration-form input[name="name"]') && validateName('.registration-form input[name="surname"]')
            && validateEmail('.registration-form input[name="email"]') && validatePassword('.registration-form input[name="pass"]') && pass == repass) {

            $.ajax({
                url: '/Home/Registration/',
                method: 'POST',
                data: {
                    Name: name,
                    Surname: surname,
                    Email: email,
                    Pass: pass
                },
                success: function (response) {
                    switch (response.Registration) {
                        case "#code1": // успех
                            $.ajax({
                                url: '/Login/Login/',
                                method: 'POST',
                                data: {
                                    Email: email
                                },
                                success: function () {
                                    location.href = $(location).attr('pathname').toLowerCase();
                                }
                            });
                            return true;
                        case "#code2": // не удалось записать в бд
                            $('.registration-form .txt1').text("Не удалось записать в базу");
                            return false;
                        case "#code3": // email существует
                            $('.registration-form .txt1').text("Эмейл уже существует");
                            return false;
                    }
                },
                error: function (err) {
                    /*Ошибка входа*/
                    $('.registration-form .txt1').text("Connection error");
                    return false;
                }

            });
        }
        else
            $('.registration-form .txt1').text("Не верно заполнены данные для регистрации");

        return false;
    });

    $('#imgLogin').on('click', function () {
        $.ajax({
            url: '/Login/Logout/")',
            method: 'GET',
            success: function (response) {
                location.href = $(location).attr('pathname').toLowerCase();
            }
        });
    });


    //======================================================================

    $('.registration-form input[name="name"]').on('change', function () {
        if (!validateName('.registration-form input[name="name"]')
            && $('.registration-form input[name="name"]')[0].value.length > 0) {
            showValidate('.registration-form input[name="name"]');
        }
        else {
            hideValidate('.registration-form input[name="name"]');
        }
    });

    $('.registration-form input[name="name"]').on('click', function () {
        hideValidate('.registration-form input[name="name"]');
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }


    $('.registration-form input[name="surname"]').on('change', function () {
        if (!validateName('.registration-form input[name="surname"]')
            && $('.registration-form input[name="surname"]')[0].value.length > 0) {
            showValidate('.registration-form input[name="surname"]');
        }
        else {
            hideValidate('.registration-form input[name="surname"]');
        }
    });

    $('.registration-form input[name="surname"]').on('click', function () {
        hideValidate('.registration-form input[name="surname"]');
    });

    function validateName(input) {
        if ($(input).val().match(/^[А-Я][а-яё]{2,15}$/) == null) {
            return false;
        }
        return true;
    }

    $('.registration-form input[name="email"]').on('change', function () {
        if (!validateEmail('.registration-form input[name="email"]')
            && $('.registration-form input[name="email"]')[0].value.length > 0) {
            showValidate('.registration-form input[name="email"]');
        }
        else {
            hideValidate('.registration-form input[name="email"]');
        }
    });

    $('.registration-form input[name="email"]').on('click', function () {
        hideValidate('.registration-form input[name="email"]');
    });

    function validateEmail(input) {
        if ($(input).val().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            return false;
        }
        return true;
    }

    $('.registration-form input[name="pass"]').on('change', function () {
        if (!validatePassword('.registration-form input[name="pass"]')) {
            showValidate('.registration-form input[name="pass"]');
        }
        else {
            hideValidate('.registration-form input[name="pass"]');
        }
    });

    $('.registration-form input[name="pass"]').on('click', function () {
        hideValidate('.registration-form input[name="pass"]');
    });

    function validatePassword(input) {
        if ($(input).val().match(/^[A-Za-z0-9._+]{6,16}$/) == null) {
            return false;
        }
        return true;
    }

    $('.registration-form input[name="repass"]').on('change', function () {
        if ($('.registration-form input[name="repass"]')[0].value != $('.registration-form input[name="pass"]')[0].value) {
            showValidate('.registration-form input[name="repass"]');
        }
        else {
            hideValidate('.registration-form input[name="repass"]');
        }
    });


    /*==================================================================
    [ Fixed Header ]*/
    var headerDesktop = $('.container-menu-desktop');
    var wrapMenu = $('.wrap-menu-desktop');
    var posWrapHeader = 0;


    if ($(window).scrollTop() > posWrapHeader) {
        $(headerDesktop).addClass('fix-menu-desktop');
        $(wrapMenu).css('top', 0);
    }
    else {
        $(headerDesktop).removeClass('fix-menu-desktop');
        $(wrapMenu).css('top', posWrapHeader - $(this).scrollTop());
    }

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > posWrapHeader) {
            $(headerDesktop).addClass('fix-menu-desktop');
            $(wrapMenu).css('top', 0);
        }
        else {
            $(headerDesktop).removeClass('fix-menu-desktop');
            $(wrapMenu).css('top', posWrapHeader - $(this).scrollTop());
        }
    });

    //===========================================================================

    /*==================================================================
   [ Isotope ]*/
    var $topeContainer = $('.isotope-grid');
    var $topeContainerIndex = $('.isotope-grid-index');
    var $filter = $('.filter-tope-group');

    // filter items on button click
    $filter.each(function () {
        $filter.on('click', 'button', function () {
            let filterValue = $(this).attr('data-filter');
            $topeContainer.isotope({ filter: filterValue });
        });

    });

    var qsRegex;

    // init Isotope
    $(window).on('load', function () {
        var $grid = $topeContainer.each(function () {
            $(this).isotope({
                itemSelector: '.isotope-item',
                layoutMode: 'fitRows',

                getSortData: {
                    defaultSort: function (itemElem) {
                        var defaultSort = $(itemElem).find('.js-show-modal1').attr('data-id');
                        if (defaultSort != undefined)
                            return parseInt(defaultSort.replace(/[\(\)]/g, ''));

                    },
                    priceSort: function (itemElem) {
                        var priceSort = $(itemElem).find('.price-sort').text();
                        return parseFloat(priceSort.replace(/[\(\)]/g, ''));
                    }
                },
                filter: function () {
                    return qsRegex ? $(this).text().match(qsRegex) : true;
                }
            });
        });
    });

    var $quicksearch = $('.search-field').keyup(debounce(function () {
        qsRegex = new RegExp($quicksearch.val(), 'gi');
        $topeContainer.isotope();
    }, 200));

    function debounce(fn, threshold) {
        var timeout;
        threshold = threshold || 100;
        return function debounced() {
            clearTimeout(timeout);
            var args = arguments;
            var _this = this;
            function delayed() {
                fn.apply(_this, args);
            }
            timeout = setTimeout(delayed, threshold);
        };
    }

    var isotopeButton = $('.filter-tope-group button');

    $(isotopeButton).each(function () {
        $(this).on('click', function () {
            for (var i = 0; i < isotopeButton.length; i++) {
                $(isotopeButton[i]).removeClass('how-active1');
            }

            $(this).addClass('how-active1');
        });
    });

    var filterLink = $('.filter-topic-group a');

    $(filterLink).each(function () {
        $(this).on('click', function () {
            for (var i = 0; i < filterLink.length; i++) {
                $(filterLink[i]).removeClass('filter-link-active');
            }

            $(this).addClass('filter-link-active');
            let sort = $(this).attr('data-sort');
            $topeContainer.isotope({ sortBy: sort, sortAscending: $(this).attr('data-ascending') == 'true' });

        });
    });

    var filterPriceLink = $('.filter-price-group a');

    $(filterPriceLink).each(function () {
        $(this).on('click', function () {
            for (var i = 0; i < filterPriceLink.length; i++) {
                $(filterPriceLink[i]).removeClass('filter-link-active');
            }

            $(this).addClass('filter-link-active');
            let type = $(this).text().trim();
            $topeContainer.isotope({
                filter: function () {
                    var number = $(this).find('.price-sort').text();
                    if (type == "$0.00 - $50.00")
                        return parseInt(number) >= 0 && parseInt(number) <= 50;
                    else if (type == "$50.00 - $100.00")
                        return parseInt(number) > 50 && parseInt(number) <= 100;
                    else if (type == "$100.00 - $150.00")
                        return parseInt(number) > 100 && parseInt(number) <= 500;
                    else if (type == "$150.00 - $200.00")
                        return parseInt(number) > 500 && parseInt(number) <= 3500;
                    else if (type == "$200.00+")
                        return parseInt(number) > 3500;
                    else
                        return parseInt(number);

                }
            });

        });
    });

    /*==================================================================
    [ Filter / Search product ]*/
    $('.js-show-filter').on('click', function () {
        $(this).toggleClass('show-filter');
        $('.panel-filter').slideToggle(400);

        if ($('.js-show-search').hasClass('show-search')) {
            $('.js-show-search').removeClass('show-search');
            $('.panel-search').slideUp(400);
        }
    });

    $('.js-show-search').on('click', function () {
        $(this).toggleClass('show-search');
        $('.panel-search').slideToggle(400);

        if ($('.js-show-filter').hasClass('show-filter')) {
            $('.js-show-filter').removeClass('show-filter');
            $('.panel-filter').slideUp(400);
        }
    });

    $('.change-product').on('click', function (e) {
        $('#add-field').addClass('show-modal1');
        $('body').css('overflow', 'hidden');
        $('#add-field input[name="id"]')[0].value = $(event.target).attr('data-id');
        $('#add-field input[name="name"]')[0].value = $(event.target).attr('data-name');
        $('#add-field input[name="price"]')[0].value = $(event.target).attr('data-price');
        $('#add-field input[name="count"]')[0].value = $(event.target).attr('data-count');
        $('#add-field textarea[name="desc"]')[0].value = $(event.target).attr('data-description');
        $('#add-field select[name="cat"] :nth-child(' + $(event.target).attr("data-categoryId") + ')').attr("selected", "selected");
        });

    /*==================================================================
    [ Cart ]*/
    $('.js-show-cart').on('click', function () {
        $('.js-panel-cart').addClass('show-header-cart');
    });

    $('.js-hide-cart').on('click', function () {
        $('.js-panel-cart').removeClass('show-header-cart');
    });

    /*==================================================================
    [ Cart ]*/
    $('.js-show-sidebar').on('click', function () {
        $('.js-sidebar').addClass('show-sidebar');
    });

    $('.js-hide-sidebar').on('click', function () {
        $('.js-sidebar').removeClass('show-sidebar');
    });

    /*==================================================================
    [ +/- num product ]*/
    $('.btn-num-product-down').on('click', function () {
        var numProduct = Number($(this).next().val());
        if (numProduct > 1) $(this).next().val(numProduct - 1);
    });

    $('.btn-num-product-up').on('click', function () {
        var numProduct = Number($(this).prev().val());
        if ($(this).prev().val() < 10)
            $(this).prev().val(numProduct + 1);
    });

    $('.btn-num-product-down-total').on('click', function () {
        var numProduct = Number($(this).next().val());
        if (numProduct > 1) {
            $(this).next().val(numProduct - 1);
            $('.total-prod-price.idx-' + $(this).attr('data-id')).text(parseFloat($('.total-prod-price.idx-' + $(this).attr('data-id')).attr('data-price')) * parseInt(numProduct - 1));
            updateTotalSum();
        }
    });

    $('.btn-num-product-up-total').on('click', function () {
        var numProduct = Number($(this).prev().val());
        if ($(this).prev().val() < 10) {
            $(this).prev().val(numProduct + 1);
            $('.total-prod-price.idx-' + $(this).attr('data-id')).text(parseFloat($('.total-prod-price.idx-' + $(this).attr('data-id')).attr('data-price')) * parseInt(numProduct + 1));
            updateTotalSum();
        }
    });

    function updateTotalSum() {
        let totalSum = $('.total-prod-price');
        let sum = 0;
        for (let i = 0; i < totalSum.length; i++)
            sum += parseFloat($(totalSum[i]).text().replace(',', '.'));
        $('#total-price-id').text(sum.toString().replace(',','.'));
    }

    $('.how-itemcart1').on('click', function () {
        $(this).parent().parent().remove();
        updateTotalSum();
    })

    $('.buy-button').on('click', function () {

        var message = "";
        let name = $('.column-2');
        let count = $('input[name="num-product1"]');
        let totalSum = $('.total-prod-price');

        for (var i = 0; i < totalSum.length; i++) {
            message += i + 1 + ". " + $(name[i + 1]).text() + " " + count[i].value + "шт. " + $(totalSum[i]).text() + "$|";
        }


        message += "Тип доставки: " + $('select[name="receipt"]').val() + "|";
        if ($('select[name="receipt"]').val() == "Delivery") {
            message += "Адрес: " + $('input[name="state"]').val() + "|";
        }
        message += "Итого: " + $('#total-price-id').text() + "$|";

        $.ajax({
            url: '/Home/BuyProductMail/',
            method: 'POST',
            data: {
                Message: message
            }
        });
        alert("Товар приобретён. С вами свяжется сотрудник магазина для подтверждения данных!");
        location.href = "/ru/";
        
    })

    /*==================================================================
    [ Rating ]*/
    $('.wrap-rating').each(function () {
        var item = $(this).find('.item-rating');
        var rated = -1;
        var input = $(this).find('input');
        $(input).val(0);

        $(item).on('mouseenter', function () {
            var index = item.index(this);
            var i = 0;
            for (i = 0; i <= index; i++) {
                $(item[i]).removeClass('zmdi-star-outline');
                $(item[i]).addClass('zmdi-star');
            }

            for (var j = i; j < item.length; j++) {
                $(item[j]).addClass('zmdi-star-outline');
                $(item[j]).removeClass('zmdi-star');
            }
        });

        $(item).on('click', function () {
            var index = item.index(this);
            rated = index;
            $(input).val(index + 1);
        });

        $(this).on('mouseleave', function () {
            var i = 0;
            for (i = 0; i <= rated; i++) {
                $(item[i]).removeClass('zmdi-star-outline');
                $(item[i]).addClass('zmdi-star');
            }

            for (var j = i; j < item.length; j++) {
                $(item[j]).addClass('zmdi-star-outline');
                $(item[j]).removeClass('zmdi-star');
            }
        });
    });



    /*==================================================================*/

    $('.btn-modal-add').on('click', function (e) {

        var total = parseFloat($('#total-price').text().replace(',','.'));
        
        total += parseFloat($('.wrap-num-product input[name="num-product"]')[0].value) * parseFloat($('.price-modal').text().trim().substr(1).replace(",", "."));
        $('#total-price')[0].innerHTML = total + '';

        if ($('#basket-' + $(this).attr('data-id')).val() != null) {
            var old = parseInt($('#basket-' + $(this).attr('data-id')).html(), 10);
            
            var newC = old + parseInt($('.wrap-num-product input[name="num-product"]')[0].value, 10);
            $('#basket-' + $(this).attr('data-id'))[0].innerHTML = newC + '';
            $('.wrap-num-product input[name="num-product"]')[0].value = 1;

            $.ajax({
                url: '/Home/EditPoductInBasket/',
                method: 'POST',
                data: {
                    IdProduct: $(this).attr('data-id'),
                    CountProd: newC + ''
                }
            });
            $('.wrap-num-product input[name="num-product"]')[0].value = 1;
            alert("Товар уже был в корзине. Значение товара обновлено");
            return;
        }
        $('.header-cart-wrapitem').html($('.header-cart-wrapitem').html() +
            "<li class= 'header-cart-item flex-w flex-t m-b-12' id='li-" + $(this).attr('data-id') + "'>" +
            "<div class='header-cart-item-img' onclick='deleteOne(" + $(this).attr('data-id') + "," + (parseFloat($('.wrap-num-product input[name="num-product"]')[0].value) * parseFloat($('.price-modal').text().replace(',', '.').replace('$', ''))) + ")'>" +
            "<img src='" + $('.img-modal').attr('src').trim() + "' alt='IMG'>" +
            "</div>" +

            "<div class='header-cart-item-txt p-t-8'>" +
            "<a href='#' class='header-cart-item-name m-b-18 hov-cl1 trans-04'>" +
            $('.name-modal').text().trim() + // название
            "</a>" +

            "<span class='header-cart-item-info' data-id='" + $(this).attr('data-id') + "'>" +
            "<span id='basket-" + $(this).attr('data-id') + "'>" + $('.wrap-num-product input[name="num-product"]')[0].value + "</span>"  + " x " + $('.price-modal').text().trim()+
            "</span>" +
            "</div>" +
            "</li> <script> function deleteOne(id, price) { $('.icon-header-noti').attr('data-notify', parseInt($('.icon-header-noti').attr('data-notify')) - 1); $('#total-price').text((parseFloat($('#total-price').text().replace(',', '.')) - price).toString().replace('.',',')); document.getElementById('li-' + id).remove(); $.ajax({ url: '/Home/DelPoductInBasket/', method: 'POST', data: { IdProduct: id }});}  </script>");

        $.ajax({
            url: '/Home/AddPoductInBasket/',
            method: 'POST',
            data: {
                IdProduct: $(this).attr('data-id'),
                CountProd: $('.wrap-num-product input[name="num-product"]')[0].value
            }
        });
        $('.icon-header-noti').attr('data-notify', parseInt($('.icon-header-noti').attr('data-notify')) + 1);
        alert("Товар добавлен в корзину");
        $('.wrap-num-product input[name="num-product"]')[0].value = 1;
            //отправка добавления в DataShopModel
    });

    /*==================================================================
    [ Show modal1 ]*/
    $('.js-show-modal1').on('click', function (e) {
        e.preventDefault();
        $('.id-modal').text($(event.target).attr('data-id'));
        $('.name-modal').text($(event.target).attr('data-name'));
        $('.img-modal').attr('src', "/../../images/load/"+$(event.target).attr('data-url'));
        $('.description-modal').text($(event.target).attr('data-description'));
        $('.price-modal').text("$" + $(event.target).attr('data-price'));
        $('#view-modal').addClass('show-modal1');
        $('.btn-modal-add').attr('data-id', $(event.target).attr('data-id'));
        $('body').css('overflow', 'hidden');
    });

    $('.js-hide-modal1').on('click', function () {
        $('.js-modal1').removeClass('show-modal1');
        $('body').css('overflow', '');
    });

    //===================================================================================
    $('.add-items').on('click', function (e) {
        e.preventDefault();
        $('#add-field').addClass('show-modal1');
        $('body').css('overflow', 'hidden');
    });


    //--------------------------------------------------
    //add Product

    $('.create-prodict .login100-form-btn').on('click', function () {

        let name = $('.create-prodict input[name="name"]')[0].value;
        let price = $('.create-prodict input[name="price"]')[0].value;
        let count = $('.create-prodict input[name="count"]')[0].value;
        let desc = $('textarea#desc').val();
        let cat = $('select[name="cat"]').val();
        let id = $('.create-prodict input[name="id"]')[0].value;


        var files = document.getElementById('file').files;

        var data = new FormData();
        data.append("file", files[0]);
        data.append("name", name);
        data.append("price", price);
        data.append("count", count);
        data.append("desc", desc);
        data.append("cat", cat);
        data.append("id", id);

        $.ajax({
            url: '/Home/CreateProduct/',
            method: 'POST',
            contentType: false,
            processData: false,
            data: data,
            success: function (response) {
                switch (response.CreateProduct) {
                    case "#code1": // успех
                        alert("Успешно");
                        location.href = $(location).attr('pathname').toLowerCase();
                        return true;
                    case "#code2":
                        alert("Продукт с таким именем уже существует");
                        return false;
                    case "#code3":
                        alert("Такая картинка уже есть");
                        return false;
                    case "#code4":
                        alert("Ошибка подключения бд");
                        return false;
                    case "#code5":
                        alert("Продукт изменен");
                        location.href = $(location).attr('pathname').toLowerCase();
                        return true;
                }
            },
            error: function (err) {
                /*Ошибка входа*/
                $('.input100').css('border', '2px solid red');
                $('.txt1').text("Connection error");
                return false;
            }
        });

        return true;
    });


    //create-product-button

    $('#create-product-button').on('click', function () {
        $('.create-prodict input[name="name"]')[0].value = null;
        $('.create-prodict input[name="price"]')[0].value = null;
        $('.create-prodict input[name="count"]')[0].value = null;
        $('textarea#desc')[0].value = null;
        $('.create-prodict input[name="id"]')[0].value = 0;

        return true;
    });
    
    $('#crealBasketBtn').on('click', function () {
        $('.header-cart-wrapitem')[0].innerHTML = null;
        $('#total-price').text('0');
        $.ajax({
            url: '/Home/BuyProduct/',
            method: 'POST'
        });
        $('.icon-header-noti').attr('data-notify', 0);
        return true;
    });

    //SendBtn
    $('#SendBtn').on('click', function () {
        var message = $('textarea#msg').val();

        $.ajax({
            url: '/Home/SendMessage/',
            method: 'POST',
            data: {
                Message: message
            }
        });
        alert("Отзыв оставлен");
        location.href = "/ru/";
    });



})(jQuery);



