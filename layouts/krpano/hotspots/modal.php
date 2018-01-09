<!-- Modal-->
<div id="modal_div" class="form-group" style="display: none;">
	<div class="form-group">
		<input
			id='modal_t'
			type="text"
			size="29"
			placeholder="Input Modal Title"
			class="form-control"
		/>
	</div>
	<div class="form-group">
							<textarea
								class="form-control"
								placeholder="Input Description"
								id="modal_d"
								maxlength="255"
								style="
								resize: none;
								width:259px;
								overflow:hidden;
								margin-top:2px;
								margin-bottom:2px;
								height: 155px;
								"
							></textarea>
	</div>
	<br>
	<button
		type="button"
		id="savehotspots"
		class="btn btn-primary"
		onclick="SaveHot('modal')"><i class="fas fa-save"></i> Save
	</button>
	<button
		type="button"
		class="btn btn-default"
		onclick="onclickCancel()">Back
	</button>
</div>