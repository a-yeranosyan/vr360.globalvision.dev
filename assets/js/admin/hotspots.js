$(function () {
    var krpano = document.getElementById('krpanoSWFObject');
    var timeout, clicker = $("#pano");
    var oldX, oldY;
    //----- OPEN
    clicker.mousedown(function (e) {
        oldX = e.pageX;
        oldY = e.pageY;
        if (allow) {
            timeout = setInterval(function () {
                var targeted_popup_class = jQuery(this).attr('data-popup-open');
                $('[data-popup=popup-1]').fadeIn(350);
                var x = e.pageX;
                var y = e.pageY;
                krpano.call("screentosphere(mouse.x,mouse.y,m_ath,m_atv);");
                $(".popup-inner#popup").css({left: x, top: y});
                $(".show-message-for-click").hide();
                e.preventDefault();
            }, 500);

            clicker.mousemove(function (event) {
                if (event.pageX != oldX || event.pageY != oldY) {
                    clearInterval(timeout);
                }
            });
        }
        return false;
    });

    $(document).mouseup(function () {
        if (allow) {
            clearInterval(timeout);
        }
        return false;
    });

    //----- CLOSE
    $('[data-popup-close]').on('click', function (e) {

        $('#text_div').hide();
        $('#Tooltip_div').hide();
        $('#modal_div').hide();
        $('#video_div').hide();
        $('#image_div').hide();
        $('#link_div').hide();
        $('#open-add-hot').hide();
        $(".show-message-for-click").show();
        $('#edit-remove-move').hide();
        $('#text_div_edit').hide();
        enableButton(['#edit_hotpost', '#move_hotspot', '#devare_hotpost'])
        disableButton(['#edit_text', '#edit_Tooltip', '#edit_modal', '#edit_image', '#edit_video', '#edit_link'])
        enableButton(['#set_defaultView', '#add_hotpost'])
        enableButton(['#add_text', '#add_Tooltip', '#add_Modal', '#add_image', '#add_video', '#add_link']);

        var targeted_popup_class = jQuery(this).attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(0);
        e.preventDefault();
    });
});

$(document).ready(function () {
    $('.selectpicker').selectpicker();
});

var text_textarea = $('#text_text').sceditor({
    resizeEnabled: false,
    format: 'bbcode',
    icons: 'monocons',
    resizeMaxWidth: '265px',
    emoticonsRoot: '/assets/redactor/',
    style: 'assets/redactor/minified/themes/content/default.min.css'
}).sceditor('instance');

var htmlToBBCode = function (html) {

    html = html.replace(/<pre(.*?)>(.*?)<\/pre>/gmi, "[code]$2[/code]");

    html = html.replace(/<h[1-7](.*?)>(.*?)<\/h[1-7]>/, "\n[h]$2[/h]\n");

    //paragraph handling:
    //- if a paragraph opens on the same line as another one closes, insert an extra blank line
    //- opening tag becomes two line breaks
    //- closing tags are just removed
    // html += html.replace(/<\/p><p/<\/p>\n<p/gi;
    // html += html.replace(/<p[^>]*>/\n\n/gi;
    // html += html.replace(/<\/p>//gi;

    html = html.replace(/<br(.*?)>/gi, "\n");
    html = html.replace(/<textarea(.*?)>(.*?)<\/textarea>/gmi, "\[code]$2\[\/code]");
    html = html.replace(/<b>/gi, "[b]");
    html = html.replace(/<i>/gi, "[i]");
    html = html.replace(/<u>/gi, "[u]");
    html = html.replace(/<\/b>/gi, "[/b]");
    html = html.replace(/<\/i>/gi, "[/i]");
    html = html.replace(/<\/u>/gi, "[/u]");
    html = html.replace(/<em>/gi, "[b]");
    html = html.replace(/<\/em>/gi, "[/b]");
    html = html.replace(/<strong>/gi, "[b]");
    html = html.replace(/<\/strong>/gi, "[/b]");
    html = html.replace(/<cite>/gi, "[i]");
    html = html.replace(/<\/cite>/gi, "[/i]");
    html = html.replace(/<font color="(.*?)">(.*?)<\/font>/gmi, "[color=$1]$2[/color]");
    html = html.replace(/<font color=(.*?)>(.*?)<\/font>/gmi, "[color=$1]$2[/color]");
    html = html.replace(/<link(.*?)>/gi, "");
    html = html.replace(/<li(.*?)>(.*?)<\/li>/gi, "[*]$2");
    html = html.replace(/<ul(.*?)>/gi, "[list]");
    html = html.replace(/<\/ul>/gi, "[/list]");
    html = html.replace(/<div>/gi, "\n");
    html = html.replace(/<\/div>/gi, "\n");
    html = html.replace(/<td(.*?)>/gi, " ");
    html = html.replace(/<tr(.*?)>/gi, "\n");

    html = html.replace(/<img(.*?)src="(.*?)"(.*?)>/gi, "[img]$2[/img]");
    html = html.replace(/<a(.*?)href="(.*?)"(.*?)>(.*?)<\/a>/gi, "[url=$2]$4[/url]");

    html = html.replace(/<head>(.*?)<\/head>/gmi, "");
    html = html.replace(/<object>(.*?)<\/object>/gmi, "");
    html = html.replace(/<script(.*?)>(.*?)<\/script>/gmi, "");
    html = html.replace(/<style(.*?)>(.*?)<\/style>/gmi, "");
    html = html.replace(/<title>(.*?)<\/title>/gmi, "");
    html = html.replace( / <!--(.*?)-->/gmi, "\n");

    html = html.replace(/\/\//gi, "/");
    html = html.replace(/http:\//gi, "http://");

    html = html.replace(/<(?:[^>'"]*|(['"]).*?\1)*>/gmi, "");
    html = html.replace(/\r\r/gi, "");
    html = html.replace(/\[img]\//gi, "[img]");
    html = html.replace(/\[url=\//gi, "[url=");

    html = html.replace(/(\S)\n/gi, "$1 ");

    return html;
}