<!-- Video-->
<div id="video_div" class="form-group" style="display: none;">
	<div class="form-group">
		<label for="video_url">Add YouTube video URL</label>
		<input
				id='video_url'
				maxlength="255"
				type="text"
				size="29"
				placeholder="Video Url"
				class="form-control"
				style="margin-bottom: 5px; margin-top: 5px;"
		/>
	</div>
	<button
			type="button"
			id="savehotspots"
			class="btn btn-primary"
			onclick="SaveHot('video')"><i class="fas fa-save"></i> Save
	</button>
	<button
			type="button"
			class="btn btn-default"
			onclick="onclickCancel()">Back
	</button>
</div>