<layer name="fix_description" type="container" keep="true" align="lefttop" x="80" y="64"
       bgcolor="0x000000" bgalpha="0.5" zorder="10" bgcapture="true" visible="false">
	<layer
		bgcolor="0x000000" bgalpha="0.6"
		name="fix_description_text"
		id="tour-description"
		class="tour-description"
		type="text"
		width="300"
		css="max-width: 500px; max-height: 250px; color:0xFFFFFF; font-size:17px"
		align="topleft"
		x="5"
		y="0"
		html="<?php echo $tour->description ?>"
	/>
</layer>