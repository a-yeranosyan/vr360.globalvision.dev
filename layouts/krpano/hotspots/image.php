<!-- Image-->
<div id="hotspot-form-image" class="form-group" style="display: none;">
	<div class="form-group">
		<label for="image-url-editor" class="label-add-edit-text">Image</label>
		<input
			id='image-url-editor'
			type="text"
			size="29"
			placeholder="Image Url"
			class="form-control"
			style="margin-bottom: 2px "
			name="image_url"
		/>
	</div>
	<?php echo Vr360Layout::getInstance()->fetch('krpano.hotspots.buttons', array('type'=>'image')); ?>
</div>