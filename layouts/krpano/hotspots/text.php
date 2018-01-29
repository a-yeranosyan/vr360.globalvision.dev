<!-- Text-->
<div id="hotspot-form-text"  class="form-group" style="display: none;">
	<div class="form-group">
		<label for="text-title-editor" class="label-add-edit-text"><?php echo \Joomla\Language\Text::_('HOTSPOT_LABEL_ADD_TEXT');?> </label>
		<input
				id='text-title-editor'
				type="text"
				size="29"
				placeholder="<?php echo \Joomla\Language\Text::_('HOTSPOT_TITLE'); ?>"
				class="form-control"
				name="hotspot_title"
		/>
	</div>
	<div class="form-group">
		<textarea class="form-control editor-textarea-size" name="hotspot_content" id="text-description-editor" placeholder="<?php echo \Joomla\Language\Text::_('HOTSPOT_DESCRIPTION'); ?>" title="<?php echo \Joomla\Language\Text::_('HOTSPOT_LABEL_ADD_TITLE');?>"
		></textarea>
	</div>
	<?php echo Vr360Layout::getInstance()->fetch('krpano.hotspots.buttons', array('type'=>'text')); ?>
</div>