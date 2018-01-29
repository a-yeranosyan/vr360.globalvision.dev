<!-- Video-->
<div id="hotspot-form-video" class="form-group" style="display: none;">
	<div class="form-group">
		<label for="video-url-editor" class="label-add-edit-text"><?php echo \Joomla\Language\Text::_('HOTSPOT_LABEL_ADD_VIDEO');?></label>
		<input
				id='video-url-editor'
				maxlength="255"
				type="text"
				size="29"
				placeholder="<?php echo \Joomla\Language\Text::_('HOTSPOT_VIDEO');?>"
				class="form-control"
				name="video_url"
				style="margin-bottom: 5px; margin-top: 5px;"
		/>
	</div>
	<?php echo Vr360Layout::getInstance()->fetch('krpano.hotspots.buttons', array('type'=>'video')); ?>
</div>