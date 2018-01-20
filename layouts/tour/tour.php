<?php
defined('_VR360_EXEC') or die;

/**
 * Layout variables
 * ============================
 * @var   Vr360Tour $tour   Tour data
 * @var   array     $scenes Tour scenes
 */
$defaultScene = 0;

if ($scenes)
{
	foreach ($scenes as $index => $scene)
	{
		if (!$scene->default)
		{
			continue;
		}

		$defaultScene = $index;
	}
}

$layoutHelper = Vr360Layout::getInstance();
$skin         = $tour->params->get('skin', 'default.xml');
$assetsPath   = '../../../assets';
$includes     = Vr360HelperKrpano::getIncludes();
?>
<krpano version="1.19" title="Virtual Tour">
	<?php foreach ($includes as $include): ?>
		<!-- <include url="<?php echo $assetsPath; ?>/vendor/krpano/viewer/skin/<?php echo $include; ?>"/> -->
	<?php endforeach; ?>

	<?php if ($tour->params->get('rotation', false)): ?>
		<autorotate
				enabled="true"
				waittime="<?php echo VR360_TOUR_TOUR_DEFAULT_AUTOROTATE_WAITTIME; ?>"
				speed="<?php echo VR360_TOUR_TOUR_DEFAULT_AUTOROTATE_SPEED; ?>"
				horizon="<?php echo VR360_TOUR_TOUR_DEFAULT_AUTOROTATE_HORIZON; ?>"
		/>
	<?php endif; ?>

	<!-- Default skin -->
	<skin_settings maps="false"
	               maps_type="google"
	               maps_bing_api_key=""
	               maps_google_api_key=""
	               maps_zoombuttons="false"
	               gyro="true"
	               webvr="<?php echo $tour->params->get('vr_mode', false) ?>"
	               webvr_gyro_keeplookingdirection="false"
	               webvr_prev_next_hotspots="true"
	               littleplanetintro="false"
	               title="true"
	               thumbs="true"
	               thumbs_width="120" thumbs_height="80" thumbs_padding="10" thumbs_crop="0|40|240|160"
	               thumbs_opened="false"
	               thumbs_text="false"
	               thumbs_dragging="true"
	               thumbs_onhoverscrolling="false"
	               thumbs_scrollbuttons="false"
	               thumbs_scrollindicator="false"
	               thumbs_loop="false"
	               tooltips_buttons="false"
	               tooltips_thumbs="false"
	               tooltips_hotspots="false"
	               tooltips_mapspots="false"
	               deeplinking="false"
	               loadscene_flags="MERGE"
	               loadscene_blend="OPENBLEND(0.5, 0.0, 0.75, 0.05, linear)"
	               loadscene_blend_prev="SLIDEBLEND(0.5, 180, 0.75, linear)"
	               loadscene_blend_next="SLIDEBLEND(0.5,   0, 0.75, linear)"
	               loadingtext="[img src='../../../assets/images/ajax-loader.gif'/]"
	               layout_width="100%"
	               layout_maxwidth="814"
	               controlbar_width="-24"
	               controlbar_height="40"
	               controlbar_offset="20"
	               controlbar_offset_closed="-40"
	               controlbar_overlap.no-fractionalscaling="10"
	               controlbar_overlap.fractionalscaling="0"
	               design_skin_images="vtourskin.png"
	               design_bgcolor="0x2D3E50"
	               design_bgalpha="0.8"
	               design_bgborder="0"
	               design_bgroundedge="1"
	               design_bgshadow="0 4 10 0x000000 0.3"
	               design_thumbborder_bgborder="3 0xFFFFFF 1.0"
	               design_thumbborder_padding="2"
	               design_thumbborder_bgroundedge="0"
	               design_text_css="color:#FFFFFF; font-family:Arial;"
	               design_text_shadow="1"
	/>

	<!-- Skin override only -->
	<include url="<?php echo $assetsPath; ?>/vendor/krpano/skins/<?php echo $skin; ?>"/>

	<!-- User logo -->
	<?php if ($tour->params->get('userlogo') && $tour->getUser()->haveLogo()): ?>
		<layer name="user_logo" type="container" keep="true" x="16" y="60">
			<layer name="logo" type="image" url="<?php echo $tour->getUser()->getLogoUrl(); ?>"
			       keep="true" lefttop="center" width="50" height="50"/>
		</layer>
	<?php endif; ?>

	<action name="startup" autorun="onstart">
		if(startscene === null OR !scene[get(startscene)], copy(startscene,scene[<?php echo $defaultScene ?>].name); );
		loadscene(get(startscene), null, MERGE);
		if(startactions !== null, startactions() );
	</action>

	<!-- Social -->
	<?php if ($tour->params->get('socials', false) == 1): ?>
		<include url="<?php echo $assetsPath; ?>/vendor/krpano/viewer/skin/social-skin.xml"/>
	<?php endif; ?>

	<!-- Scenes -->
	<?php if (!empty($scenes)): ?>
		<?php foreach ($scenes as $scene): ?>
			<?php echo $layoutHelper->fetch('tour.scene', array('scene' => $scene)) ?>
		<?php endforeach; ?>
	<?php endif; ?>
	<!-- Fixed title -->
	<layer name="fix_title" type="container" keep="true" align="lefttop"  x="80" y="30"
	           bgcolor="0x000000" bgalpha="0.5" zorder="10" bgcapture="true" visible="true" >
	    <layer name="parent_fix_title" type="container" keep="true" align="lefttop" width="300" height="30" x="5" y="5"
	           bgcolor="0x000000" bgalpha="0.6" zorder="11"  >
	        <layer name="fix_title_open" url="../../../assets/vendor/krpano/viewer/skin/images/hotspots/popup/description-open.png" keep="true" align="righttop" x="2"       y="10"
	               visible="true"
	               onclick="set(layer[fix_description].visible, true); set(layer[fix_title_open].visible, false);
	               set(layer[fix_title_close].visible, true);"
	               onover="set(layer[fix_title_open].url , '../../../assets/vendor/krpano/viewer/skin/images/hotspots/popup/description-open-hover.png')"
	               onout="set(layer[fix_title_open].url , '../../../assets/vendor/krpano/viewer/skin/images/hotspots/popup/description-open.png')"
	               crop="0|0|18|9" zorder="15"/>
	        <layer name="fix_title_close" url="../../../assets/vendor/krpano/viewer/skin/images/hotspots/popup/description-close.png" keep="true" align="righttop" x="5"       y="10"
	               visible="false"
	               onclick="
	                set(layer[fix_title_open].visible, true);
	                set(layer[fix_title_close].visible, false);
	                set(layer[fix_description].visible, false);
	                "
	                onover="set(layer[fix_title_close].url , '../../../assets/vendor/krpano/viewer/skin/images/hotspots/popup/description-close-hover.png')"
	                onout="set(layer[fix_title_close].url , '../../../assets/vendor/krpano/viewer/skin/images/hotspots/popup/description-close.png')"
	               crop="0|0|18|9" zorder="15"/>
	        <layer
	          bgcolor="0x000000" bgalpha="0.0"
	          name="fix_title_text"
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
	<layer name="fix_description" type="container" keep="true" align="lefttop"  x="80" y="64"
           bgcolor="0x000000" bgalpha="0.5" zorder="10" bgcapture="true" visible="false" >
        <layer
          bgcolor="0x000000" bgalpha="0.6"
          name="fix_description_text"
          type="text"
          width="300"
          css="max-width: 500px; max-height: 250px; color:0xFFFFFF; font-size:17px"
          align="topleft"
          x="5"
          y="0"
          html="<?php echo $tour->description ?>"
        />
</layer>
</krpano>
