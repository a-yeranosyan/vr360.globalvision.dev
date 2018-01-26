<!-- Select type -->
<div class="button-group" role="group">
	<!-- text_div -->
	<button type="button" id="button-add-text" class="btn btn-primary btn-sm button-custom"
	        data-form="hotspot-form-text"
	        onclick="vrKrpano.showHotspotForm(this);">
		<i class="fas fa-font"></i> <?php echo \Joomla\Language\Text::_('HOTSPOT_LABEL_ADD_TEXT'); ?>
	</button>
	<button type="button" id="button-add-tooltip" class="btn btn-primary btn-sm button-custom"
	        data-form="hotspot-form-tooltip"
	        onclick="vrKrpano.showHotspotForm(this);">
		<i class="fas fa-info"></i> <?php echo \Joomla\Language\Text::_('HOTSPOT_LABEL_ADD_TOOLTIP'); ?>
	</button>
	<button type="button" id="button-add-modal" class="btn btn-primary btn-sm button-custom"
	        data-form="hotspot-form-modal"
	        onclick="vrKrpano.showHotspotForm(this);">
		<i class="far fa-window-maximize"></i> <?php echo \Joomla\Language\Text::_('HOTSPOT_LABEL_ADD_MODAL'); ?>
	</button>
</div>
<div class="button-group" role="group">
	<button type="button" id="button-add-image" class="btn btn-primary btn-sm button-custom"
	        data-form="hotspot-form-image"
	        onclick="vrKrpano.showHotspotForm(this);">
		<i class="fas fa-image"></i> <?php echo \Joomla\Language\Text::_('HOTSPOT_LABEL_ADD_IMAGE'); ?>
	</button>
	<button type="button" id="button-add-video" class="btn btn-primary btn-sm button-custom"
	        data-form="hotspot-form-video"
	        onclick="vrKrpano.showHotspotForm(this);">
		<i class="fas fa-video"></i> <?php echo \Joomla\Language\Text::_('HOTSPOT_LABEL_ADD_VIDEO'); ?>
	</button>
<?php if (!empty($scenes) && count($scenes) > 1): ?>
		<button type="button" id="button-add-link" class="btn btn-primary btn-sm button-custom"
		        data-form="hotspot-form-link"
		        onclick="vrKrpano.showHotspotForm(this);">
			<i class="fas fa-link"></i> <?php echo \Joomla\Language\Text::_('HOTSPOT_LABEL_ADD_LINK_SCENE'); ?>
		</button>
<?php endif; ?>
</div>