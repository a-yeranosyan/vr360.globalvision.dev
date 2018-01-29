<!-- Image-->
<div id="hotspot-form-image" class="form-group" >
	<div class="form-group">
		<label for="image-url-editor" class="label-add-edit-text"><?php echo \Joomla\Language\Text::_('HOTSPOT_LABEL_ADD_IMAGE');?></label>
		<input
			id='image-url-editor'
			type="text"
			size="29"
			placeholder="<?php echo \Joomla\Language\Text::_('HOTSPOT_IMAGE');?>"
			class="form-control"
			style="margin-bottom: 2px "
			name="image_url"
		/>
	</div>
	<?php echo Vr360Layout::getInstance()->fetch('krpano.hotspots.buttons', array('type'=>'image')); ?>
</div>