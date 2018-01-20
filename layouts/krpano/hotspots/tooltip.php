<!-- Tooltip-->
<div id="hotspot-form-tooltip" class="" style="display: none;">
	<div class="form-group">
		<input
				id='tooltip-title-editor'
				type="text"
				size="29"
				placeholder="<?php echo \Joomla\Language\Text::_('HOTSPOT_TOOLTIP_TITLE_DESCRIPTION'); ?>"
				class="form-control"
				name="tooltip_title"
		/>
	</div>
	<div class="form-group">
		<textarea class="form-control editor-textarea-size" id="tooltip-description-editor" placeholder="Input description" title="<?php echo \Joomla\Language\Text::_('HOTSPOT_LABEL_ADD_TITLE');?>" name="tooltip_content"
		></textarea>
	</div>

	<?php echo Vr360Layout::getInstance()->fetch('krpano.hotspots.buttons', array('type'=>'tooltip')); ?>
</div>