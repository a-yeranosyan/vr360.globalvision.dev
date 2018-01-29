<!-- Modal-->
<div id="hotspot-form-modal" class="form-group" style="display: none;">
	<div class="form-group">
		<label for="modal-title-editor" class="label-add-edit-text"><?php echo \Joomla\Language\Text::_('HOTSPOT_LABEL_ADD_MODAL');?></label>
		<input
			id='modal-title-editor'
			type="text"
			size="29"
			placeholder="<?php echo \Joomla\Language\Text::_('HOTSPOT_TITLE');?>"
			class="form-control"
			name="modal_title"
		/>
	</div>
	<div class="form-group">
		<textarea
			class="form-control editor-textarea-size" id="modal-description-editor" placeholder="<?php echo \Joomla\Language\Text::_('HOTSPOT_DESCRIPTION');?>" title="<?php echo \Joomla\Language\Text::_('HOTSPOT_LABEL_ADD_TITLE');?>" name="modal_content"
		></textarea>
	</div>
	<br>
	<?php echo Vr360Layout::getInstance()->fetch('krpano.hotspots.buttons', array('type'=>'modal')); ?>
</div>