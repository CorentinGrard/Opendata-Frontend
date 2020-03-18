<template>
  <v-container>
    <div id="map-wrap" style="height: 90vh">
      <client-only>
        <l-map
          :zoom="6"
          :center="center"
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
          <l-layer-group layer-type="overlay" name="GSM" visible=false>
            <l-geo-json :geojson="$store.state.gsm" :options="options"> </l-geo-json>
          </l-layer-group>
          <l-layer-group layer-type="overlay" name="Fiber" visible=false> 
            <l-geo-json :geojson="$store.state.fiber" :options="options"> </l-geo-json>
          </l-layer-group>
        </l-map>
      </client-only>
    </div>
  </v-container>
</template>

<script>
export default {
  mounted() {},
  data() {
    return {
      map: null,
      option: [
        {
          name: "GSM",
          url: "eg"
        },
        {
          name: "Fibre",
          url: "rest"
        }
      ],
      zoom: 6,
      center: [47, 3],
      geojson: null
    };
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
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
