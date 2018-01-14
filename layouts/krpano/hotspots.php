<!-- Select type -->
<div class="button-group" role="group">
	<button type="button" id="add_text" class="btn btn-primary btn-sm button-custom"
	        data-form="text_div"
	        onclick="vrKrpano.showHotspotForm(this);">
		<i class="fas fa-font"></i> <?php echo \Joomla\Language\Text::_('HOTSPOT_LABEL_ADD_TEXT'); ?>
	</button>
	<button type="button" id="add_Tooltip" class="btn btn-primary btn-sm button-custom"
	        data-form="hotspot-form-tooltip"
	        onclick="vrKrpano.showHotspotForm(this);">
		<i class="fas fa-info"></i> <?php echo \Joomla\Language\Text::_('HOTSPOT_LABEL_ADD_TOOLTIP'); ?>
	</button>
	<button type="button" id="add_Modal" class="btn btn-primary btn-sm button-custom"
	        data-form="modal_div"
	        onclick="vrKrpano.showHotspotForm(this);">
		<i class="far fa-window-maximize"></i> <?php echo \Joomla\Language\Text::_('HOTSPOT_LABEL_ADD_MODAL'); ?>
	</button>
</div>
<div class="button-group" role="group">
	<button type="button" id="add_image" class="btn btn-primary btn-sm button-custom"
	        data-form="image_div"
	        onclick="vrKrpano.showHotspotForm(this);">
		<i class="fas fa-image"></i> <?php echo \Joomla\Language\Text::_('HOTSPOT_LABEL_ADD_IMAGE'); ?>
	</button>
	<button type="button" id="add_video" class="btn btn-primary btn-sm button-custom"
	        data-form="video_div"
	        onclick="vrKrpano.showHotspotForm(this);">
		<i class="fas fa-video"></i> <?php echo \Joomla\Language\Text::_('HOTSPOT_LABEL_ADD_VIDEO'); ?>
	</button>
</div>
<?php if (!empty($scenes) && count($scenes) > 1): ?>
	<div class="button-group" role="group">
		<button type="button" id="add_link" class="btn btn-primary btn-sm button-custom"
		        data-form="link_div"
		        onclick="vrKrpano.showHotspotForm(this);">
			<i class="fas fa-link"></i> <?php echo \Joomla\Language\Text::_('HOTSPOT_LABEL_ADD_LINK_SCENE'); ?>
		</button>
	</div>
<?php endif; ?>