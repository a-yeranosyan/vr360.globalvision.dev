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

	<!-- Krpano -->
	<script src="<?php echo $tour->getKrpanoJsUrl(); ?>"></script>

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
		<strong><?php echo \Joomla\Language\Text::_('HOTSPOT_LABEL_HOLD_CLICK'); ?></strong>
	</div>

	<div class="popup" data-popup="popup-1">
		<div class="popup-inner" id="popup" data-mode="add">
			<form class="" name="tour-form">
				<input type="hidden" id="user_id" value="<?php echo $tour->created_by ?>">
				<input type="hidden" id="tour_id" value="<?php echo $tour->id ?>">

				<?php echo Vr360Layout::getInstance()->fetch('krpano.hotspots.actions'); ?>
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
	<?php echo Vr360Layout::getInstance()->fetch('krpano.krpano', array('tour' => $tour)); ?>
</div>
<script type="text/javascript" src="./assets/js/admin/hotspots.js"></script>
</body>
</html>