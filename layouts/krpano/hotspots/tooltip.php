<!-- Tooltip-->
<div id="hotspot-form-tooltip" class="" style="display: none;">
	<div class="form-group">
		<input
				id='tooltip_t'
				type="text"
				maxlength="255"
				size="29"
				placeholder="<?php echo \Joomla\Language\Text::_('HOTSPOT_TOOLTIP_TITLE_DESCRIPTION'); ?>"
				class="form-control"
		/>
	</div>
	<div class="form-group">
		<textarea class="form-control" id="tooltip_d"></textarea>
	</div>

	<?php echo Vr360Layout::getInstance()->fetch('krpano.hotspots.buttons', array('type'=>'tooltip')); ?>
</div>