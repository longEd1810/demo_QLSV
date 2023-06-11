(function ($) {
    'use strict';

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass('open');
        return false;
    });
    /* Upload File*/
    $('#upload').change(function () {
        const form = new FormData();
        form.append('file', $(this)[0].files[0]);
        $.ajax({
            processData: false,
            contentType: false,
            type: 'POST',
            dataType: 'JSON',
            data: form,
            url: 'student/uploads/image',
            success: function (results) {
                if (results.error === false) {
                    $('.remove').remove();
                    $('#image_show').html(
                        '<a href="' +
                            results.url +
                            '" target="_blank" ><img src="' +
                            results.url +
                            '" height="200px" alt="' +
                            results.name +
                            '"></a>',
                    );
                    $('#thumb').val(results.url);
                } else {
                    alert('Upload file không thành công');
                }
            },
        });
        $(document).ready(function () {
            $('#select')
                .on('change', function () {
                    $('.input-show').hide();
                    $('#' + $(this).val()).fadeIn(700);
                })
                .change();
        });
    });
})(jQuery);

$(document).ready(function () {
    $('#select')
        .on('change', function () {
            $('.input-show').hide();
            $('#' + $(this).val()).fadeIn(700);
        })
        .change();
});
function removeRow(id, url) {
    if (confirm('Xoá mà không thể khôi phục. Bạn có chắc chắn không ?')) {
        $.ajax({
            type: 'DELETE',
            datatype: 'JSON',
            data: { id },
            url: url,
            success: function (result) {
                if (result.error === false) {
                    alert(result.message);
                    location.reload();
                } else {
                    alert('Đã có lỗi xảy ra. Vui lòng thử lại');
                }
            },
        });
    }
}
function submitForms() {
    document.getElementById('form1').submit();
    document.getElementById('form2').submit();
}
