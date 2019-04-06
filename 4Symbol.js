/**
* @@@BUILDINFO@@@ 4Symbol.js !Version! Fri Apr 05 2019 
*/

// The script to bypass opacity in Adobe Illustrator Symbol Editing Mode(temporary solution)
// Tested: Windows 10, Illustrator CC 17.064
// The script released as is
// Feel free to make any changes(for example comment or delete alerts)

// Test it first on your machine with your Illustrator version!!!

// 1: Save your project!!!
// 2: Double click a Symbol or click a Symbol and "Edit Symbol"
// 3: Start the script (it creates a locked layer and 
// duplicates all dimmed items in it at their original positions)
// 4: Edit your Symbol
// 5: DELETE "TEMP" LAYER!!! 
// 6: Exit Symbol Editing Mode

// Tip: The name "4Symbol" for easy Alt navigation:
// a shortcut to start the script: Alt + F + R + 4 (in my case)
// if the script in the Illustrator Script Folder

function main() {
    
    var doc = app.activeDocument;
    var mainLayer = doc.layers[0];
    var lockedLayer = doc.layers[1];
    var lll = lockedLayer.layers.length;
    var elName = mainLayer.name;
    var toLayer;
    
    if (elName == "Symbol Editing Mode") {
            
        if (mainLayer.layers[0].layers.length > 0 && mainLayer.layers[0].layers[0].name == "TEMP") {
            alert('Check "TEMP" Layer!');
        } else {
            alert("Delete TEMP Layer Before Exit!");
            mainLayer.layers[0].layers.add();
            mainLayer.layers[0].layers[0].name = "TEMP";
            toLayer =  mainLayer.layers[0].layers[0];
            toLayer.zOrder(ZOrderMethod.SENDTOBACK);    
            moveToTemp(toLayer);
        }
        
    } else {
        alert("It doesn't look like Symbol Editing Mode.");
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

