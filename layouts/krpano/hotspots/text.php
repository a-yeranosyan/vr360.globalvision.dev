<!-- Text-->
<div id="hotspot-form-text"  class="form-group" style="display: none;">
	<div class="form-group">
		<input
				id='text-title-editor'
				title="Entered field should be less than 15"
				type="text"
				size="29"
				placeholder="Enter hotspot title"
				class="form-control"
				name="hotspot_title"
		/>
	</div>
	<div class="form-group">
		<textarea
				class="form-control"
				name="hotspot_content"
				id="text-description-editor"
				placeholder="Input description"
				title="Entered field should be less than 255"
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