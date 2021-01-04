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

    "Disc": function(x, y) {
        var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        var th = Math.atan2(y, x);
        
        return [(th / Math.PI) * Math.sin(Math.PI * r),  (th / Math.PI) * Math.cos(Math.PI * r)];
    },

    "Spiral": function(x, y) {
        var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        var th = Math.atan2(y, x);
        
        return [(1 / r) * (Math.cos(th) + Math.sin(r)), (1 / r) * (Math.sin(th) - Math.cos(r))];
    },

    "Hyperbolic": function(x, y) {
        var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        var th = Math.atan2(y, x);
        
        return [Math.sin(th) / r, r * Math.cos(th)];
    },

    "Cylinder": function(x, y) {
        return [Math.sin(x), y];
    },

    "Julia": function(x, y) {
        var r = Math.sqrt(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
        var th = Math.atan2(y, x) / 2;

        var omega = Math.PI;
        if (Math.random() > 0.5)
            omega = 0;

        return [r * Math.cos(th + omega), r * Math.sin(th + omega)];
    },

    "Square": function(x, y) {
        return [Math.random() - 0.5, Math.random() - 0.5];
    },

    "Blur": function(x, y) {
        var psi = Math.random();
        var psi_two = Math.random();
        
        return [psi * Math.cos(2 * Math.PI * psi_two), psi * Math.sin(2 * Math.PI * psi_two)];
    },

    "Fisheye": function(x, y) {
        var r = 2 / (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) + 1);
        
        return [r * y, r * x];
    }, 
}