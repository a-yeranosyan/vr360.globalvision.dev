<!-- Video-->
<div id="hotspot-form-video" class="form-group" style="display: none;">
	<div class="form-group">
		<label for="video_url">Add YouTube video URL</label>
		<input
				id='video-url-editor'
				maxlength="255"
				type="text"
				size="29"
				placeholder="Video Url"
				class="form-control"
				name="video_url"
				style="margin-bottom: 5px; margin-top: 5px;"
		/>
	</div>
	<?php echo Vr360Layout::getInstance()->fetch('krpano.hotspots.buttons', array('type'=>'video')); ?>
</div>