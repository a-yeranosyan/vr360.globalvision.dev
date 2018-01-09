<!-- addLinkScene-->
<div id="link_div" class="form-group" style="display: none;">
	<select
		class="selectpicker"
		data-width="261px"
		id="selectbox"
	>
		<?php if (!empty($scenes)): ?>
			<?php foreach ($scenes as $scene): ?>
				<option value="scene_<?php echo explode('.', $scene->file)[0] ?>"><?php echo $scene->name ?></option>
			<?php endforeach ?>
		<?php endif; ?>
	</select>
	<input type="hidden" name="selectbox_data"
	       value="<?php echo htmlspecialchars(json_encode($scenes)); ?>">
	<button
		type="button"
		id="savehotspots"
		class="btn btn-primary"
		onclick="SaveHot('linkscene')"><i class="fas fa-save"></i> Save
	</button>
	<button
		type="button"
		class="btn btn-default button-custom-save-cancel"
		onclick="onclickCancel()">Back
	</button>
</div>