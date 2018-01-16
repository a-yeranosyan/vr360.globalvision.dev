<!-- addLinkScene-->
<div id="hotspot-form-link" class="form-group" style="display: none;">
	<select
		class="selectpicker"
		data-width="261px"
		id="selectbox"
		name="linkedscene"
	>
		<?php if (!empty($scenes) && count ($scenes) > 1): ?>
			<?php foreach ($scenes as $scene): ?>
				<option value="scene_<?php echo explode('.', $scene->file)[0] ?>"><?php echo $scene->name ?></option>
			<?php endforeach ?>
		<?php endif; ?>
	</select>
	<input type="hidden" name="selectbox_data" value="<?php echo htmlspecialchars(json_encode($scenes)); ?>">
	<?php echo Vr360Layout::getInstance()->fetch('krpano.hotspots.buttons', array('type'=>'linkscene')); ?>
</div>