<!-- Modal-->
<div id="hotspot-form-modal" class="form-group" style="display: none;">
	<div class="form-group">
		<input
			id='modal-title-editor'
			type="text"
			title="Entered field should be less than 15"
			size="29"
			placeholder="Input Modal Title"
			class="form-control"
			name="modal_title"
		/>
	</div>
	<div class="form-group">
		<textarea
			class="form-control"
			id="modal-description-editor"
			placeholder="Input description"
			title="Entered field should be less than 255"
			name="modal_content"
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
	<?php echo Vr360Layout::getInstance()->fetch('krpano.hotspots.buttons', array('type'=>'modal')); ?>
</div>