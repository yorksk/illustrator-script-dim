/**
* @@@BUILDINFO@@@ NoTransparency.js !Version! Fri Apr 05 2019 
*/
//Run the script in Isolation or Symbol Editing Mode
//It makes a copy of dimmed items in locked "TEMP" layer with opacity = 100
// DELETE THE "TEMP" LAYER BEFORE EXIT THE MODE


function main() {
    
    var doc = app.activeDocument;
    var editedLayer = doc.layers[0];
    var lockedLayer = doc.layers[1];
    var lll = lockedLayer.layers.length;
    var elName = editedLayer.name;
    var toLayer;
    
    if (elName == "Isolation Mode" || elName == "Symbol Editing Mode") {
        switch(editedLayer.name) {
            case "Isolation Mode":
                if (editedLayer.layers.length > 0 && editedLayer.layers[0].name == "TEMP") {
                    alert("Check \"TEMP\" Layer!");
                    break;
                }
                alert("Delete TEMP Layer before\nYou exit THIS mode!");
                editedLayer.layers.add();
                editedLayer.layers[0].name = "TEMP";
                editedLayer.layers[0].zOrder(ZOrderMethod.SENDTOBACK);
                toLayer = editedLayer.layers[0];
                moveToTemp(toLayer);
                break;
            case "Symbol Editing Mode":
                if (editedLayer.layers[0].layers.length > 0 && editedLayer.layers[0].layers[0].name == "TEMP") {
                    alert("Check \"TEMP\" Layer!");
                    break;
                }
                alert("Delete TEMP Layer before\nYou exit THIS mode!");
                editedLayer.layers[0].layers.add();
                editedLayer.layers[0].layers[0].name = "TEMP";
                toLayer =  editedLayer.layers[0].layers[0];
                toLayer.zOrder(ZOrderMethod.SENDTOBACK);
                moveToTemp(toLayer);
                break;
            default:
                alert("It doesn't lock like\nIsolated or Symbol\nEditing Mode.");
        }
    } else {
        alert("It doesn't look like\nIsolated or Symbol\nEditing Mode.");
    }
    
        
    function moveToTemp(layer) {
        for (var i = lll-1; i >= 0; i--) {
            var inLayer = lockedLayer.layers[i].pageItems.length;
            if (inLayer > 0) {
                for (var j = inLayer - 1; j >= 0; j--) {
                    lockedLayer.layers[i].pageItems[j].duplicate(layer);
                }
            }
        }
        layer.locked = true;
    }
    
}
main();

