<?php

require_once __DIR__ . DIRECTORY_SEPARATOR . 'bootstrap.php';

$hotSpotImgUrl     = base64_encode("/assets/images/hotspot.png");
$hotSpotInfoImgUrl = base64_encode("/assets/images/information.png");
$tourId            = Vr360Factory::getInput()->getInt('uId', 0);
$tourUrl           = str_replace('/hotspotsiframe.php', '', VR360_URL_FULL_WITHOUT_PARAMS) . '/_/' . $tourId . '/vtour';

$tour = new Vr360Tour;
$tour->load(
	array(
		'id'         => $tourId,
		'created_by' => Vr360Factory::getUser()->id
	)
);

$tours  = new Vr360ModelTours;
$scenes = !$tour->id ? array() : $tour->getScenes();

?>
<!DOCTYPE html>
<html>
<head>
	<meta name="viewport"
	      content="target-densitydpi=device-dpi, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui"/>
	<meta name="apple-mobile-web-app-capable" content="yes"/>
	<meta name="apple-mobile-web-app-status-bar-style" content="black"/>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
	<meta http-equiv="x-ua-compatible" content="IE=edge"/>
	<!-- Globalvision -->
	<link rel="stylesheet" type="text/css" href="./assets/css/hotspots.min.css">
	<link rel="stylesheet" type="text/css" href="./assets/css/tour.min.css">

	<script type="text/javascript" src="./assets/vendor/jquery-2.2.4.min.js"></script>
	<script src='<?php echo $tourUrl . '/tour.js'; ?>'></script>
	<!-- Bootstrap -->
	<script type="text/javascript" src="./assets/vendor/bootstrap/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="./assets/vendor/bootstrap/css/bootstrap.css">
	<link rel="stylesheet" href="./assets/vendor/fontawesome-5.0.0/web-fonts-with-css/css/fontawesome-all.css">
	<link rel="stylesheet" type="text/css" media="screen"
	      href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.7.5/css/bootstrap-select.min.css">
	<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.7.5/js/bootstrap-select.min.js"></script>
	<!-- Sceditor -->
	<link rel="stylesheet" href="assets/vendor/sceditor/minified/themes/default.min.css" id="theme-style"/>
	<script src="assets/vendor/sceditor/minified/jquery.sceditor.min.js"></script>
	<script src="assets/vendor/sceditor/minified/jquery.sceditor.bbcode.min.js"></script>
	<script src="assets/vendor/sceditor/minified/sceditor.min.js"></script>
	<script src="assets/vendor/sceditor/minified/icons/monocons.js"></script>
	<script src="assets/vendor/sceditor/minified/formats/bbcode.js"></script>
</head>
<body>
<div id="button-container">
	<div class="alert alert-info notice-message">
		<strong>Hold click </strong>for adding hotspot
	</div>
	<div class="popup-inner" id="edit-remove-move" style="display:none;">
		<button type="button" id="edit_hotpost" class="btn btn-primary btn-sm button-custom-th"
		        onclick="editHotspot();">
			Edit
		</button>
		<button type="button" id="move_hotspot" class="btn btn-primary btn-sm button-custom-th"
		        onclick="moveHotspot();">
			Move
		</button>
		<button type="button" id="devare_hotpost" class="btn btn-primary btn-sm button-custom-th"
		        onclick="devareHotspot();">
			Devare
		</button>
		<a class="popup-close" data-popup-close="popup-1" href="#">x</a>
		<div id="show-info" class="form-group" style="display: none;">
			<div class="form-group">
				<div class="form-group">
					<input
							id='text_t'
							maxlength="255"
							type="text"
							size="29"
							placeholder="Input Info Title"
							class="form-control"
					/>
				</div>
				<textarea
						class="form-control"
						placeholder="Input Info Description"
						id="text_text"
						maxlength="255"
						style="
								resize: none;
								width:265px;
								overflow:hidden;
								margin-top:2px;
								margin-bottom:2px;
								height: 155px;
								"
				></textarea>
			</div>
			<button
					type="button"
					id="savehotspots"
					class="btn btn-default "
					onclick="SaveHot('info')">Save
			</button>
		</div>
		<div id="text_div_edit" class="form-group" style="display: none;">
			<div class="form-group">
				<input
						type="text"
						size="29"
						maxlength="255"
						placeholder="Edit title"
						class="form-control"
						name="hotspot_title"
				/>
			</div>
			<div class="form-group">
				<textarea
						class="form-control"
						placeholder="Edit Description"
						maxlength="255"
						style="
				resize: none;
				width:259px;
				overflow:hidden;
				margin-top:2px;
				margin-bottom:2px;
				height: 155px;
				"
						name="hotspot_content"
				></textarea>
			</div>
			<button
					type="button"
					class="btn btn-primary"
					onclick="saveEdit()"><i class="fas fa-save"></i> Save
			</button>
		</div>

		<div id="modal_div_edit" class="form-group" style="display: none;">
			<div class="form-group">
				<input
						type="text"
						size="29"
						maxlength="255"
						placeholder="Edit title"
						class="form-control"
						name="modal_title"
				/>
			</div>
			<div class="form-group">
				<textarea
						class="form-control"
						placeholder="Edit Description"
						maxlength="255"
						style="
				resize: none;
				width:259px;
				overflow:hidden;
				margin-top:2px;
				margin-bottom:2px;
				height: 155px;
				"
						name="modal_content"
				></textarea>
			</div>
			<button
					type="button"
					class="btn btn-primary"
					onclick="saveEdit()"><i class="fas fa-save"></i> Save
			</button>
		</div>

		<div id="tooltip_div_edit" class="form-group" style="display: none;">
			<div class="form-group">
				<input
						type="text"
						size="29"
						maxlength="255"
						placeholder="Edit title"
						class="form-control"
						name="tooltip_title"
				/>
			</div>
			<div class="form-group">
				<textarea
						class="form-control"
						placeholder="Edit Description"
						maxlength="255"
						style="
				resize: none;
				width:259px;
				overflow:hidden;
				margin-top:2px;
				margin-bottom:2px;
				height: 155px;
				"
						name="tooltip_content"
				></textarea>
			</div>
			<button
					type="button"
					class="btn btn-primary"
					onclick="saveEdit()"><i class="fas fa-save"></i> Save
			</button>
		</div>

		<div id="image_div_edit" class="form-group" style="display: none;">
			<div class="form-group">
				<input
						maxlength="255"
						type="text"
						size="29"
						placeholder="Edit Url"
						class="form-control"
						style="margin-bottom: 2px "
						name="image_url"
				/>
			</div>
			<button
					type="button"
					class="btn btn-primary"
					onclick="saveEdit()"><i class="fas fa-save"></i> Save
			</button>
		</div>

		<div id="video_div_edit" class="form-group" style="display: none;">
			<div class="form-group">
				<label for="video_input_edit">Add YouTube video URL</label>
				<input
						id="video_input_edit"
						maxlength="255"
						type="text"
						size="29"
						placeholder="Edit Url"
						class="form-control"
						style="margin-bottom: 2px"
						name="video_url"
				/>
			</div>
			<button
					type="button"
					class="btn btn-primary"
					onclick="saveEdit()"><i class="fas fa-save"></i> Save
			</button>
		</div>

		<div id="link_div_edit" class="form-group" style="display: none;">
			<select
					class="selectpicker"
					data-width="261px"
					id="edit_selectbox"
					name="linkedscene"
			>
				<?php if (!empty($scenes)): ?>
					<?php foreach ($scenes as $scene): ?>
						<option value="scene_<?php echo explode('.', $scene->file)[0] ?>"><?php echo $scene->name ?></option>
					<?php endforeach ?>
				<?php endif; ?>
			</select>
			<button
					type="button"
					class="btn btn-primary"
					onclick="saveEdit()"><i class="fas fa-save"></i> Save
			</button>
		</div>
	</div>
	<div class="popup" data-popup="popup-1">
		<div class="popup-inner" id="popup">
			<form class="">
				<input type="hidden" id="user_id" value="<?php echo $tour->created_by ?>">
				<input type="hidden" id="tour_id" value="<?php echo $tour->id ?>">

				<?php echo Vr360Layout::getInstance()->fetch('krpano.actions'); ?>

				<div class="row">
					<div id="choose-hotspot-type" class="" style="display: none;">
						<div class="container-fluid">
							<div class="form-group">
								<!-- Choose type -->
								<div class="hotspot-types">
									<?php echo Vr360Layout::getInstance()->fetch('krpano.hotspots', array('scenes' => $scenes)); ?>
								</div>
								<div class="hotspot-type-forms">
									<?php echo Vr360Layout::getInstance()->fetch('krpano.hotspots.text'); ?>
									<?php echo Vr360Layout::getInstance()->fetch('krpano.hotspots.tooltip'); ?>
									<?php echo Vr360Layout::getInstance()->fetch('krpano.hotspots.modal'); ?>
									<?php echo Vr360Layout::getInstance()->fetch('krpano.hotspots.image'); ?>
									<?php echo Vr360Layout::getInstance()->fetch('krpano.hotspots.video'); ?>
									<?php if (!empty($scenes)): ?>
										<?php echo Vr360Layout::getInstance()->fetch('krpano.hotspots.scene', array('scenes' => $scenes)); ?>
									<?php endif; ?>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Close button -->
				<a class="popup-close" data-popup-close="popup-1" href="#">x</a>
			</form>
		</div>
	</div>
</div>
<div id="pano">
	<script type="text/javascript">
		embedpano({
			swf: '<?php echo $tourUrl . '/tour.swf'; ?>',
			xml: '<?php echo $tourUrl . '/tour.xml?' . time(); ?>',
			target: "pano",
			html5: "prefer",
			passQueryParameters: true
		});
	</script>
</div>
<script type="text/javascript" src="./assets/js/admin/hotspots.js"></script>
</body>
</html>
