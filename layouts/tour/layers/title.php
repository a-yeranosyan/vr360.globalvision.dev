<layer name="fix-title" type="container" keep="true" align="lefttop" x="80" y="30"
       bgcolor="0x000000" bgalpha="0.5" zorder="10" bgcapture="true" visible="true">
	<layer name="parent-fix-title" type="container" keep="true" align="lefttop" width="300" height="30" x="5" y="5"
	       bgcolor="0x000000" bgalpha="0.6" zorder="11">
		<layer name="fix-title-open"
		       url="../../../assets/vendor/krpano/viewer/skin/images/hotspots/popup/description-open.png"
		       keep="true" align="righttop" x="2" y="10"
		       visible="true"
		       onclick="set(layer[fix-description].visible, true); set(layer[fix-title-open].visible, false);
	               set(layer[fix-title-close].visible, true);"
		       onover="set(layer[fix-title-open].url , './assets/vendor/krpano/viewer/skin/images/hotspots/popup/description-open-hover.png')"
		       onout="set(layer[fix-title-open].url , './assets/vendor/krpano/viewer/skin/images/hotspots/popup/description-open.png')"
		       crop="0|0|18|9" zorder="15"/>
		<layer name="fix-title-close"
		       url="../../../assets/vendor/krpano/viewer/skin/images/hotspots/popup/description-close.png"
		       keep="true" align="righttop" x="5" y="10"
		       visible="false"
		       onclick="
	                set(layer[fix-title-open].visible, true);
	                set(layer[fix-title-close].visible, false);
	                set(layer[fix-description].visible, false);
	                "
		       onover="set(layer[fix-title-close].url , './assets/vendor/krpano/viewer/skin/images/hotspots/popup/description-close-hover.png')"
		       onout="set(layer[fix-title-close].url , './assets/vendor/krpano/viewer/skin/images/hotspots/popup/description-close.png')"
		       crop="0|0|18|9" zorder="15"/>
		<layer
			bgcolor="0x000000" bgalpha="0.0"
			name="fix-title-text"
			type="text"
			css="max-width: 500px; max-height: 250px; color:0xFFFFFF; white-space: initial;font-size:17px"
			align="topleft"
			x="5"
			y="5"
			visible="true"
			html="<?php echo $tour->name ?>"
		/>
	</layer>
</layer>