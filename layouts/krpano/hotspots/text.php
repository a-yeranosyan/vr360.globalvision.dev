<!-- Text-->
<div id="text_div" class="form-group" style="display: none;">
	<div class="form-group">
		<input
				id='text_t'
				maxlength="255"
				type="text"
				size="29"
				placeholder="Enter hotspot title"
				class="form-control"
		/>
	</div>
	<div class="form-group">
		<textarea
				class="form-control"
				placeholder="Input Description"
				id="text_text"
				maxlength="255"
				style="
					resize: none;
					width:265px;
					overflow:hidden;
					margin-top:2px;
					margin-bottom:2px;
					height: 155px;
					"
		>
		</textarea>
	</div>

	<div class="form-group" style="">
		<button
				type="button"
				id="savehotspots"
				class="btn btn-primary"
				onclick="SaveHot('text')"><i class="fas fa-save"></i> Save
		</button>
		<button
				type="button"
				class="btn btn-danger"
				onclick="onclickCancel()">Back
		</button>
	</div>
</div>