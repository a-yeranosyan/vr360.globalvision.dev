<button type="button" id="hotspot-edit" class="btn btn-primary btn-sm button-for-edit" onclick="vrKrpano.showEditHotspotForm();">
	<?php echo \Joomla\Language\Text::_('HOTSPOT_BUTTON_EDIT'); ?>
</button>
<button type="button" id="hotspot-move" class="btn btn-info btn-sm button-for-edit" onclick="vrKrpano.update('updateHotspotPosition');">
	<?php echo \Joomla\Language\Text::_('HOTSPOT_BUTTON_MOVE'); ?>
</button>
<button type="button" id="hotpost-delete" class="btn btn-danger btn-sm button-for-edit"onclick="vrKrpano.remove('hotspot');">
	<?php echo \Joomla\Language\Text::_('HOTSPOT_BUTTON_DELETE'); ?>
</button>