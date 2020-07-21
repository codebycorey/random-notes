# Borg RClone Backup
source - https://www.reddit.com/r/unRAID/comments/e6l4x6/tutorial_borg_rclone_v2_the_best_method_to/

As promised I am bringing this back. Sorry for the wait, life and stuff. I archived my reddit history to try some machine learning out, and I didn't read the docs (always read the docs) and ended up nuking it.  So I will re-write this because I love this community.

This guide will be **brief** but I am here to help as always. 

**DISCLAIMER** this guide is offered in the hope that it is helpful, but comes with no warranty/guarantee/etc. Follow at your own risk. 

So backups, **the 3-2-1 rule is a good practice.**  3 copies of your data, 2 local and 1 offsite.

With backup programs I look for the following features and only in extreme situations will I accept less. (I've also included brief summaries)  

- **De-duplication** (Cut down on file size for repeating files)  
- **Compression** (Make files smaller by removing statistical redundancy)  
- **Encryption** (Keep files secure from prying eyes)
- **Pruning & Archiving** (Keep X backups for X time)
- **Multiple platforms** (Linux, Windows, etc)
- **Open Source** (I like to see that code of yours)
- **Remote backup** (Remember we need off-site backup for the 3-2-1 rule
- **Error Detection** (We want to keep our data reliable)
- **Free**  (If possible)

---

#### **My feedback**
I’ve seen people here recommend the following programs and here is my feedback **for the time of my research**


- **Duplicati** looked nice, but in the first day of testing also choked after the first few hundred GB or so of data possibly.  Also the database constantly corrupted. Due to how Duplicati stores files, it is EXTREMELY slow recovering a single file. Worst software experience I’ve had so far for backups.

- **Duplicity** - No error detection

- **Arq** worked and is even multi threaded, but I hardly noticed any de duplication (I’ve had similar results with just compression) which I could live with, but there were no options to manage how many versions to keep or for how long, the Windows UI was clunky, and there was no Linux version.

- **Cloudberry** No de duplication natively max 5TB storage.

- **Restic/Attic** - No compression


- **Duplicacy**  - There is **one** backup tool called Duplicacy that I found, and it is pretty freaking awesome. The only thing I didn’t like was how it stored little files in each directory during backup.  I did find the fix for this but after much thought, I didn’t want to have to remember how to do all of the steps and further remember the commands for restore.  This software is amazing and they have a free version too. The web ui and some os versions of the duplicacy program seems to require a payment...not sure if one time or not.  Some community complaints of duplicacy circles around their license agreement, but the creator basically made a mistake more or less and it is clearly outlined on their website.  

Side note: I hate how close **duplicacy** and **duplicity** and **duplicati** all are to each other.

---

### Back to business  

So if Borg does all of these things, why do we need Rclone? Well....Rclone first and foremost has some tricks to get versioning but it is not a backup tool per se.  Rclone is more of a ***move this data to that location*** tool.  Well Borg can do remote backups but via SSH.  I use Google Drive to back my data up and that is where Rclone comes in.  Borg runs the backup, and Rclone moves a copy of the backup to my google cloud. This offers me a lot of flexibility.

### Steps
1.Grab the **user scripts** plugin from the app store on unRAID.  
2.Grab the **nerdpack** plugin from the app store on unRAID.  Once you have it, use it to install **Borg.**  
3.Grab rclone beta by waseh on the unraid app store.  
4.We need to create our repo for Borg.  The repo is where Borg will store it’s b’ckup files.  To do this type the following:

#
    borg init —encryption=repokey '/path/to/repo'

You will then be prompted for a password .  This is your secret repo encryption password (Make it strong!). Also probably not the best idea to store your array backup on your actual array.  I use a hard drive mounted with the unassigned devices plugin so my command would be as follows 
#
    borg init —encryption=repokey '/mnt/disks/my_backup_location/borg_repo/'

If the **borg init** command went through successfully, you installed Borg properly.  If not, get back with me and we can figure out the issue.  

5.If you need help setting up Rclone , I recommend watching [spaceinvaderone’s video](https://www.youtube.com/watch?v=-b9Ow2iX2DQ).  Bottom line, you need a location for Rclone to send the Borg repo to. 

6.Now we need to automate this process.  My script flow is the following:

-	User script runs on Sunday
-	Script cancels if any of the following are true: 
 - (If parity check is going, Borg is running already, Rclone is running). No sense in running a new backup task if your old one hasn’t made it to the cloud yet or if your parity check is going.  I will annotate below what things to look at in the script.  [Here is the link to the entire script](https://pastebin.com/fBBY5jXB).  Paste it into the user scripts plugin and set the day you want the script to run.  I just choose weekly which is every Sunday for me.  

---

### Important parts of the script.
The things to pay attention to in the script are the following:

1 This is where Borg AND Rclone will log all items.  Make sure it is somewhere you desire:   
#
    LOGFILE="/boot/logs/Borg.txt"

2 This is the repo location you set when you did the **borg init** command:  
#
    export BORG_REPO='/YOURREPODESTINATION'

3 This is the Rclone destination you setup:  
#
    export CLOUDDEST='GDrive:'YOURRCLONEGDRIVEFOLDERFORBORG'

4’ This is the encryption key you setup with the **borg init** command:  
#
    export BORG_PASSPHRASE='YOURREPOKEY'

5 Borg will keep a log of what files it has already seen, lets save that somewhere that is persistent.  I used to use **/tmp/** directory but if I rebooted my server Borg would re index all files, even ones that haven’t changed because /tmp/ clears after each unraid reboot.
#
    export BORG_CACHE_DIR='/mnt/user/appdata/borg/cache/'
    export BORG_BASE_DIR='/mnt/user/appdata/borg/'

6 This next line is **very** important to unRAID.  Without it, files will be indexed on every single run even if they haven’t changed.  This is due to unRAID’s inode values/fusermount changing. 
#
    --files-cache=mtime,size        \

7 The following are subdirectories you would like to exclude. For instance, let’s say you want to backup /mnt/folder1 but not /mnt/folder1/ihatethisfolder.  Then you would add ihatethisfolder to the list below:  
#
    --exclude /mnt/user/myfirstexcludeddirectory              \
    --exclude /mnt/user/mysecondexcludedpdirectory             \
    --exclude /mnt/user/mythirdexcludeddirectory              \  

8) Finally, the good stuff, these are the directories you want Borg to backup.  Remember the bigger the backup, the longer Rclone takes to upload to the cloud.  I have very slow upload speeds so I choose these folders wisely.  If you have a fast upload speed...maybe /mnt/user is the way to go.   
#
    /mnt/user/myfirstbackupdirectory              \  
    /mnt/user/mysecondbackupdirectory             \   
    /mnt/user/mythirdtbackupdirectory              \   
    /mnt/user/myfourthbackupdirectory              \   

9) **Be very careful** when editing these commands.  As you see some of them end with a **backslash**.  If there is ANY white space after that backslash, the script will fail.  Also, maybe you don’t want to u’e Rclone. Just use the # sign to comment anything out you don’t want ran in the script.  So   
**#**rclone sync $BORG_REPO $CLOUDDEST -P —stats 1s -v—>&1 | tee -a $LOGFILE  
would get Rclone to stop running.  You might want to turn off the echo commands above and below it too so your log files don’t say "rclone ran etc" (because it didn’t if you commented it out).  

---

### Easy email alerts
If you want email alerts along with the log file add the following line right above the “# ALL other er“ors” section at th” bottom of the script.  
#
    NOW=$(date "+%m-%d-%Y")
    /usr/local/emhttp/webGui/scripts/notify -s "Borg Backup $NOW" -d "Borg Scheduled Task" -m "Borg Backup Finished!"

For reference the options  
-s = subject  
-d = title in message  
-m = message  

Customize as you see fit.

This will send an email, to the email address you configured for unRAID notifications. 

---

### Documention links for reference

[Borg documentation link](https://borgbackup.readthedocs.io)

[Rclone documentation link](https://rclone.org/docs/)

--- 
### Finally
I wrote this guide pretty quickly so please excuse any inaccuracies, grammatical errors, and so forth. I will try to make edits as I see fit. If you get stuck let me know. I am here constantly wasting my life away on reddit lol.  I enjoy unRAID so much it’s in my username. If this is too much, check out duplicacy.  I guess it was added to the community apps store last month!  Looks pretty promising.  For now I have used this particular script for about a year now with plenty of restores and it’s worked great. Cheers, hope you try it out!

---
### TL;DR:
Borg + RClone backup script. 
[Here is the link to the entire script](https://pastebin.com/fBBY5jXB). 
---
---
Edit: gold and silver. You unraiders are too kind! Thank you!  
Edit2: My phone messed this whole document up some how so if you see any formatting issues, I'll try and fix them asap.  The proper code is on the link I provided above to be sure.