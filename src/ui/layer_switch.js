module.exports = function(context) {

    return function(selection) {

        var layers = [{
            title: 'MapBox',
            layer: L.mapbox.tileLayer('tmcw.map-7s15q36b', {
                retinaVersion: 'tmcw.map-u4ca5hnt',
                detectRetina: true
            })
        }, {
            title: 'Satellite',  
            layer: L.tileLayer('http://69.54.58.147:8080/tms/1.0.0/osm_EPSG900913/{z}/{x}/{y}.png', {
                tms: true })
        }, {
            title: 'OSM',  
            layer: L.tileLayer('http://maps{s}.clemetparks.com/tilestache/tilestache.cgi/basemap/{z}/{x}/{y}.jpg', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                subdomains: '123'
            })
        }];

        var layerSwap = function(d) {
            var clicked = this instanceof d3.selection ? this.node() : this;
            layerButtons.classed('active', function() {
                return clicked === this;
            });
            layers.forEach(swap);
            function swap(l) {
                var datum = d instanceof d3.selection ? d.datum() : d;
                if (l.layer == datum.layer) context.map.addLayer(datum.layer);
                else if (context.map.hasLayer(l.layer)) context.map.removeLayer(l.layer);
            }
        };
        
        var layerButtons = selection.append('div')
            .attr('class', 'layer-switch')
            .selectAll('button')
            .data(layers)
            .enter()
            .append('button')
            .attr('class', 'pad0')
            .on('click', layerSwap)
            .text(function(d) { return d.title; });

        layerButtons.filter(function(d, i) { return i === 0; }).call(layerSwap);

    };
};

