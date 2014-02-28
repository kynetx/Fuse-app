The primary interface of the app should be a quick view list of all cars linked to the user’s app. This list view should include the car’s name and photo (YMM if there’s enough room) as well as the current location (with a link out to a map), the current safe driver score (linkable to score detail), the most recent alert, if any (link to list of alerts), and fuel level (link to fuelsmart). If the user only has one car, only the stats for that single car should be listed. 

If the user clicks on the map button or linkable location text, they should drop into a map view where that car appears on the map with an icon or photo of the car (if present). If there is no photo a default car icon in a different color (assigned by the app) should appear for each car. This color should be consistent throughout the app for that vehicle (where relevant).  When the user taps the individual icon in the detail-view, the basic vital stats view (like we have now, but let’s add the name and pic of the primary driver) should open. 

The user should be able to toggle back to the fleet list view by clicking on the fleet icon in the upper-right. When in the fleet view, no icon is present in the upper right hand corner. To look at individual data, the user will need to select a car off the list.

Below are a couple examples of possible Quick List layouts for the GUI.
 
 
The persistent bottom navigation should include icons for Trip Tool, Fuel Smart, Find Car, Safe Driver, and Car Care. 

## Single Car vs. Multi-Car Navigation:

Throughout the app, when there are multiple cars linked, open to a multi-car list, then offer a drill down into a single-car view. If the user only has one car linked to the app, do not require them to go through the multi-car views. Instead drop them directly into the single-car screen for that feature. 

This should include the fleet vs. single car toggle at the top of the screen. If there is only car linked, the fleet icon should never show.
