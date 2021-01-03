var variations = {
    "Linear": function(x, y) {
        return [x, y];
    },

    "Sinusoidal": function(x, y) {
        return [Math.sin(x), Math.sin(y)];
    },

    "Spherical": function(x, y) {
        var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        return [x / Math.pow(r, 2), y / Math.pow(r, 2)];
    },

    "Swirl": function(x, y) {
        var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        
        return [(x * Math.sin(Math.pow(r, 2))) - (y * Math.cos(Math.pow(r, 2))),
                (x * Math.cos(Math.pow(r, 2))) + (y * Math.sin(Math.pow(r, 2)))];
    },

    "Horseshoe": function(x, y) {
        var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2 ));
        
        return [(1 / r) * (x - y) * (x + y), (1 / r) * 2 * x * y];
    },

    "Polar": function(x, y) {
        var r = Math.sqrt( Math.pow(x, 2) + Math.pow(y, 2));
        var th = Math.atan2(y, x);
        
        return [th / Math.PI, r - 1];
    },

    "Handkerchief": function(x, y) {
        var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        var th = Math.atan2(y, x);
        
        return [r * Math.sin(th + r), r * Math.cos(th - r)];
    },

    "Heart": function(x, y) {
        var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        var th = Math.atan2(y, x);
        
        return [r * Math.sin(th * r), r * -Math.cos(th * r)];
    },

    "Diamond": function(x, y) {
        var r = Math.sqrt( Math.pow(x, 2) + Math.pow(y, 2));
        var th = Math.atan2(y, x);
        
        return [Math.sin(th) * Math.cos(r), Math.cos(th) * Math.sin(r)];
    },
}