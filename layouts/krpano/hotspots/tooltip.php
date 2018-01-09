<!-- Tooltip-->
<div id="Tooltip_div" class="form-group" style="display: none;">
	<div class="form-group">
		<input
				id='tooltip_t'
				type="text"
				maxlength="255"
				size="29"
				placeholder="Input Tooltip Title"
				class="form-control"
		/>
	</div>
	<div class="form-group">
							<textarea
									class="form-control"
									placeholder="Input Description"
									id="tooltip_d"
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
			class="btn btn-primary "
			onclick="SaveHot('tooltip')"><i class="fas fa-save"></i> Save
	</button>
	<button
			type="button"
			class="btn btn-default"
			onclick="onclickCancel()">Back
	</button>
</div>