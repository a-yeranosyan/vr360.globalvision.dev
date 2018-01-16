var allow = true;

function isAllowAddHotspot(isAllowAddHotspot) {
	if (isAllowAddHotspot == 'false') isAllowAddHotspot = false;
	allow = isAllowAddHotspot;
}


function disableButton(elements) {
	if (jQuery.isArray(elements)) {
		jQuery.each(elements, function (index, element) {
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

var textEditor = $('#hotspot-text-editor').sceditor({
	resizeEnabled: false,
	format: 'bbcode',
	resizeMaxWidth: '265px',
	emoticonsRoot: 'assets/vendor/sceditor/',
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


var removedHotspot = [];

function addRemovedHotspot(name) {
	removedHotspot.push(name);
}

var defaultViewList = {};

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

/**
 *
 * @returns {boolean}
 */
function isReady() {
	return true;
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
			thisAlias.kr.call("set(hotspot[" + k + "].onclick,  js(vrKrpano.editHotspot(" + k + ")););");
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

(function (w, $) {
	var vrKrpano = {
		element: {
			btnAddHotspot: '#add-hotspot',
			btnSetDefaultView: '#set-default-view',
			noticeMessage: '.notice-message',
			krpano: '#pano',
		},
		krpano: document.getElementById('krpanoSWFObject')
	}
	vrKrpano.uniqName = '';

	var vrUtilites = {};
	/**
	 * Add a Escape string
	 *
	 * @param string
	 */
	vrUtilites.escapeString = function(string) {
		return string = escape(string);
	}

	/**
	 * Add a krpano element
	 *
	 * @param elObject
	 * @param elType
	 */
	vrKrpano.add = function (elObject, elType) {
		var krpano = vrKrpano.krpano;

		switch (elType) {
			case 'hotspot':
				krpano.call('addhotspot(' + elObject.name + ');');


				break;
		}

		$.each(elObject, function (key, value) {
			if (key != 'name') {
				krpano.call('set(hotspot[' + elObject.name + '].' + key + ',' + value + ');');
			}
		});

		krpano.call("set(hotspot[" + elObject.name + "].onclick,  js(vrKrpano.editHotspot(" + elObject.name + ")););");
		// @TODO Do we really need this attribute
		krpano.call("set(hotspot[" + elObject.name + "].onover,  js(isAllowAddHotspot(false)););");
		// @TODO Do we really need this attribute
		krpano.call("set(hotspot[" + elObject.name + "].onout,  js(isAllowAddHotspot(true)););");
		krpano.call("set(hotspot[" + elObject.name + "].ath, " + krpano.get('m_ath') + ");");
		krpano.call("set(hotspot[" + elObject.name + "].sceneName, " + krpano.get('xml.scene') + ");");
		krpano.call("set(hotspot[" + elObject.name + "].atv, " + krpano.get('m_atv') + ");");
	}

	/**
	 * Edit Hotstpot
	 */
	vrKrpano.editHotspot = function (uniqName) {
		// make Global
		vrKrpano.uniqName = uniqName;
		var _hotspot = krpano.get('hotspot[' + uniqName + ']');
		var _type = _hotspot.hotspot_type;
		var mode = jQuery("#popup").attr("data-mode","edit");
		jQuery('[data-popup=popup-1]').show();
		vrKrpano.closeHotspotForm();
		vrKrpano.hideHotspotTypes();
	}

	/**
	 * Edit Text
	 */
	vrKrpano.editText = function () {
		var _hotspot = krpano.get('hotspot[' + vrKrpano.uniqName + ']');
		var _type = _hotspot.hotspot_type;

		disableButton(['#add_text', '#add_Tooltip', '#add_Modal', '#add_image', '#add_video', '#add_link']);
		vrKrpano.showHotspotTypes();
		jQuery('[id*="hotspot-form-"]').attr('data-edit', false).hide();
		jQuery('#hotspot-form-' + _type ).attr('data-edit', true);

		jQuery('#hotspot-form-' + _type ).find('textarea, input, select').each(function () {
			var param_name = jQuery(this).attr('name');
			jQuery(this).val(decodeURIComponent(_hotspot[param_name]));
		});

		jQuery('[id*="hotspot-form-"][data-edit="true"]').show();
	}

	vrKrpano.saveEdit = function () {
		var _hotspot = krpano.get('hotspot[' + vrKrpano.uniqName + ']');
		var _type = _hotspot.hotspot_type;

		jQuery('#hotspot-form-' + _type ).find('textarea, input, select').each(function () {
			var param_name = jQuery(this).attr('name');
			var param_val = jQuery(this).val();
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

			krpano.call("set(hotspot[" + vrKrpano.uniqName + "]." + vrUtilites.escapeString(param_name) + ", " + vrUtilites.escapeString(param_val) + " ");
			jQuery(this).val('');
			jQuery("[data-popup-close]").trigger("click");
		});

	}

	/**
	 * Move Hotstpot
	 */
	vrKrpano.moveHotspot = function () {
		var current_scene = krpano.get('xml.scene');
		var hotspot_count = krpano.get('hotspot.count');

		for (var i = 0; i < hotspot_count; i++) {
			krpano.call("set(hotspot[" + i + "].ondown, 'draghotspot(); js(hmv(get(hotspot[" + i + "]), get(xml.scene), " + i + ") );')");
		}

		disableButton(['#add-hotspot', '#remove_hotpost', '#set-default-view']);
		jQuery("[data-popup-close]").trigger("click");
	}

	/**
	 * Edit Hotstpot
	 */
	vrKrpano.deleteHotspot = function () {
		if (confirm("Are you  Sure? ") == true) {
			enableButton(['add_hotpost', '#remove_hotpost', '#moveHotspot', '#set-default-view'])
			krpano.call("removehotspot(" + vrKrpano.uniqName + ");");

			jQuery("[data-popup-close]").trigger("click");
		} else {
			return false;
		}
	}

	vrKrpano.clickAction = function () {
		var krpano = document.getElementById('krpanoSWFObject');
		var timeout, clicker = $(vrKrpano.element.krpano);
		var oldX, oldY;

		//----- OPEN
		clicker.mousedown(function (e) {
			oldX = e.pageX;
			oldY = e.pageY;

			if (allow) {
				timeout = setInterval(function () {
					var targeted_popup_class = jQuery(this).attr('data-popup-open');
					var mode = jQuery("#popup").attr("data-mode","add");

					disableButton(["#edit_hotpost","#move_hotspot","#delete-hotpost"]);

					$(this).attr("data-form", "hotspot-form-");

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

			$('#hotspot-form-text').hide();
			$('#hotspot-form-tooltip').hide();
			$('#hotspot-form-modal').hide();
			$('#hotspot-form-video').hide();
			$('#hotspot-form-image').hide();
			$('#hotspot-form-link').hide();

			$('#choose-hotspot-type').hide();

			$('.notice-message').show();

			$('#edit-remove-move').hide();
			$('#text_div_edit').hide();

			enableButton(['#edit_hotpost', '#move_hotspot', '#delete-hotpost'])
			disableButton(['#edit_text', '#edit_Tooltip', '#edit_modal', '#edit_image', '#edit_video', '#edit_link'])
			enableButton(['#set-default-view', '#add-hotspot'])
			enableButton(['#add_text', '#add_Tooltip', '#add_Modal', '#add_image', '#add_video', '#add_link']);

			var targeted_popup_class = jQuery(this).attr('data-popup-close');
			$('[data-popup="' + targeted_popup_class + '"]').fadeOut(0);
			e.preventDefault();
		});
	};

	/**
	 * Show add hotspot types
	 */
	vrKrpano.showHotspotTypes = function () {
		disableButton([vrKrpano.element.btnAddHotspot, vrKrpano.element.btnSetDefaultView]);

		$('#choose-hotspot-type').show();
	}

	vrKrpano.hideHotspotTypes = function () {
		disableButton([vrKrpano.element.btnAddHotspot, vrKrpano.element.btnSetDefaultView]);

		$('#choose-hotspot-type').hide();
	}

	/**
	 * Set default view
	 */
	vrKrpano.setDefaultView = function () {

		var scene = krpano.get('xml.scene');

		defaultViewList[scene] = {};
		defaultViewList[scene].hlookat = krpano.get('view.hlookat');
		defaultViewList[scene].vlookat = krpano.get('view.vlookat');
		defaultViewList[scene].fov = krpano.get('view.fov');

		alert('Applied default view hlookat: ' + defaultViewList[scene].hlookat + ' , vlookat: ' + defaultViewList[scene].vlookat + ' , fov: ' + defaultViewList[scene].fov);
	}

	/**
	 * Show a hotspot form
	 *
	 * @param el
	 * @param value
	 */
	vrKrpano.showHotspotForm = function (el, value) {
		var showForm = jQuery(el).data('form');

		disableButton(['#add_text', '#add_Tooltip', '#add_Modal', '#add_image', '#add_video', '#add_link']);

		jQuery('#' + showForm).show();
	}

	vrKrpano.closeHotspotForm = function () {
		var mode = jQuery("#popup").attr("data-mode");

		switch(mode) {
			case 'add':
				disableButton(['#hotspot-form-text', '#hotspot-form-modal', '#hotspot-form-tooltip', '#hotspot-form-image', '#hotspot-form-video', '#hotspot-form-link'])
				enableButton(['#add_text', '#add_Tooltip', '#add_Modal', '#add_image', '#add_video', '#add_link', '#savehotspots']);
			break;
			case 'edit':
				disableButton(['#hotspot-form-text', '#hotspot-form-modal', '#hotspot-form-tooltip', '#hotspot-form-image', '#hotspot-form-video', '#hotspot-form-link'])
			break;
		}

	}

	/**
	 * Save an hotspot
	 *
	 * @param type
	 * @returns {boolean}
	 */
	vrKrpano.saveHotspot = function (type) {
	    var hotspotType = jQuery(type).data("hotspot-type");
		var mode = jQuery("#popup").attr("data-mode");
		if(mode == "edit"){
			vrKrpano.saveEdit();
			return;
	    }
	    if ("" == hotspotType) return !1;
	    i += 1, uniqname = "spot_new_" + i;
	    var sceneCount = (krpano.get("scene.count"), krpano.get("xml.scene"));
	        mouseAth = krpano.get("m_ath"),
	        mouseAtv = krpano.get("m_atv");
	    switch (krpano.call("addhotspot(" + uniqname + ");"), "undefined" == typeof currentHotspotData && (currentHotspotData = {}, currentHotspotData.ath = krpano.get("view.hlookat"), currentHotspotData.atv = krpano.get("view.vlookat")), hotspotType) {
	        case "text":
	            var textTitleEditor = vrUtilites.escapeString(jQuery("#text-title-editor").val());
	            var textDescriptionEditor = vrUtilites.escapeString(jQuery("#text-description-editor").val());
	            if (jQuery("#text-title-editor").val().length < 1) return alert("Enter title"), !1;
	            krpano.call("set(hotspot[" + uniqname + "].hotspot_type, text);");
	            krpano.call("set(hotspot[" + uniqname + "].hotspot_title, '" + textTitleEditor + "' ");
	            krpano.call("set(hotspot[" + uniqname + "].hotspot_content,   '" + textDescriptionEditor + "' ");
	            krpano.call("set(hotspot[" + uniqname + "].url, assets/vendor/krpano/viewer/skin/images/text.png);");
	            jQuery("#text-title-editor").val("");
	            jQuery("#text-description-editor").val("");
	            break;
	        case "modal":
	            var modalTitleEditor = vrUtilites.escapeString(jQuery("#modal-title-editor").val());
	            var modalDescriptionEditor = vrUtilites.escapeString(jQuery("#modal-description-editor").val());
	            if (jQuery("#modal-title-editor").val().length < 1) return alert("Enter title"), !1;
	            krpano.call("set(hotspot[" + uniqname + "].hotspot_type, modal);");
	            krpano.call("set(hotspot[" + uniqname + "].modal_title, '" + modalTitleEditor + "' ");
	            krpano.call("set(hotspot[" + uniqname + "].modal_content, '" + modalDescriptionEditor + "' ");
	            krpano.call("set(hotspot[" + uniqname + "].url, assets/vendor/krpano/viewer/skin/images/modal.png);");
	            jQuery("#modal-title-editor").val(""), jQuery("#modal-description-editor").val("");
	            break;
	        case "tooltip":
	            var tooltipTitleEditor = vrUtilites.escapeString(jQuery("#tooltip-title-editor").val());
	            var tooltipDescriptionEditor = vrUtilites.escapeString(jQuery("#tooltip-description-editor").val());
	            if (jQuery("#tooltip-title-editor").val().length < 1) return alert("Enter title"), !1;
	            krpano.call("set(hotspot[" + uniqname + "].hotspot_type, tooltip);");
	            krpano.call("set(hotspot[" + uniqname + "].tooltip_title, '" + tooltipTitleEditor + "' ");
	            krpano.call("set(hotspot[" + uniqname + "].tooltip_content, '" + tooltipDescriptionEditor + "' ");
	            krpano.call("set(hotspot[" + uniqname + "].url, assets/vendor/krpano/viewer/skin/images/tooltip.png);");
	            jQuery("#text-title-editor").val("");
	            jQuery("#tooltip-description-editor").val("");
	            break;
	        case "video":
	            var videoUrlEditor = jQuery("#video-url-editor").val();
	            if (videoUrlEditor.length > 500 || 0 !== videoUrlEditor.indexOf("https://www.youtube.com/") && 0 !== videoUrlEditor.indexOf("https://youtube.com/")) return alert("Invalid video URL"), !1;
	            krpano.call("set(hotspot[" + uniqname + "].hotspot_type, video);");
	            krpano.call("set(hotspot[" + uniqname + "].video_url, '" + videoUrlEditor + "' ");
	            krpano.call("set(hotspot[" + uniqname + "].url, assets/vendor/krpano/viewer/skin/images/video.png);");
	            jQuery("#video-url-editor").val("");
	            break;
	        case "image":
	            var imageUrlEditor = jQuery("#image-url-editor").val();
	            if (imageUrlEditor.length > 500 || 0 !== imageUrlEditor.indexOf("https://") && 0 !== imageUrlEditor.indexOf("http://")) return alert("Invalid image URL"), !1;
	            krpano.call("set(hotspot[" + uniqname + "].hotspot_type, image);");
	            krpano.call("set(hotspot[" + uniqname + "].image_url, '" + imageUrlEditor + "' ");
	            krpano.call("set(hotspot[" + uniqname + "].url, assets/vendor/krpano/viewer/skin/images/image.png);");
	            jQuery("#image-url-editor").val("");
	            break;
	        case "linkscene":
	            var linkedsceneEditor = jQuery("#selectbox").val();
	            krpano.call("set(hotspot[" + uniqname + "].hotspot_type, link);");
	            krpano.call("set(hotspot[" + uniqname + "].linkedscene, '" + linkedsceneEditor + "');");
	            krpano.call("set(hotspot[" + uniqname + "].url, assets/vendor/krpano/viewer/skin/images/linked_edit_mode.png);");
	            jQuery("#selectbox").selectpicker("reset");
	    }
	    krpano.call("set(hotspot[" + uniqname + "].onclick,  js(vrKrpano.editHotspot(" + uniqname + ")););");
	    krpano.call("set(hotspot[" + uniqname + "].onover,  js(isAllowAddHotspot(false)););");
	    krpano.call("set(hotspot[" + uniqname + "].onout,  js(isAllowAddHotspot(true)););");
	    krpano.call("set(hotspot[" + uniqname + "].ath, " + mouseAth + ");");
	    krpano.call("set(hotspot[" + uniqname + "].sceneName, " + sceneCount + ");");
	    krpano.call("set(hotspot[" + uniqname + "].atv, " + mouseAtv + ");");
	    jQuery("[data-popup-close]").trigger("click");
	}

	vrKrpano.init = function () {
		vrKrpano.clickAction();
		$('.selectpicker').selectpicker();
	}

	$(document).ready(function () {
		vrKrpano.init();
	});

	w.vrKrpano = vrKrpano;
})(window, jQuery.noConflict())