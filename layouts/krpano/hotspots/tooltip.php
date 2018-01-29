<!-- Tooltip-->
<div id="hotspot-form-tooltip" class="form-group">
	<div class="form-group">
		<label  for="tooltip-title-editor" class="label-add-edit-text"><?php echo \Joomla\Language\Text::_('HOTSPOT_LABEL_ADD_TOOLTIP');?></label>
		<input
				id='tooltip-title-editor'
				type="text"
				size="29"
				placeholder="<?php echo \Joomla\Language\Text::_('HOTSPOT_TITLE'); ?>"
				class="form-control"
				name="tooltip_title"
		/>
	</div>
	<div class="form-group">
		<textarea class="form-control editor-textarea-size" id="tooltip-description-editor" placeholder="<?php echo \Joomla\Language\Text::_('HOTSPOT_DESCRIPTION'); ?>" title="<?php echo \Joomla\Language\Text::_('HOTSPOT_LABEL_ADD_TITLE');?>" name="tooltip_content"
		></textarea>
	</div>

	<?php echo Vr360Layout::getInstance()->fetch('krpano.hotspots.buttons', array('type'=>'tooltip')); ?>
</div>