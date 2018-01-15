<!-- Image-->
<div id="hotspot-form-image" class="form-group" style="display: none;">
	<div class="form-group">
		<input
			id='image-url-editor'
			maxlength="255"
			type="text"
			size="29"
			placeholder="Image Url"
			class="form-control"
			style="margin-bottom: 2px "
		/>
	</div>
	<?php echo Vr360Layout::getInstance()->fetch('krpano.hotspots.buttons', array('type'=>'image')); ?>
</div>