<layer name="fix-description" type="container" keep="true" align="lefttop" x="10" y="170"
       bgcolor="0x000000" bgalpha="0.5" zorder="10" bgcapture="true" visible="false">
	<layer
		bgcolor="0x000000" bgalpha="0.6"
		name="fix-description-text"
		id="tour-description"
		class="tour-description"
		type="text"
		width="300"
		css="max-width: 500px; max-height: 250px; color:0xFFFFFF; font-size:15px;padding:5px"
		align="topleft"
		x="5"
		y="0"
		html="<?php echo $tour->description ?>"
	/>
</layer>