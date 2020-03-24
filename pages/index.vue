<template>
  <div id="map-wrap" style="height: 100vh">
    <client-only>
      <l-map
        :zoom="zoom"
        :center="[x, y]"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
      >
        <l-control-layers
          position="topright"
          :collapsed="false"
          :sort-layers="true"
        />
        <l-tile-layer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-layer-group layer-type="overlay" name="GSM">
          <l-geo-json :geojson="$store.state.gsm" :options="options">
          </l-geo-json>
        </l-layer-group>
        <l-layer-group layer-type="overlay" name="Fiber">
          <l-geo-json :geojson="$store.state.fiber" :options="options">
          </l-geo-json>
        </l-layer-group>
      </l-map>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zoom: 6,
      x: 47,
      y: 3
    };
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.x = center.lat;
      this.y = center.lng;
      this.$store.dispatch("getGSM", { x: this.x, y: this.y });
    }
  },
  computed: {
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction
      };
    },
    onEachFeatureFunction() {
      return (feature, layer) => {
        layer.bindTooltip(
          "<div>Id: " +
            feature.properties.id +
            "</div><div>Fournisseur: " +
            feature.properties.adm_lb_nom +
            "</div><div>Systeme: " +
            feature.properties.emr_lb_systeme +
            "</div>",
          { permanent: false, sticky: true }
        );
      };
    }
  }
};
</script>
