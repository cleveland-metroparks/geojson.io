module.exports = function(context) {

    return function(selection) {

        var layers = [{
            title: 'Leaf-On',  
            layer: L.tileLayer('http://69.54.58.148:8080/tiles/osm_EPSG900913/{z}/{x}/{y}.png?origin=nw', {
                tms: false })
        }, {
            title: 'Leaf-Off',  
            layer: L.tileLayer('http://69.54.58.148:8090/tiles/osm_EPSG900913/{z}/{x}/{y}.png?origin=nw', {
                tms: false })
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

