define([ "fuse", "models/reminder.model", "fuseapi" ], function( Fuse, Reminder, API ) {
    return Fuse.Collection.extend({
        model: Reminder,

        comparator: function(a,b){ return a.get("timestamp") > b.get("timestamp"); },

        sync: function( method, model, options ) {
        }
        
    });
});
