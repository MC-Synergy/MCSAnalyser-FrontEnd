# MCS Analyser
This is the front end of the Analyser app for the MCS server.

## Education
This project is being made by Vincent Vermeire. A student at Fontys ICT & Software Engineering. During semester 3 I had to make a fullstack web app, build a CI/CD pipeline and assure my projects quality by performing integration tests and research. For more information, please take a look at my [portfolio](https://github.com/crazyvinvin/Portfolio-S3).

## What is the analyser for?
The Analyser makes it possible to analyse data produced by systems on the MCS Minecraft server. The MCS Systems make use of little robots called turtles. These turtles are part of a mod called MCS-CC (Just another Computercraft fork).

## Where can I see the analyser in action?
### Players
If you are an MCS player, please go to the [MCS Portal](https://portal.mcsynergy.nl) and login with your account.

### Visitors
If you're just a visitor and don't have an MCS account, please got to the [MCS Analyser](https://analyser.mcsynergy.nl) directly to see the it in action.

## How can I add my system to the analyser?
You can add a system to the analyser by submitting an issue with the system id and the wanted graphs and adding some small pieces of code to your system: 
### Step 1: Import
Import the MCSA Client Library by putting this at the top of your script: 
``` lua
require('lua scripts.libs.MCSAClientProduction')
```

### Step 2: Initialize
Initialize the MCSA Client Library by calling the initialize function and passing in the MCS System ID and the harvest interval. Here is an example of the Melon Pumpkin Farm with MCS System ID: 6 and a harvest interval of 300 seconds:
``` lua
InitializeMCSAClient(6, 300)
```

### Step 3: Report Data
Reporting data to the MCSA Servers can be done in 2 ways.
#### Report Inventory
You can report a turtles inventory directly. This sets and sends the data immediately: 
``` lua
ReportAllInInventory()
```
There is also the option the only report a specific item in a turtles inventory:
``` lua
ReportAllInInventory("minecraft:pumpkin")
```
#### Report Data Manually
You can add amounts of data to be saved by the library: 
``` lua
AddToAmountProduced(400, "minecraft:pumpkin")
```
Then when you feel ready, for example when the harvesting round has ended, you can send and wipe the set data: 
``` lua
SendProductionData()
```
There is also the possibility to only send and wipe a specific item: 
``` lua
SendProductionData("minecraft:pumpkin")
```
### Step 4: Submit graph request
You can submit an issue to haves some static graphs of your date added to the analyser. Make sure your issue contains:
- The MCS System ID
- The Graphs you want (you can take a look at the analyser for inspiration)
- Label: Static Graph Request
- Optional: Colors for lines/bars, this should be an RGBA Value.

## Questions
If you have any questions, just tell me.  
(If you scream loud enough I might hear you)

