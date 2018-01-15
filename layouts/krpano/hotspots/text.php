<!-- Text-->
<div id="hotspot-form-text" class="form-group" style="display: none;">
	<div class="form-group">
		<input
				id='text-title-editor'
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
				id="text-description-editor"
				maxlength="255"
				style="
					resize: none;
					width:265px;
					overflow:hidden;
					margin-top:2px;
					margin-bottom:2px;
					height: 155px;
					"
		></textarea>
	</div>
	<?php echo Vr360Layout::getInstance()->fetch('krpano.hotspots.buttons', array('type'=>'text')); ?>
</div>