<!-- Tooltip-->
<div id="hotspot-form-tooltip" class="" style="display: none;">
	<div class="form-group">
		<input
				id='tooltip-title-editor'
				type="text"
				title="Entered field should be less than 15"
				size="29"
				placeholder="<?php echo \Joomla\Language\Text::_('HOTSPOT_TOOLTIP_TITLE_DESCRIPTION'); ?>"
				class="form-control"
				name="tooltip_title"
		/>
	</div>
	<div class="form-group">
		<textarea class="form-control" id="tooltip-description-editor"
			placeholder="Input description"
			title="Entered field should be less than 255"
			name="tooltip_content"
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

	<?php echo Vr360Layout::getInstance()->fetch('krpano.hotspots.buttons', array('type'=>'tooltip')); ?>
</div>