/* Navbar scroll */
$(function () {

    var nav = $('.navbar'),
        doc = $(document),
        win = $(window);

    win.scroll(function () {

        if (doc.scrollTop() > 80) {
            nav.addClass('scrolled');
        } else {
            nav.removeClass('scrolled');
        }

    });

    win.scroll();

});


/* ***** Btn More-Less ***** */
$("#more").click(function () {
    var $this = $(this);
    $this.toggleClass('more');
    if ($this.hasClass('more')) {
        $this.text('More');
    } else {
        $this.text('Less');
    }
});




/* ***** Slideanim  ***** */
$(window).scroll(function () {
    $(".slideanim").each(function () {
        var pos = $(this).offset().top;

        var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
            $(this).addClass("slide");
        }
    });
});

$('.carousel').carousel({
    interval: 4000,
    pause: 'hover'
});




/* ***** Smooth Scrolling  ***** */
$(document).ready(function () {
    $(".navbar a, #service a").on('click', function (event) {

        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function () {

                window.location.hash = hash;
            });
        }
    });


    /* ***** Scroll to Top ***** */
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 300) {
            $('.to-top').fadeIn(200);
        } else {
            $('.to-top').fadeOut(200);
        }
    });
    $('.to-top').click(function () {
        $('.body,html').animate({
            scrollTop: 0
        }, 500);
    });

})

$(document).ready(function () {
    // Hide thank you message initially
    $('#thankYouMessage').hide();

    // Handle form submission
    $('#newsletterForm').submit(function (e) {
        e.preventDefault();

        // Here you would typically send the data to your server
        // For this example, we'll just show the thank you message
        $(this).hide();
        $('#thankYouMessage').fadeIn();

        // Scroll to thank you message
        $('html, body').animate({
            scrollTop: $('#thankYouMessage').offset().top - 100
        }, 500);
    });

    // Initialize carousel
    $('.carousel').carousel({
        interval: 5000
    });
});

$(document).ready(function () {
    // Generate random card number
    function generateRandomNumber() {
        return Math.floor(100000 + Math.random() * 900000);
    }

    // Set random numbers
    $('#randomDigits').text(generateRandomNumber());
    $('#generatedNumber').text(generateRandomNumber());

    // Hide success message initially
    $('#signupSuccess').hide();

    // Handle form submission
    $('#loyaltyForm').submit(function (e) {
        e.preventDefault();

        // Here you would typically send the data to your server
        // For this example, we'll just show the success message
        $(this).hide();
        $('#signupSuccess').fadeIn();

        // Scroll to success message
        $('html, body').animate({
            scrollTop: $('#signupSuccess').offset().top - 100
        }, 500);
    });

    // Card flip animation
    $('#flipCard').click(function () {
        $('.card-front').toggleClass('flipped');
        if ($('.card-front').hasClass('flipped')) {
            $(this).text('View Front of Card');
            $('.card-front .card-header h4').text('Terms & Conditions');
            $('.card-front .card-body').html(
                '<div class="card-terms"><p>1. Present card at checkout</p><p>2. 1 point per £1 spent</p><p>3. 100 points = £5 discount</p><p>4. Points never expire</p></div>'
            );
            $('.card-front .card-footer small').text('See staff for full terms');
        } else {
            $(this).text('View Back of Card');
            $('.card-front .card-header h4').text('Organic ME');
            $('.card-front .card-header p').text('Loyalty Card');
            $('.card-front .card-body').html(
                '<div class="card-barcode"></div><div class="card-number">OM-<span id="randomDigits">' +
                generateRandomNumber() + '</span></div>');
            $('.card-front .card-footer small').text('Valid at Organic ME, Kelso');
        }
    });
});

$(document).ready(function () {
    // Handle category selection
    $('.category-card').click(function () {
        $('.category-card').removeClass('active');
        $(this).addClass('active');

        var category = $(this).data('category');
        $('.course-group').hide();
        $('.' + category + '-courses').fadeIn();
    });

    // Handle modal content
    $('#courseModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var title = button.data('title');
        var desc = button.data('desc');
        var date = button.data('date');
        var time = button.data('time');
        var price = button.data('price');
        var image = button.data('image');

        var modal = $(this);
        modal.find('.modal-title').text(title);
        modal.find('#modalCourseTitle').text(title);
        modal.find('#modalCourseDesc').text(desc);
        modal.find('#modalCourseDate').text(date);
        modal.find('#modalCourseTime').text(time);
        modal.find('#modalCoursePrice').text(price);
        modal.find('#modalCourseImage').attr('src', image);

        // Generate learning points based on course
        var learnings = [];
        if (title.includes("Introduction")) {
            learnings = [
                "Understanding soil health and composition",
                "Organic pest control methods",
                "Composting techniques",
                "Seasonal planting guide"
            ];
        } else if (title.includes("Container")) {
            learnings = [
                "Selecting the right containers",
                "Best plants for container gardening",
                "Organic feeding schedules",
                "Space optimization techniques"
            ];
        } else if (title.includes("Vegetable")) {
            learnings = [
                "Advanced crop rotation",
                "Companion planting strategies",
                "Natural pest management",
                "Season extension methods"
            ];
        } else if (title.includes("Beekeeping")) {
            learnings = [
                "Bee biology and behavior",
                "Hive setup and maintenance",
                "Swarm control techniques",
                "Honey harvesting methods"
            ];
        } else if (title.includes("Permaculture")) {
            learnings = [
                "Permaculture principles and ethics",
                "Zone and sector planning",
                "Water harvesting techniques",
                "Creating food forests"
            ];
        } else if (title.includes("Smallholding")) {
            learnings = [
                "Livestock management basics",
                "Pasture rotation systems",
                "Organic certification process",
                "Marketing your produce"
            ];
        }

        var learningsList = $('#modalCourseLearnings');
        learningsList.empty();
        learnings.forEach(function (item) {
            learningsList.append('<li>' + item + '</li>');
        });
    });

    // Handle booking from modal
    $('#bookThisCourse').click(function () {
        var courseTitle = $('#modalCourseTitle').text();
        $('#courseSelect').val(function () {
            if (courseTitle.includes("Introduction")) return "intro";
            if (courseTitle.includes("Container")) return "container";
            if (courseTitle.includes("Vegetable")) return "vegetable";
            if (courseTitle.includes("Beekeeping")) return "beekeeping";
            if (courseTitle.includes("Permaculture")) return "permaculture";
            if (courseTitle.includes("Smallholding")) return "smallholding";
            return "";
        }).trigger('change');

        $('#courseModal').modal('hide');
        $('html, body').animate({
            scrollTop: $('#courseSignupForm').offset().top - 100
        }, 500);
    });

    // Handle form submission
    $('#courseSignupForm').submit(function (e) {
        e.preventDefault();

        // Here you would typically send the data to your server
        // For this example, we'll just show the success message
        $(this).hide();
        $('#courseSignupSuccess').fadeIn();

        // Scroll to success message
        $('html, body').animate({
            scrollTop: $('#courseSignupSuccess').offset().top - 100
        }, 500);
    });
});