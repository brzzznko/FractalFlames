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
        var r = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
        
        return [(x * Math.sin(Math.pow(r, 2))) - (y * Math.cos(Math.pow(r, 2))),
                (x * Math.cos(Math.pow(r, 2))) + (y * Math.sin(Math.pow(r, 2)))];
    }
}