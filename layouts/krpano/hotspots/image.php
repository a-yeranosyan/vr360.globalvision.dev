<!-- Image-->
<div id="image_div" class="form-group" style="display: none;">
	<div class="form-group">
		<input
			id='image_url'
			maxlength="255"
			type="text"
			size="29"
			placeholder="Image Url"
			class="form-control"
			style="margin-bottom: 2px "
		/>
	</div>
	<button
		type="button"
		id="savehotspots"
		class="btn btn-primary"
		onclick="SaveHot('image')"><i class="fas fa-save"></i> Save
	</button>
	<button
		type="button"
		class="btn btn-default"
		onclick="onclickCancel()">Back
	</button>
</div>