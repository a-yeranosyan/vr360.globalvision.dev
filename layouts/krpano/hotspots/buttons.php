<button
	type="button"
	id="savehotspots"
	class="btn btn-primary"
	data-hotspot-type="<?php echo $type; ?>"
	onclick="vrKrpano.saveHotspot(this)"><i class="fas fa-save"></i> Save
</button>
<button
	type="button"
	id="button-back"
	class="btn btn-danger"
	onclick="vrKrpano.closeHotspotForm();">Back
</button>