# Unraid Nofications via Telegram + custom notifications
source - https://www.reddit.com/r/unRAID/comments/fvx8d0/tutorial_get_unraid_notifications_via_telegram/

DS-Unraid is back, and here is a cool project for you people at home stir crazy like me.

For a while I had custom scripts I would run and get a daily email containing a log of those scripts.   I however am TRYING to be more privacy focused these days and wanted to get away from the big G data mining me via my emails.  I have since moved to Telegram.  Unraid implemented the Telegram notification capability a while back but that just handles standard notifications that unRAID would otherwise send out to your email.  So of course you can use those, BUTTT **I want to show you a cool way to get custom notifications as well as some examples.**

First and foremost. DISCLAIMER: DO YOUR RESEARCH. I am NOT responsible for any of the choices you make with this guide.  Also please be aware **Telegram Bot API's are not end to end encrypted.** But the curl command does use **HTTPS**. See [Telegram documentation](https://core.telegram.org/api/end-to-end) End to end encryption are for user's chat, without mentioning about bots. If you want end to end encryption with your server and your bot, you would need to implement that manually which I haven't looked into as of yet.  So for now, just be careful what you send via your script below.


So how do we do this?  Well first off, sign up for [Telegram](https://telegram.org/).  Once you're signed up, you will open the app and talk to the awesome built in BOT FATHER. [Here is the guide](https://core.telegram.org/bots), step 3 talks about the bot father.  Don't worry it's easy peasy. Once you create your bot, you will need to get the API key from the bot father chat session. All you gotta do is type **/mybots** and press enter and the bot father will prompt you with various options. The option you want is the **API TOKEN**.  Copy it in notepad++ or something for later.  DO NOT GIVE THIS OUT, this is a secret key you need to tell the bot what to send you.  **You need one more thing**. Go here https://api.telegram.org/bot(YOURKEY)/getUpdates but replace the YOURKEY area with your real APIKEY and REMOVE the parenthesis.  This will load up a page with a bunch of mumbo jumbo text, fear not!  Look for an area at the top that says **chat** and below it **id** and copy that ID number to the same place you have your API key (notepad++ or notepad or whatever).  WEEEEEW, lets get out of this nerd stuff.

BACK TO UNRAID!

So in unraid I have a bunch of custom user scripts.  I'll post some useful ones here.  The goal is to run a custom script, and below each command in that script will have some code to log what the command did... to a single file.  So all of your custom commands within your scripts will log to a single file.  Then we run a 2nd script daily, that reads that single log file and parses out only entries pertaining to that day's date! With this method, we can keep a single log file but only send our telegram bot new stuff. For example our master log file would look like this

    04-03-2020 04:00:02 : I did something
    04-04-2020 04:26:29 : I did something else
    04-04-2020 04:26:29 : I checked the file size of something
    04-06-2020 04:26:30 : I did something again
    04-06-2020 04:27:14 : I did something again

But our telegram notification would look like this

    Daily Status Log for 04-06-2020
    04-06-2020 04:26:30 : I did something again
    04-06-2020 04:27:14 : I did something again

So you see, we have 1 file containing ALL entries, but our bot will only tell us entries related to that day using a command called **grep**. So my daily script is [linked here](https://pastebin.com/uiG6Y9L8).  There are various things in there I personally use so maybe you can benefit from customizing my script to something useful for yourself. At your own risk. Obviously change things in the script template to match your unraid directories.  If you want to disable a particular command in that script just use the # symbol in front of it.  I call this script everyday at 4AM by putting 

    0 4 * * *    

in the custom scripts time field.  [See this pic for reference](https://imgur.com/a/I3pH0xd)

So as you can see there are commands that run and then a message below that command gets sent to our master log

    echo "$(date "+%m-%d-%Y %T") : Restarted nextcloud docker" 2>&1 | tee -a $LOGFILE

There is your custom command for reference.  All this says is send today's date and time with this message to my $LOGFILE variable.

Once this is done, I have another script run to tell my bot to tell me about what ran for the day.  That [script is here](https://pastebin.com/Hq5MWqKf).  This script will require your bot API key and CHAT ID from earlier.  Once you create this script, run it to make sure you can see the notification from your bot in telegram.  

I am sure I missed something here to include grammatical errors, but I am more concerned with the tutorial gist and not my tutorial writing ability.  Just so you know, I write my logs to the /boot/ directory which is the unraid USB disk.   I have a 16GB disk and this lets me keep logs between reboots.  I also have not implemented a way to clean up that log file from time to time. If I do that, I'll update this post.  For now, each year I go back and archive it to a place on my array.  

Hope this helps, please let me know if you have any questions.

- DS-Unraid.