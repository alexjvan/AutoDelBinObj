function removeBinObj() {
  Logger.log("Starting");
  var found = DriveApp.getFilesByName("autoremove.bobj");
  while(found.hasNext()){
    var file = found.next();
    var parent = file.getParents().next();
    searchFolder(parent);
  }
  Logger.log("Done");
}

function searchFolder(folder) {
  var parentName = folder.getName();
  var folders = folder.getFolders();
  while(folders.hasNext()) {
    var next = folders.next();
    if(!next.isTrashed()) {
      if(next.getName() == "bin" || next.getName() == "obj") {
        Logger.log("Removed: " + next.getName());
        next.setTrashed(true);
      } else if(next.getName()[0] != "." && next.getName().length != 2 && parentName != next.getName()) {
        searchFolder(next);
      }
    }
  }
}

function activate() {
  ScriptApp.newTrigger('removeBinObj')
      .timeBased()
      .everyHours(24)
      .create();
}
