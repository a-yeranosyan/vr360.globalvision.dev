var allow = true;

function isAllowAddHotspot(isAllowAddHotspot) {
	if (isAllowAddHotspot == 'false') isAllowAddHotspot = false;
	allow = isAllowAddHotspot;
}


function disableButton(elements) {
	if (jQuery.isArray(elements)) {
		jQuery.each(elements, function (index, element) {
			console.log(element);
			jQuery(element).attr('disabled', 'disabled');
			jQuery(element).hide();
		})
	}
	else {
		jQuery(elements).attr('disabled', 'disabled');
		jQuery(elements).hide();
	}
}

function enableButton(elements) {
	if (jQuery.isArray(elements)) {
		jQuery.each(elements, function (index, element) {
			jQuery(element).removeAttr('disabled');
			jQuery(element).show();
		})
	}
	else {
		jQuery(element).removeAttr('disabled');
		jQuery(element).show();
	}
}

/**
 *
 * @param el
 * @returns {boolean}
 */
function saveHotspot(el) {
	var type = jQuery(el).data('hotspot-type');

	if (type == '') {
		return false;
	}

	i += 1;
	uniqname = "spot_new_" + i;

	// krpano.call("screentosphere(mouse.x,mouse.y,m_ath,m_atv);");
	var scene_num = krpano.get('scene.count');
	var current_scene = krpano.get('xml.scene');
	var posX = krpano.get('m_ath');
	var posY = krpano.get('m_atv');

	// hotspots[uniqname] = r; //JSON.parse(r);
	krpano.call("addhotspot(" + uniqname + ");");

	if (typeof currentHotspotData == 'undefined') {
		currentHotspotData = {};
		currentHotspotData.ath = krpano.get('view.hlookat');
		currentHotspotData.atv = krpano.get('view.vlookat');
	}
	else {
		// THIS HOTSPOT HAVE ADDITIONAL DATA FROM HOTSPOT LIST

		// if (currentHotspotData.hotspot_type == 'normal') {
		// 	krpano.call("set(hotspot[" + uniqname + "].linkedscene, " + currentHotspotData.linkedscene + ");");
		// }
		// if (currentHotspotData.hotspot_type == 'text') {
		// 	krpano.call("set(hotspot[" + uniqname + "].hotspot_text, " + currentHotspotData.hotspot_text + ");");
		// }
	}

	switch (type) {
		case 'text':
			var text_t = $("#text_t").val();
			var text_text = $(textEditor.getBody()).html();

			text_text = htmlToBBCode(text_text);

			krpano.call("set(hotspot[" + uniqname + "].hotspot_type, text);");
			krpano.call("set(hotspot[" + uniqname + "].hotspot_title, " + text_t + " ");
			krpano.call("set(hotspot[" + uniqname + "].hotspot_content, " + text_text + " ");
			krpano.call("set(hotspot[" + uniqname + "].url, assets/images/hotspot.png);");

			// Reset text
			$("#text_t").val('');
			$("#text_text").val('');

			break;
		case 'modal':
			var modal_t = $("#modal_t").val();
			var modal_d = $("#modal_d").val();

			krpano.call("set(hotspot[" + uniqname + "].hotspot_type, modal);");
			krpano.call("set(hotspot[" + uniqname + "].modal_title, " + modal_t + " ");
			krpano.call("set(hotspot[" + uniqname + "].modal_content, " + modal_d + " ");
			krpano.call("set(hotspot[" + uniqname + "].url, assets/images/modal.png);");

			$("#modal_t").val('');
			$("#modal_d").val('');

			break;
		case 'tooltip':
			var tooltip_t = $("#tooltip_t").val();
			var tooltip_d = $("#tooltip_d").val();

			krpano.call("set(hotspot[" + uniqname + "].hotspot_type, tooltip);");
			krpano.call("set(hotspot[" + uniqname + "].tooltip_title, " + tooltip_t + " ");
			krpano.call("set(hotspot[" + uniqname + "].tooltip_content, " + tooltip_d + " ");
			krpano.call("set(hotspot[" + uniqname + "].url, assets/images/tooltip.png);");

			$("#tooltip_t").val('');
			$("#tooltip_d").val('');

			break;
		case 'video':
			var videourl = $("#video_url").val();

			if (videourl.length > 500 || (videourl.indexOf('https://www.youtube.com/') !== 0
					&& videourl.indexOf('https://youtube.com/') !== 0)) {
				alert('Invalid video URL');
				return false;
			}

			krpano.call("set(hotspot[" + uniqname + "].hotspot_type, video);");
			krpano.call("set(hotspot[" + uniqname + "].video_url, " + videourl + " ");
			krpano.call("set(hotspot[" + uniqname + "].url, assets/images/video.png);");

			$("#video_url").val('');

			break;
		case 'image':
			var imageurl = $("#image_url").val();

			if (image_url.length > 500 || (imageurl.indexOf('https://') !== 0
					&& imageurl.indexOf('http://') !== 0)) {
				alert('Invalid image URL');
				return false;
			}

			krpano.call("set(hotspot[" + uniqname + "].hotspot_type, image);");
			krpano.call("set(hotspot[" + uniqname + "].image_url, " + imageurl + " ");
			krpano.call("set(hotspot[" + uniqname + "].url, assets/images/image.png);");

			$("#image_url").val('');

			break;
		case 'linkscene':
			var scene = $("#selectbox").val();

			krpano.call("set(hotspot[" + uniqname + "].hotspot_type, link);");
			krpano.call("set(hotspot[" + uniqname + "].linkedscene, " + scene + ");");
			krpano.call("set(hotspot[" + uniqname + "].url, assets/images/hotspot.png);");

			$("#selectbox").selectpicker('reset');
			break;
	}

	krpano.call("set(hotspot[" + uniqname + "].onclick,  js(showPopup(" + uniqname + ")););");
	krpano.call("set(hotspot[" + uniqname + "].onover,  js(isAllowAddHotspot(false)););");
	krpano.call("set(hotspot[" + uniqname + "].onout,  js(isAllowAddHotspot(true)););");
	krpano.call("set(hotspot[" + uniqname + "].ath, " + posX + ");");
	krpano.call("set(hotspot[" + uniqname + "].sceneName, " + current_scene + ");");
	krpano.call("set(hotspot[" + uniqname + "].atv, " + posY + ");");

	$("[data-popup-close]").trigger("click");
}

function addHotspotType(el) {
	var showForm = jQuery(el).data('form');
	disableButton(['#add_text', '#add_Tooltip', '#add_Modal', '#add_image', '#add_video', '#add_link']);

	jQuery('#' + showForm).show();
}

////edit
function editText() {
	disableButton(['#edit_Tooltip', '#edit_modal', '#edit_image', '#edit_video', '#edit_link', '#saveEdit']);
	$("#text_div_edit").show();
}

function editTooltip() {
	disableButton(['#edit_text', '#edit_modal', '#edit_image', '#edit_video', '#edit_link', '#saveEdit']);
	$("#tooltip_div_edit").show();
}

function editModal() {
	disableButton(['#edit_text', '#edit_Tooltip', '#edit_image', '#edit_video', '#edit_link', '#saveEdit']);
	$("#modal_div_edit").show();
}


function editImage() {
	disableButton(['#edit_text', '#edit_modal', '#edit_Tooltip', '#edit_video', '#edit_link', '#saveEdit']);
	$("#image_div_edit").show();
}

function editVideo() {
	disableButton(['#edit_text', '#edit_modal', '#edit_Tooltip', '#edit_image', '#edit_link', '#saveEdit']);
	$("#video_div_edit").show();
}

function editScene() {
	disableButton(['#edit_text', '#edit_modal', '#edit_Tooltip', '#edit_image', '#edit_video', '#saveEdit']);
	$("#scene_div_edit").show();
}


function onclickCancel() {
	$("#text_div").hide();
	$("#modal_div").hide();
	$("#hotspot-form-tooltip").hide();
	$("#image_div").hide();
	$("#video_div").hide();
	$("#link_div").hide();
	enableButton(['#add_text', '#add_Tooltip', '#add_Modal', '#add_image', '#add_video', '#add_link', '#savehotspots']);
}

(function (w, $) {

	if (typeof w.vrAdmin === 'undefined') {
		w.vrAdmin = {};
	}

	var vrKrpano = {
		_elements: {
			noticeMessage: '.notice-message'
		},

		showActions: function () {
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

						$('.notice-message').hide();

						e.preventDefault();
					}, 250);

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
				$('#hotspot-form-tooltip').hide();
				$('#modal_div').hide();
				$('#video_div').hide();
				$('#image_div').hide();
				$('#link_div').hide();

				$('#open-add-hot').hide();

				$('.notice-message').show();

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
		},

		hook: {},

		init: function () {
			vrKrpano.showActions();
			$('.selectpicker').selectpicker();
		}
	};

	w.vrAdmin.Krpano = vrKrpano;

	$(document).ready(function () {
		vrKrpano.init();
	});

})(window, jQuery);


var textEditor = $('#hotspot-text-editor').sceditor({
	resizeEnabled: false,
	format: 'bbcode',
	resizeMaxWidth: '265px',
	emoticonsRoot: '/assets/vendor/sceditor/',
	style: 'assets/vendor/sceditor/minified/themes/content/default.min.css',
	plugins: 'autoyoutube'
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
	html = html.replace(/ <!--(.*?)-->/gmi, "\n");

	html = html.replace(/\/\//gi, "/");
	html = html.replace(/http:\//gi, "http://");

	html = html.replace(/<(?:[^>'"]*|(['"]).*?\1)*>/gmi, "");
	html = html.replace(/\r\r/gi, "");
	html = html.replace(/\[img]\//gi, "[img]");
	html = html.replace(/\[url=\//gi, "[url=");

	html = html.replace(/(\S)\n/gi, "$1 ");

	return html;
}

var krpano = document.getElementById('krpanoSWFObject');
// Disable autoratate;
krpano.call("autorotate.stop()")

var add_hotpost = document.getElementById('add_hotpost');
var hotspot_done = document.getElementById('add_text');
var selectbox = document.getElementById('selectbox');
var showlink = document.getElementById('show_link');

var i = 0;
var hotspots = {};
var uniqname = '';
var scene_nums = krpano.get('scene.count');
var hotspotList = [];
var current_scene = '';
var current_vTour_hotspot_counter = 0;
var current_randome_val = Math.round(Math.random() * 1000000000).toString() + Math.round(Math.random() * 1000000000).toString();


function getHotspotsCount() {
	return krpano.get('hotspot.count');
}

function addHotspot(currentHotspotData) {
	disableButton(['#set_defaultView', '#add_hotpost']);
	$('#open-add-hot').show();
}

function saveEdit() {
	var _hotspot = krpano.get('hotspot[' + uniqname + ']');
	var _type = _hotspot.hotspot_type;

	$('#' + _type + '_div_edit').find('textarea, input, select').each(function () {
		var param_name = $(this).attr('name');
		var param_val = $(this).val();
		if (param_name == 'video_url') {
			if (param_val.indexOf('https://www.youtube.com/') !== 0
				&& param_val.indexOf('https://youtube.com/') !== 0) {
				alert('Invalid video URL');
				return false;
			}
		}
		if (param_name == 'image_url') {
			if (param_val.length > 500 || (param_val.indexOf('https://') !== 0
					&& param_val.indexOf('http://') !== 0)) {
				alert('Invalid image URL');
				return false;
			}
		}

		krpano.call("set(hotspot[" + uniqname + "]." + param_name + ", " + param_val + " ");
		$(this).val('');
	});

	if (superHotspot) {
		superHotspot = new superHotspotObj(krpano);
	}
	$("[data-popup-close]").trigger("click");
}


function editHotspot() {
	disableButton(['#move_hotspot', '#devare_hotpost', '#edit_hotpost']);
	$('[id*="_div_edit"][data-edit="true"]').show();
}

function list_scene() {
	krpano.call("set(hotspot[" + uniqname + "].ondown, '');");

	show_link.style.display = 'block';
	hotspot_done.style.display = 'none';
}

function get_link() {
	var scene = selectbox.value;
	krpano.call("set(hotspot[" + uniqname + "].linkedscene, " + scene + ");");
	hotspot_add_done();
}

var removedHotspot = [];

function addRemovedHotspot(name) {
	removedHotspot.push(name);
}

function devareHotspot() {
	if (confirm("Are you  Sure? ") == true) {
		$("[data-popup-close]").trigger("click");
		done_remove();
	} else {
		return false;
	}
}

function done_remove() {
	enableButton(['add_hotpost', '#remove_hotpost', '#moveHotspot', '#set_defaultView'])
	krpano.call("removehotspot(" + uniqname + ");");
}

function choose_hotSpot_type() {
	$('#hotpost_done').hide();
	document.getElementById('add_hotpost').style.display = 'inline-block';
	$('#choose_hotSpot_type_id').show();

	//this line make hotspot can't move anymore :)
	krpano.call("set(hotspot[" + uniqname + "].ondown, '');");

}

function setHotSpotType_Text() {
	$('#choose_hotSpot_type_id').hide();
	// krpano.call("set(hotspot[" + uniqname + "].hotspot_type, text);");

	$('#input_text_dialog').show();
	$('#input_text_dialog #text_input_hotspot').val('');
}

function setHotSpotType_Nomal() {
	$('#choose_hotSpot_type_id').hide();
	// krpano.call("set(hotspot[" + uniqname + "].hotspot_type, normal);");
	$('#show_link').show();
}

function hotspot_add_text_from_input() {
	$('#input_text_dialog').hide();
	//	krpano.call("set(hotspot[" + uniqname + "].hotspot_text, " + $('#text_input_hotspot').val() + ");");
	hotspot_add_done();
}

function hotspot_add_done() {
	$('#input_text_dialog').hide();
	$('#show_link').hide();
	add_hotpost.disabled = false;

	enableButton(['#remove_hotpost', '#moveHotspot', '#set_defaultView']);
}

var defaultViewList = {};

function setDefaultView() {
	var scene = krpano.get('xml.scene');

	defaultViewList[scene] = {};
	defaultViewList[scene].hlookat = krpano.get('view.hlookat');
	defaultViewList[scene].vlookat = krpano.get('view.vlookat');
	defaultViewList[scene].fov = krpano.get('view.fov');

	alert('Applied default view hlookat: ' + defaultViewList[scene].hlookat + ' , vlookat: ' + defaultViewList[scene].vlookat + ' , fov: ' + defaultViewList[scene].fov);
}

function rotateToDefaultViewOf(scene) {
	//if current scene have edited default view but not save yet, the xml not have changed, so default view still in xml value,
	// we need to rotate to default view.
	if (typeof defaultViewList[scene] != 'undefined') {
		krpano.set('view.hlookat', defaultViewList[scene].hlookat);
		krpano.set('view.vlookat', defaultViewList[scene].vlookat);
		krpano.set('view.fov', defaultViewList[scene].fov);
	}
}

function hmv(currentHotspot, currentScene, i) {

// 				if (typeof currentHotspot !== "object") return false;
// 				var hotspotList = superHotspot.hotspotList;
// 				//var sceneName = this.kr.get('xml.scene');
// 				var sceneName = currentScene;
// 				var currentHotspotData = {};
// 				currentHotspotData.ath = currentHotspot.ath;
// 				currentHotspotData.atv = currentHotspot.atv;
// 				currentHotspotData.hotspot_type = currentHotspot.hotspot_type;
// 				currentHotspotData.sceneName    = sceneName;
// 				currentHotspotData.reRender     = 'true';

// 				if ( typeof currentHotspot.linkedscene != 'undefined')
// 					currentHotspotData.linkedscene = currentHotspot.linkedscene;
// 				else if ( typeof currentHotspot.hotspot_text != 'undefined' )
// 					currentHotspotData.hotspot_text = currentHotspot.hotspot_text;
// 				else
// 					console.error('no hotspot data found: ');

// 				console.info (currentHotspotData);

// 				current_vTour_hotspot_counter++;
// 				hotspotList[sceneName][current_randome_val + current_vTour_hotspot_counter.toString()] = currentHotspotData;

	//if hotspot just live in js var ( not live in xml yet )
	if (currentHotspot.url == 'assets/images/hotspot.png') {
		//hm... do nothing, it's auto re-locate itself
	}
	else // it live in xml, and will auto-reload-by krpano, so we need to
	{
		//1. add it to removed list
		addRemovedHotspot(currentHotspot.name);
		//2. make it render - able
		krpano.call("set(hotspot[" + i + "].xreRender, 'true')");
	}
}

function editHotspots() {
	krpano.call("screentosphere(mouse.x,mouse.y,m_ath,m_atv);");
	krpano.call("set(hotspot[" + uniqname + "].onclick,  js(showPopup()););");
}

function moveHotspot() {
	var current_scene = krpano.get('xml.scene');
	var hotspot_count = getHotspotsCount();
	for (var i = 0; i < hotspot_count; i++) {
		krpano.call("set(hotspot[" + i + "].ondown, 'draghotspot(); js(hmv(get(hotspot[" + i + "]), get(xml.scene), " + i + ") );')");
	}

	// krpano.call("screentosphere(mouse.x,mouse.y,m_ath,m_atv);");
	// krpano.call("set(hotspot[" + uniqname + "].ondown, draghotspot(););");
	disableButton(['#add_hotpost', '#remove_hotpost', '#set_defaultView'])
}

function showPopup(uniqn) {
	uniqname = uniqn;
	var _hotspot = krpano.get('hotspot[' + uniqname + ']');
	var _type = _hotspot.hotspot_type;

	enableButton(['#add_hotpost', '#remove_hotpost', '#set_defaultView'])
	$("#edit-remove-move").show();

	$('[id*="_div_edit"]').attr('data-edit', false).hide();
	$('#' + _type + '_div_edit').attr('data-edit', true);

	$('#' + _type + '_div_edit').find('textarea, input, select').each(function () {
		var param_name = $(this).attr('name');
		$(this).val(_hotspot[param_name]);
	});
}

// function moveHotspotDone() {
// 	enableButton(['add_hotpost', '#remove_hotpost', '#set_defaultView'])
// 	// var hotspot_count = getHotspotsCount();
// 	// for (var i = 0; i < hotspot_count; i++) {
// 	// 	krpano.call("set(hotspot[" + i + "].ondown, '');");
// 	// }
// 	$("#moveHotspot").show();
// 	$("#moveHotspotDone").hide();
// }

/**
 *
 * @returns {boolean}
 */
function isReady() {
	if (
		add_hotpost.disabled == false
	) {
		return true;
	}
	return false;
}

function superHotspotObj(krpano_Obj) {
	var thisAlias = this;

	this.sceneCount = krpano_Obj.get('scene.count');
	this.sceneName = krpano_Obj.get('xml.scene');
	this.hotspotList = {};
	this.kr = krpano_Obj;
	this.firstTimesSave = 0;

	this.saveCurrentHotspotFromCurrentScene = function () {
		// if ( thisAlias.firstTimesSave == 0 ){thisAlias.firstTimesSave = 1;}
		thisAlias.hotspotList[this.sceneName] = {};
		var hotspot_count = thisAlias.kr.get('hotspot.count');

		for (var i = 0; i < hotspot_count; i++) {
			// if (/hotspot\.png/.test(thisAlias.kr.get('hotspot[' + i + '].url')) || /vtourskin_hotspot\.png/.test(thisAlias.kr.get('hotspot[' + i + '].url')) || /information\.png/.test(thisAlias.kr.get('hotspot[' + i + '].url'))) {
			thisAlias.hotspotList[this.sceneName][current_randome_val + current_vTour_hotspot_counter.toString()] = {
				'ath': thisAlias.kr.get('hotspot[' + i + '].ath'),
				'atv': thisAlias.kr.get('hotspot[' + i + '].atv'),
				'sceneName': thisAlias.kr.get('hotspot[' + i + '].sceneName'),
				'hotspot_type': thisAlias.kr.get('hotspot[' + i + '].hotspot_type'),
				'reRender': 'true'
			}
			// if (/vtourskin_hotspot\.png/.test(thisAlias.kr.get('hotspot[' + i + '].url')) || /information\.png/.test(thisAlias.kr.get('hotspot[' + i + '].url'))) {
			//hotspot which is aready in xml shouldnt re-render by js anymore, if not, doulicate hotspot will apperent.
			if (thisAlias.kr.get('hotspot[' + i + '].xreRender') == 'true') {
				thisAlias.hotspotList[this.sceneName][current_randome_val + current_vTour_hotspot_counter.toString()].reRender == 'true'
			}
			else {
				thisAlias.hotspotList[this.sceneName][current_randome_val + current_vTour_hotspot_counter.toString()].reRender = 'false';
			}
			// }

			if (thisAlias.kr.get('hotspot[' + i + '].hotspot_type') == 'text') {
				thisAlias.hotspotList[this.sceneName][current_randome_val + current_vTour_hotspot_counter.toString()].title = thisAlias.kr.get('hotspot[' + i + '].hotspot_title');
				thisAlias.hotspotList[this.sceneName][current_randome_val + current_vTour_hotspot_counter.toString()].content = thisAlias.kr.get('hotspot[' + i + '].hotspot_content');
			}
			if (thisAlias.kr.get('hotspot[' + i + '].hotspot_type') == 'modal') {
				thisAlias.hotspotList[this.sceneName][current_randome_val + current_vTour_hotspot_counter.toString()].title = thisAlias.kr.get('hotspot[' + i + '].modal_title');
				thisAlias.hotspotList[this.sceneName][current_randome_val + current_vTour_hotspot_counter.toString()].content = thisAlias.kr.get('hotspot[' + i + '].modal_content');
			}
			if (thisAlias.kr.get('hotspot[' + i + '].hotspot_type') == 'tooltip') {
				thisAlias.hotspotList[this.sceneName][current_randome_val + current_vTour_hotspot_counter.toString()].title = thisAlias.kr.get('hotspot[' + i + '].tooltip_title');
				thisAlias.hotspotList[this.sceneName][current_randome_val + current_vTour_hotspot_counter.toString()].content = thisAlias.kr.get('hotspot[' + i + '].tooltip_content');
			}
			if (thisAlias.kr.get('hotspot[' + i + '].hotspot_type') == 'video') {
				thisAlias.hotspotList[this.sceneName][current_randome_val + current_vTour_hotspot_counter.toString()].video_url = thisAlias.kr.get('hotspot[' + i + '].video_url');
			}
			if (thisAlias.kr.get('hotspot[' + i + '].hotspot_type') == 'image') {
				thisAlias.hotspotList[this.sceneName][current_randome_val + current_vTour_hotspot_counter.toString()].image_url = thisAlias.kr.get('hotspot[' + i + '].image_url');
			}
			if (thisAlias.kr.get('hotspot[' + i + '].hotspot_type') == 'link') {
				thisAlias.hotspotList[this.sceneName][current_randome_val + current_vTour_hotspot_counter.toString()].linkedscene = thisAlias.kr.get('hotspot[' + i + '].linkedscene');
			}
			current_vTour_hotspot_counter++;
		}
	};

	/**
	 * Add hotspots into scene
	 */
	this.loadHotspotsToCurrentSceneFromSavedData = function () {
		sceneName = this.kr.get('xml.scene');

		for (var hotspotId in thisAlias.hotspotList[sceneName]) {
			var currentHotspotData = thisAlias.hotspotList[sceneName][hotspotId];

			if (thisAlias.hotspotList[sceneName][hotspotId].reRender == "true") {
				addHotspot(currentHotspotData);
			}
		}

		//this go as sub-job

		for (var i in removedHotspot) {
			if (removedHotspot[i].match(/spot_new_/g) == null)
				krpano.call('removehotspot(' + removedHotspot[i] + ');');
			else
				removedHotspot.splice(i, 1); //remove
		}

		rotateToDefaultViewOf(sceneName);
	};

	this.getData = function () {
		if (true) {
			thisAlias.saveCurrentHotspotFromCurrentScene();
		}
		// if(thisAlias.firstTimesSave == 0){thisAlias.saveCurrentHotspotFromCurrentScene();}
		return thisAlias;
	};

	this.setData = function (data) {
		thisAlias = data;
	}

	this.initCurrentHotspots = function () {
		thisAlias.hotspotList[this.sceneName] = {};
		var hotspot_count = thisAlias.kr.get('hotspot.count');

		for (var k = 0; k < hotspot_count; k++) {
			thisAlias.kr.call("set(hotspot[" + k + "].onclick,  js(showPopup(" + k + ")););");
			thisAlias.kr.call("set(hotspot[" + k + "].onover,  jscall(if (typeof isAllowAddHotspot !== 'undefined') isAllowAddHotspot(false)););");
			thisAlias.kr.call("set(hotspot[" + k + "].onout,  jscall(if (typeof isAllowAddHotspot !== 'undefined') isAllowAddHotspot(true)););");
		}
		i = k;
	}

	this.init = function () {
		setTimeout(function () {
			thisAlias.initCurrentHotspots();
		}, 500);
	}
	this.init();
}

var superHotspot;
setTimeout(function () {
	superHotspot = new superHotspotObj(krpano);
}, 500);